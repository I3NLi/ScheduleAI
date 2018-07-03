<?php


use Illuminate\Database\Seeder;
use App\User;


class UsersTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'attribute'=>[],
            'contact'=>[
              'default'=>[
                'user_id'=>"5b31826d6da03b00371db797",
                'status'=>"normal",//blacklist 黑名单
                'charroom_id'=>null,
                'tags'=>[],
              ],
            ],
        ]);
    }

}
