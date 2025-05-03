<?php

declare(strict_types=1);

namespace App\Http\Controllers\University;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Response;

class EventController extends BaseController
{
    public function index(Request $request): Response
    {
        $university = $request->user()->university;
        
        $events = Event::where('university_id', $university->id)
            ->latest()
            ->paginate(10);

        return inertia('University/Events/Index', [
            'events' => $events
        ]);
    }
} 