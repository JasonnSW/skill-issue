<?php

use App\Http\Controllers\HoaxController;
use App\Http\Controllers\ProfileController;
use App\Models\Hoax;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

// Jika ada dashboard dan auth
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// HOAX routes
Route::get('/hoax', [HoaxController::class, 'index'])->name('hoax.index'); // lihat data hoax
Route::get('/hoax/create', [HoaxController::class, 'create'])->name('hoax.create'); // form lapor

Route::middleware('web')
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->post('/hoax', [HoaxController::class, 'store'])->name('hoax.store'); // kirim laporan hoax


require __DIR__ . '/auth.php';
