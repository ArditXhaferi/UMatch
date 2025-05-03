<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    //

    public function landing_page() {
        return Inertia::render("LandingPage");
    }

}
