<?php

declare(strict_types=1);

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CustomerUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => [
                'required',
                Rule::unique('customers')->ignore($this->route('customer')),
            ],
            'phone_numbers.*' => 'sometimes|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:15'
        ];
    }

    public function messages(): array
    {
        return [
            'phone_numbers.*.regex' => 'The phone number is invalid',
            'phone_numbers.*.min' => 'The phone number must be at least 10 characters',
            'phone_numbers.*.max' => 'The phone number must not be greater than 15 characters',
        ];
    }
}
