<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FactCheckerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API routes with CSRF protection disabled
Route::group(['middleware' => ['api']], function () {
    // Fact checking route
    Route::post('/verify-fact', [FactCheckerController::class, 'verifyFact']);
    
    // Enable CORS for React frontend
    Route::options('/verify-fact', function () {
        return response('', 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    });
});

Route::get('test', function() {
    return response()->json(['message' => 'API is working!']);
});