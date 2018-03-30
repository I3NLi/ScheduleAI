<?php

namespace App\Http\Controllers;

use App\ThingsTemplate;
use Illuminate\Http\Request;

class ThingsTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $request=new Request();
        $result=
        [
          "default"=>$this->getDefault($request),
          "personal"=>[],
          "organization"=>$this->getOrganization($request),
        ];
        return $result;
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
     * @param  \App\ThingTemplate  $thingTemplate
     * @return \Illuminate\Http\Response
     */
    public function show(ThingTemplate $thingTemplate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ThingTemplate  $thingTemplate
     * @return \Illuminate\Http\Response
     */
    public function edit(ThingTemplate $thingTemplate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ThingTemplate  $thingTemplate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ThingTemplate $thingTemplate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ThingTemplate  $thingTemplate
     * @return \Illuminate\Http\Response
     */
    public function destroy(ThingTemplate $thingTemplate)
    {
        //
    }

    public function getDefault(Request $request){
      return ThingsTemplate::get();
    }

    public function getOrganization(Request $request){

    }
}
