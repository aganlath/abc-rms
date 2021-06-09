<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Login\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $loginRequest)
    {
        $user = (new User)->fetchUserByEmail($loginRequest->email);

        if (!$user || !Hash::check($loginRequest->password, $user->password)) {
            return response(['invalid_credentials' => 'Invalid credentials'], 422);
        }

        $token = $user->createToken('abc-rms')->plainTextToken;

        $response = [
            'user' => $user,
            'api_token' => $token
        ];

        return response($response, 201);
    }
}
