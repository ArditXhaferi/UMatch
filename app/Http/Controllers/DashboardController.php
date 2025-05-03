<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Quest;
use App\Models\XpLog;
use App\Http\Controllers\UniversityData;
use App\Models\CalendarEvent;
use App\Providers\RouteServiceProvider;

class DashboardController extends Controller
{
    /**
     * Display the dashboard view with user data
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Redirect university admins to their dashboard
        if ($user->isUniversity()) {
            return redirect()->route('university.dashboard');
        }

        $studentProfile = $user->studentProfile;

        // Get quests data if available
        $quests = [];
        if ($studentProfile) {
            $quests = Quest::orderBy('created_at', 'desc')
                ->take(5)
                ->get();
        }

        // Get XP activity data if available
        $xpActivity = [];
        if ($studentProfile) {
            $xpActivity = XpLog::where('student_profile_id', $studentProfile->id)
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
        }

        // Get university matches if student profile exists
        $universityMatches = [];
        if ($studentProfile && $studentProfile->analysis) {
            $universityData = new UniversityData();
            $response = $universityData->matchUsersWithUniversity(request());
            $responseData = $response->getData();
            
            if ($responseData->success && isset($responseData->matches)) {
                $universityMatches = json_decode(json_encode($responseData->matches), true);
            }
        }

        // Get calendar events
        $calendarEvents = CalendarEvent::query()
            ->orderBy('date')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date->format('Y-m-d'),
                    'type' => $event->type,
                ];
            });

        return Inertia::render('dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'studentProfile' => $studentProfile,
            'deadlines' => $calendarEvents,
            'quests' => $quests,
            'xpActivity' => $xpActivity,
            'universityMatches' => $universityMatches
        ]);
    }
} 