<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LandingPageController extends Controller
{
    //

    public function landing_page() {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
        
        return Inertia::render("LandingPage");
    }

}
