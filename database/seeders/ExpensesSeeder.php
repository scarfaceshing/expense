<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expenses;

class ExpensesSeeder extends Seeder
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
                'cat_id' => '1',
                'amount' => mt_rand(0, 100),
                'date_entry' => now(),
            ],
            [
                'cat_id' => '1',
                'amount' => mt_rand(0, 100),
                'date_entry' => now(),
            ],
            [
                'cat_id' => '2',
                'amount' => mt_rand(0, 100),
                'date_entry' => now(),
            ],
            [
                'cat_id' => '3',
                'amount' => mt_rand(0, 100),
                'date_entry' => now(),
            ],
            [
                'cat_id' => '2',
                'amount' => mt_rand(0, 100),
                'date_entry' => now(),
            ],
        ];

        foreach ($data as $value) {
            Expenses::create($value);
        }
    }
}
