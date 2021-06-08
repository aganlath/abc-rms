<?php

namespace App\Providers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            User::MORPH_MAP_ALIAS => 'App\Models\User',
            Customer::MORPH_MAP_ALIAS => 'App\Models\Customer',
        ]);
    }
}
