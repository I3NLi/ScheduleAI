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
    $max=20;//每层数据出现的最大数量
    $zjl=4;//出现子事件的纪律 ：= zjl/10
    //
    $users = User::all();

    foreach($users as $user){
      $owner=[
        'userId'=>$user->_id,
        'role'=>['admin']
      ];
      //生成10个根事件
      for($i=0;$i<rand(1,$max);$i++){
        $tmp=$this->new_thing(0,$this->RandTime(5),$owner);
        //填充自时�?
        for($m=0;$m<rand(1,$max);$m++){
          //十分�?3的几率产生下属子事件
          if($zjl>rand(1,10)) {
            $tmp=$this->new_thing($tmp->_id,$this->RandTime(5),$owner);
          } else{
            $this->new_thing($tmp->_id,$this->RandTime(5),$owner);
          }
        }
      }

      //生成自定义事件
      $TmpStartTime=new DateTime(date("Y-m-d h:i:s.v"));
      $TmpEndTime=new DateTime(date("Y-m-d h:i:s.v"));
      $tmpInteval=rand(0,3*60);
      date_add($TmpStartTime,date_interval_create_from_date_string($tmpInteval." minutes"));
      date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval." minutes"));
      $tmpInteval=rand(0,5*60);
      date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval." minutes"));
      $this->new_thing(0,$time=[
      "type"=>'once',
      "data"=>[
        "fixed"=>false,
        "startCondition"=>'immediately',
        "startTime"=>date_format($TmpStartTime,"Y-m-d h:i:s.v"),
        "endTime"=>date_format($TmpEndTime,"Y-m-d h:i:s.v"),
        "workTimeType"=>"inherit",
        "workTime"=>$tmpInteval,
          ],
        ],$owner
      );
    }




  }
  /*
  生成�?个随机的time填充
  @day �?大日�?
  */
  private function RandTime($day){
    $gdjl=4; //出现固定事件的机率：=gdjl/10
    $TmpStartTime=new DateTime(date("Y-m-d h:i:s.v"));
    $TmpEndTime=new DateTime(date("Y-m-d h:i:s.v"));
    $tmpInteval=rand(0,$day);
    //生成起始时间
    date_add($TmpStartTime,date_interval_create_from_date_string($tmpInteval." days"));
    //生成结束时间
    date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval." days"));
    $tmpInteval=rand(0,3*60);
    date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval." minutes"));
    //生成工作时间
    $time=[];
    if($gdjl<rand(1,10))//百分之60几率为非固定时间，百分之40为固定事件；固定时间的特征为起始+工作=结束
    {
      $tmpInteval=rand(0,$tmpInteval);
      if(date_diff($TmpEndTime,$TmpEndTime)->invert==1){echo "截止时间小于开始事件";}
      $time=[
      "type"=>'once',
      "data"=>[
        "fixed"=>false,
        "startCondition"=>'immediately',
        "startTime"=>date_format($TmpStartTime,"Y-m-d h:i:s.v"),
        "endTime"=>date_format($TmpEndTime,"Y-m-d h:i:s.v"),
        "workTimeType"=>"inherit",
        "workTime"=>$tmpInteval,
          ],
        ];
    }
    else{
      date_add($TmpEndTime,date_interval_create_from_date_string($tmpInteval." minutes"));//为了测试把非固定事件拉长
      $time=[
      "type"=>'once',
      "data"=>[
        "fixed"=>true,
        "startCondition"=>'immediately',
        "startTime"=>date_format($TmpStartTime,"Y-m-d h:i:s.v"),
        "endTime"=>date_format($TmpEndTime,"Y-m-d h:i:s.v"),
        "workTimeType"=>"inherit",
        "workTime"=>$tmpInteval,
          ],
        ];}

      return $time;
    }


    private function new_thing($fid,$time,$owner){
      $query=
      [//根据id远程读入，模板的信息
        "Attribute"=>[
          "title"=>"mock".rand(1000,9999),
          "fatherId"=>$fid,
        "time"=>$time,
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
        "Attribute",
        "Mission",
        "Permissions",
        "Contact",
      ],//记录折叠
      "Modules"=>[
        "Attribute",
        "Mission",
        "Permissions",
        "Contact",
      ],//记录启用的模�?

    ];
    return Thing::create($query);
  }

}
