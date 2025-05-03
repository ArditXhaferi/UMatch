<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\University;
use App\Models\StudentProfile;
// use App\Services\analyzeAndCreateProfile
use App\Services\StudentProfileService;
use App\Models\User;
use Exception;

class UniversityData extends Controller
{
    //

 
    public function matchUsersWithUniversity(Request $request) {
        try {
            $user = $request->user();
            $studentProfile = $user->studentProfile;

            if (!$studentProfile || !$studentProfile->analysis) {
                \Illuminate\Support\Facades\Log::info('No student profile or analysis data found', [
                    'user_id' => $user->id,
                    'has_profile' => !is_null($studentProfile),
                    'has_analysis' => $studentProfile ? !is_null($studentProfile->analysis) : false
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'No student profile or analysis data found'
                ]);
            }

            \Illuminate\Support\Facades\Log::info('Student profile analysis data', [
                'profile_id' => $studentProfile->id,
                'archetype_code' => $studentProfile->archetype_code,
                'analysis' => $studentProfile->analysis
            ]);

            $universities = University::all();
            $matches = [];

            foreach ($universities as $university) {
                $matchPercentage = $this->calculateMatchPercentage(
                    $studentProfile->analysis['archetype_scores'],
                    $university->archetype_percentages
                );

                \Illuminate\Support\Facades\Log::info('University match calculation', [
                    'university_id' => $university->id,
                    'university_name' => $university->university_name,
                    'match_percentage' => $matchPercentage,
                    'student_archetypes' => $studentProfile->analysis['archetype_scores'],
                    'university_archetypes' => $university->archetype_percentages
                ]);

                $matches[] = [
                    'id' => $university->id,
                    'university_name' => $university->university_name,
                    'city' => $university->city,
                    'description' => $university->description,
                    'website' => $university->website,
                    'logo' => $university->logo,
                    'image' => $university->image,
                    'branches_offered' => $university->branches_offered,
                    'qualities_sought' => $university->qualities_sought,
                    'match_percentage' => $matchPercentage
                ];
            }

            // Sort matches by percentage in descending order
            usort($matches, function($a, $b) {
                return $b['match_percentage'] - $a['match_percentage'];
            });

            \Illuminate\Support\Facades\Log::info('Final university matches', [
                'total_matches' => count($matches),
                'top_matches' => array_slice($matches, 0, 3)
            ]);

            return response()->json([
                'success' => true,
                'matches' => array_values($matches) // Ensure we return a JSON array, not an object
            ]);

        } catch(Exception $e) {
            \Illuminate\Support\Facades\Log::error('Error in matchUsersWithUniversity', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    protected function calculateMatchPercentage($studentArchetypes, $universityArchetypes) {
        if (!$studentArchetypes || !$universityArchetypes) {
            \Illuminate\Support\Facades\Log::info('Missing archetype data', [
                'has_student_archetypes' => !is_null($studentArchetypes),
                'has_university_archetypes' => !is_null($universityArchetypes)
            ]);
            return 0;
        }

        \Illuminate\Support\Facades\Log::info('Calculating match percentage', [
            'student_archetypes' => $studentArchetypes,
            'university_archetypes' => $universityArchetypes
        ]);

        $totalScore = 0;
        $maxScore = 0;
        $matchCount = 0;

        foreach ($studentArchetypes as $archetype => $studentScore) {
            if (isset($universityArchetypes[$archetype])) {
                $universityScore = $universityArchetypes[$archetype];
                
                // Calculate similarity between student and university scores
                $similarity = 100 - abs($studentScore - $universityScore);
                
                // Weight higher scores more heavily
                $weight = ($studentScore >= 70 || $universityScore >= 70) ? 1.5 : 1.0;
                
                $totalScore += $similarity * $weight;
                $maxScore += 100 * $weight;
                $matchCount++;
            }
        }

        if ($maxScore === 0 || $matchCount === 0) {
            \Illuminate\Support\Facades\Log::info('No matching archetypes found');
            return 0;
        }

        $matchPercentage = round(($totalScore / $maxScore) * 100);

        \Illuminate\Support\Facades\Log::info('Match percentage calculated', [
            'total_score' => $totalScore,
            'max_score' => $maxScore,
            'match_count' => $matchCount,
            'match_percentage' => $matchPercentage
        ]);

        return $matchPercentage;
    }

    public function sort_archetypes($university_archetypes) {
        $NUMBER_OF_ARCHETYPES = 0;
        $the_archetypes = [];
        arsort($university_archetypes);

        foreach($university_archetypes as $key => $archetype) {
            $the_archetypes[] = [$key => $university_archetypes[$key]];


            $NUMBER_OF_ARCHETYPES += 1;
            if($NUMBER_OF_ARCHETYPES == 10) {
                break;
            }
        }

        return $the_archetypes;
    }

    function calculateMatchingPercentage($user_archetypes, $university_archetypes) {
        $match_score = 0;

        foreach ($user_archetypes as $user_item) {
            $user_key = array_key_first($user_item);

            foreach ($university_archetypes as $university_item) {
                $uni_key = array_key_first($university_item);

                if ($user_key === $uni_key) {
                    $match_score += 10;
                    break;
                }
            }
        }

        return $match_score;
    }

    public function fixed_percentage(int $the_percentage) {
        $random_integer = rand(1,7);
        $random_num = rand(0,1);

        if($random_num % 2 == 0) {
            $the_percentage += $random_integer;
        } else{
            $the_percentage -= $random_integer;
        }

        return $the_percentage;
    }

}
