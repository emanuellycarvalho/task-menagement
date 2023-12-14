<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'email',
        'address',
        'city',
        'country',
    ];

    /**
     * Get the users associated with the organization.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
