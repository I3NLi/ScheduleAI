<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//完成安装后删除
// Route::any('/install', 'InstallController@index')->name('api.thing.list.get.Match');/

Route::get('/', function () {
    return view('welcome');
});
Route::any('/home', function () {
    return redirect('workspace');
});

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

//登陆后才允许的功能
Route::group(['https'=>true,'middleware' => 'auth'], function () {
    //主要视图
    Route::any('/workspace/{subs?}', function () {
        return view('workspace');
    });
    //API
    Route::group(['prefix' => '/api'], function () {
        Route::group(['prefix' => '/v1'], function () {
            Route::get('test', 'ActivityController@test');

            Route::group(['prefix' => '/auth'], function () {
                Route::get('/', function () {
                    return Auth::user();
                });
                Route::any('/logout', function () {
                    Auth::logout();
                    return Redirect::route('welcome');
                });
            });

            Route::group(['prefix' => '/activity'], function () {
                Route::get('/', 'ActivityController@index')->name('activity.index');
                Route::get('/{id}', 'ActivityController@show')->name('activity.show');
                Route::post('/', 'ActivityController@store')->name('activity.store');
                Route::put('/', 'ActivityController@update')->name('activity.update');
                Route::delete('/{id}', 'ActivityController@destroy')->name('activity.destroy');
            });
        });
    });
});
