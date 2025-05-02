<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('x_p_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_profile_id');
            $table->string('source_type', 50);
            $table->uuid('source_id')->nullable();
            $table->integer('xp');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('x_p_logs');
    }
};
