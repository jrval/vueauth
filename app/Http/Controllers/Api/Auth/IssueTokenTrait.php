<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Client;

trait IssueTokenTrait
{

    public function issueToken(Request $request, $grantType, $scope = "*")
    {

        $params = [
            'grant_type' => $grantType,
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->email,
            'scope' => $scope
        ];

        return $request->request->add($params);

    }

}
