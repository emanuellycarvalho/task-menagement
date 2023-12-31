<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'nickname',
        'username',
        'email',
        'password',
        'address',
        'city',
        'country',
        'organization_id',
        'access_level_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $with = [
        'organization',
        'access_level'
    ];

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
    
    /**
     * Get the organization that the user belongs to.
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Get the access level that the user has.
     */
    public function access_level()
    {
        return $this->belongsTo(AccessLevel::class);
    }

    /**
     * Get the task lists that the user created.
     */
    public function task_lists()
    {
        return $this->hasMany(TaskList::class);
    }

    /**
     * Get the tasks created by the user.
     */
    public function created_tasks()
    {
        return $this->hasMany(Task::class, 'creator_id');
    }

    /**
     * Get the user's tasks.
     */
    public function assigned_tasks()
    {
        return $this->hasMany(Task::class, 'assigned_id');
    }
}
