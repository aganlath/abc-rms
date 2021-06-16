<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_fetch_customers(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        Customer::factory()->count(10)->create();

        $response = $this->getJson(route('api.customers.index'))
            ->assertStatus(200);

        $this->assertCount(10, $response['data']);
    }

    public function test_can_paginate_customer_data(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        Customer::factory()->count(15)->create();

        $page1Response = $this->getJson(route('api.customers.index') . '?page=1&limit=10')
            ->assertStatus(200);

        $this->assertCount(10, $page1Response['data']);
        $this->assertEquals(1, $page1Response['meta']['current_page']);

        $page2Response = $this->getJson(route('api.customers.index') . '?page=2&limit=10')
            ->assertStatus(200);

        $this->assertCount(5, $page2Response['data']);
        $this->assertEquals(2, $page2Response['meta']['current_page']);
    }

    public function test_can_search_customers(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $phoneNumber = PhoneNumber::factory()->create([
            'phone_number' => '0779834535'
        ]);

        $customer = Customer::factory()->create([
            'first_name' => 'Test First Name',
            'last_name' => 'Peter',
            'email' => 'test@abc.com'
        ]);
        $customer->phoneNumbers()->save($phoneNumber);

        Customer::factory()->create([
            'first_name' => 'James',
            'last_name' => 'John', 'email' =>
                'james@example.com'
        ]);
        Customer::factory()->create([
            'first_name' => 'Ashani',
            'last_name' => 'Ganlath',
            'email' => 'hilari@abc.com'
        ]);
        Customer::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'Live',
            'email' => 'first@example.com'
        ]);

        $search1 = $this->getJson(route('api.customers.index') . '?search=first')
            ->assertStatus(200);

        $this->assertCount(2, $search1['data']);

        $search2 = $this->getJson(route('api.customers.index') . '?search=john')
            ->assertStatus(200);

        $this->assertCount(1, $search2['data']);

        $search3 = $this->getJson(route('api.customers.index') . '?search=abc')
            ->assertStatus(200);

        $this->assertCount(2, $search3['data']);

        $search4 = $this->getJson(route('api.customers.index') . '?search=0779834535')
            ->assertStatus(200);

        $this->assertCount(1, $search4['data']);
    }

    public function test_can_store_customer(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $data = [
            'first_name' => 'Test client',
            'last_name' => 'Peter',
            'email' => 'test@example.com',
        ];

        $relation = ['phone_numbers' => ['0774952178', '0232341424']];

        $customer = $this->postJson(route('api.customers.store', array_merge($data, $relation)));

        $this->assertDatabaseHas('customers', $data);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '0774952178', 'resource_id' => $customer['data']['id'], 'resource_type' => 'customer']);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '0232341424', 'resource_id' => $customer['data']['id'], 'resource_type' => 'customer']);
    }

    public function test_validation_fails_when_data_not_provided(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $response = $this->postJson(route('api.customers.store', []))
            ->assertStatus(422);

        $this->assertEquals('The given data was invalid.', $response['message']);
        $this->assertEquals('The first name field is required.', $response['errors']['first_name'][0]);
        $this->assertEquals('The last name field is required.', $response['errors']['last_name'][0]);
        $this->assertEquals('The email field is required.', $response['errors']['email'][0]);
    }

    public function test_validation_fails_when_email_is_already_registered(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $customer = Customer::factory()->create(['email' => 'user@test.com']);

        $response = $this->postJson(route('api.customers.store', [
                'first_name' => 'Test client',
                'last_name' => 'Peter',
                'email' => $customer->email,
            ]))
            ->assertStatus(422);

        $this->assertEquals('The given data was invalid.', $response['message']);
        $this->assertEquals('The email has already been taken.', $response['errors']['email'][0]);
    }

    public function test_validation_fails_when_email_is_not_valid(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $response = $this->postJson(route('api.customers.store', [
                'first_name' => 'Test client',
                'last_name' => 'Peter',
                'email' => 'test',
            ]))
            ->assertStatus(422);

        $this->assertEquals('The given data was invalid.', $response['message']);
        $this->assertEquals('The email must be a valid email address.', $response['errors']['email'][0]);
    }

    public function test_validation_fails_when_phone_numbers_are_not_valid(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $response = $this->postJson(route('api.customers.store', [
                'first_name' => 'Test client',
                'last_name' => 'Peter',
                'email' => 'test@test.com',
                'phone_numbers' => ['qwfsfs', '12321435346456456553422']
            ]))
            ->assertStatus(422);

        $this->assertEquals('The given data was invalid.', $response['message']);
        $this->assertEquals('The phone number is invalid', $response['errors']['phone_numbers.0'][0]);
        $this->assertEquals('The phone number must be at least 10 characters', $response['errors']['phone_numbers.0'][1]);
        $this->assertEquals('The phone number must not be greater than 15 characters', $response['errors']['phone_numbers.1'][0]);
    }

    public function test_can_update_customer(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $customer = Customer::factory()->create();
        $phoneNumber = PhoneNumber::factory()->create();
        $customer->phoneNumbers()->save($phoneNumber);

        $data = [
            'first_name' => 'Test',
            'last_name' => 'Customer',
            'email' => $customer->email,
        ];

        $relation = ['phone_numbers' => ['0774952178']];

        $this->putJson(route('api.customers.update', ['customer' => $customer->id ]), array_merge($data, $relation))
            ->assertStatus(200);

        $this->assertDatabaseHas('customers', $data);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '0774952178', 'resource_id' => $customer->id, 'resource_type' => 'customer']);
        $this->assertDatabaseMissing('phone_numbers', ['phone_number' => $phoneNumber->phone_number, 'resource_id' => $customer->id, 'resource_type' => 'customer']);
    }

    public function test_can_delete_customer(): void
    {
        $adminUser = User::factory()->admin()->create();
        Sanctum::actingAs($adminUser);

        $customer = Customer::factory()->create();

        $this->deleteJson(route('api.customers.update', ['customer' => $customer->id ]))
            ->assertStatus(204);

        $this->assertDatabaseMissing('customers', ['first_name' => $customer->first_name, 'last_name' => $customer->last_name, 'email' => $customer->email]);
    }
}
