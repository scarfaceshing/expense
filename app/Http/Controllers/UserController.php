<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function index()
    {
        if (auth()->user()->role === 'Administrator') {
            return response()->json(User::all());
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function store(Request $request)
    {
        if (auth()->user()->role === 'Administrator') {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt('1234');
            $user->role = $request->role;
            $user->save();

            if ($user) {
                return response()->json(['Status' => 'Success']);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function update(Request $request, User $user)
    {
        if (auth()->user()->role === 'Administrator') {
            $user = User::findOrFail($user->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt('1234');
            $user->role = $request->role;
            $user->save();

            if ($user) {
                return response()->json(['Status' => 'Success']);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function destroy(User $user)
    {
        if (auth()->user()->role === 'Administrator') {
            if (User::findOrFail($user->id)->delete()) {
                return response()->json(['Status' => 'Success']);
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
    }
}
