<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    //
    protected $guarded=['id'];
    // protected $dateFormat = 'Y-m-d\TH:i:s.u\Z';
    // protected $dateFormat = 'U';

    protected $ImportanceOptions=["Insignificant","unimportant","Normal","Important","Fatal"];
    protected $casts = [
        'start_at'=>"string",
        'until_at'=>"string",
        'missions' => 'json',
        'permission'=>'json',
        'setting'=>'json',
    ];

    public function getImportanceAttribute($value)
    {
        return $this->ImportanceOptions[$value];
    }
    public function setImportanceAttribute($value)
    {
        if ($value>0&&$value<6) {
            return $value;
        }
        switch ($value) {
          case "Insignificant":
            return 1;
          break;
          case "unimportant":
            return 2;
          break;
          case "Normal":
            return 3;
          break;
          case "Important":
            return 4;
          break;
          case "Fatal":
            return 5;
          break;
          default:
            return 3;
          }
    }
}
