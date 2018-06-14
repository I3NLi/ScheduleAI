<?php
use App\ThingsTemplate;
use Faker\Generator as Faker;

$factory->define(App\Thing::class, function (Faker $faker) {
    tmp=ThingsTemplate::firstOrFail()->data;
    tmp->Attribute->fatherId=$faker->fid;
    tmp->Attribute->time=$faker->time;
    tmp->Permissions->owner=$faker->owner;
    return tmp;
});
