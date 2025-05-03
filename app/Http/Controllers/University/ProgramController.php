<?php

declare(strict_types=1);

namespace App\Http\Controllers\University;

use App\Models\Programme;
use Illuminate\Http\Request;
use Inertia\Response;

class ProgramController extends BaseController
{
    public function index(Request $request): Response
    {
        $university = $request->user()->university;
        
        $programs = Programme::whereHas('faculty', function ($query) use ($university) {
            $query->where('university_id', $university->id);
        })
        ->with('faculty')
        ->latest()
        ->paginate(10);

        return inertia('University/Programs/Index', [
            'programs' => $programs
        ]);
    }
} 