<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\UniversityMatchProfile;
use Illuminate\Support\Facades\Log;

class FinalizeUniversityAnalysis extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'universities:finalize-analysis';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Finalize the analysis of universities and update their archetype percentages';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting university analysis finalization...');

        try {
            $universityMatcher = new UniversityMatchProfile();
            $universityMatcher->finalize_analyse();
            
            $this->info('University analysis completed successfully!');
        } catch (\Exception $e) {
            $this->error('An error occurred during the analysis: ' . $e->getMessage());
            Log::error('University analysis failed: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 