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
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->date('date_of_birth')->nullable();
            $table->string('school', 120)->nullable();
            $table->string('hexad_type', 4)->nullable();
            $table->string('archetype_code', 5)->nullable();
            $table->integer('xp')->default(0);
            $table->integer('credits')->default(0);
            $table->timestamp('consent_at')->nullable();
            $table->string('parent_contact_email', 150)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
};
