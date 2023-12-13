<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required',
            'category' => 'required',
            'email' => 'required|email|unique:organizations,email,' . ($this->organization ? $this->organization->id : 'NULL'),
            'address' => 'nullable',
            'city' => 'nullable',
            'country' => 'nullable',
        ];
    }
}
