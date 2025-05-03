<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\University;
use App\Models\Application;
use Exception;

class UniversityController extends Controller
{
    //

    public function view_applications(Request $request) {
        try{
            $the_current_university = University::where("user_id",$request->user()->id)->first();
            $all_applications = Application::where("university_id",$the_current_university->id)->get();

            if($all_applications->isNotEmpty()) {
                return response()->json(['success'=>true,'applications'=>$all_applications]);
            }

            return response()->json(['success'=>false,'details'=>'No Applications']);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

    public function accept_application(Request $request) {
        try {
            $the_current_university = University::where("user_id", $request->user()->id)->first();

            $application = Application::where('university_id', $the_current_university->id)
                                      ->where('id', $request->application_id) // Assume you pass application_id
                                      ->first();

            if ($application) {
                $application->status = 'accepted';
                $application->save();

                return response()->json(['success' => true, 'application' => $application]);
            }

            return response()->json(['success' => false, 'details' => 'Application not found']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'details' => $e->getMessage()]);
        }
    }

    public function reject_application(Request $request) {
        try {
            $the_current_university = University::where("user_id", $request->user()->id)->first();

            $application = Application::where('university_id', $the_current_university->id)
                                      ->where('id', $request->application_id) 
                                      ->first();

            if ($application) {
                // Change the status to 'rejected'
                $application->status = 'rejected';
                $application->save();

                return response()->json(['success' => true, 'application' => $application]);
            }

            return response()->json(['success' => false, 'details' => 'Application not found']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'details' => $e->getMessage()]);
        }
    }

    public function set_application_to_review(Request $request) {
        try {
            $the_current_university = University::where("user_id", $request->user()->id)->first();

            $application = Application::where('university_id', $the_current_university->id)
                                      ->where('id', $request->application_id)
                                      ->first();

            if ($application) {
                // Change the status to 'review'
                $application->status = 'review';
                $application->save();

                return response()->json(['success' => true, 'application' => $application]);
            }

            return response()->json(['success' => false, 'details' => 'Application not found']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'details' => $e->getMessage()]);
        }
    }
}
