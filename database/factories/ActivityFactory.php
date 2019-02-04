<?php

use Faker\Generator as Faker;
use Carbon\Carbon;
$factory->define(App\Activity::class, function (Faker $faker) {
  $tmpInteval=rand(1,300)*300;
  $worktime=rand(1,20)*300;
  //$fixed=rand(1,10)<3?true:false;
  $fixed=false;
  $TmpStartTime=(new Carbon())->addSeconds($tmpInteval);
  $TmpEndTime=(new Carbon())->addSeconds($tmpInteval)->addSeconds($worktime);
  if ($fixed){$TmpEndTime->addSeconds(rand(1,60)*300);}
    return [
    "parent_id"=> 0,
    "name"=>  $fixed?"Event ":"ToDo " . rand(1,300),
    "start_at"=> $TmpStartTime,
    "until_at"=> $TmpEndTime,
    "estimated_time_cost"=> $fixed?-1:$worktime,
    "status"=> 0,
    "importance"=> rand(1,4),
    "tags"=> null,
    "missions"=> [
      "Notice"=> null
    ],
    'permission'=> null,
    "setting"=> [
      "color"=> $faker->hexcolor,
      "restart"=> [
        "type"=> "None"
      ],
      "location"=> ""
  ]
];
});
