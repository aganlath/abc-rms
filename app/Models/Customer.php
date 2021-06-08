<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email'];

    public function phoneNumbers(): MorphMany
    {
        return $this->morphMany(PhoneNumber::class, 'resource');
    }

    public function scopeSearch($query, $search = null)
    {
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
