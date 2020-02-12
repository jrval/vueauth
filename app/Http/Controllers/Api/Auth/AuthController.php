<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use IssueTokenTrait;

    public function login(Request $request)
    {

        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $this->issueToken($request, 'password');

        $proxy = Request::create(config('services.passport.login_endpoint'), 'POST');
        return Route::dispatch($proxy);
    }

    public function refresh(Request $request)
    {
        $this->validate($request, [
            'refresh_token' => 'required'
        ]);

        return $this->issueToken($request, 'refresh_token');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
    }

    public function logout()
    {

        $user = Auth::user()->token();
        $user->revoke();

        return response()->json('Logged out successfully', 200);
    }
}
