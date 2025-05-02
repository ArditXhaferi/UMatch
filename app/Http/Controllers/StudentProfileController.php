<?php

namespace App\Http\Controllers;

use App\Models\StudentProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentProfileController extends Controller
{
    public function show(StudentProfile $profile)
    {
        // Ensure the user can only view their own profile
        if ($profile->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('StudentProfile', [
            'profile' => $profile
        ]);
    }
}
