<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventUpdateRequest extends FormRequest
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
            'university_id' => ['nullable', 'integer', 'exists:Universities,id'],
            'title' => ['required', 'string', 'max:150'],
            'date' => ['required'],
            'location' => ['required', 'string', 'max:150'],
            'capacity' => ['required', 'integer'],
            'description' => ['nullable', 'string'],
        ];
    }
}
