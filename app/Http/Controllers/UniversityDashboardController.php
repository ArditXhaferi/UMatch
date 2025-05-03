<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\University\BaseController;
use App\Models\Application;
use App\Models\Event;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UniversityDashboardController extends BaseController
{

    /**
     * Display the university dashboard
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        $university = $user->university;
        
        if (!$university) {
            return redirect()->route('dashboard')->with('error', 'No university profile found');
        }

        // Get recent applications
        $recent_applications = Application::where('university_id', $university->id)
            ->with('studentProfile.user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'student_name' => $application->studentProfile->user->name,
                    'program' => $application->program,
                    'status' => $application->status,
                    'submitted_at' => $application->created_at,
                    'match_percentage' => $application->match_percentage
                ];
            });

        // Get upcoming events
        $upcoming_events = Event::where('university_id', $university->id)
            ->where('date', '>=', now())
            ->orderBy('date')
            ->take(5)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date->format('Y-m-d'),
                    'type' => $event->type,
                    'status' => $event->status
                ];
            });

        // Get statistics
        $stats = [
            'total_applications' => Application::where('university_id', $university->id)->count(),
            'pending_applications' => Application::where('university_id', $university->id)
                ->where('status', 'pending')
                ->count(),
            'accepted_applications' => Application::where('university_id', $university->id)
                ->where('status', 'accepted')
                ->count(),
            'rejected_applications' => Application::where('university_id', $university->id)
                ->where('status', 'rejected')
                ->count(),
            // 'average_match_percentage' => Application::where('university_id', $university->id)
            //     ->avg('match_percentage') ?? 0,
            // 'top_programs' => Application::where('university_id', $university->id)
            //     ->select('program')
            //     ->selectRaw('COUNT(*) as count')
            //     ->groupBy('program')
            //     ->orderByDesc('count')
            //     ->limit(5)
            //     ->pluck('program')
            //     ->toArray()
        ];

        return Inertia::render('UniversityDashboard', [
            'auth' => [
                'user' => $user,
            ],
            'university' => [
                'id' => $university->id,
                'university_name' => $university->university_name,
                'city' => $university->city,
                'description' => $university->description,
                'website' => $university->website,
                'logo' => $university->logo,
                'image' => $university->image,
                'branches_offered' => $university->branches_offered,
                'qualities_sought' => $university->qualities_sought,
            ],
            'stats' => $stats,
            'recent_applications' => $recent_applications,
            'upcoming_events' => $upcoming_events,
        ]);
    }
} 