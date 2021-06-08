<?php

declare(strict_types=1);

namespace Tests\Command;

use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UploadUsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_exception_for_invalid_csv(): void
    {
        $this->expectException(\Exception::class);

        $this->artisan('admin:upload-users', ['path_to_csv' => getcwd().'/tests/Command/Files/invalid_users.csv']);
    }

    public function test_it_adds_new_users(): void
    {
        $this->artisan('admin:upload-users', ['path_to_csv' => getcwd().'/tests/Command/Files/users.csv']);

        $this->assertDatabaseHas('users', ['first_name' => 'Rubie', 'last_name' => 'Block', 'email' => 'clemmie.buckridge@example.net', 'is_admin' => 1]);
        $this->assertDatabaseHas('users', ['first_name' => 'Jessika', 'last_name' => 'Klein', 'email' => 'trace18@example.org', 'is_admin' => 0]);
        $this->assertDatabaseHas('users', ['first_name' => 'Roscoe', 'last_name' => 'Heathcote', 'email' => 'legros.hallie@example.com', 'is_admin' => 0]);

        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '(515) 555-8244', 'resource_type' => User::MORPH_MAP_ALIAS]);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '12482548088', 'resource_type' => User::MORPH_MAP_ALIAS]);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '(785) 296-0783', 'resource_type' => User::MORPH_MAP_ALIAS]);
    }

    public function test_it_updates_existing_users_when_id_is_provided(): void
    {
        $user = User::factory()->create([
            'id' => 1000
        ]);

        $this->artisan('admin:upload-users', ['path_to_csv' => getcwd().'/tests/Command/Files/users_with_ids.csv']);

        $updatedUser = User::find(1000);

        $this->assertEquals('Rubie', $updatedUser->first_name);
        $this->assertEquals('Block', $updatedUser->last_name);
        $this->assertEquals($user->email, $updatedUser->email);
        $this->assertEquals(0, $updatedUser->is_admin);
    }

    /*
     * assumes email is the unique identifier
     */
    public function test_it_updates_existing_users_when_id_is_not_provided(): void
    {
        $phoneNumber1 = PhoneNumber::factory()->create([
            'phone_number' => '12482548088'
        ]);
        $phoneNumber2 = PhoneNumber::factory()->create();

        $user = User::factory()->create([
            'email' => 'clemmie@example.net',
        ]);
        $user->phoneNumbers()->saveMany([$phoneNumber1, $phoneNumber2]);

        $this->artisan('admin:upload-users', ['path_to_csv' => getcwd().'/tests/Command/Files/update_users.csv']);

        $updatedUser = User::find($user->id);
        $updateUserPhoneNumbers = $updatedUser->phoneNumbers()->pluck('phone_number');

        $this->assertEquals('Rubie', $updatedUser->first_name);
        $this->assertEquals('Block', $updatedUser->last_name);
        $this->assertEquals(0, $updatedUser->is_admin);

        $this->assertContains('12482548088', $updateUserPhoneNumbers);
        $this->assertContains('(785) 296-0783', $updateUserPhoneNumbers);
        $this->assertNotContains($phoneNumber2->phone_number, $updateUserPhoneNumbers);
    }
}
