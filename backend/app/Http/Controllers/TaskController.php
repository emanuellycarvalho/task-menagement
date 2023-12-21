<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;


class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index(): JsonResponse
    {
        $tasks = $this->taskService->getAllTasks();
        return response()->jsonResponseSuccess($tasks);
    }

    public function show(Task $task): JsonResponse
    {
        return response()->jsonResponseSuccess($task);
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask($request->all());
        return response()->jsonResponseSuccess($task, 'Success on create', 201);
    }

    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        $task = $this->taskService->updateTask($task, $request->all());
        return response()->jsonResponseSuccessNoData('Success on update', 200);
    }

    public function destroy(Task $task): JsonResponse
    {
        $this->taskService->deleteTask($task);
        return response()->jsonResponseSuccessNoData('Success on delete', 204);
    }
}
