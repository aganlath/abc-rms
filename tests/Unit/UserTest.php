<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_search_users(): void
    {
        $phoneNumber1 = PhoneNumber::factory()->create([
            'phone_number' => '04435353656575'
        ]);

        $phoneNumber2 = PhoneNumber::factory()->create([
            'phone_number' => '34536464645645'
        ]);

        $phoneNumber3 = PhoneNumber::factory()->create([
            'phone_number' => '0443534646755'
        ]);

        $user1 = User::factory()->create([
            'first_name' => 'Peter',
            'last_name' => 'John',
            'email' => 'peter@abc.com'
        ]);
        $user1->phoneNumbers()->saveMany([$phoneNumber1, $phoneNumber2]);

        $user2 = User::factory()->create([
            'first_name' => 'Lesley',
            'last_name' => 'Matthew',
            'email' => 'lesley@example.com'
        ]);
        $user2->phoneNumbers()->save($phoneNumber3);

        User::factory()->create([
            'first_name' => 'Matthew',
            'last_name' => 'Ganlath',
            'email' => 'ashani@abc.com'
        ]);

        $this->assertCount(1, User::query()->search('peter')->get());
        $this->assertCount(2, User::query()->search('matthew')->get());
        $this->assertCount(2, User::query()->search('abc')->get());
        $this->assertCount(2, User::query()->search('04435')->get());
        $this->assertCount(1, User::query()->search('5645')->get());
        $this->assertCount(3, User::query()->search()->get());
    }

    public function test_can_return_users_without_logged_in_user(): void
    {
        $adminUser = User::factory()->admin()->create();
        Auth::login($adminUser);

        User::factory()->count(10)->create();

        $users = User::query()->withoutLoggedInUser()->get();

        $this->assertCount(10, $users);
        $this->assertNotContains($adminUser, $users);
    }
}
