<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'creator_id'
    ];

    protected $with = [
        'creator',
    ];

    /**
     * Get the creator associated with the task list.
     */
    public function creator()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get the tasks associated with the task list.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
