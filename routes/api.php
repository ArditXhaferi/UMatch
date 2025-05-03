<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public auth endpoints
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Add other protected API routes below with proper middleware
// Route::middleware('auth:sanctum')->group(function () {
//     // Protected routes here
// });