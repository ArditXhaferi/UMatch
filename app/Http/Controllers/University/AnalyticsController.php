<?php

declare(strict_types=1);

namespace App\Http\Controllers\University;

use App\Models\Application;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class AnalyticsController extends BaseController
{
    public function index(Request $request): Response
    {
        $university = $request->user()->university;
        
        // Application trends
        $applicationTrends = Application::where('university_id', $university->id)
            ->select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('COUNT(*) as total'),
                'status'
            )
            ->groupBy('month', 'status')
            ->orderBy('month')
            ->get();

        // Program popularity
        $programPopularity = Application::where('university_id', $university->id)
            ->select('program', DB::raw('COUNT(*) as total'))
            ->groupBy('program')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        // Event attendance
        $eventAttendance = Event::where('university_id', $university->id)
            ->select('title', 'type', 'attendees_count')
            ->orderByDesc('date')
            ->limit(10)
            ->get();

        return inertia('University/Analytics/Index', [
            'applicationTrends' => $applicationTrends,
            'programPopularity' => $programPopularity,
            'eventAttendance' => $eventAttendance
        ]);
    }
} 