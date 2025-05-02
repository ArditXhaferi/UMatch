<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\StudentProfile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class StudentProfileService
{
    protected $openAiApiKey;
    protected $archetypes;

    public function __construct()
    {
        $this->openAiApiKey = config('services.openai.api_key');
        $this->archetypes = DB::table('archetypes')->get();
    }

    public function analyzeAndCreateProfile(User $user, array $ocrResults): StudentProfile
    {
        try {
            // Prepare the OCR text for analysis
            $ocrText = collect($ocrResults)
                ->pluck('ocr_result.text')
                ->filter()
                ->join("\n");

            // Get AI analysis
            $analysis = $this->getAiAnalysis($ocrText);

            // Create or update student profile with only non-empty values
            $profile = StudentProfile::firstOrNew(['user_id' => $user->id]);
            
            if (!empty($analysis['primary_archetype'])) {
                $profile->hexad_type = $analysis['primary_archetype'];
            }
            if (!empty($analysis['archetype_code'])) {
                $profile->archetype_code = $analysis['archetype_code'];
            }
            if (!empty($analysis['school'])) {
                $profile->school = $analysis['school'];
            }
            if (!empty($analysis['date_of_birth']) && $analysis['date_of_birth'] !== 'Not available') {
                try {
                    $date = \DateTime::createFromFormat('Y-m-d', $analysis['date_of_birth']);
                    if ($date && $date->format('Y-m-d') === $analysis['date_of_birth']) {
                        $profile->date_of_birth = $analysis['date_of_birth'];
                    }
                } catch (\Exception $e) {
                    Log::warning('Invalid date format received: ' . $analysis['date_of_birth']);
                }
            }
            if (!empty($analysis['parent_contact_email'])) {
                $profile->parent_contact_email = $analysis['parent_contact_email'];
            }
            
            $profile->consent_at = now();
            $profile->analysis = $analysis['analysis'] ?? [];
            
            $profile->save();

            return $profile;
        } catch (\Exception $e) {
            Log::error('Profile Analysis Error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function getAiAnalysis(string $ocrText): array
    {
        // Prepare archetype information for the prompt
        $archetypeInfo = $this->archetypes->map(function ($archetype) {
            return [
                'code' => $archetype->code,
                'name' => $archetype->name,
                'faculty' => $archetype->faculty,
                'majors' => json_decode($archetype->majors, true)
            ];
        })->toArray();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->openAiApiKey,
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an expert in analyzing student academic records and determining their archetype based on the following archetypes: ' . json_encode($archetypeInfo) . '. Analyze the provided text and return a JSON object with the following structure: {
                        "primary_archetype": "one of the archetype names from the provided list",
                        "archetype_code": "the corresponding archetype code",
                        "school": "extracted school name if available",
                        "date_of_birth": "YYYY-MM-DD format if available",
                        "parent_contact_email": "if available",
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
                            "type_description": "detailed description of why this archetype matches the student",
                            "learning_style": "how this archetype best learns",
                            "recommended_majors": ["list of recommended majors from the archetype\'s majors"],
                            "study_techniques": ["list of effective study techniques for this archetype"]
                        }
                    }'
                ],
                [
                    'role' => 'user',
                    'content' => $ocrText
                ]
            ],
            'temperature' => 0.7,
            'response_format' => ['type' => 'json_object']
        ]);

        if (!$response->successful()) {
            throw new \Exception('OpenAI API request failed: ' . $response->body());
        }

        return json_decode($response->json()['choices'][0]['message']['content'], true);
    }

    protected function createOrUpdateProfile(array $data, ?User $user = null): StudentProfile
    {
        $profile = StudentProfile::firstOrNew(['user_id' => $user?->id]);

        // Only update fields if they have values
        if (!empty($data['date_of_birth'])) {
            $profile->date_of_birth = $data['date_of_birth'];
        }
        if (!empty($data['school'])) {
            $profile->school = $data['school'];
        }
        if (!empty($data['hexad_type'])) {
            $profile->hexad_type = $data['hexad_type'];
        }
        if (!empty($data['archetype_code'])) {
            $profile->archetype_code = $data['archetype_code'];
        }
        if (!empty($data['parent_contact_email'])) {
            $profile->parent_contact_email = $data['parent_contact_email'];
        }
        
        $profile->consent_at = now();
        $profile->analysis = $data['analysis'] ?? [];
        
        $profile->save();

        return $profile;
    }
} 