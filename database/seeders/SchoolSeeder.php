<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\University;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            // Get the JSON data from the file
            $json = File::get(database_path('data/schools.json'));
            $data = json_decode($json, true);

            // Check if data was successfully decoded
            if (!$data || !isset($data['universities'])) {
                $this->command->error('Failed to decode schools JSON data or invalid format');
                return;
            }

            $count = 0;
            $skipped = 0;

            // Insert universities
            foreach ($data['universities'] as $universityData) {
                // Check if university with same name already exists
                $existing = University::where('university_name', $universityData['university_name'])->first();
                
                if ($existing) {
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
        } catch (\Exception $e) {
            $this->command->error("Error seeding universities: " . $e->getMessage());
            Log::error("Error in SchoolSeeder: " . $e->getMessage());
        }
    }
}
