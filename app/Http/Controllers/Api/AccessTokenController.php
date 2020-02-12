<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Laravel\Passport\Exceptions\OAuthServerException;
use Psr\Http\Message\ServerRequestInterface;
use \Laravel\Passport\Http\Controllers\AccessTokenController as ATC;
use Exception;

class AccessTokenController extends ATC
{
    public function issueToken(ServerRequestInterface $request)
    {
        try {
            //get username (default is :email)
            $response = $request->getParsedBody();

            //get user
            //change to 'email' if you want
            $user = new UserResource(User::where('email', $response['email'])->first());

            //generate token
            $tokenResponse = parent::issueToken($request);
            //convert response to json string
            $content = $tokenResponse->getContent();
            //convert json to array
            $data = json_decode($content, true);

            if (isset($data["error"]))
                throw new OAuthServerException('The user credentials were incorrect.', 6, 'invalid_credentials', 401);
            //add access token to user
            $data = collect($data);
            //get roles/
            $roles = $user->getRoleNames();
            //get permissions
            $permissions = $user->getPermissionsViaRoles()->pluck('name');
            $data->put('user', ['name' => $user->name, 'email' => $user->email]);
            $data->put('roles', $roles);
            $data->put('permissions', $permissions);

            return response()->json($data);
        }  catch (ModelNotFoundException $e) { // email notfound
            //return error message
            return response()->json('Invalid Request. Username/Email not found.', 401);
        }
        catch (OAuthServerException $e) { //password not correct..token not granted
            //return error message
            return response()->json('Your credentials are incorrect. Please try again', $e->statusCode());
        }
        catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

    }
}
