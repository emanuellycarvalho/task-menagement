<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TaskRepository extends BaseRepository
{
    public function __construct(Task $task)
    {
        $this->model = $task;
    }
}
