<?php

namespace App\Services;

use App\Models\TaskList;
use App\Repositories\TaskListRepository;
use Illuminate\Database\Eloquent\Collection;

class TaskListService
{
    private $tasklistRepository;

    public function __construct(TaskListRepository $tasklistRepository)
    {
        $this->tasklistRepository = $tasklistRepository;
    }

    public function getAllTaskLists(): Collection
    {
        return $this->tasklistRepository->getAll();
    }

    public function getTaskListById(string $id): ?TaskList
    {
        return $this->tasklistRepository->getById($id);
    }

    public function createTaskList(array $data): TaskList
    {
        return $this->tasklistRepository->create($data);
    }

    public function updateTaskList(TaskList $tasklist, array $data): bool
    {
        return $this->tasklistRepository->update($tasklist, $data);
    }

    public function deleteTaskList(TaskList $tasklist): bool
    {
        return $this->tasklistRepository->delete($tasklist);
    }
}
