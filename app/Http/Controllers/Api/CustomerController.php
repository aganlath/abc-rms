<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerDeleteRequest;
use App\Http\Requests\Customer\CustomerIndexRequest;
use App\Http\Requests\Customer\CustomerStoreUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\PhoneNumber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CustomerController extends Controller
{
    public function index(CustomerIndexRequest $request): AnonymousResourceCollection
    {
        $customers = Customer::query()
            ->when($request->has('search'), function ($query) use ($request) {
                $query->search($request->search);
            })
            ->simplePaginate($request->get('limit', 10));

        return CustomerResource::collection($customers);
    }

    public function store(CustomerStoreUpdateRequest $request): CustomerResource
    {
        $customer = Customer::create($request->only(['first_name', 'last_name', 'email']));

        if ($request->has('phone_numbers')) {
            $this->attachPhoneNumbers($customer, $request->get('phone_numbers'));
        }

        return new CustomerResource($customer);
    }

    public function update(Request $request, Customer $customer): CustomerResource
    {
        $customer->update($request->only(['first_name', 'last_name', 'email']));

        if ($request->has('phone_numbers')) {
            $customer->phoneNumbers()->delete();

            $this->attachPhoneNumbers($customer, $request->get('phone_numbers'));
        }

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
