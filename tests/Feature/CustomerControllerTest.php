<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\PhoneNumber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_fetch_customers(): void
    {
        $adminUser = User::factory()->admin()->create();

        Customer::factory()->count(10)->create();

        $response = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index'))
            ->assertStatus(200);

        $this->assertCount(10, $response['data']);
    }

    public function test_can_paginate_customer_data(): void
    {
        $adminUser = User::factory()->admin()->create();

        Customer::factory()->count(15)->create();

        $page1Response = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index') . '?page=1&limit=10')
            ->assertStatus(200);

        $this->assertCount(10, $page1Response['data']);
        $this->assertEquals(1, $page1Response['meta']['current_page']);

        $page2Response = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index') . '?page=2&limit=10')
            ->assertStatus(200);

        $this->assertCount(5, $page2Response['data']);
        $this->assertEquals(2, $page2Response['meta']['current_page']);
    }

    public function test_can_search_customers(): void
    {
        $adminUser = User::factory()->admin()->create();

        $customer = Customer::factory()->create(['first_name' => 'Test First Name',  'last_name' => 'Peter', 'email' => 'test@abc.com']);
        $customer->phoneNumbers()->save(PhoneNumber::factory()->create(['phone_number' => '0779834535']));

        Customer::factory()->create(['first_name' => 'James', 'last_name' => 'John', 'email' => 'james@example.com']);
        Customer::factory()->create(['first_name' => 'Ashani', 'last_name' => 'Ganlath', 'email' => 'hilari@abc.com']);
        Customer::factory()->create(['first_name' => 'Test', 'last_name' => 'Live', 'email' => 'first@example.com']);

        $search1 = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index') . '?search=first')
            ->assertStatus(200);

        $this->assertCount(2, $search1['data']);

        $search2 = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index') . '?search=john')
            ->assertStatus(200);

        $this->assertCount(1, $search2['data']);

        $search3 = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index') . '?search=abc')
            ->assertStatus(200);

        $this->assertCount(2, $search3['data']);

        $search4 = $this->actingAs($adminUser)
            ->getJson(route('api.customers.index') . '?search=0779834535')
            ->assertStatus(200);

        $this->assertCount(1, $search4['data']);
    }

    public function test_can_store_customer(): void
    {
        $adminUser = User::factory()->admin()->create();

        $data = [
            'first_name' => 'Test client',
            'last_name' => 'Peter',
            'email' => 'test@example.com',
        ];

        $relation = ['phone_numbers' => ['0774952178', '0232341424']];

        $customer = $this->actingAs($adminUser)
            ->postJson(route('api.customers.store', array_merge($data, $relation)));

        $this->assertDatabaseHas('customers', $data);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '0774952178', 'resource_id' => $customer['data']['id'], 'resource_type' => Customer::class]);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '0232341424', 'resource_id' => $customer['data']['id'], 'resource_type' => Customer::class]);
    }

    public function test_can_update_customer(): void
    {
        $adminUser = User::factory()->admin()->create();

        $customer = Customer::factory()->create();

        $data = [
            'first_name' => 'Test',
            'last_name' => 'Customer',
            'email' => 'customer@example.com',
        ];

        $relation = ['phone_numbers' => ['0774952178']];

        $this->actingAs($adminUser)
            ->putJson(route('api.customers.update', ['customer' => $customer->id ]), array_merge($data, $relation))
            ->assertStatus(200);

        $this->assertDatabaseHas('customers', $data);
        $this->assertDatabaseHas('phone_numbers', ['phone_number' => '0774952178', 'resource_id' => $customer->id, 'resource_type' => Customer::class]);
    }

    public function test_can_delete_customer(): void
    {
        $adminUser = User::factory()->admin()->create();

        $customer = Customer::factory()->create();

        $this->actingAs($adminUser)
            ->deleteJson(route('api.customers.update', ['customer' => $customer->id ]))
            ->assertStatus(204);

        $this->assertDatabaseMissing('customers', ['first_name' => $customer->first_name, 'last_name' => $customer->last_name, 'email' => $customer->email]);
    }
}
