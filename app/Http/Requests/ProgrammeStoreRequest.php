<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProgrammeStoreRequest extends FormRequest
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
            'faculty_id' => ['required', 'integer', 'exists:Faculties,id'],
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['required', 'string', 'unique:programmes,slug'],
            'tuition' => ['required', 'integer'],
            'ects' => ['required', 'integer'],
            'duration' => ['required', 'integer'],
            'scholarship_available' => ['required'],
            'open_for_application' => ['required'],
            'deadline' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
        ];
    }
}
