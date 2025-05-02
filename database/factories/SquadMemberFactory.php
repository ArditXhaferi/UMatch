<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\;
use App\Models\Squad;
use App\Models\SquadMember;

class SquadMemberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SquadMember::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'squad_id' => Squad::factory(),
            'student_profile_id' => ::factory(),
            'is_leader' => fake()->boolean(),
            'joined_at' => fake()->dateTime(),
        ];
    }
}
