<?php

use Illuminate\Database\Seeder;
use App\Thing;
use App\ThingsTemplate;
use App\User;

class ThingsSeeder extends Seeder
{
  /**
  * Run the database seeds.
  *
  * @return void
  */
  public function run()
  {
    //
    $users = DB::table('users')->get();

    foreach($users as $user){
      $owner=[
        'userId'=>$user->_id,
        'role'=>['admin']
      ];
      //生成10个根事件
      for($i=0;$i<rand(1,10);$i++){
        $tmp=$this->new_thing(0,$this->RandTime(15),$owner);
        //填充自时间
        for($m=0,$m<rand(1,10);$m++){
          //十分之3的几率产生下属子事件
          if(4>rand(1,10)) {
            $tmp=$this->new_thing($tmp->_id,$this->RandTime(15),$owner);
          } else{
            $this->new_thing($tmp->_id,$this->RandTime(15),$owner);
          }
        }
      }
    }




  }
  /*
  生成一个随机的time填充
  @day 最大日期
  */
  private function RandTime($day){
    $TmpStartTime=Date();
    $TmpEndTime=Date();
    $tmpInteval=rand(0,$day);
    date_add($TmpStartTime,date_interval_create_from_date_string($tmpInteval+" days"));
    date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval+" days"));
    $tmpInteval=rand(0,24*60);
    date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval+" minutes"));
    $tmpInteval=rand(0,$tmpInteval);

    $time=[
      "type"=>'once',
      "data"=>[
        "startCondition"=>'immediately',
        "startTime":date_format($TmpStartTime,DATE_ATOM);,
        "endTime":date_format($TmpTmpEndTime,DATE_ATOM);,
        "workTimeType"=>"inherit",
        "workTime"=>$tmpInteval,
      ],
      return $time;
    }
    private function new_thing($fid,$time,$owner){
      $query=
      [//根据id远程读入，模板的信息
        "Attribut"=>[
          "title"=>"undefined",
          "fatherId":$fid,
          "time"=>$time;
        ],
        "workTimeCost"=>0,
        "planTimeCost"=>0,
        "importance"=>"2",
        "tags"=>[],
      ],
      "Mission"=>[
        [
          "type"=>"m_text",
          "content"=>"<p>点击此处修改任务描述</p>",
        ],
      ],
      "Permissions"=>[
        "owner"=>$owner,
        "role"=>[
        ],
        "permissionsList"=>[],
      ],
      "Database"=>[],
      "Contact"=>[],
      "Collapse"=>[
        "Attribut",
        "Mission",
        "Permissions",
        "Contact",
      ],//记录折叠
      "Modules"=>[
        "Attribut",
        "Mission",
        "Permissions",
        "Contact",
      ],//记录启用的模块

    ];
    return Thing::create($query);
  }

}
