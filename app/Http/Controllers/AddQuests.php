<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestProgress;
use App\Models\StudentProfile;
use App\Models\Quest;
use Carbon\Carbon;


use Illuminate\Support\Facades\Validator;
use Exception;

class AddQuests extends Controller
{
    //

    public function createQuest(Request $request) {
        try {
            $the_quest = Quest::first();

            $student_profile = StudentProfile::where("user_id",$request->user()->id)->first();

            $new_quest_instance = QuestProgress::create([
                'quest_id' => $the_quest->id,
                'student_profile_id' => $student_profile->id,
                'started_at' => Carbon::now()
            ]);

            if($new_quest_instance) {
                return response()->json(['success'=>true,'quest'=>$new_quest_instance]);
            }

            return response()->json(['success'=>false,'details'=>"Quest Not Created"]);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

    public function get_current_quest(Request $request) {
        try{
            $the_student_profile = StudentProfile::where("user_id",$request->user()->id)->first();
            $the_quest_progress = QuestProgress::where("student_profile_id",$the_student_profile->id)->first();


            if($the_quest_progress) {
                return response()->json(['success'=>true,'quest'=>$the_quest_progress]);
            }

            return response()->json(['success'=>false,'details'=>'no current quest','quest'=>[]]);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

    public function finnish_quest(Request $request) {
        try {
            $the_student_profile = StudentProfile::where("user_id",$request->user()->id)->first();

            $the_student_quest = QuestProgress::where("student_profile_id",$the_student_profile->id)->first();

            $the_current_quest = Quest::where("id",$the_student_quest->quest_id)->first();

            $the_last_quest = Quest::latest()->first();

            if($the_current_quest->id == $the_last_quest->id) {
                return response()->json(['success'=>true,'details'=>'Quests Finnished']);
            }

            $the_next_quest = Quest::where("id",$the_current_quest + 1)->first();

            $the_student_quest->quest_id = $the_next_quest->id;

            $the_student_quest->save();

            return response()->json(['success'=>true,'next_quest'=>$the_next_quest]);


        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

}
