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
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id');
            $table->string('name', 150);
            $table->string('slug')->unique();
            $table->integer('tuition');
            $table->integer('ects');
            $table->integer('duration');
            $table->boolean('scholarship_available')->default(false);
            $table->boolean('open_for_application')->default(true);
            $table->date('deadline')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programmes');
    }
};
