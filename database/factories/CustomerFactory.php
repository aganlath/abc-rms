<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Customer;
use App\Models\PhoneNumber;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
        ];
    }

    public function configure(): CustomerFactory
    {
        return $this->afterCreating(function (Customer $customer) {
            PhoneNumber::factory()->count(2)->create([
                'resource_id' => $customer->id,
                'resource_type' => Customer::MORPH_MAP_ALIAS,
            ]);
        });
    }
}
