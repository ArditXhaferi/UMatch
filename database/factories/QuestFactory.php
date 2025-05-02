<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Quest;

class QuestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quest::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->text(),
            'json_steps' => '{}',
            'xp_reward' => fake()->numberBetween(-10000, 10000),
            'season' => fake()->word(),
            'is_active' => fake()->boolean(),
        ];
    }
}
