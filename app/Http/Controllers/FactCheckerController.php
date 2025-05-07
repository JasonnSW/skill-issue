<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FactCheckerController extends Controller
{
    /**
     * Verify if a statement is true using Gemini AI
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyFact(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
        ]);

        try {
            // Get the API key from environment variables
            $apiKey = env('AIzaSyAZU00yA-RHr5iREluFb3z4oh80XwYrdhs');

            if (!$apiKey) {
                Log::error('Gemini API key not found in environment variables');
                return response()->json([
                    'message' => 'API key configuration error',
                    'isTrue' => null
                ], 500);
            }

            // Prepare the prompt for Gemini
            $prompt = "You are a fact-checking system. Analyze the following statement and determine if it is factually accurate. " .
                "Respond with ONLY 'true' if the statement is factually correct, or 'false' if it is incorrect or misleading: " .
                $validated['text'];

            // Make request to Gemini AI API
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0,
                    'topP' => 0.1,
                    'maxOutputTokens' => 10,
                ]
            ]);

            // Check if the request was successful
            if ($response->successful()) {
                $result = $response->json();
                $aiResponse = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';

                // Process the response to determine true/false
                $isTrue = strtolower(trim($aiResponse)) === 'true';

                return response()->json([
                    'isTrue' => $isTrue,
                ]);
            } else {
                Log::error('Gemini API error: ' . $response->body());
                return response()->json([
                    'message' => 'Error communicating with AI service',
                    'isTrue' => null
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Exception in fact verification: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while processing your request',
                'isTrue' => null
            ], 500);
        }
    }

}