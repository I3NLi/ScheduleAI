<?php

namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use Illuminate\Database\Seeder;

class InstallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        echo App\User::get()->drop();
        // App\ThingTemplate::get()->delete();
        // seed_User();
        // seed_ThingTemplate();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\install  $install
     * @return \Illuminate\Http\Response
     */
    public function show(install $install)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\install  $install
     * @return \Illuminate\Http\Response
     */
    public function edit(install $install)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\install  $install
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, install $install)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\install  $install
     * @return \Illuminate\Http\Response
     */
    public function destroy(install $install)
    {
        //
    }

    private function seed_User(){

      User::create([
          'name' => 'Boning Li',
          'email' => '344270545@qq.com',
          'password' => bcrypt('6038895'),
      ]);
    }
    private function seed_ThingTemplate(){
      thingTemplate_blank();

    }
    private function thingTemplate_blank(){
      $query=
      [
        //"_id"
        "title"=>"_blank",
        "data"=>
        [//根据id远程读入，模板的信息
          "Attribut"=>[
            "title"=>"undefined",
            // "fatherId":this.data.id,
            "time"=>[
              "type"=>'once',
              "data"=>[
                "startCondition"=>'immediately',
                // "startTime":new Date(),
                "workTimeType"=>"inherit",
                "workTime"=>0,
              ],
            ],
            "planTimeCost"=>0,
            "importance"=>"2",
            "tags"=>[],
          ],
          "Mission"=>[],
          "Owner"=>[],
          // Database:[],
          // Contact:[],
        ]
      ];
        ThingTemplate::create($query);
    }

}
