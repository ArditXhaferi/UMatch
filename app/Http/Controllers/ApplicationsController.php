<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\StudentProfile;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Exception;

class ApplicationsController extends Controller
{
    //

    // 'student_profile_id',
    //     'programme_id',
    //     'status',
    //     'submitted_at',
    //     'pdf_path',

    public function make_application(Request $request) {
        $validated_data = Validator::make($request->all(),[
            "university_id" => "required",
            "programme_id" => "required",
            "note" => "required"
        ]);



        if($validated_data->fails()) {
            return response()->json(['success'=>false,'details'=>'Enter Programm To Apply']);
        }

        try{
            $student_profile = StudentProfile::where("user_id",$request->user()->id)->first();

            $the_new_application_instance = Application::create([
                'student_profile_id' => $student_profile->id,
                'university_id' => (int)$request->university_id,
                'programme_id' => $request->programme_id,
                'submitted_at' => Carbon::now(),
                'note' => $request->note
            ]);

            if($the_new_application_instance) {
                return response()->json(['success'=>true,'details'=>'application_created','application'=>$the_new_application_instance]);
            }

            return response()->json(['success'=>false,'details'=>"Application Creation Went Wrong!"]);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

    public function view_applications(Request $request) {
        try{
            $student_profile = StudentProfile::where("user_id",$request->user()->id)->first();
            $all_applications = Application::where("student_profile_id",$student_profile->id)->get();

            if($all_applications->isNotEmpty()) {
                return response()->json(['success'=>true,'applications'=>$all_applications]);
            }

            return response()->json(['success'=>false,'details'=>'No Applications']);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

    public function cancel_application(Request $request){
        try {
            $student_profile = StudentProfile::where("user_id", $request->user()->id)->first();

            $request->validate([
                'application_id' => 'required|integer'
            ]);

            $application = Application::where("student_profile_id", $student_profile->id)
                                    ->where("id", $request->application_id)
                                    ->first();

            if (!$application) {
                return response()->json(['success' => false, 'details' => 'Application not found']);
            }

            $application->delete();

            return response()->json(['success' => true, 'details' => 'Application cancelled successfully']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'details' => $e->getMessage()]);
        }
    }
}
