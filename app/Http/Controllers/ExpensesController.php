<?php

namespace App\Http\Controllers;

use App\Models\Expenses;
use Illuminate\Http\Request;

class ExpensesController extends Controller
{
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
        //

        if (
            auth()->user()->role === 'Administrator' ||
            auth()->user()->role === 'User'
        ) {
            return response()->json(Expenses::all());
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

        if (
            auth()->user()->role === 'Administrator' ||
            auth()->user()->role === 'User'
        ) {
            $expenseCat = new Expenses();
            $expenseCat->expenses_category = $request->expenses_category;
            $expenseCat->amount = $request->amount;
            $expenseCat->date_entry = $request->date_entry;
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
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function show(Expenses $expenses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function edit(Expenses $expenses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //

        if (
            auth()->user()->role === 'Administrator' ||
            auth()->user()->role === 'User'
        ) {
            $expenseCat = Expenses::findOrFail($id);
            $expenseCat->expenses_category = $request->expenses_category;
            $expenseCat->amount = $request->amount;
            $expenseCat->date_entry = $request->date_entry;
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
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if (
            auth()->user()->role === 'Administrator' ||
            auth()->user()->role === 'User'
        ) {
            if (Expenses::findOrFail($id)->delete()) {
                return response()->json(['Status' => 'Success']);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
    }
}
