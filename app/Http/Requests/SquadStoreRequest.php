<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SquadStoreRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'quest_id' => ['nullable', 'integer', 'exists:Quests,id'],
        ];
    }
}
