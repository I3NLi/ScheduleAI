<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model;

class Thing extends Model
{
    //
    protected $guarded = ['_id'];
    /*
    数据结构

    [
      "_id":
      "Attribute"=>[
        "title"=>"undefined",
        "fatherId":this.data.id,
        "time"=>[
          "type"=>'once',
          "data"=>[
            "startCondition"=>'immediately',
            "startTime":new Date(),
            "endTimeType":"time"
            "endTime":
            "workTimeType"=>"inherit",
            "workTime"=>0,
            ],
          ],
        "planTimeCost"=>0,
        "importance"=>"2",
        "tags"=>[],
      ],
      "mission"：Mission,
      "owner"=>[],
      // Database:[],
      // Contact:[],
    ]



    id:Id,
    f_id:{
    type:Id||Number,
    default:0 =>root
  },
    owner：[
      {
        Uid：Id，
        role：[ //权限的集合
          'admin':所有权限，优先
          'read': 查看任务
          'edit': 编辑任务
          'work': 完成任务(填写表单)
          'Review'：评论]
      }
    ]
    start_data:data,
    end_data:data,

    plan_time:number(min=>sec)||String{‘full’},     计划时间，full=结束时间-起始时间
    expect_time:number(min=>sec),   期待时间=计划时间*冗余

    plan_time_consum:number(sec),
    work_time_consum:number(min=>sec),

    local：local 办公地点
    importance：Number{1-5}，
    status：Number{
      0:未激活
      1:进行中
      2：已完成
      3：失败
      4：已删除
      5：冻结
    }，

    mission：[
      {
      Type:Number,
      data:Object
    }
  ],
    file:Id,
    contact:Id,




    */
}
