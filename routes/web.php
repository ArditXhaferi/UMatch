<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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
