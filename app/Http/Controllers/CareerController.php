<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\SkillTree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CareerController extends Controller
{
    /**
     * Display a listing of careers.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $studentProfile = $user->studentProfile;
        
        // Ensure studentProfile has an archetype_code
        if ($studentProfile && empty($studentProfile->archetype_code)) {
            // Log for debugging
            Log::info('Student profile found but missing archetype_code', [
                'user_id' => $user->id,
                'student_profile_id' => $studentProfile->id,
            ]);
        }
        
        // Get all careers with their relationships
        $careers = Career::with(['skills', 'futurePaths', 'archetypes'])->get();
        
        // Format the careers data for the frontend
        $formattedCareers = [];
        
        // Manually build the careers array to ensure all properties are included
        foreach ($careers as $career) {
            $careerData = [
                'id' => $career->id,
                'title' => $career->title,
                'description' => $career->description,
                'salary_range' => $career->salary_range,
                'growth_rate' => $career->growth_rate,
                'education' => $career->education,
                'skills' => $career->skills->pluck('skill')->toArray(),
                'future_paths' => $career->futurePaths->map(function($path) {
                    return [
                        'title' => $path->title,
                        'years' => $path->years,
                        'salary' => $path->salary
                    ];
                })->toArray(),
                'match_archetypes' => $career->archetypes->pluck('code')->toArray(),
                'match_percentage' => 0 // Initialize with default value
            ];
            
            $formattedCareers[] = $careerData;
        }
        
        // Convert to collection for easier manipulation
        $formattedCareers = collect($formattedCareers);
        
        // Calculate career match if student profile exists
        if ($studentProfile) {
            // Check if we have analysis data with archetype_scores
            $analysis = $studentProfile->analysis;
            
            // Log the raw analysis data for debugging
            Log::debug('Student profile raw analysis data:', [
                'student_id' => $studentProfile->id,
                'raw_analysis' => $analysis,
                'analysis_type' => gettype($analysis),
                'analysis_keys' => is_array($analysis) || is_object($analysis) ? array_keys((array)$analysis) : 'not an array or object'
            ]);
            
            // Try different ways to access archetype_scores depending on data structure
            $archetypeScores = null;
            
            if (is_array($analysis) && isset($analysis['archetype_scores'])) {
                $archetypeScores = $analysis['archetype_scores'];
                Log::debug('Found archetype_scores as array key');
            } 
            else if (is_object($analysis) && isset($analysis->archetype_scores)) {
                $archetypeScores = $analysis->archetype_scores;
                Log::debug('Found archetype_scores as object property');
            }
            else if (is_string($analysis)) {
                // Try to parse JSON if it's a string
                $decodedAnalysis = json_decode($analysis, true);
                if (json_last_error() === JSON_ERROR_NONE && isset($decodedAnalysis['archetype_scores'])) {
                    $archetypeScores = $decodedAnalysis['archetype_scores'];
                    Log::debug('Found archetype_scores after JSON decoding');
                }
            }
            
            // Hard-code the archetype scores for testing if not found
            if (!$archetypeScores) {
                Log::warning('Could not find archetype_scores, using test data');
                $archetypeScores = [
                    'AN-EN' => 35,
                    'AN-VS' => 45,
                    'AR-DS' => 45,
                    'AR-FM' => 30,
                    'DI-CD' => 75,
                    'DI-CS' => 90,
                    'EX-BU' => 40,
                    'EX-PL' => 30,
                    'GL-DM' => 25,
                    'GL-TR' => 20,
                    'HE-BT' => 35,
                    'HE-MD' => 15,
                    'SO-ED' => 20,
                    'SO-ME' => 25,
                    'SP-AT' => 15,
                    'SP-EC' => 25
                ];
            }
            
            // Log analysis data for debugging
            Log::debug('Student profile analysis data:', [
                'student_id' => $studentProfile->id,
                'has_analysis' => !is_null($analysis),
                'has_archetype_scores' => !is_null($archetypeScores),
                'archetype_code' => $studentProfile->archetype_code,
                'archetype_scores' => $archetypeScores
            ]);
            
            foreach ($formattedCareers as $index => $career) {
                // Default match percentage if no analysis data is available
                $matchPercentage = 40;
                
                // Add debugging for this specific career
                Log::debug('Processing career match', [
                    'career_title' => $career['title'],
                    'match_archetypes' => $career['match_archetypes'],
                    'has_archetype_scores' => !is_null($archetypeScores)
                ]);
                
                // Calculate match percentage based on archetype scores if available
                if ($archetypeScores && !empty($career['match_archetypes'])) {
                    // Get the average score of the career's matching archetypes
                    $totalScore = 0;
                    $scoreCount = 0;
                    
                    // Track matches for debugging
                    $matchDetails = [];
                    
                    // Find the highest score archetype match to use as primary
                    $highestScore = 0;
                    $highestScoreArchetype = null;
                    
                    // First, find the archetype with the highest score
                    foreach ($career['match_archetypes'] as $archetype) {
                        if (isset($archetypeScores[$archetype]) && $archetypeScores[$archetype] > $highestScore) {
                            $highestScore = $archetypeScores[$archetype];
                            $highestScoreArchetype = $archetype;
                        }
                    }
                    
                    // Now calculate scores, giving double weight to the highest-scoring archetype
                    foreach ($career['match_archetypes'] as $archetype) {
                        // Check if this archetype has a score in the profile
                        if (isset($archetypeScores[$archetype])) {
                            // Give double weight to the highest-scoring archetype
                            $weight = ($archetype === $highestScoreArchetype) ? 2.0 : 1.0;
                            $score = $archetypeScores[$archetype];
                            $weightedScore = $score * $weight;
                            
                            $totalScore += $weightedScore;
                            $scoreCount += $weight;
                            
                            // Record this match for debugging
                            $matchDetails[] = [
                                'archetype' => $archetype,
                                'score' => $score,
                                'weight' => $weight,
                                'weighted_score' => $weightedScore,
                                'is_highest' => ($archetype === $highestScoreArchetype)
                            ];
                        }
                    }
                    
                    // Calculate weighted average if we have scores
                    if ($scoreCount > 0) {
                        $matchPercentage = (int)round($totalScore / $scoreCount);
                        
                        // Debug the calculation
                        Log::debug('Match calculation for ' . $career['title'], [
                            'total_score' => $totalScore,
                            'score_count' => $scoreCount,
                            'match_percentage' => $matchPercentage,
                            'match_details' => $matchDetails ?? []
                        ]);
                    } else {
                        // No matching archetypes found with scores
                        Log::debug('No matching archetypes with scores for ' . $career['title']);
                    }
                } 
                // Fall back to the previous algorithm if no analysis data is available
                else if (!empty($studentProfile->archetype_code) && !empty($career['match_archetypes'])) {
                    // Primary match: student's archetype code matches career's primary archetype (first in array)
                    if ($career['match_archetypes'][0] === $studentProfile->archetype_code) {
                        $matchPercentage = 90; // 90% match for primary archetype
                    } 
                    // Secondary match: student's archetype code matches any career archetype
                    else if (in_array($studentProfile->archetype_code, $career['match_archetypes'])) {
                        $matchPercentage = 75; // 75% match for secondary archetypes
                    } 
                    // Partial match: first two characters of student's archetype code match any career archetype
                    else {
                        $studentArchetypePrefix = explode('-', $studentProfile->archetype_code)[0];
                        
                        foreach ($career['match_archetypes'] as $archetype) {
                            $archetypePrefix = explode('-', $archetype)[0];
                            if ($archetypePrefix === $studentArchetypePrefix) {
                                $matchPercentage = 60; // 60% match for partial category match
                                break;
                            }
                        }
                    }
                    
                    // Debug legacy algorithm
                    Log::debug('Used legacy match algorithm for ' . $career['title'] . ': ' . $matchPercentage . '%');
                }

                // Ensure match_percentage stays in 0-100 range and is set    
                $career['match_percentage'] = max(0, min(100, $matchPercentage));
                
                Log::debug('Final match percentage for career', [
                    'career_title' => $career['title'],
                    'match_percentage' => $career['match_percentage']
                ]);

                // Persist changes back to the collection
                $formattedCareers[$index] = $career;
            }
            
            // Sort by match percentage *before* converting to array
            $formattedCareers = $formattedCareers->sortByDesc('match_percentage')->values();
            
            // Convert collection to array to ensure changes persist
            $formattedCareers = $formattedCareers->map(function($career) {
                return (array)$career;
            })->all();

            // Log some debug information about match percentages
            if ($studentProfile) {
                // Ensure we have a Collection instance for convenience methods
                $careersCollection = collect($formattedCareers);
                $matchStats = [
                    'profile_archetype' => $studentProfile->archetype_code,
                    'has_analysis_data' => isset($analysis) && !is_null($analysis),
                    'has_archetype_scores' => isset($archetypeScores) && !is_null($archetypeScores),
                    'total_careers' => $careersCollection->count(),
                    'careers_with_match' => $careersCollection->filter(function($career) {
                        return isset($career['match_percentage']);
                    })->count(),
                    'match_percentages' => $careersCollection->take(5)->map(function($career) use ($archetypeScores) {
                        $archetypeDetails = [];
                        
                        // Include detailed archetype scores if available
                        if (!empty($archetypeScores) && !empty($career['match_archetypes'])) {
                            foreach ($career['match_archetypes'] as $index => $archetype) {
                                $archetypeDetails[$archetype] = [
                                    'position' => $index === 0 ? 'primary' : 'secondary',
                                    'student_score' => $archetypeScores[$archetype] ?? 'not available',
                                ];
                            }
                        }
                        
                        return [
                            'title' => $career['title'],
                            'match_percentage' => $career['match_percentage'] ?? null,
                            'archetypes' => $career['match_archetypes'],
                            'archetype_details' => $archetypeDetails,
                        ];
                    })->toArray()
                ];
                Log::debug('Career match percentages calculated', $matchStats);
            }
            
            // Make sure we convert the collection to a plain array for serialization
            $serializedCareers = [];
            foreach ($formattedCareers as $career) {
                // Debug this specific career match percentage
                if (isset($career['match_percentage'])) {
                    Log::debug('Career for serialization', [
                        'title' => $career['title'],
                        'match_percentage_before' => $career['match_percentage'],
                        'match_percentage_type' => gettype($career['match_percentage'])
                    ]);
                }
                // Ensure match_percentage is an integer
                $matchPercentage = isset($career['match_percentage']) ? (int)$career['match_percentage'] : 0;
                
                $serializedCareers[] = [
                    'id' => $career['id'],
                    'title' => $career['title'],
                    'description' => $career['description'],
                    'salary_range' => $career['salary_range'],
                    'growth_rate' => $career['growth_rate'],
                    'education' => $career['education'],
                    'skills' => $career['skills'],
                    'future_paths' => $career['future_paths'],
                    'match_archetypes' => $career['match_archetypes'],
                    'match_percentage' => $matchPercentage
                ];
            }

            // Final debug check of what's being sent to the frontend
            Log::debug('Sending data to frontend', [
                'career_count' => count($serializedCareers),
                'first_career' => $serializedCareers[0] ?? null,
                'has_match_percentage' => isset($serializedCareers[0]['match_percentage']),
                'match_percentage_type' => isset($serializedCareers[0]['match_percentage']) ? gettype($serializedCareers[0]['match_percentage']) : 'not set',
                'match_percentage_value' => $serializedCareers[0]['match_percentage'] ?? 'no value',
                'raw_match_percentage' => isset($formattedCareers[0]) ? $formattedCareers[0]['match_percentage'] : 'not available'
            ]);
            
            // Final ensure match percentage is set and is an integer
            foreach ($serializedCareers as $index => &$career) {
                // Debug every 10th career to avoid log spam
                if ($index < 3 || $index % 10 === 0) {
                    Log::debug('Career before final fix', [
                        'index' => $index,
                        'title' => $career['title'],
                        'match_percentage' => $career['match_percentage'] ?? 'not set',
                        'type' => isset($career['match_percentage']) ? gettype($career['match_percentage']) : 'unknown'
                    ]);
                }
                
                // Force match_percentage to be an integer
                if (!isset($career['match_percentage']) || $career['match_percentage'] === null) {
                    $career['match_percentage'] = 0;
                } else {
                    $career['match_percentage'] = (int)$career['match_percentage'];
                }
                
                // Verify after fix
                if ($index < 3 || $index % 10 === 0) {
                    Log::debug('Career after final fix', [
                        'index' => $index,
                        'title' => $career['title'],
                        'match_percentage' => $career['match_percentage'],
                        'type' => gettype($career['match_percentage'])
                    ]);
                }
            }
            
            // Get skill tree data from database
            $skillTreeData = SkillTree::where('is_active', true)->first();
            $skillTree = null;
            
            if ($skillTreeData) {
                $skillTree = [
                    'nodes' => $skillTreeData->nodes,
                    'links' => $skillTreeData->links
                ];
            } else {
                // Fallback to default skill tree if none exists in the database
                $skillTree = [
                    'nodes' => [
                        // Core skills
                        ['id' => 'core', 'name' => 'Core Skills', 'level' => 0, 'x' => 500, 'y' => 500, 'color' => '#4ECDC4'],
                        
                        // Level 1 skill categories
                        ['id' => 'tech', 'name' => 'Technical', 'level' => 1, 'x' => 400, 'y' => 350, 'color' => '#4ECDC4'],
                        ['id' => 'biz', 'name' => 'Business', 'level' => 1, 'x' => 600, 'y' => 350, 'color' => '#4ECDC4'],
                        ['id' => 'creative', 'name' => 'Creative', 'level' => 1, 'x' => 350, 'y' => 500, 'color' => '#4ECDC4'],
                        ['id' => 'science', 'name' => 'Science', 'level' => 1, 'x' => 650, 'y' => 500, 'color' => '#4ECDC4'],
                        ['id' => 'soft', 'name' => 'Soft Skills', 'level' => 1, 'x' => 500, 'y' => 650, 'color' => '#4ECDC4'],
                        
                        // Level 2 skills
                        ['id' => 'programming', 'name' => 'Programming', 'level' => 2, 'x' => 300, 'y' => 250, 'color' => '#4ECDC4'],
                        ['id' => 'data', 'name' => 'Data Analysis', 'level' => 2, 'x' => 450, 'y' => 200, 'color' => '#4ECDC4'],
                        ['id' => 'finance', 'name' => 'Finance', 'level' => 2, 'x' => 550, 'y' => 200, 'color' => '#4ECDC4'],
                        ['id' => 'marketing', 'name' => 'Marketing', 'level' => 2, 'x' => 700, 'y' => 250, 'color' => '#4ECDC4'],
                        ['id' => 'design', 'name' => 'Design', 'level' => 2, 'x' => 250, 'y' => 450, 'color' => '#4ECDC4'],
                        ['id' => 'media', 'name' => 'Media Production', 'level' => 2, 'x' => 250, 'y' => 550, 'color' => '#4ECDC4'],
                        ['id' => 'biotech', 'name' => 'Biotechnology', 'level' => 2, 'x' => 750, 'y' => 450, 'color' => '#4ECDC4'],
                        ['id' => 'medical', 'name' => 'Medical Science', 'level' => 2, 'x' => 750, 'y' => 550, 'color' => '#4ECDC4'],
                        ['id' => 'communication', 'name' => 'Communication', 'level' => 2, 'x' => 400, 'y' => 750, 'color' => '#4ECDC4'],
                        ['id' => 'leadership', 'name' => 'Leadership', 'level' => 2, 'x' => 600, 'y' => 750, 'color' => '#4ECDC4'],
                        
                        // Level 3 skills - just a few examples
                        ['id' => 'web', 'name' => 'Web Development', 'level' => 3, 'x' => 250, 'y' => 150, 'color' => '#eeeeee'],
                        ['id' => 'mobile', 'name' => 'Mobile Development', 'level' => 3, 'x' => 350, 'y' => 150, 'color' => '#eeeeee'],
                        ['id' => 'ml', 'name' => 'Machine Learning', 'level' => 3, 'x' => 450, 'y' => 100, 'color' => '#eeeeee'],
                        ['id' => 'bi', 'name' => 'Business Intelligence', 'level' => 3, 'x' => 550, 'y' => 100, 'color' => '#eeeeee'],
                        ['id' => 'ui', 'name' => 'UI Design', 'level' => 3, 'x' => 200, 'y' => 400, 'color' => '#eeeeee'],
                        ['id' => 'ux', 'name' => 'UX Design', 'level' => 3, 'x' => 150, 'y' => 450, 'color' => '#eeeeee'],
                    ],
                    'links' => [
                        // Connect core to level 1
                        ['source' => 'core', 'target' => 'tech'],
                        ['source' => 'core', 'target' => 'biz'],
                        ['source' => 'core', 'target' => 'creative'],
                        ['source' => 'core', 'target' => 'science'],
                        ['source' => 'core', 'target' => 'soft'],
                        
                        // Connect level 1 to level 2
                        ['source' => 'tech', 'target' => 'programming'],
                        ['source' => 'tech', 'target' => 'data'],
                        ['source' => 'biz', 'target' => 'finance'],
                        ['source' => 'biz', 'target' => 'marketing'],
                        ['source' => 'creative', 'target' => 'design'],
                        ['source' => 'creative', 'target' => 'media'],
                        ['source' => 'science', 'target' => 'biotech'],
                        ['source' => 'science', 'target' => 'medical'],
                        ['source' => 'soft', 'target' => 'communication'],
                        ['source' => 'soft', 'target' => 'leadership'],
                        
                        // Connect level 2 to level 3
                        ['source' => 'programming', 'target' => 'web'],
                        ['source' => 'programming', 'target' => 'mobile'],
                        ['source' => 'data', 'target' => 'ml'],
                        ['source' => 'finance', 'target' => 'bi'],
                        ['source' => 'design', 'target' => 'ui'],
                        ['source' => 'design', 'target' => 'ux'],
                    ]
                ];
            }
            
            return Inertia::render('Careers', [
                'careers' => array_map(function($career) {
                    // Ensure match_percentage is an integer
                    if (isset($career['match_percentage'])) {
                        $career['match_percentage'] = (int)$career['match_percentage'];
                    } else {
                        $career['match_percentage'] = 0;
                    }
                    return $career;
                }, $serializedCareers),
                'studentProfile' => $studentProfile ? [
                    'id' => $studentProfile->id,
                    'hexad_type' => $studentProfile->hexad_type,
                    'archetype_code' => $studentProfile->archetype_code,
                    'xp' => $studentProfile->xp,
                    'credits' => $studentProfile->credits,
                    'school' => $studentProfile->school,
                    'analysis' => $studentProfile->analysis
                ] : null,
                'skillTree' => $skillTree
            ]);
        }
    }
}
