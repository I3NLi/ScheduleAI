<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('parent_id');//父事件
          $table->string('name');//名
          $table->dateTimeTz('start_at');//起始时间
          $table->dateTimeTz('until_at');//结束时间

          $table->integer('estimated_time_cost');//预计时间花费
          $table->integer('actual_time_cost');//实际时间花费
          $table->integer('time_cost_for_plan');//计划事件花费

          $table->tinyInteger('status');//状态
          $table->tinyInteger('importance');//事件的重要性
          $table->string('tags');

          $table->json('missions');//任务
          $table->json('permission');//权限
          $table->json('setting');//设置
          $table->timestamps();
          $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activities');
    }
}
