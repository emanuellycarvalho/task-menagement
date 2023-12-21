<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends BaseRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'organization_id' => 'required|exists:organizations,id',
            'access_level_id' => 'required|exists:access_levels,id',
        ];

        if ($this->isMethod('post')) {
            $rules['email'] .= '|unique:users,email,' . optional($this->user())->id;
            $rules['username'] .= '|unique:users,username,' . optional($this->user())->id;
        }

        return $this->updateLogic($rules);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => 'The :attribute field is required.',
            'string' => 'The :attribute must be a string.',
            'max' => [
                'string' => 'The :attribute may not be greater than :max characters.',
                'email' => 'The :attribute may not be greater than :max characters.',
            ],
            'email' => 'The :attribute must be a valid email address.',
            'unique' => 'The :attribute has already been taken.',
            'min' => [
                'string' => 'The :attribute must be at least :min characters.',
            ],
            'exists' => 'The selected :attribute is invalid.',
        ];
    }
}
