<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\StudentProfile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\University;
use Exception;

class UniversityMatchProfile {
    protected $openAiApiKey;
    protected $archetypes;
    protected $university_data;

    public function __construct() {
        $this->openAiApiKey = config("services.openai.api_key");
        $this->archetypes = DB::table("archetypes")->get();
        $this->university_data = University::all();
    }

    public function finalize_analyse() {
        // add now archetypes percentages
        try{
            $the_university_data = $this->university_data->map(function($university_instance) {
                return [
                    'university_name' => $university_instance->university_name,
                    'branches_offered' => $university_instance->branches_offered,
                    'qualities_sought' => $university_instance->qualities_sought,
                    'description' => $university_instance->description
                ];
            })->toArray();

            foreach($the_university_data as $university) {
                $the_university_response = $this->getUniversityResponse($university)['analysis']['archetype_score'];

                $current_university_instance = University::find($university['id']);

                $current_university_instance->archetype_percentages = $the_university_response;
            }




        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

    public function getUniversityResponse($university_data) {
        $archetypeInfo = $this->archetypes->map(function ($archetype) {
            return [
                'code' => $archetype->code,
                'name' => $archetype->name,
                'faculty' => $archetype->faculty,
                'majors' => json_decode($archetype->majors, true)
            ];
        })->toArray();


        $the_response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => "Bearer " . $this->openAiApiKey,
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an expert in analyzing university programs and matching them to student archetypes based on the following archetypes: ' . json_encode($archetypeInfo) . '. Analyze the provided university information and return a JSON object with the following structure: {
                        "matched_archetype": "the archetype name that best aligns with the university\'s offerings",
                        "archetype_code": "the corresponding archetype code",
                        "university_name": "extracted university name",
                        "city": "city where the university is located, if available",
                        "website": "official university website, if available",
                        "analysis": {
                            "archetype_scores": {
                                "AN-VS": "percentage (0-100)",
                                "AN-EN": "percentage (0-100)",
                                "DI-CD": "percentage (0-100)",
                                "DI-CS": "percentage (0-100)",
                                "EX-BU": "percentage (0-100)",
                                "EX-PL": "percentage (0-100)",
                                "SO-ME": "percentage (0-100)",
                                "SO-ED": "percentage (0-100)",
                                "HE-MD": "percentage (0-100)",
                                "HE-BT": "percentage (0-100)",
                                "AR-DS": "percentage (0-100)",
                                "AR-FM": "percentage (0-100)",
                                "GL-DM": "percentage (0-100)",
                                "GL-TR": "percentage (0-100)",
                                "SP-AT": "percentage (0-100)",
                                "SP-EC": "percentage (0-100)"
                            },
                            "reasoning": "detailed explanation of why this archetype is a good match for the university",
                            "relevant_programs": ["list of university programs that align with the archetype\'s strengths"],
                            "ideal_student_traits": ["list of student qualities that would thrive at this university"],
                            "career_pathways_supported": ["list of potential career paths that the university prepares students for, relevant to this archetype"]
                        }
                    }'
                ],
                [
                    'role' => 'user',
                    'content' => $university_data
                ]
                ],
                'temperature' => 0.7,
                'response_format' => ['type' => 'json_object']
        ]);


        if(!$the_response->successful()){
            throw new Exception("Response Went Wrong!");
        }

        return json_decode($the_response->json()['choices'][0]['message']['content'], true);

    }

}

?>
