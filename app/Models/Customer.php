<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Customer extends Model
{
    use HasFactory, Search;

    protected $fillable = ['first_name', 'last_name', 'email'];

    const MORPH_MAP_ALIAS = 'customer';

    public function phoneNumbers(): MorphMany
    {
        return $this->morphMany(PhoneNumber::class, 'resource');
    }
}
