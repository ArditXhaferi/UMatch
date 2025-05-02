<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use thiagoalessio\TesseractOCR\TesseractOCR;

class OcrService
{
    public function processDocument(string $filePath): array
    {
        try {
            // Get the full path of the uploaded file
            $fullPath = Storage::path($filePath);
            
            // Initialize Tesseract OCR with full path to tesseract executable
            $text = (new TesseractOCR($fullPath))
                ->executable('/opt/homebrew/bin/tesseract') // Full path to tesseract executable
                ->lang('eng')
                ->config('psm', '3') // Page segmentation mode
                ->config('oem', '3') // OCR Engine mode
                ->run();
            
            // Extract relevant information
            $analysis = $this->analyzeText($text);
            
            return [
                'success' => true,
                'text' => $text,
                'analysis' => $analysis,
            ];
        } catch (\Exception $e) {
            Log::error('OCR Processing Error: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
    
    private function analyzeText(string $text): array
    {
        // TODO: Implement text analysis logic
        // This is where you'll add the logic to extract relevant information
        // from the OCR text, such as grades, courses, etc.
        
        return [
            'raw_text' => $text,
            'extracted_data' => [
                // Add your extracted data here
            ],
        ];
    }
} 