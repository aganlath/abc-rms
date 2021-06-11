<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Exceptions\CsvUploadFailed;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserIndexRequest;
use App\Http\Requests\User\UserUploadCsvRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Artisan;

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
            ->orderBy('first_name')
            ->paginate($request->get('limit', 10));

        return UserResource::collection($customers);
    }

    public function upload_csv(UserUploadCsvRequest $request): JsonResponse
    {
        $filePath = $request->file('csv_file')->storeAs('csv_uploads', $request->file('csv_file')->name);

        $exitCode = Artisan::call('admin:upload-users', ['path_to_csv' => $filePath]);

        return response()->json($exitCode);
    }
}
