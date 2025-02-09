<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\EventSeeder;
use Illuminate\Support\Facades\App;
use Database\Seeders\Permissions\PermissionSeeder;
use Database\Seeders\Permissions\CrudPermissionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(self::seeders());
    }

    public static function seeders()
    {
        $seeders = [
            PermissionSeeder::class,
            CrudPermissionSeeder::class,
            UserSeeder::class,
            EventSeeder::class,
        ];
        if (! App::environment('prod') && ! App::environment('preprod')) {
            $seeders = array_merge($seeders, []);
        }

        return $seeders;
    }
}
