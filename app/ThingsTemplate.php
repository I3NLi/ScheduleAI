<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class ThingsTemplate extends Model
{
    //
    protected $guarded = ['_id'];
    /*
    数据结构

    [
    _id:自动生成
    title: [type:String]
    data:[
      type:thing,
      protected $guarded = ['_id','fatherId'];

      ]

    ]

    */
}
