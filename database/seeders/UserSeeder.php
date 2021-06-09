<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        //save admin user
        User::factory()->create([
            'first_name' => 'Ashani',
            'last_name' => 'Ganlath',
            'email' => 'ashani@abc.com',
            'email_verified_at' => now(),
            'is_admin' => 1,
            'password' => Hash::make(config('auth.default_password')), // password
        ]);

        User::factory()
            ->count(100)
            ->create([
                'is_admin' => false
            ]);
    }
}
