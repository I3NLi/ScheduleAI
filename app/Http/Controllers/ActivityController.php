<?php

namespace App\Http\Controllers;

use App\Activity;
use Illuminate\Http\Request;
use Carbon\Carbon;


class ActivityController extends Controller
{
    public function test(){
      return new Carbon('2018-11-09T15:50:56.310Z');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return Activity::all();
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
         \Debugbar::info($request->all());
        // $this->validate($request, [
        //
        // ]);
        $request['start_at']=new Carbon($request['start_at']);
        $request['until_at']=new Carbon($request['until_at']);
        // \Debugbar::info($request->all());
         return Activity::create($request->all());

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return Activity::where('id','=',$id)->firstOrFail();
    }
    public function showList($id)
    {
      return Activity::where('parent_id','=',$id)->get();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function edit(Activity $activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        //
    }
}
