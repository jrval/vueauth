<?php

use Illuminate\Http\Request;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('login', 'Api\Auth\AuthController@login')->name('login');


Route::middleware('auth:api')->group(function () {

    Route::post('logout', 'Api\Auth\AuthController@logout')->name('logout');

    Route::post('register', 'Api\Auth\AuthController@register')->name('register');

    Route::get('auth-user','Api\Auth\AuthController@authenticatedUser')->name('auth-user');

    Route::resource('users', 'Api\UserController');

    Route::resource('permissions', 'Api\PermissionController');

    Route::resource('roles', 'Api\RoleController');


});

