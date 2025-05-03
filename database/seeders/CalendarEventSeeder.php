<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CalendarEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            // Application Deadlines
            [
                'title' => 'Early Decision Application Deadline',
                'description' => 'Last day to submit early decision applications for top universities',
                'date' => Carbon::now()->addMonths(2)->format('Y-m-d'),
                'type' => 'application',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Regular Decision Application Deadline',
                'description' => 'Final deadline for regular decision applications',
                'date' => Carbon::now()->addMonths(3)->format('Y-m-d'),
                'type' => 'application',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Scholarship Application Deadline',
                'description' => 'Deadline for merit-based scholarship applications',
                'date' => Carbon::now()->addMonths(2)->addDays(15)->format('Y-m-d'),
                'type' => 'scholarship',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // University Events
            [
                'title' => 'Virtual University Fair',
                'description' => 'Meet representatives from top universities worldwide',
                'date' => Carbon::now()->addDays(7)->format('Y-m-d'),
                'type' => 'event',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Campus Tour Day',
                'description' => 'Guided tours of local university campuses',
                'date' => Carbon::now()->addDays(14)->format('Y-m-d'),
                'type' => 'event',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Workshops
            [
                'title' => 'College Essay Writing Workshop',
                'description' => 'Learn how to write compelling college application essays',
                'date' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'type' => 'workshop',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'SAT/ACT Preparation Workshop',
                'description' => 'Tips and strategies for standardized tests',
                'date' => Carbon::now()->addDays(10)->format('Y-m-d'),
                'type' => 'workshop',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Interviews
            [
                'title' => 'University Admissions Interview',
                'description' => 'Virtual interview with university admissions committee',
                'date' => Carbon::now()->addDays(20)->format('Y-m-d'),
                'type' => 'interview',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Scholarship Interview',
                'description' => 'Interview for merit-based scholarship consideration',
                'date' => Carbon::now()->addDays(25)->format('Y-m-d'),
                'type' => 'interview',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Exams
            [
                'title' => 'SAT Test Date',
                'description' => 'National SAT testing date',
                'date' => Carbon::now()->addMonths(1)->format('Y-m-d'),
                'type' => 'exam',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'ACT Test Date',
                'description' => 'National ACT testing date',
                'date' => Carbon::now()->addMonths(1)->addDays(15)->format('Y-m-d'),
                'type' => 'exam',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Meetings
            [
                'title' => 'College Counselor Meeting',
                'description' => 'One-on-one meeting with college counselor',
                'date' => Carbon::now()->addDays(3)->format('Y-m-d'),
                'type' => 'meeting',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Parent-Student College Planning Meeting',
                'description' => 'Family meeting to discuss college plans and applications',
                'date' => Carbon::now()->addDays(8)->format('Y-m-d'),
                'type' => 'meeting',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Additional Deadlines
            [
                'title' => 'Financial Aid Application Deadline',
                'description' => 'Last day to submit FAFSA and other financial aid applications',
                'date' => Carbon::now()->addMonths(2)->addDays(20)->format('Y-m-d'),
                'type' => 'deadline',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Housing Application Deadline',
                'description' => 'Deadline for university housing applications',
                'date' => Carbon::now()->addMonths(3)->addDays(10)->format('Y-m-d'),
                'type' => 'deadline',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert the events into the database
        DB::table('calendar_events')->insert($events);
    }
} 