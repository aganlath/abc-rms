<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerDeleteRequest;
use App\Http\Requests\Customer\CustomerIndexRequest;
use App\Http\Requests\Customer\CustomerStoreRequest;
use App\Http\Requests\Customer\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\PhoneNumber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CustomerController extends Controller
{
    public function index(CustomerIndexRequest $request): AnonymousResourceCollection
    {
        $customers = Customer::query()
            ->with(['phoneNumbers'])
            ->when($request->has('search'), function ($query) use ($request) {
                $query->search($request->search);
            })
            ->orderBy('first_name')
            ->paginate($request->get('limit', 10));

        return CustomerResource::collection($customers);
    }

    public function store(CustomerStoreRequest $request): CustomerResource
    {
        $customer = Customer::create($request->only(['first_name', 'last_name', 'email']));

        if ($request->filled('phone_numbers')) {
            $this->attachPhoneNumbers($customer, $request->get('phone_numbers'));
        }

        return new CustomerResource($customer);
    }

    public function update(CustomerUpdateRequest $request, Customer $customer): CustomerResource
    {
        $customer->update($request->only(['first_name', 'last_name', 'email']));

        if (! $request->has('phone_numbers')) {
            return new CustomerResource($customer);
        }

        //get numbers that are no longer relevant, and detach from customer
        $toBeDeleted = $customer->phoneNumbers()->pluck('phone_number')->diff($request->get('phone_numbers'));
        $customer->phoneNumbers()->whereIn('phone_number', $toBeDeleted)->delete();

        //get new numbers and attach to customer
        $toBeAdded = collect($request->get('phone_numbers'))->diff($customer->phoneNumbers()->pluck('phone_number'));
        $this->attachPhoneNumbers($customer, $toBeAdded->toArray());

        return new CustomerResource($customer);
    }

    public function destroy(CustomerDeleteRequest $request, Customer $customer): JsonResponse
    {
        $customer->delete();

        return response()->json('', 204);
    }

    private function attachPhoneNumbers(Customer $customer, array $phoneNumbers): void
    {
        $phoneNumbers = collect($phoneNumbers)->map(function ($phoneNumber) {
            return new PhoneNumber(['phone_number' => $phoneNumber]);
        });

        $customer->phoneNumbers()->saveMany($phoneNumbers);
    }
}
