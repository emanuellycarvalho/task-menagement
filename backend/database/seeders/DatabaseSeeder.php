<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Factories;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            OrganizationSeeder::class,
        ]);
    }
}
