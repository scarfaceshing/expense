<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roles;

class RolesSeeder extends Seeder
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
                'name' => 'Admin',
                'description' => 'can add expenses',
            ],
            1 => [
                'name' => 'User',
                'description' => 'super user',
            ],
        ];

        foreach ($data as $value) {
            Roles::create($value);
        }
    }
}
