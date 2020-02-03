<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function authenticatedUser(){


        return response()->json(['permissions'=> Auth::user()->allPermissions,
            'roles'=>Auth::user()->getRoleNames()
            ]);


    }

    public function login(Request $request)
    {

        $validatedData = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);



        $http = new \GuzzleHttp\Client;

        try {

            $response = $http->post(config('services.passport.login_endpoint'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username' => $request->email,
                    'password' => $request->password,
                ]
            ]);

            $token = $response->getBody();
            $data = json_decode($token, true);
            $user = User::where('email', $request->email)->first();
            $data = collect($data);
            $data->put('user', $user);

            return response()->json($data);
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {

            if ($e->getCode() == 401) {
                return response()->json('Invalid Request. Please enter a username or a password.', $e->getCode());
            } else if ($e->getCode() == 400) {
                return response()->json('Your credentials are incorrect. Please try again', $e->getCode());
            }

            return response()->json('Something went wrong on the server.', $e->getCode());
        }

    }

    public function register(Request $request){
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        return User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password,
        ]);
    }

    public function logout(){

        $user = Auth::user()->token();
        $user->revoke();

        return response()->json('Logged out successfully',200);
    }
}
