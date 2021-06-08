<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasFactory, Notifiable, Search;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'is_admin',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function phoneNumbers(): MorphMany
    {
        return $this->morphMany(PhoneNumber::class, 'resource');
    }

    public function isAdmin(): bool
    {
        return (bool)$this->is_admin;
    }

    public function scopeWithoutLoggedInUser($query)
    {
        return $query->where('id', '!=', Auth::user()->id);
    }
}
