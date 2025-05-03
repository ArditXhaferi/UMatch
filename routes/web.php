<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\LandingPageController;
use App\Models\University;

// Route::get('/', function () {
//     if (Auth::check()) {
//         return redirect()->route('dashboard');
//     }
//     return Inertia::render('welcome');
// })->name('welcome');

Route::get('/',[LandingPageController::class,'landing_page']);

Route::middleware(['auth'])->group(function () {
    // File Upload Routes
    Route::get('/upload', [FileUploadController::class, 'index'])->name('upload.index');
    Route::post('/upload', [FileUploadController::class, 'store'])->name('upload.store');

    // Student Profile Routes
    Route::get('/profile/{profile}', [StudentProfileController::class, 'show'])->name('student.profile');

    // Universities
    Route::get('/universities', function () {
        $user = Auth::user();
        $studentProfile = $user->studentProfile;

        // Get all universities with their faculties and programmes
        $universities = \App\Models\University::with(['faculties.programmes'])->get();

        // Calculate match percentage if student profile exists
        if ($studentProfile) {
            foreach ($universities as $university) {
                // Mock match calculation for demonstration - this should be replaced with actual algorithm
                // This would typically consider the student's archetype against university qualities
                if (!empty($studentProfile->archetype_code) && !empty($university->qualities_sought)) {
                    // Simple mock matching - would be more sophisticated in production
                    $qualities = $university->qualities_sought;
                    $matchScore = rand(50, 95); // Random score between 50-95% for demo

                    // In reality, the score would be calculated based on actual matching algorithm
                    // comparing archetype_code with qualities_sought

                    $university->match_percentage = $matchScore;
                }
            }
        }

        // Collect filter options
        $cities = \App\Models\University::distinct('city')->pluck('city')->toArray();

        // Get all unique branches offered from all universities
        $branches = \App\Models\University::get()
            ->pluck('branches_offered')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        // Get all unique qualities sought from all universities
        $qualities = \App\Models\University::get()
            ->pluck('qualities_sought')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        $filters = [
            'cities' => $cities,
            'branches' => $branches,
            'qualities' => $qualities
        ];

        return Inertia::render('Universities', [
            'universities' => $universities,
            'studentProfile' => $studentProfile,
            'filters' => $filters
        ]);
    })->name('universities');

    // Careers
    Route::get('/careers', [CareerController::class, 'index'])->name('careers');

    // Raw career data check (for debugging match percentages)
    Route::get('/careers-json', function() {
        $user = Auth::user();
        $studentProfile = $user->studentProfile;
        $careers = \App\Models\Career::with(['skills', 'futurePaths', 'archetypes'])->take(10)->get();

        // Format the careers
        $formattedCareers = [];
        foreach ($careers as $career) {
            $careerData = [
                'id' => $career->id,
                'title' => $career->title,
                'match_archetypes' => $career->archetypes->pluck('code')->toArray(),
                'match_percentage' => 0
            ];

            $formattedCareers[] = $careerData;
        }

        // Calculate match percentage if student profile exists
        if ($studentProfile) {
            $analysis = $studentProfile->analysis;
            $archetypeScores = null;

            if (is_array($analysis) && isset($analysis['archetype_scores'])) {
                $archetypeScores = $analysis['archetype_scores'];
            }

            foreach ($formattedCareers as &$career) {
                if ($archetypeScores && !empty($career['match_archetypes'])) {
                    // Find highest score
                    $highestScore = 0;
                    $highestScoreArchetype = null;

                    foreach ($career['match_archetypes'] as $archetype) {
                        if (isset($archetypeScores[$archetype]) && $archetypeScores[$archetype] > $highestScore) {
                            $highestScore = $archetypeScores[$archetype];
                            $highestScoreArchetype = $archetype;
                        }
                    }

                    // Calculate weighted score
                    $totalScore = 0;
                    $scoreCount = 0;

                    foreach ($career['match_archetypes'] as $archetype) {
                        if (isset($archetypeScores[$archetype])) {
                            $weight = ($archetype === $highestScoreArchetype) ? 2.0 : 1.0;
                            $totalScore += $archetypeScores[$archetype] * $weight;
                            $scoreCount += $weight;
                        }
                    }

                    if ($scoreCount > 0) {
                        $career['match_percentage'] = (int)round($totalScore / $scoreCount);
                    }
                }
            }
        }

        return response()->json([
            'student_profile' => $studentProfile ? [
                'id' => $studentProfile->id,
                'archetype_code' => $studentProfile->archetype_code,
                'has_analysis' => !is_null($studentProfile->analysis),
                'analysis_type' => gettype($studentProfile->analysis)
            ] : null,
            'careers' => $formattedCareers
        ]);
    });

    // Test route for match percentage
    Route::get('/test-match', function() {
        $user = Auth::user();
        $studentProfile = $user->studentProfile;

        // Get a couple of careers to test with
        $careers = \App\Models\Career::with(['archetypes'])->take(3)->get();

        // Format for display
        $formattedCareers = $careers->map(function($career) {
            return [
                'id' => $career->id,
                'title' => $career->title,
                'match_archetypes' => $career->archetypes->pluck('code')->toArray()
            ];
        });

        // Get student's archetype scores
        $analysis = $studentProfile->analysis;
        $archetypeScores = null;

        if (is_array($analysis) && isset($analysis['archetype_scores'])) {
            $archetypeScores = $analysis['archetype_scores'];
        }

        // Calculate match percentages
        $withMatches = $formattedCareers->map(function($career) use ($archetypeScores) {
            // Default match percentage
            $matchPercentage = 0;

            if ($archetypeScores && !empty($career['match_archetypes'])) {
                // Find the highest score archetype match
                $highestScore = 0;
                $highestScoreArchetype = null;

                foreach ($career['match_archetypes'] as $archetype) {
                    if (isset($archetypeScores[$archetype]) && $archetypeScores[$archetype] > $highestScore) {
                        $highestScore = $archetypeScores[$archetype];
                        $highestScoreArchetype = $archetype;
                    }
                }

                // Calculate weighted match
                $totalScore = 0;
                $scoreCount = 0;

                foreach ($career['match_archetypes'] as $archetype) {
                    if (isset($archetypeScores[$archetype])) {
                        $weight = ($archetype === $highestScoreArchetype) ? 2.0 : 1.0;
                        $score = $archetypeScores[$archetype];
                        $totalScore += $score * $weight;
                        $scoreCount += $weight;
                    }
                }

                if ($scoreCount > 0) {
                    $matchPercentage = (int)round($totalScore / $scoreCount);
                }
            }

            return array_merge($career, ['match_percentage' => $matchPercentage]);
        });

        return response()->json([
            'student_data' => [
                'archetype_code' => $studentProfile->archetype_code,
                'has_archetype_scores' => !is_null($archetypeScores),
                'archetype_scores' => $archetypeScores
            ],
            'careers' => $withMatches
        ]);
    })->name('test-match');

    // Debug route for career matching
    Route::get('/debug-careers', function() {
        $user = Auth::user();
        $studentProfile = $user->studentProfile;

        // Get a few careers with their relationships
        $careers = \App\Models\Career::with(['skills', 'futurePaths', 'archetypes'])->take(5)->get();

        // Format the careers data for the frontend
        $formattedCareers = $careers->map(function($career) {
            return [
                'id' => $career->id,
                'title' => $career->title,
                'description' => $career->description,
                'match_archetypes' => $career->archetypes->pluck('code')->toArray()
            ];
        });

        // Test match percentage calculation
        if ($studentProfile && $studentProfile->analysis) {
            $analysis = $studentProfile->analysis;
            $archetypeScores = $analysis['archetype_scores'] ?? null;

            if ($archetypeScores) {
                foreach ($formattedCareers as &$career) {
                    // Get the average score of the career's matching archetypes
                    $totalScore = 0;
                    $scoreCount = 0;

                    foreach ($career['match_archetypes'] as $index => $archetype) {
                        // Check if this archetype has a score in the profile
                        if (isset($archetypeScores[$archetype])) {
                            // Primary archetype (first in the list) gets more weight
                            $weight = ($index === 0) ? 2 : 1;
                            $totalScore += $archetypeScores[$archetype] * $weight;
                            $scoreCount += $weight;
                        }
                    }

                    // Calculate weighted average if we have scores
                    if ($scoreCount > 0) {
                        $career['match_percentage'] = round($totalScore / $scoreCount);
                    } else {
                        $career['match_percentage'] = 40; // Default match percentage
                    }
                }
            }
        }

        // Return raw data as JSON for debugging
        return response()->json([
            'student_profile' => [
                'id' => $studentProfile->id,
                'archetype_code' => $studentProfile->archetype_code,
                'has_analysis' => !empty($studentProfile->analysis),
                'analysis_type' => gettype($studentProfile->analysis),
                'has_archetype_scores' => !empty($archetypeScores)
            ],
            'careers' => $formattedCareers
        ]);
    })->name('debug-careers');

    // Simple test route to check serialization of match percentage
    Route::get('/test-match', function() {
        // Create a test career with match percentage
        $career = [
            'id' => 999,
            'title' => 'Test Career',
            'description' => 'This is a test',
            'match_percentage' => 75
        ];

        // Log and return as JSON
        \Illuminate\Support\Facades\Log::info('Test match percentage', [
            'career' => $career,
            'match_percentage' => $career['match_percentage'],
            'match_percentage_type' => gettype($career['match_percentage'])
        ]);

        return response()->json($career);
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        $studentProfile = $user->studentProfile;

        // Get quests data if available
        $quests = [];
        if ($studentProfile) {
            $questProgresses = $studentProfile->questProgresses()
                ->with('quest')
                ->get();

            $quests = $questProgresses->map(function($progress) {
                return [
                    'id' => $progress->quest->id,
                    'title' => $progress->quest->title,
                    'description' => $progress->quest->description,
                    'xp_reward' => $progress->quest->xp_reward,
                    'progress' => $progress->progress_percentage,
                    'is_complete' => $progress->is_complete
                ];
            });
        }

        // Get XP activity data
        $xpActivity = [];
        if ($studentProfile) {
            $xpLogs = $studentProfile->xPLogs()
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(xp) as daily_xp'))
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->limit(14)
                ->get();

            $xpActivity = $xpLogs->map(function($log) {
                return [
                    'date' => $log->date,
                    'xp' => $log->daily_xp
                ];
            });
        }

        return Inertia::render('dashboard', [
            'studentProfile' => $studentProfile,
            'quests' => $quests,
            'xp_activity' => $xpActivity
        ]);
    })->name('dashboard');
});

Route::middleware('auth:sanctum')->controller(ApplicationController::class)->group(function () {
    Route::get('/applications/view', 'view_applications');
    Route::post('/applications/cancel', 'cancel_application');
    Route::post('/applications/create','make_application');
});

Route::controller(UniversityController::class)->group(function () {
    Route::get('/applications/view', 'view_applications');
    Route::post('/applications/accept', 'accept_application');
    Route::post('/applications/reject', 'reject_application');
    Route::post('/applications/review', 'set_application_to_review');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::resource('programmes', App\Http\Controllers\ProgrammeController::class);
Route::resource('applications', App\Http\Controllers\ApplicationController::class);
Route::resource('skill-nodes', App\Http\Controllers\SkillNodeController::class);
Route::resource('quests', App\Http\Controllers\QuestController::class);
Route::resource('squads', App\Http\Controllers\SquadController::class);
Route::resource('events', App\Http\Controllers\EventController::class);

Route::get('/documentation', function () {
    return view('documentation');
})->name('documentation');
