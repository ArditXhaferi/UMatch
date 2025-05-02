<?php

namespace App\Http\Controllers;

use App\Http\Requests\SquadStoreRequest;
use App\Http\Requests\SquadUpdateRequest;
use App\Models\Squad;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SquadController extends Controller
{
    public function index(Request $request): View
    {
        $squads = Squad::all();

        return view('squad.index', [
            'squads' => $squads,
        ]);
    }

    public function create(Request $request): View
    {
        return view('squad.create');
    }

    public function store(SquadStoreRequest $request): RedirectResponse
    {
        $squad = Squad::create($request->validated());

        $request->session()->flash('squad.id', $squad->id);

        return redirect()->route('squads.index');
    }

    public function show(Request $request, Squad $squad): View
    {
        return view('squad.show', [
            'squad' => $squad,
        ]);
    }

    public function edit(Request $request, Squad $squad): View
    {
        return view('squad.edit', [
            'squad' => $squad,
        ]);
    }

    public function update(SquadUpdateRequest $request, Squad $squad): RedirectResponse
    {
        $squad->update($request->validated());

        $request->session()->flash('squad.id', $squad->id);

        return redirect()->route('squads.index');
    }

    public function destroy(Request $request, Squad $squad): RedirectResponse
    {
        $squad->delete();

        return redirect()->route('squads.index');
    }
}
