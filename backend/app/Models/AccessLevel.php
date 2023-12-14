<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessLevel extends Model
{
    use HasFactory;

    protected $table = 'access_levels';

    protected $fillable = [
        'name'
    ];

    /**
     * Get the users with that access level.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
