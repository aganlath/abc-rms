<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Customer;
use App\Models\PhoneNumber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_search_customers(): void
    {
        $phoneNumber1 = PhoneNumber::factory()->create([
            'phone_number' => '0775693432'
        ]);

        $phoneNumber2 = PhoneNumber::factory()->create([
            'phone_number' => '345364646'
        ]);

        $customer1 = Customer::factory()->create([
            'first_name' => 'Test First Name',
            'last_name' => 'Peter',
            'email' => 'test@abc.com'
        ]);
        $customer1->phoneNumbers()->save($phoneNumber1);

        $customer2 = Customer::factory()->create([
            'first_name' => 'James',
            'last_name' => 'John',
            'email' => 'james@example.com'
        ]);
        $customer2->phoneNumbers()->save($phoneNumber2);

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

        $this->assertCount(2, Customer::query()->search('first')->get());
        $this->assertCount(1, Customer::query()->search('john')->get());
        $this->assertCount(1, Customer::query()->search('hilari')->get());
        $this->assertCount(1, Customer::query()->search('0775693432')->get());
        $this->assertCount(4, Customer::query()->search()->get());
    }
}
