<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_fetch_users(): void
    {
        $adminUser = User::factory()->admin()->create();

        User::factory()->count(5)->create();

        $response = $this->actingAs($adminUser)
            ->getJson(route('api.users.index'))
            ->assertStatus(200);

        $this->assertCount(5, $response['data']);
    }

    public function test_can_paginate_user_data(): void
    {
        $adminUser = User::factory()->admin()->create();

        User::factory()->count(60)->create();

        $page1Response = $this->actingAs($adminUser)
            ->getJson(route('api.users.index') . '?page=1&limit=10')
            ->assertStatus(200);

        $this->assertCount(10, $page1Response['data']);
        $this->assertEquals(1, $page1Response['meta']['current_page']);

        $page2Response = $this->actingAs($adminUser)
            ->getJson(route('api.users.index') . '?page=3&limit=5')
            ->assertStatus(200);

        $this->assertCount(5, $page2Response['data']);
        $this->assertEquals(3, $page2Response['meta']['current_page']);
    }

    public function test_can_search_users(): void
    {
        $adminUser = User::factory()->admin()->create(['first_name' => 'Ashani']);

        $phoneNumber1 = PhoneNumber::factory()->create([
            'phone_number' => '0779834535'
        ]);

        $phoneNumber2 = PhoneNumber::factory()->create([
            'phone_number' => '06768788686'
        ]);

        $user1 = User::factory()->create([
            'first_name' => 'Test First Name',
            'last_name' => 'Peter',
            'email' => 'test@abc.com'
        ]);
        $user1->phoneNumbers()->save($phoneNumber1);

        $user2 = User::factory()->create([
            'first_name' => 'ABC',
            'last_name' => 'John',
            'email' => 'james@example.com'
        ]);
        $user2->phoneNumbers()->save($phoneNumber2);

        User::factory()->create([
            'first_name' => 'Peter',
            'last_name' => 'Ashani',
            'email' => 'hilari@abc.com'
        ]);
        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Live',
            'email' => 'first@example.com'
        ]);

        $search1 = $this->actingAs($adminUser)
            ->getJson(route('api.users.index') . '?search=first')
            ->assertStatus(200);

        $this->assertCount(2, $search1['data']);

        $search2 = $this->actingAs($adminUser)
            ->getJson(route('api.users.index') . '?search=ashani')
            ->assertStatus(200);

        $this->assertCount(1, $search2['data']);

        $search3 = $this->actingAs($adminUser)
            ->getJson(route('api.users.index') . '?search=abc')
            ->assertStatus(200);

        $this->assertCount(3, $search3['data']);

        $search4 = $this->actingAs($adminUser)
            ->getJson(route('api.users.index') . '?search=0779834535')
            ->assertStatus(200);

        $this->assertCount(1, $search4['data']);
    }

    public function test_can_upload_users_via_csv(): void
    {
        Storage::fake();

        $adminUser = User::factory()->admin()->create(['first_name' => 'Ashani']);

        Artisan::shouldReceive('call')
            ->with('admin:upload-users', ['path_to_csv' => 'csv_uploads/users.csv']);

        $this->actingAs($adminUser)
            ->postJson(route('api.users.upload_csv'), [
                'csv_file' => UploadedFile::fake()->create('users.csv', 300,  'text/csv')
            ])
            ->assertStatus(200);
    }
}
