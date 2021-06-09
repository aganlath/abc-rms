<?php

declare(strict_types=1);

namespace App\Http\Requests\Login;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|exists:users,email',
            'password' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email address is required',
            'email.exists' => 'Email address or password is invalid',
            'password.required' => 'Password is required'
        ];
    }

    public function withValidator($validator)
    {
        $user = (new User)->fetchUserByEmail($this->input('email'));

        if (! $user) {
            return;
        }

        $validator->after(function ($validator) use ($user) {
            if (! $user->isAdmin()) {
                $validator->errors()->add('email', 'You are not authorized to access the system');
            }
        });
    }
}
