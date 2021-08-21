<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ChangePasswordController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function changepass(Request $request, $id)
    {
        if (auth()->user()->role === 'User') {
            $user = User::findOrFail($id);
            $user->password = bcrypt($request->newpassword);
            $user->save();

            if ($user) {
                return response()->json(['Status' => 'Success']);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function validatepass(Request $request, $id)
    {
        if (auth()->user()->role === 'User') {
            $user = User::findOrFail($id);

            $credentials = [
                'name' => $request->name,
                'password' => $request->oldpassword,
            ];

            if (!auth()->attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            return response()->json(['status' => 'success']);
        }
    }
}
