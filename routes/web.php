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
Route::any('/install', 'InstallController@index')->name('api.thing.list.get.Match');

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
//登陆后才允许的功能
Route::group(['middleware' => 'auth'], function () {
  //API
  Route::group(['prefix' => '/api'], function () {
    Route::group(['prefix' => '/thing'], function () {
      //Thing 相关

      Route::any('/get/{id}', 'ThingController@get')->name('api.thing.get.id');
      Route::POST('/update/{id}', 'ThingController@update')->name('api.thing.update');
      Route::POST('/update', 'ThingController@update')->name('api.thing.update');
      Route::any('/create/{fid}', 'ThingController@create')->name('api.thing.create.fid');
      Route::any('/contact/update', 'ThingController@newMassage')->name('api.thing.contact.update');
      // Route::any('/match/{Regular}', 'ThingController@getListMatch')->name('api.thing.list.get.Match');

      //Thinglist
      Route::group(['prefix' => '/list'], function () {
        Route::any('/', 'ThingController@getListAll')->name('api.thing.list.get.all');
        Route::any('/{fid}', 'ThingController@getListFiD')->name('api.thing.list.get.fid');
        Route::any('/match/{Regular}', 'ThingController@getListMatch')->name('api.thing.list.get.Match');
      });

      Route::group(['prefix' => '/template'], function () {
        Route::any('/', 'ThingsTemplateController@index')->name('api.thing.template.get.all');
        Route::any('/default', 'ThingsTemplateController@getDefault')->name('api.thing.template.get.fid');
        Route::any('/{organizationId}', 'ThingsTemplateController@getOrganization')->name('api.thing.template.get.organizationId');
      });
    });
  });


  // Route::group(['middleware' => 'auth'], function () {
  //
  // });

});
