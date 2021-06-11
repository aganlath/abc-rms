<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::name('api.')
    ->namespace('Api')
    ->group(function () {
        Route::post('login', 'LoginController')->name('login');

        Route::middleware('auth:sanctum')->group(function () {
            Route::apiResource('customers', 'CustomerController')->except('show');
            Route::apiResource('users', 'UserController')->only('index');
            Route::post('users/upload_csv', 'UserController@upload_csv')->name('users.upload_csv');
        });
    });

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
