<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\University;
use Inertia\Inertia;
use Exception;
class UniversityDetailsPage extends Controller
{
    //
    // university_name:string,
    // image:string,
    // university_logo:string,
    // university_description:string,
    // branches_offered:string[],
    // address:string,

    public function university_details_page(Request $request) {
        try{
            $the_university_instance = University::find($request->query("university_id"));

            $the_university_data = [
                'university_name' => $the_university_instance->university_name,
                'image' => $the_university_instance->image,
                'university_logo' => $the_university_instance->logo,
                'university_description' => $the_university_instance->description,
                'branches_offered' => $the_university_instance->branches_offered,
                'address' => $the_university_instance->address,
                'website' => $the_university_instance->website
            ];

            return Inertia::render("UniversityDetailsPage",$the_university_data);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }
}
