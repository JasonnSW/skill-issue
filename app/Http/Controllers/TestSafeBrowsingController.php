<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TestSafeBrowsingController extends Controller
{
    public function testApi(Request $request)
    {

        $googleApiKey = env('SAFE_BROWSING_API_KEY', '');
        
        // Check if API key exists
        if (empty($googleApiKey)) {
            return response()->json([
                'error' => true,
                'message' => 'API key not configured',
                'details' => 'The Google Safe Browsing API key is missing from your .env file'
            ], 500);
        }
        
        // Get URL from request, default to a known test URL if none provided
        $url = $request->input('url', 'http://malware.testing.google.test/testing/malware/');
        
        // Log the test request
        Log::info('Testing Safe Browsing API', [
            'url' => $url,
            'api_key_exists' => !empty($googleApiKey),
            'api_key_length' => strlen($googleApiKey)
        ]);
        
        try {
            // Create the API request payload
            $payload = [
                'client' => [
                    'clientId' => 'yourcompany-test',
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
            ];
            
            // Log the request payload
            Log::info('Safe Browsing API request payload', ['payload' => $payload]);
            
            // Make the API request
            $response = Http::post("https://safebrowsing.googleapis.com/v4/threatMatches:find?key={$googleApiKey}", $payload);
            
            // Get status and body
            $statusCode = $response->status();
            $responseBody = $response->json();
            
            // Log the response
            Log::info('Safe Browsing API response', [
                'status' => $statusCode,
                'body' => $responseBody
            ]);
            
            // Return all details for debugging
            return response()->json([
                'success' => true,
                'request' => [
                    'url' => $url,
                    'endpoint' => "https://safebrowsing.googleapis.com/v4/threatMatches:find",
                    'payload' => $payload
                ],
                'response' => [
                    'status_code' => $statusCode,
                    'body' => $responseBody,
                    'headers' => $response->headers(),
                ],
                'analysis' => [
                    'is_successful' => $response->successful(),
                    'is_client_error' => $response->clientError(),
                    'is_server_error' => $response->serverError(),
                    'has_matches' => isset($responseBody['matches']) && !empty($responseBody['matches']),
                    'matches_count' => isset($responseBody['matches']) ? count($responseBody['matches']) : 0,
                ],
                'conclusion' => isset($responseBody['matches']) && !empty($responseBody['matches']) 
                    ? 'UNSAFE - Threats detected' 
                    : 'SAFE - No threats detected'
            ]);
            
        } catch (\Exception $e) {
            // Log the exception
            Log::error('Exception in Safe Browsing API test', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Return error details
            return response()->json([
                'error' => true,
                'message' => 'Exception occurred during API test',
                'exception' => [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]
            ], 500);
        }
    }
}