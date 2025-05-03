<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\StudentProfile;

class AuthController extends Controller
{
    /**
     * Handle user login request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            // For API requests that need tokens
            if ($request->wantsJson() || $request->expectsJson()) {
                // Regenerate session if available
                if ($request->hasSession()) {
                    $request->session()->regenerate();
                }
                
                return response()->json([
                    'message' => 'Login successful',
                    'user' => Auth::user(),
                    'redirect' => '/dashboard'
                ]);
            }
            
            // For web requests with session
            $request->session()->regenerate();
            
            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user(),
                'redirect' => '/dashboard'
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    /**
     * Handle user registration
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create student profile
        $studentProfile = StudentProfile::create([
            'user_id' => $user->id,
            'status' => 'active',
            'current_level' => 1,
            'current_xp' => 0,
            'total_xp' => 0,
            'quests_completed' => 0,
            'badges_earned' => 0,
            'current_streak' => 0,
            'longest_streak' => 0,
            'last_activity_date' => now(),
        ]);

        // Log in the user
        Auth::login($user);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'redirect' => '/dashboard'
        ]);
    }
} 