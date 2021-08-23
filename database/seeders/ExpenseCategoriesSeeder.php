<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExpenseCategories;

class ExpenseCategoriesSeeder extends Seeder
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
            [
                'name' => 'Travel',
                'description' => 'Anywhere in the philippines',
            ],
            [
                'name' => 'Skydiving',
                'description' => 'Mars',
            ],
            [
                'name' => 'Food',
                'description' => 'For 20 people',
            ],
        ];

        foreach ($data as $value) {
            ExpenseCategories::create($value);
        }
    }
}
