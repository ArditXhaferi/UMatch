<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\University;

class CheckUniversities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:universities';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if there are universities in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = University::count();
        $this->info("There are $count universities in the database.");

        if ($count > 0) {
            $universities = University::select('id', 'university_name', 'city')->get();
            $this->table(
                ['ID', 'University Name', 'City'],
                $universities->map(function ($university) {
                    return [
                        'ID' => $university->id,
                        'University Name' => $university->university_name,
                        'City' => $university->city,
                    ];
                })
            );
        }

        return Command::SUCCESS;
    }
} 