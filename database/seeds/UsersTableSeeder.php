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
            'name' => 'Boning Li',
            'email' => '344270545@qq.com',
            'password' => bcrypt('6038895'),
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);
    }

}
