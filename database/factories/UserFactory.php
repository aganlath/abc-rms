<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'is_admin' => 0,
            'password' => config('auth.default_password'), // password
            'remember_token' => Str::random(10),
        ];
    }

    public function admin(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'is_admin' => 1,
            ];
        });
    }

    public function configure(): UserFactory
    {
        return $this->afterCreating(function (User $user) {
            PhoneNumber::factory()->count(2)->create([
                'resource_id' => $user->id,
                'resource_type' => User::MORPH_MAP_ALIAS,
            ]);
        });
    }
}
