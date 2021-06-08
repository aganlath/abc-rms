<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PhoneNumberResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'phone_number' => $this->phone_number
        ];
    }
}
