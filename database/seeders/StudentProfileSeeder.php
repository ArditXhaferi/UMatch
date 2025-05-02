<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\StudentProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->first();

        if (!$user) {
            return;
        }

        // Get the DI-CS archetype as an example
        $archetype = DB::table('archetypes')->where('code', 'DI-CS')->first();

        StudentProfile::create([
            'user_id' => $user->id,
            'date_of_birth' => '2000-01-01',
            'school' => 'Test High School',
            'hexad_type' => $archetype->name,
            'archetype_code' => $archetype->code,
            'xp' => 100,
            'credits' => 50,
            'consent_at' => now(),
            'parent_contact_email' => 'parent@example.com',
            'analysis' => [
                'archetype_scores' => [
                    'AN-VS' => 45,
                    'AN-EN' => 35,
                    'DI-CD' => 75,
                    'DI-CS' => 90,
                    'EX-BU' => 40,
                    'EX-PL' => 30,
                    'SO-ME' => 25,
                    'SO-ED' => 20,
                    'HE-MD' => 15,
                    'HE-BT' => 35,
                    'AR-DS' => 45,
                    'AR-FM' => 30,
                    'GL-DM' => 25,
                    'GL-TR' => 20,
                    'SP-AT' => 15,
                    'SP-EC' => 25
                ],
                'type_description' => 'This student shows strong analytical and problem-solving abilities, with a natural inclination towards technology and systems thinking. Their approach to learning is methodical and detail-oriented, making them well-suited for computer science and software development.',
                'learning_style' => 'Prefers structured, logical learning environments with clear objectives and practical applications. Excels in hands-on coding projects and algorithmic problem-solving.',
                'recommended_majors' => json_decode($archetype->majors, true),
                'study_techniques' => [
                    'Practice coding problems daily',
                    'Participate in hackathons and coding competitions',
                    'Build personal projects to apply theoretical knowledge',
                    'Join study groups focused on technical problem-solving',
                    'Use spaced repetition for learning programming concepts'
                ]
            ]
        ]);
    }
}
