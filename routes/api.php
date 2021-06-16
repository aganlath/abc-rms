<?php

use Illuminate\Support\Facades\Route;

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
