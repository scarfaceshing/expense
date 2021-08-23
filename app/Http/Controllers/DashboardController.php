<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expenses;
use DB;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $expenses = Expenses::with('expenseCatRelation')
            ->select('cat_id', DB::raw('sum(amount) as total'))
            ->groupBy('cat_id')
            ->get();

        return response()->json($expenses);
    }
}
