<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Customer;
use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PhoneNumberFactory extends Factory
{
    protected $model = PhoneNumber::class;

    public function definition(): array
    {
        return [
            'phone_number' => $this->faker->e164PhoneNumber,
            'resource_id' => $this->faker->randomDigit(),
            'resource_type' => $this->faker->randomElement([User::class, Customer::class])
        ];
    }
}
