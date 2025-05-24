<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SafeBrowsingController extends Controller
{
    public function checkWebsiteSafety(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|string|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid URL format. Please enter a valid web address.',
                'errors' => $validator->errors()
            ], 422);
        }

        $url = $request->input('url');
        $googleApiKey = env('SAFE_BROWSING_API_KEY', '');

        if (empty($googleApiKey)) {
            Log::error('Google Safe Browsing API key is not configured');
            return response()->json([
                'success' => false,
                'message' => 'API key not configured. Please contact the administrator.',
            ], 500);
        }

        try {
            $response = Http::post("https://safebrowsing.googleapis.com/v4/threatMatches:find?key={$googleApiKey}", [
                'client' => [
                    'clientId' => 'yourcompany',
                    'clientVersion' => '1.0.0',
                ],
                'threatInfo' => [
                    'threatTypes' => ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
                    'platformTypes' => ['ANY_PLATFORM'],
                    'threatEntryTypes' => ['URL'],
                    'threatEntries' => [
                        ['url' => $url],
                    ],
                ],
            ]);

            Log::info('Google Safe Browsing API Response', ['response' => $response->json()]);

            if ($response->successful()) {
                $data = $response->json();
                $matches = $data['matches'] ?? [];
                
                if (empty($matches)) {
                    return response()->json([
                        'success' => true,
                        'isSafe' => true,
                        'details' => ''
                    ]);
                } else {
                    $threatTypes = array_map(function($match) {
                        return $match['threatType'] ?? 'unknown threat';
                    }, $matches);
                    
                    $uniqueThreats = array_unique($threatTypes);
                    $threatList = implode(', ', $uniqueThreats);
                    
                    return response()->json([
                        'success' => true,
                        'isSafe' => false,
                        'details' => "This website is flagged for: {$threatList}.",
                        'threats' => $matches
                    ]);
                }
            } else {
                Log::error('Google Safe Browsing API request failed', [
                    'status' => $response->status(),
                    'response' => $response->body()
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Could not check website safety at this time. Please try again later.',
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Exception when checking website safety', ['error' => $e->getMessage()]);
            
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while checking the website safety. Please try again later.',
            ], 500);
        }
    }
}