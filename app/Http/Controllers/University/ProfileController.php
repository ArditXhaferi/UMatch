<?php

declare(strict_types=1);

namespace App\Http\Controllers\University;

use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class ProfileController extends BaseController
{
    public function edit(University $university): Response
    {
        $this->authorize('update', $university);

        return inertia('University/Profile/Edit', [
            'university' => $university
        ]);
    }

    public function update(Request $request, University $university)
    {
        $this->authorize('update', $university);

        $validated = $request->validate([
            'university_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'description' => 'required|string',
            'website' => 'required|url',
            'branches_offered' => 'required|array',
            'qualities_sought' => 'required|array',
            'address' => 'required|string',
            'logo' => 'nullable|image|max:2048',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($university->logo) {
                Storage::delete($university->logo);
            }
            $validated['logo'] = $request->file('logo')->store('universities/logos');
        }

        if ($request->hasFile('image')) {
            if ($university->image) {
                Storage::delete($university->image);
            }
            $validated['image'] = $request->file('image')->store('universities/images');
        }

        $university->update($validated);

        return redirect()->route('university.dashboard')->with('success', 'Profile updated successfully.');
    }
} 