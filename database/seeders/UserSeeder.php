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
        //admin user
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'abc',
            'email' => 'admin@abc.com',
            'email_verified_at' => now(),
            'is_admin' => 1,
            'password' => Hash::make(config('auth.default_password')), // secret
        ]);

        //non admin user
        User::factory()->create([
            'first_name' => 'user',
            'last_name' => 'abc',
            'email' => 'user@abc.com',
            'email_verified_at' => now(),
            'is_admin' => 0,
            'password' => Hash::make(config('auth.default_password')), // secret
        ]);

        User::factory()
            ->count(100)
            ->create([
                'is_admin' => false
            ]);
    }
}
