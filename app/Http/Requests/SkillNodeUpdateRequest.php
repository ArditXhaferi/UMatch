<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillNodeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'unique:skill_nodes,code'],
            'title' => ['required', 'string'],
            'xp_required' => ['required', 'integer'],
            'icon' => ['nullable', 'string'],
            'metadata' => ['nullable', 'json'],
        ];
    }
}
