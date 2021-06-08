<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_search_customers(): void
    {
        Customer::factory()->create(['first_name' => 'Test First Name',  'last_name' => 'Peter', 'email' => 'test@abc.com']);
        Customer::factory()->create(['first_name' => 'James', 'last_name' => 'John', 'email' => 'james@example.com']);
        Customer::factory()->create(['first_name' => 'Ashani', 'last_name' => 'Ganlath', 'email' => 'hilari@abc.com']);
        Customer::factory()->create(['first_name' => 'Test', 'last_name' => 'Live', 'email' => 'first@example.com']);

        $this->assertCount(2, Customer::query()->search('first')->get());
        $this->assertCount(1, Customer::query()->search('john')->get());
        $this->assertCount(1, Customer::query()->search('hilari')->get());
    }
}
