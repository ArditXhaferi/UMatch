<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArchetypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $archetypes = [
            [
                'code' => 'AN-VS',
                'name' => 'Visionary Scientist',
                'faculty' => 'Faculty of Natural & Mathematical Sciences',
                'majors' => ['Physics', 'Astrophysics', 'Applied Mathematics', 'Materials Science'],
            ],
            [
                'code' => 'AN-EN',
                'name' => 'Engineer-Builder',
                'faculty' => 'Faculty of Engineering & Technology',
                'majors' => ['Mechanical Eng.', 'Civil Eng.', 'Electrical / Electronic Eng.', 'Mechatronics'],
            ],
            [
                'code' => 'DI-CD',
                'name' => 'Data Crafter',
                'faculty' => 'School of Data & Decision Sciences',
                'majors' => ['Data Science', 'Statistics', 'AI & ML', 'Business Analytics'],
            ],
            [
                'code' => 'DI-CS',
                'name' => 'Code Sorcerer',
                'faculty' => 'Faculty of Computer Science & Cyber Ops',
                'majors' => ['Computer Science', 'Software Eng.', 'Cybersecurity', 'Information Systems'],
            ],
            [
                'code' => 'EX-BU',
                'name' => 'Business Maverick',
                'faculty' => 'School of Business & Entrepreneurship',
                'majors' => ['Business Administration', 'Entrepreneurship', 'Marketing', 'Finance'],
            ],
            [
                'code' => 'EX-PL',
                'name' => 'Policy Leader',
                'faculty' => 'School of Economics, Law & Governance',
                'majors' => ['Economics', 'Public Policy', 'International Law', 'Political Economy'],
            ],
            [
                'code' => 'SO-ME',
                'name' => 'Media Storyteller',
                'faculty' => 'College of Media, Film & Communication',
                'majors' => ['Journalism', 'Digital Media Production', 'Film Studies', 'Content Design'],
            ],
            [
                'code' => 'SO-ED',
                'name' => 'Educator',
                'faculty' => 'Faculty of Education & Learning Sciences',
                'majors' => ['Pedagogy', 'Educational Psychology', 'Linguistics', 'Instructional Design'],
            ],
            [
                'code' => 'HE-MD',
                'name' => 'Future Medic',
                'faculty' => 'Medical & Health Sciences Faculty',
                'majors' => ['Medicine (MD)', 'Nursing', 'Dentistry', 'Pharmacy'],
            ],
            [
                'code' => 'HE-BT',
                'name' => 'Biotech Innovator',
                'faculty' => 'Faculty of Biotechnology & Biomedical Eng.',
                'majors' => ['Biotechnology', 'Biomedical Eng.', 'Genetics', 'Bioinformatics'],
            ],
            [
                'code' => 'AR-DS',
                'name' => 'Design Architect',
                'faculty' => 'School of Architecture & Industrial Design',
                'majors' => ['Architecture', 'Industrial Design', 'Interior Design', 'Urban Planning'],
            ],
            [
                'code' => 'AR-FM',
                'name' => 'Fine-Arts Maestro',
                'faculty' => 'College of Fine Arts & Visual Communication',
                'majors' => ['Fine Arts', 'Graphic Design', 'Animation', 'Illustration'],
            ],
            [
                'code' => 'GL-DM',
                'name' => 'Diplomat',
                'faculty' => 'Faculty of International Relations & Law',
                'majors' => ['International Relations', 'Diplomatic Studies', 'European Law', 'Peace & Conflict Studies'],
            ],
            [
                'code' => 'GL-TR',
                'name' => 'Globe-Trotter',
                'faculty' => 'School of Tourism, Hospitality & Culture',
                'majors' => ['Tourism Management', 'Hospitality Business', 'Event & Festival Management', 'Cultural Studies'],
            ],
            [
                'code' => 'SP-AT',
                'name' => 'Athlete-Strategist',
                'faculty' => 'Faculty of Sport & Human Performance',
                'majors' => ['Sports Science', 'Kinesiology', 'Physiotherapy', 'Sports Management'],
            ],
            [
                'code' => 'SP-EC',
                'name' => 'Eco-Guardian',
                'faculty' => 'Faculty of Environmental & Sustainability Sciences',
                'majors' => ['Environmental Eng.', 'Environmental Science', 'Renewable Energy Eng.', 'Sustainability Studies'],
            ],
        ];

        foreach ($archetypes as $archetype) {
            DB::table('archetypes')->insert([
                'code' => $archetype['code'],
                'name' => $archetype['name'],
                'faculty' => $archetype['faculty'],
                'majors' => json_encode($archetype['majors']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
} 