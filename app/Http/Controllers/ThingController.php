<?php

namespace App\Http\Controllers;

use App\Thing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;

class ThingController extends Controller
{


  //thing
  public function get(Request $request){
    return Thing::where('Permissions.owner.userId', '=', Auth::id())
    ->where('_id', '=', $request['id'])
    ->get();

  }
  public function create(Request $request){
    //！！应验证是否拥有对应父任务的权限
    // return $request;
    $query=[
      'Attribut'=>[
        'title'=>'未命名',
        'fatherId' => $request['fid'],
      ],
      "Permissions"=>[
        'owner'=>[
          // [
          //   'userId'=>Auth::id(),
          //   'role'=>['admin']
          // ]
        ],
        "role"=>[
          /*
          default：
          admin 拥有所有权限
          Reserve 邀请

          */
        ],
      ],

      'Contact'=>[
      ],

    ];
    if(isset($request['data'])){
      $query=$request['data'];
    }

    $query["Permissions"]['owner'][]=[
      'userId'=>Auth::id(),
      'role'=>['admin']
    ];


    if(isset($request['data']['Attribut']['time'])){
      switch($request['data']['Attribut']['time']['type']){
        case "once":
        $result=Thing::create($query);
        break;

        case "day":

        break;

        case "week":

        break;

        case "month":

        break;

        case "year":

        break;

        case "calendar":

        break;
      }
    }

    return $result;
  }
  public function update(Request $request){
    if(!isset($request['data']))
    {
      header('HTTP/1.1 404 Not Found');
      header("数组data 不存在");
      // return "数组data 不存在";
    }
    if(!isset($request['data']['_id'])){
      header('HTTP/1.1 404 Not Found');
      header("_id 不存在");
      // return "_id 不存在";
    }
    if(!isset($request['modules']))
    {
      header('HTTP/1.1 404 Not Found');
      header("数组modules 不存在");
      // return "数组modules 不存在";
    }

    //载入事件
    $thing;
    $thing=Thing::where("_id","=",$request['data']['_id'])->first();

    if($thing->count()==0){
      header('HTTP/1.1 404 Not Found');
      header("事件不存在");
      // return "事件不存在";
    }


    foreach($request['modules'] as $module){
      $thing[$module]=$request['data'][$module];
    }

    $thing->save();
    return $thing;
  }

  public function newMassage(Request $request){

    // if(!isset($request['data']))
    // {
    //   header('HTTP/1.1 404 Not Found');
    //   header("数组data 不存在");
    //   // return "数组data 不存在";
    // }
    // if(!isset($request['data']['_id'])){
    //   header('HTTP/1.1 404 Not Found');
    //   header("_id 不存在");
    //   // return "_id 不存在";
    // }
    // $request['_id']="5a2c2409a528c3bd810062cf";
    $thing;
    $thing=Thing::where("_id","=",$request['_id'])->first();
    $contact=$thing->Contact;
    $contact[]=$request['data'];
    $thing->Contact=$contact;
    $thing->save();
     // return $thing;
    // return $thing->Contact->sizeof($thing["Contact"])=$request['data'];
    // return   $thing;
    return $thing;


  }




//list
public function getListAll(Request $request){
  //->take(100) 限定数量
  return Thing::where('Permissions.owner.userId', '=', Auth::id())->get();
}
public function getListFiD(Request $request){
  return Thing::where('Permissions.owner.userId', '=', Auth::id())->where('Attribut.fatherId', '=', $request['fid'])->get();
}
public function getListMatch(Request $request){

}

private function create_per_day(Request $request){
  if($request['data']['Attribut']['time']['type']!='day')
  {return false;}

  if(($request['data']['Attribut']['time']['type']["endTime"]-$request['data']['Attribut']['time']['type']["startTime"])<0)
  {return false;}



}
}
