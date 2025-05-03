<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public auth endpoints - explicit API endpoints for production
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// Add other protected API routes below with proper middleware
// Route::middleware('auth:sanctum')->group(function () {
//     // Protected routes here
// });