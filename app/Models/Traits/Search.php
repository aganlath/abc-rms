<?php

declare(strict_types=1);

namespace App\Models\Traits;

trait Search
{
    public function scopeSearch($query, $search = null)
    {
        if (! $search) {
            return;
        }

        $searchQuery = '%' . $search . '%';

        return $query->where(function ($query) use ($searchQuery) {
            $query->where('first_name', 'LIKE', $searchQuery)
                ->orWhere('last_name', 'LIKE', $searchQuery)
                ->orWhere('email', 'LIKE', $searchQuery)
                ->orWhereHas('phoneNumbers', function ($query) use ($searchQuery) {
                    $query->where('phone_number', 'LIKE', $searchQuery);
                });
        });
    }
}
