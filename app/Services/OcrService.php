<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Imagick;

class OcrService
{
    protected string $tesseractPath;
    protected string $tempDir;
    protected string $ghostscriptPath;

    public function __construct()
    {
        $this->tesseractPath = config('services.tesseract.path', '/opt/homebrew/bin/tesseract');
        $this->ghostscriptPath = config('services.ghostscript.path', '/opt/homebrew/bin/gs');
        $this->tempDir = sys_get_temp_dir();
    }

    public function processDocument(string $filePath): array
    {
        try {
            // Get the full path of the uploaded file
            $fullPath = Storage::path($filePath);
            
            // Process the file and get OCR text
            $text = $this->processFile($fullPath);
            
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

    public function processFile(string $filePath): string
    {
        try {
            $extension = pathinfo($filePath, PATHINFO_EXTENSION);
            
            if (strtolower($extension) === 'pdf') {
                return $this->processPdf($filePath);
            }
            
            return $this->processImage($filePath);
        } catch (\Exception $e) {
            Log::error('OCR Processing Error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function processPdf(string $filePath): string
    {
        try {
            // Create a temporary directory for the images
            $tempDir = $this->tempDir . '/pdf_images_' . uniqid();
            if (!file_exists($tempDir)) {
                mkdir($tempDir, 0777, true);
            }

            // First convert PDF to images using Ghostscript
            $outputPattern = $tempDir . '/page_%d.png';
            $gsCommand = sprintf(
                '"%s" -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 -sDEVICE=pngalpha -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -r300 -dPrinted=false -sOutputFile="%s" "%s"',
                $this->ghostscriptPath,
                $outputPattern,
                $filePath
            );

            exec($gsCommand, $output, $returnCode);

            if ($returnCode !== 0) {
                throw new \Exception('Ghostscript conversion failed: ' . implode("\n", $output));
            }

            // Get all generated PNG files
            $pngFiles = glob($tempDir . '/page_*.png');
            if (empty($pngFiles)) {
                throw new \Exception('No PNG files were generated from the PDF');
            }

            $allText = '';
            
            // Process each page
            foreach ($pngFiles as $pngFile) {
                $pageText = $this->processImage($pngFile);
                $allText .= $pageText . "\n\n";
                
                // Clean up the temporary image
                unlink($pngFile);
            }
            
            // Clean up the temporary directory
            rmdir($tempDir);
            
            return $allText;
        } catch (\Exception $e) {
            Log::error('PDF Processing Error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function processImage(string $filePath): string
    {
        $outputFile = $this->tempDir . '/ocr' . uniqid();
        
        $command = sprintf(
            '"%s" "%s" "%s" -l eng',
            $this->tesseractPath,
            $filePath,
            $outputFile
        );

        exec($command, $output, $returnCode);

        if ($returnCode !== 0) {
            Log::error('OCR Processing Error: Error! The command did not produce any output.', [
                'command' => $command,
                'output' => $output,
                'returnCode' => $returnCode
            ]);
            throw new \Exception('OCR processing failed');
        }

        $text = file_get_contents($outputFile . '.txt');
        unlink($outputFile . '.txt');

        return $text;
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