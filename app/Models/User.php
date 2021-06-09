<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Traits\Search;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Search;

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

    const MORPH_MAP_ALIAS = 'user';

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

    public function fetchUserByEmail($email)
    {
        return $this->where('email', $email)->first();
    }
}
