<?php

use Illuminate\Database\Seeder;
use App\ThingsTemplate;


class ThingsTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
     $this->blankTemplate();
    }

    private function blankTemplate(){
      $query=
      [
        //"_id"
        "title"=>"_blank",
        "img"=>"#",
        "data"=>
        [//根据id远程读入，模板的信息
          "Attribute"=>[
            "title"=>"undefined",
            // "fatherId":this.data.id,
            "time"=>[
              "type"=>'once',
              "data"=>[
                "startCondition"=>'immediately',
                // "startTime":new Date(),
                "workTimeType"=>"inherit",
                "workTime"=>0,
                "CompleteTime"=>"",

              ],
            ],
            "workTimeCost"=>0,
            "planTimeCost"=>0,
            "importance"=>"2",
            "tags"=>[],
          ],
          "Mission"=>[
            [
              "type"=>"m_text",
              "content"=>"<p>点击此处修改任务描述</p>",
            ],
          ],
          "Permissions"=>[
            "owner"=>[],
            "role"=>[
              /*
              title:[
                default：
                  admin 拥有所有权限
                  reserve 后备-邀请
                ],
              permissions:[
              ]
              */
            ],
            "permissionsList"=>[],
          ],
          "Database"=>[],
          "Contact"=>[],
          "Collapse"=>[
            "Attribute",
            "Mission",
            "Permissions",
            "Contact",
          ],//记录折叠,废弃
          "topics"=>[

          ],
          "Modules"=>[
            "Attribute",
            "Mission",
            "Permissions",
            // "Contact", 废弃
            // "topics",
            // "depend",
            // "analysis",
            // "setting",
          ],//记录启用的模块
        ]
      ];
        ThingsTemplate::create($query);
    }
}
