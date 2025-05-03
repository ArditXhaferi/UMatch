<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\University;

class UniversityArchetypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $universities = University::all();

        foreach ($universities as $university) {
            // Generate random archetype percentages
            $archetypePercentages = [
                'AN-VS' => rand(20, 90),
                'AN-EN' => rand(20, 90),
                'DI-CD' => rand(20, 90),
                'DI-CS' => rand(20, 90),
                'EX-BU' => rand(20, 90),
                'EX-PL' => rand(20, 90),
                'SO-ME' => rand(20, 90),
                'SO-ED' => rand(20, 90),
                'HE-MD' => rand(20, 90),
                'HE-BT' => rand(20, 90),
                'AR-DS' => rand(20, 90),
                'AR-FM' => rand(20, 90),
                'GL-DM' => rand(20, 90),
                'GL-TR' => rand(20, 90),
                'SP-AT' => rand(20, 90),
                'SP-EC' => rand(20, 90)
            ];

            // Adjust percentages based on university qualities
            foreach ($university->qualities_sought as $quality) {
                switch ($quality) {
                    case 'Academic excellence':
                        $archetypePercentages['AN-VS'] += 10;
                        $archetypePercentages['AN-EN'] += 10;
                        break;
                    case 'Leadership skills':
                        $archetypePercentages['EX-BU'] += 10;
                        $archetypePercentages['EX-PL'] += 10;
                        break;
                    case 'Community involvement':
                        $archetypePercentages['SO-ED'] += 10;
                        $archetypePercentages['SO-ME'] += 10;
                        break;
                    case 'Innovation':
                        $archetypePercentages['DI-CS'] += 10;
                        $archetypePercentages['DI-CD'] += 10;
                        break;
                    case 'Creativity':
                        $archetypePercentages['AR-DS'] += 10;
                        $archetypePercentages['AR-FM'] += 10;
                        break;
                    case 'Global perspective':
                        $archetypePercentages['GL-DM'] += 10;
                        $archetypePercentages['GL-TR'] += 10;
                        break;
                    case 'Health and wellness':
                        $archetypePercentages['HE-MD'] += 10;
                        $archetypePercentages['HE-BT'] += 10;
                        break;
                    case 'Sports and athletics':
                        $archetypePercentages['SP-AT'] += 10;
                        $archetypePercentages['SP-EC'] += 10;
                        break;
                }
            }

            // Ensure percentages don't exceed 100
            foreach ($archetypePercentages as $key => $value) {
                $archetypePercentages[$key] = min(100, $value);
            }

            $university->archetype_percentages = $archetypePercentages;
            $university->save();
        }
    }
}
