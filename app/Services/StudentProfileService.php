<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\StudentProfile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StudentProfileService
{
    protected $openAiApiKey;

    public function __construct()
    {
        $this->openAiApiKey = config('services.openai.api_key');
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

            // Create or update student profile
            return StudentProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'hexad_type' => $analysis['hexad_type'] ?? null,
                    'archetype_code' => $analysis['archetype_code'] ?? null,
                    'school' => $analysis['school'] ?? null,
                    'date_of_birth' => $analysis['date_of_birth'] ?? null,
                    'parent_contact_email' => $analysis['parent_contact_email'] ?? null,
                    'analysis' => $analysis['analysis'] ?? null,
                    'consent_at' => now(),
                ]
            );
        } catch (\Exception $e) {
            Log::error('Profile Analysis Error: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function getAiAnalysis(string $ocrText): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->openAiApiKey,
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an expert in analyzing student academic records and determining their learning archetype. Analyze the provided text and return a JSON object with the following structure: {
                        "hexad_type": "one of: philanthropist, socialiser, free_spirit, achiever, player, disruptor",
                        "archetype_code": "a 5-character code representing the student\'s archetype",
                        "school": "extracted school name if available",
                        "date_of_birth": "YYYY-MM-DD format if available",
                        "parent_contact_email": "if available",
                        "analysis": {
                            "learning_style": "description of learning style",
                            "strengths": ["list of strengths"],
                            "challenges": ["list of challenges"],
                            "recommended_approaches": ["list of recommended learning approaches"]
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
} 