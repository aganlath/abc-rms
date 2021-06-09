<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_is_required_to_login(): void
    {
        $response = $this->postJson(route('api.login', ['email' => '', 'password' => 'secret']))
            ->assertStatus(422);

        $this->assertEquals('Email address is required', $response['errors']['email'][0]);
    }

    public function test_password_is_required_to_login(): void
    {
        User::factory()->create([
            'email' => 'ashani@abc.com',
        ]);

        $response = $this->postJson(route('api.login', ['email' => 'ashani@abc.com', 'password' => '']))
            ->assertStatus(422);

        $this->assertEquals('Password is required', $response['errors']['password'][0]);
    }

    public function test_email_should_be_registered_to_login(): void
    {
        $response = $this->postJson(route('api.login', ['email' => 'ashani@abc.com', 'password' => 'secret']))
            ->assertStatus(422);

        $this->assertEquals('Email address or password is invalid', $response['errors']['email'][0]);
    }

    public function test_only_admin_can_login(): void
    {
        $user = User::factory()->create([
            'email' => 'user@abc.com',
        ]);

        $response = $this->postJson(route('api.login', ['email' => $user->email, 'password' => 'secret']))
            ->assertStatus(422);

        $this->assertEquals('You are not authorized to access the system', $response['errors']['email'][0]);
    }

    public function test_cannot_login_with_invalid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'user@abc.com',
            'password' => Hash::make('secret'),
            'is_admin' => true,
        ]);

        $response = $this->postJson(route('api.login', ['email' => $user->email, 'password' => 'test']))
            ->assertStatus(422);

        $this->assertEquals('Invalid credentials', $response['invalid_credentials']);
    }

    public function test_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'user@abc.com',
            'password' => Hash::make('secret'),
            'is_admin' => true,
        ]);

        $response = $this->postJson(route('api.login', ['email' => $user->email, 'password' => 'secret']))
            ->assertStatus(201);

        $this->assertEquals($user->first_name, $response['user']['first_name']);
        $this->assertEquals($user->last_name, $response['user']['last_name']);
        $this->assertEquals($user->email, $response['user']['email']);

        $this->assertArrayHasKey('api_token', $response);
    }
}
