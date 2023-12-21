<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\TaskRepository;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function getAllTasks(): Collection
    {
        return $this->taskRepository->getAll();
    }

    public function getTaskById(string $id): ?Task
    {
        return $this->taskRepository->getById($id);
    }

    public function createTask(array $data): Task
    {
        return $this->taskRepository->create($data);
    }

    public function updateTask(Task $task, array $data): bool
    {
        return $this->taskRepository->update($task, $data);
    }

    public function deleteTask(Task $task): bool
    {
        return $this->taskRepository->delete($task);
    }
}
