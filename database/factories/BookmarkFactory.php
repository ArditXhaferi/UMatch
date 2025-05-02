<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\;
use App\Models\Bookmark;
use App\Models\StudentProfile;

class BookmarkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Bookmark::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'student_profile_id' => StudentProfile::factory(),
            'programme_id' => ::factory(),
        ];
    }
}
