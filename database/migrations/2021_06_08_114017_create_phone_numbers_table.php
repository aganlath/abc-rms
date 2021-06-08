<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhoneNumbersTable extends Migration
{
    public function up(): void
    {
        Schema::create('phone_numbers', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number');
            $table->integer('resource_id');
            $table->string('resource_type');
            $table->timestamps();

            $table->index(['phone_number', 'resource_id', 'resource_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('phone_numbers');
    }
}
