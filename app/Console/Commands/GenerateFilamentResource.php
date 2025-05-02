<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class GenerateFilamentResource extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:filament-resource';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Filament Resource classes for all models in the app/Models directory';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $modelPath = app_path('Models');
        $files = File::allFiles($modelPath);

        foreach ($files as $file) {
            $className = pathinfo($file->getFilename(), PATHINFO_FILENAME);

            // Skip abstract or base classes if you have them
            // but for typical Eloquent models, let's generate a resource
            $this->line("Generating Filament Resource for model: $className");

            Artisan::call('make:filament-resource', [
                'name' => $className,
                '--generate' => true,
                '--simple' => true,
                '--force' => true,
            ]);
        }

        $this->info('All Filament Resources generated successfully!');
    }
}
