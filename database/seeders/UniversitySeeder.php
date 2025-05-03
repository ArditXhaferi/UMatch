<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\University;
use Illuminate\Support\Facades\File;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the JSON data from the file
        $json = File::get(database_path('seeders/data/universities.json'));
        $data = json_decode($json, true);

        // Check if data was successfully decoded
        if (!$data || !isset($data['universities'])) {
            $this->command->error('Failed to decode universities JSON data or invalid format');
            return;
        }

        $count = 0;
        $skipped = 0;

        // Insert universities
        foreach ($data['universities'] as $universityData) {
            // Check if university with same ID or name already exists
            $existingById = null;
            if (isset($universityData['id'])) {
                $existingById = University::find($universityData['id']);
            }
            
            $existingByName = University::where('university_name', $universityData['university_name'])->first();
            
            if ($existingById || $existingByName) {
                $this->command->info("Skipping {$universityData['university_name']} - already exists.");
                $skipped++;
                continue;
            }

            // Convert archetype_percentages from JSON string to array if it's a string
            if (isset($universityData['archetype_percentages']) && is_string($universityData['archetype_percentages'])) {
                $universityData['archetype_percentages'] = json_decode($universityData['archetype_percentages'], true);
            }

            // Remove created_at and updated_at if they exist to let Eloquent handle them
            unset($universityData['created_at']);
            unset($universityData['updated_at']);
            
            // Create the university record
            University::create($universityData);
            $count++;
        }
        
        $this->command->info("Universities seeded successfully! Added: $count, Skipped: $skipped");
    }
} 