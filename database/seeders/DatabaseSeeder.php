<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\SchoolSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ArchetypeSeeder::class,
            StudentProfileSeeder::class,
            SchoolSeeder::class,
            CareerSeeder::class,
            SkillTreeSeeder::class,
            QuestSeeder::class,
        ]);
    }
}
