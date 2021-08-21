<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategories;
use Illuminate\Http\Request;

class ExpenseCategoriesController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()->role === 'Administrator') {
            return response()->json(ExpenseCategories::all());
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if (auth()->user()->role === 'Administrator') {
            $expenseCat = new ExpenseCategories();
            $expenseCat->name = $request->name;
            $expenseCat->email = $request->email;
            $expenseCat->password = bcrypt('1234');
            $expenseCat->role = $request->role;
            $expenseCat->save();

            if ($expenseCat) {
                return response()->json(['Status' => 'Success']);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ExpenseCategories  $expenseCategories
     * @return \Illuminate\Http\Response
     */
    public function show(ExpenseCategories $expenseCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ExpenseCategories  $expenseCategories
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpenseCategories $expenseCategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ExpenseCategories  $expenseCategories
     * @return \Illuminate\Http\Response
     */
    public function update(
        Request $request,
        ExpenseCategories $expenseCategories
    ) {
        //

        if (auth()->user()->role === 'Administrator') {
            $expenseCat = ExpenseCategories::findOrFail($expenseCategories->id);
            $expenseCat->name = $request->name;
            $expenseCat->email = $request->email;
            $expenseCat->password = bcrypt('1234');
            $expenseCat->role = $request->role;
            $expenseCat->save();

            if ($expenseCat) {
                return response()->json(['Status' => 'Success']);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ExpenseCategories  $expenseCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpenseCategories $expenseCategories)
    {
        //
        if (ExpenseCategories::findOrFail($expenseCategories->id)->delete()) {
            return response()->json(['Status' => 'Success']);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
