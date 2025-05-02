<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProgrammeStoreRequest;
use App\Http\Requests\ProgrammeUpdateRequest;
use App\Models\Programme;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ProgrammeController extends Controller
{
    public function index(Request $request): View
    {
        $programmes = Programme::all();

        return view('programme.index', [
            'programmes' => $programmes,
        ]);
    }

    public function create(Request $request): View
    {
        return view('programme.create');
    }

    public function store(ProgrammeStoreRequest $request): RedirectResponse
    {
        $programme = Programme::create($request->validated());

        $request->session()->flash('programme.id', $programme->id);

        return redirect()->route('programmes.index');
    }

    public function show(Request $request, Programme $programme): View
    {
        return view('programme.show', [
            'programme' => $programme,
        ]);
    }

    public function edit(Request $request, Programme $programme): View
    {
        return view('programme.edit', [
            'programme' => $programme,
        ]);
    }

    public function update(ProgrammeUpdateRequest $request, Programme $programme): RedirectResponse
    {
        $programme->update($request->validated());

        $request->session()->flash('programme.id', $programme->id);

        return redirect()->route('programmes.index');
    }

    public function destroy(Request $request, Programme $programme): RedirectResponse
    {
        $programme->delete();

        return redirect()->route('programmes.index');
    }
}
