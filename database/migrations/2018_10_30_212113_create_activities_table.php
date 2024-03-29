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
          $table->integer('parent_id')->default(0);//父事件
          $table->string('name')->default('Undefined');//名
          $table->dateTime('start_at');//起始时间
          $table->dateTime('until_at');//结束时间
          $table->dateTime('complete_at')->nullable();//结束时间

          $table->integer('estimated_time_cost')->default(-1)->comment('In seconds');//预计时间花费
          $table->integer('actual_time_cost')->default(0)->comment('In seconds');//实际时间花费 单位s
          $table->integer('time_cost_for_plan')->default(0)->comment('In seconds');//计划事件花费 单位s

          $table->tinyInteger('status')->default(0)->comment('0:working 1：Completed');;//状态
          $table->tinyInteger('importance')->default(2);//事件的重要性
          $table->string('tags')->nullable();
          $table->string('description')->nullable();

          $table->json('missions')->nullable();//事件详情
          $table->json('permission')->nullable();//权限，可见性
          // $table->json('setting')->nullable();//设置
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
