<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\StudentProfile;
use App\Models\User;

class StudentProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StudentProfile::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'date_of_birth' => fake()->date(),
            'school' => fake()->regexify('[A-Za-z0-9]{120}'),
            'hexad_type' => fake()->regexify('[A-Za-z0-9]{4}'),
            'archetype_code' => fake()->regexify('[A-Za-z0-9]{5}'),
            'xp' => fake()->numberBetween(-10000, 10000),
            'credits' => fake()->numberBetween(-10000, 10000),
            'consent_at' => fake()->dateTime(),
            'parent_contact_email' => fake()->regexify('[A-Za-z0-9]{150}'),
        ];
    }
}
