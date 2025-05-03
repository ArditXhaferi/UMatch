<?php

declare(strict_types=1);

namespace App\Http\Controllers\University;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Response;

class ApplicationController extends BaseController
{
    public function index(Request $request): Response
    {
        $university = $request->user()->university;
        
        $applications = Application::where('university_id', $university->id)
            ->with('studentProfile.user')
            ->latest()
            ->paginate(10);

        return inertia('University/Applications/Index', [
            'applications' => $applications
        ]);
    }
} 