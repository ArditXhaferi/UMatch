<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\StudentProfileController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::middleware(['auth'])->group(function () {
    // File Upload Routes
    Route::get('/upload', [FileUploadController::class, 'index'])->name('upload.index');
    Route::post('/upload', [FileUploadController::class, 'store'])->name('upload.store');
    
    // Student Profile Routes
    Route::get('/profile/{profile}', [StudentProfileController::class, 'show'])->name('student.profile');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::resource('programmes', App\Http\Controllers\ProgrammeController::class);
Route::resource('applications', App\Http\Controllers\ApplicationController::class);
Route::resource('skill-nodes', App\Http\Controllers\SkillNodeController::class);
Route::resource('quests', App\Http\Controllers\QuestController::class);
Route::resource('squads', App\Http\Controllers\SquadController::class);
Route::resource('events', App\Http\Controllers\EventController::class);

Route::get('/documentation', function () {
    return view('documentation');
})->name('documentation');
