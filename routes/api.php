<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\ExpenseCategoriesController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'auth',
    ],
    function ($router) {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('me', [AuthController::class, 'me']);
    }
);

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'data',
    ],
    function () {
        Route::resource('user', UserController::class);
        Route::resource('role', RolesController::class);
        Route::resource(
            'expense-categories',
            ExpenseCategoriesController::class
        );
        Route::resource('expenses', ExpensesController::class);
        Route::patch('changepassword/{id}', [
            ChangePasswordController::class,
            'changepass',
        ]);
        Route::post('validatepass/{id}', [
            ChangePasswordController::class,
            'validatepass',
        ]);

        Route::get('dashboard', [DashboardController::class, 'index']);
    }
);
