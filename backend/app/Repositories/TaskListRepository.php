<?php

namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Models\TaskList;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TaskListRepository extends BaseRepository
{
    public function __construct(TaskList $tasklist)
    {
        $this->model = $tasklist;
    }
}
