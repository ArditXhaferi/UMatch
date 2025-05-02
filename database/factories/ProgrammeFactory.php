<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Faculty;
use App\Models\Programme;

class ProgrammeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Programme::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'faculty_id' => Faculty::factory(),
            'name' => fake()->name(),
            'slug' => fake()->slug(),
            'tuition' => fake()->numberBetween(-10000, 10000),
            'ects' => fake()->numberBetween(-10000, 10000),
            'duration' => fake()->numberBetween(-10000, 10000),
            'scholarship_available' => fake()->boolean(),
            'open_for_application' => fake()->boolean(),
            'deadline' => fake()->date(),
            'description' => fake()->text(),
        ];
    }
}
