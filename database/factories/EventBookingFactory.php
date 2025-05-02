<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\;
use App\Models\EventBooking;
use App\Models\StudentProfile;

class EventBookingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = EventBooking::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'student_profile_id' => StudentProfile::factory(),
            'event_id' => ::factory(),
            'booked_at' => fake()->dateTime(),
        ];
    }
}
