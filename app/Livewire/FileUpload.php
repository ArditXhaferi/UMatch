<?php

declare(strict_types=1);

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use App\Services\OcrService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class FileUpload extends Component
{
    use WithFileUploads;

    public $files = [];
    public $uploading = false;
    public $uploadProgress = 0;
    public $showResults = false;
    public $processingState = 'idle';
    public $analysisResults = [];
    public $errorMessage = '';
    public $isDragging = false;

    protected $rules = [
        'files.*' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240'
    ];

    public function updatedFiles()
    {
        $this->validate();
    }

    public function dragEnter()
    {
        $this->isDragging = true;
    }

    public function dragLeave()
    {
        $this->isDragging = false;
    }

    public function drop()
    {
        $this->isDragging = false;
    }

    public function removeFile($index)
    {
        unset($this->files[$index]);
        $this->files = array_values($this->files);
    }

    public function upload()
    {
        $this->validate();
        $this->uploading = true;
        $this->processingState = 'uploading';
        $this->uploadProgress = 0;
        $this->errorMessage = '';

        try {
            $uploadedFiles = [];
            $totalFiles = count($this->files);
            $progressPerFile = 100 / $totalFiles;

            foreach ($this->files as $file) {
                $path = $file->store('uploads');
                $uploadedFiles[] = $path;
                $this->uploadProgress += $progressPerFile;
            }

            $this->processingState = 'processing';
            $this->uploadProgress = 100;

            // Process files with OCR
            $ocrService = app(OcrService::class);
            $results = [];

            foreach ($uploadedFiles as $filePath) {
                $result = $ocrService->processDocument($filePath);
                if ($result['success']) {
                    $results[] = $result;
                }
            }

            // Mock analysis results for now
            $this->analysisResults = [
                'top_matches' => [
                    [
                        'name' => 'Computer Science',
                        'code' => 'CS101',
                        'percentage' => 95
                    ],
                    [
                        'name' => 'Data Science',
                        'code' => 'DS201',
                        'percentage' => 88
                    ],
                    [
                        'name' => 'Software Engineering',
                        'code' => 'SE301',
                        'percentage' => 82
                    ]
                ],
                'recommended_majors' => [
                    'Computer Science',
                    'Data Science',
                    'Software Engineering',
                    'Information Technology'
                ]
            ];

            $this->processingState = 'success';
            $this->showResults = true;
        } catch (\Exception $e) {
            $this->processingState = 'error';
            $this->errorMessage = 'Failed to process files: ' . $e->getMessage();
        } finally {
            $this->uploading = false;
        }
    }

    public function render()
    {
        return view('livewire.file-upload')->layout('components.layouts.app');
    }
} 