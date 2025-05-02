<?php

namespace App\Http\Controllers;

use App\Http\Requests\SkillNodeStoreRequest;
use App\Http\Requests\SkillNodeUpdateRequest;
use App\Models\SkillNode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SkillNodeController extends Controller
{
    public function index(Request $request): View
    {
        $skillNodes = SkillNode::all();

        return view('skillNode.index', [
            'skillNodes' => $skillNodes,
        ]);
    }

    public function create(Request $request): View
    {
        return view('skillNode.create');
    }

    public function store(SkillNodeStoreRequest $request): RedirectResponse
    {
        $skillNode = SkillNode::create($request->validated());

        $request->session()->flash('skillNode.id', $skillNode->id);

        return redirect()->route('skillNodes.index');
    }

    public function show(Request $request, SkillNode $skillNode): View
    {
        return view('skillNode.show', [
            'skillNode' => $skillNode,
        ]);
    }

    public function edit(Request $request, SkillNode $skillNode): View
    {
        return view('skillNode.edit', [
            'skillNode' => $skillNode,
        ]);
    }

    public function update(SkillNodeUpdateRequest $request, SkillNode $skillNode): RedirectResponse
    {
        $skillNode->update($request->validated());

        $request->session()->flash('skillNode.id', $skillNode->id);

        return redirect()->route('skillNodes.index');
    }

    public function destroy(Request $request, SkillNode $skillNode): RedirectResponse
    {
        $skillNode->delete();

        return redirect()->route('skillNodes.index');
    }
}
