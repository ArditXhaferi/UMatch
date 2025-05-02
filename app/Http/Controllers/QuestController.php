<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestStoreRequest;
use App\Http\Requests\QuestUpdateRequest;
use App\Models\Quest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class QuestController extends Controller
{
    public function index(Request $request): View
    {
        $quests = Quest::all();

        return view('quest.index', [
            'quests' => $quests,
        ]);
    }

    public function create(Request $request): View
    {
        return view('quest.create');
    }

    public function store(QuestStoreRequest $request): RedirectResponse
    {
        $quest = Quest::create($request->validated());

        $request->session()->flash('quest.id', $quest->id);

        return redirect()->route('quests.index');
    }

    public function show(Request $request, Quest $quest): View
    {
        return view('quest.show', [
            'quest' => $quest,
        ]);
    }

    public function edit(Request $request, Quest $quest): View
    {
        return view('quest.edit', [
            'quest' => $quest,
        ]);
    }

    public function update(QuestUpdateRequest $request, Quest $quest): RedirectResponse
    {
        $quest->update($request->validated());

        $request->session()->flash('quest.id', $quest->id);

        return redirect()->route('quests.index');
    }

    public function destroy(Request $request, Quest $quest): RedirectResponse
    {
        $quest->delete();

        return redirect()->route('quests.index');
    }
}
