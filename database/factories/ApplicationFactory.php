<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\;
use App\Models\Application;
use App\Models\StudentProfile;

class ApplicationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Application::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'student_profile_id' => StudentProfile::factory(),
            'programme_id' => ::factory(),
            'status' => fake()->randomElement(["submitted","review","accepted","rejected"]),
            'submitted_at' => fake()->dateTime(),
            'pdf_path' => fake()->word(),
        ];
    }
}
