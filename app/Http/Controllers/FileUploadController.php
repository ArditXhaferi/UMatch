<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\OcrService;
use App\Services\StudentProfileService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class FileUploadController extends Controller
{
    protected $ocrService;
    protected $profileService;

    public function __construct(OcrService $ocrService, StudentProfileService $profileService)
    {
        $this->ocrService = $ocrService;
        $this->profileService = $profileService;
    }

    public function index()
    {
        return Inertia::render('FileUpload');
    }

    public function store(Request $request)
    {
        $request->validate([
            'files.*' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // 10MB max
        ]);

        $results = [];

        foreach ($request->file('files') as $file) {
            // Store the file
            $path = $file->store('uploads');
            
            // Process with OCR
            $ocrResult = $this->ocrService->processDocument($path);
            
            $results[] = [
                'filename' => $file->getClientOriginalName(),
                'path' => $path,
                'ocr_result' => $ocrResult,
            ];
        }

        // If OCR was successful, create/update student profile
        if (Auth::check()) {
            try {
                $profile = $this->profileService->analyzeAndCreateProfile(Auth::user(), $results);
                
                if ($request->wantsJson()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Files processed and profile created successfully',
                        'results' => $results,
                        'profile' => $profile,
                    ]);
                }

                return Inertia::render('StudentProfile', [
                    'profile' => $profile,
                    'uploadResults' => [
                        'success' => true,
                        'message' => 'Files processed and profile created successfully',
                        'results' => $results,
                    ]
                ]);
            } catch (\Exception $e) {
                if ($request->wantsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to create profile: ' . $e->getMessage(),
                        'results' => $results,
                    ], 500);
                }

                return Inertia::render('FileUpload', [
                    'error' => 'Failed to create profile: ' . $e->getMessage(),
                    'uploadResults' => [
                        'success' => false,
                        'message' => 'Failed to create profile: ' . $e->getMessage(),
                        'results' => $results,
                    ]
                ]);
            }
        }

        // If user is not authenticated, just return the OCR results
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Files processed successfully. Please log in to create your profile.',
                'results' => $results,
            ]);
        }

        return Inertia::render('FileUpload', [
            'uploadResults' => [
                'success' => true,
                'message' => 'Files processed successfully. Please log in to create your profile.',
                'results' => $results,
            ]
        ]);
    }
} 