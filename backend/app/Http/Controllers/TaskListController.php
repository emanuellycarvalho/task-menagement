<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskList;
use App\Services\TaskListService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TaskListRequest;


class TaskListController extends Controller
{
    protected $taskListService;

    public function __construct(TaskListService $taskListService)
    {
        $this->taskListService = $taskListService;
    }

    public function index(): JsonResponse
    {
        $taskLists = $this->taskListService->getAllTaskLists();
        return response()->jsonResponseSuccess($taskLists);
    }

    public function show(TaskList $taskList): JsonResponse
    {
        return response()->jsonResponseSuccess($taskList);
    }

    public function store(TaskListRequest $request): JsonResponse
    {
        $taskList = $this->taskListService->createTaskList($request->all());
        return response()->jsonResponseSuccess($taskList, 'Success on create', 201);
    }

    public function update(TaskListRequest $request, TaskList $taskList): JsonResponse
    {
        $taskList = $this->taskListService->updateTaskList($taskList, $request->all());
        return response()->jsonResponseSuccessNoData('Success on update', 200);
    }

    public function destroy(TaskList $taskList): JsonResponse
    {
        $this->taskListService->deleteTaskList($taskList);
        return response()->jsonResponseSuccessNoData('Success on delete', 204);
    }
}
