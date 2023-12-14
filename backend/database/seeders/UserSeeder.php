<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedAdmin();
        User::factory(10)->create();
    }

    private function seedAdmin()
    {
        $adminData = [
            'first_name' => 'Admin',
            'last_name' => 'Sudo',
            'nickname' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin'),
        ];

        if(is_null(DB::table('users')->where('email', $adminData['email'])->first())){
            DB::table('users')->insert($adminData);
        }
    }
}
