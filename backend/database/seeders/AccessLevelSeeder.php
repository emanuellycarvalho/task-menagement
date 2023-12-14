<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AccessLevel;

class AccessLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accessLevels = [
            ['name' => 'Administrator'],
            ['name' => 'Supervisor'],
            ['name' => 'User'],
        ];

        AccessLevel::insert($accessLevels);
    }
}
