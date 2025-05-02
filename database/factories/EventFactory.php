<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Event;
use App\Models\University;

class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'university_id' => University::factory(),
            'title' => fake()->sentence(4),
            'date' => fake()->dateTime(),
            'location' => fake()->regexify('[A-Za-z0-9]{150}'),
            'capacity' => fake()->numberBetween(-10000, 10000),
            'description' => fake()->text(),
        ];
    }
}
