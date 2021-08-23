<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $data = [
            0 => [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'role' => 'Administrator',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ],
            1 => [
                'name' => 'user',
                'email' => 'user@gmail.com',
                'role' => 'User',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ],
        ];

        foreach ($data as $value) {
            User::create($value);
        }
    }
}
