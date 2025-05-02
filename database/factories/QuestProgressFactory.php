<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\;
use App\Models\Quest;
use App\Models\QuestProgress;

class QuestProgressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = QuestProgress::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'quest_id' => Quest::factory(),
            'student_profile_id' => ::factory(),
            'current_step' => fake()->numberBetween(-10000, 10000),
            'completed' => fake()->boolean(),
            'started_at' => fake()->dateTime(),
            'completed_at' => fake()->dateTime(),
        ];
    }
}
