<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\;
use App\Models\StudentProfile;
use App\Models\StudentSkillProgress;

class StudentSkillProgressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = StudentSkillProgress::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'student_profile_id' => StudentProfile::factory(),
            'skill_node_id' => ::factory(),
            'xp_earned' => fake()->numberBetween(-10000, 10000),
            'completed' => fake()->boolean(),
        ];
    }
}
