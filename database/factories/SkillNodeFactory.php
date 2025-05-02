<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\SkillNode;

class SkillNodeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SkillNode::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'code' => fake()->word(),
            'title' => fake()->sentence(4),
            'xp_required' => fake()->numberBetween(-10000, 10000),
            'icon' => fake()->word(),
            'metadata' => '{}',
        ];
    }
}
