<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationUpdateRequest extends FormRequest
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
            'student_profile_id' => ['required', 'integer', 'exists:StudentProfiles,id'],
            'programme_id' => ['required', 'integer', 'exists:,id'],
            'status' => ['required', 'in:submitted,review,accepted,rejected'],
            'submitted_at' => ['required'],
            'pdf_path' => ['nullable', 'string'],
        ];
    }
}
