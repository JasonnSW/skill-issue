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
            $apiKey = env('GEMINI_AI_KEY');;

            if (!$apiKey) {
                Log::error('Gemini API key not found in environment variables');
                return response()->json([
                    'message' => 'API key configuration error',
                    'isTrue' => null
                ], 500);
            }

            // Prepare the prompt for Gemini
            $prompt = "Anda adalah sistem pengecek fakta. Analisislah pernyataan berikut dan tentukan apakah pernyataan tersebut akurat secara faktual." .
                "Jawab HANYA dengan 'true' jika pernyataan tersebut benar secara faktual, atau 'false' jika pernyataan tersebut salah atau menyesatkan: "  .
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
                if (strtolower(trim($aiResponse)) === 'true' || strtolower(trim($aiResponse)) === 'false') {

                }
                $isTrue = strtolower(trim($aiResponse)) === 'true';

                return response()->json([
                    'message' => $result,
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