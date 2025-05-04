<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Exception;

class LandingPageController extends Controller
{
    //

    public function landing_page() {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render("LandingPage");
    }

    public function parent_portal() {
        return Inertia::render("ParentPortal");
    }

    public function imLoggedIn(Request $request) {
        try{
            $the_response = Auth::check() ? ['success'=>true] : ['success'=>false];

            return response()->json($the_response);
        } catch(Exception $e) {
            return response()->json(['success'=>false,'details'=>$e->getMessage()]);
        }
    }

}
