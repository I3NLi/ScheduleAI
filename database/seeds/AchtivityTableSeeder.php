<?php

use Illuminate\Database\Seeder;
use App\User;

class AchtivityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

    $max=20;//每层数据出现的最大数量
    $zjl=4;//出现子事件的机率 ：= zjl/10

    $users = User::all();

    foreach($users as $user){
      //生成10个根事件
      // for($i=0;$i<rand(0,$max);$i++){
      for($i=0;$i<$max;$i++){

        factory(App\Activity::class)->create([
        // 'name' => 'Abigail',
        ]);
      }
    }

}

}
