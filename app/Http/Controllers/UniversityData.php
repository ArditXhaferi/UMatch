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
        try{
            $all_instances = University::all();

            $the_user_profile = StudentProfile::where("user_id",2)->first();

            $the_user_profile = $the_user_profile ? $the_user_profile->toArray() : [];

            $the_user_archetypes = $this->sort_archetypes($the_user_profile['analysis']);

            foreach($all_instances as $university_instance) {
                $the_university_archetypes = $university_instance->archetype_percentages;

                $the_sorted_uni = $this->sort_archetypes($the_university_archetypes);


                $the_percentage = $this->calculateMatchingPercentage($the_user_archetypes,$the_sorted_uni);

                $the_percentage = $this->fixed_percentage($the_percentage);
                $the_university_percentage = [
                    'university_id' => $university_instance->id,
                    'percentage'=> $the_percentage
                ];

                if(!array_key_exists("matching",$the_user_profile)) {
                    $the_user_profile["matching"] = [$the_university_percentage];
                } else {
                    $the_user_profile["matching"][] = $the_university_percentage;
                }

            }

            return response()->json(['success'=>true,'user_profile'=>$the_user_profile]);

        } catch(Exception $e) {
            return response()->json(["success"=>false,"details"=>$e->getMessage()]);
        }
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
