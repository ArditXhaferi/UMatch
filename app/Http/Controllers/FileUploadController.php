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

        try {
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

                    return redirect()->route('student.profile', ['profile' => $profile->id])
                        ->with('success', 'Files processed and profile created successfully');
                } catch (\Exception $e) {
                    if ($request->wantsJson()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Failed to create profile: ' . $e->getMessage(),
                            'results' => $results,
                        ], 500);
                    }

                    return back()->with('error', 'Failed to create profile: ' . $e->getMessage());
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

            return back()->with('success', 'Files processed successfully. Please log in to create your profile.');
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to process files: ' . $e->getMessage(),
                ], 500);
            }

            return back()->with('error', 'Failed to process files: ' . $e->getMessage());
        }
    }
} 