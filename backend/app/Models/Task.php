<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'creator_id',
        'assigned_id',
        'task_list_id',
    ];

    protected $with = [
        'creator',
        'assigned_user',
    ];

    /**
     * Get the creator associated with the task.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * Get the assignee associated with the task.
     */
    public function assigned_user()
    {
        return $this->belongsTo(User::class, 'assingned_id');
    }

    /**
     * Get the task list associated with the task.
     */
    public function task_list()
    {
        return $this->belongsTo(TaskList::class, 'task_list_id');
    }
}
