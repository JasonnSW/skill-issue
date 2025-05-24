<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HoaxController;
use App\Http\Controllers\FactCheckerController;
use App\Http\Controllers\SafeBrowsingController;
use App\Http\Controllers\TestSafeBrowsingController;
use App\Models\Hoax;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
return Inertia::render('Home');
});

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/hoax', [HoaxController::class, 'index'])->name('hoax.index'); 
Route::get('/hoax/create', [HoaxController::class, 'create'])->name('hoax.create');

Route::middleware('web')
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->post('/hoax', [HoaxController::class, 'store'])->name('hoax.store'); 

Route::get('/test', function () {
    return response()->json(['message' => 'Route is working!']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/api/verify-fact', [FactCheckerController::class, 'verifyFact']);

Route::options('/api/verify-fact', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
});

Route::post('/api/check-website-safety', [SafeBrowsingController::class, 'checkWebsiteSafety']);

Route::get('/check-hoax', function () {
    return App\Models\Hoax::all();
});

Route::get('/api/test', [TestSafeBrowsingController::class, 'testApi']);
Route::post('/api/test', [TestSafeBrowsingController::class, 'testApi']);

require __DIR__ . '/auth.php';
