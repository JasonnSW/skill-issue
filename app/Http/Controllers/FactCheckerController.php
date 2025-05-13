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
        $validated = $request->validate([
            'text' => 'required|string|max:1000',
        ]);

        try {
            $apiKey = 'AIzaSyAZU00yA-RHr5iREluFb3z4oh80XwYrdhs';

            if (!$apiKey) {
                Log::error('Gemini API key not found in environment variables');
                return response()->json([
                    'message' => 'API key configuration error',
                    'isTrue' => null
                ], 500);
            }

            $prompt = "Anda adalah sistem pengecek fakta. Analisislah pernyataan berikut dan tentukan apakah pernyataan tersebut akurat secara faktual." .
                "Jawab HANYA dengan 'true' jika pernyataan tersebut benar secara faktual, atau 'false' jika pernyataan tersebut salah atau menyesatkan: " .
                $validated['text'];

            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent?key={$apiKey}", [
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

            if ($response->successful()) {
                $result = $response->json();
                $aiResponse = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';

                if (isset($result['candidates'][0]['finishReason']) && $result['candidates'][0]['finishReason'] === 'MAX_TOKENS') {
                    // Return a specific response for token limit reached
                    return response()->json([
                        'message' => 'The AI model reached its token limit. Please try a simpler statement.',
                        'isTrue' => null,
                        'tokenLimitReached' => true
                    ], 200);
                }

                $isTrue = strtolower(trim($aiResponse)) === 'true';

                return response()->json([
                    'message'=> $result,
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