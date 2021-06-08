<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserIndexRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public function index(UserIndexRequest $request): AnonymousResourceCollection
    {
        $customers = User::query()
            ->withoutLoggedInUser()
            ->with(['phoneNumbers'])
            ->when($request->has('search'), function ($query) use ($request) {
                $query->search($request->search);
            })
            ->simplePaginate($request->get('limit', 10));

        return UserResource::collection($customers);
    }
}
