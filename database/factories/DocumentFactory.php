<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Document;
use App\Models\StudentProfile;

class DocumentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Document::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'student_profile_id' => StudentProfile::factory(),
            'type' => fake()->randomElement(["transcript","cv","essay","english_score","portfolio"]),
            'path' => fake()->word(),
        ];
    }
}
