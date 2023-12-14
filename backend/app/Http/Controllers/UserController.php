<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;


class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(): JsonResponse
    {
        $users = $this->userService->getAllUsers();
        return response()->jsonResponseSuccess($users, 'Success', 200);
    }

    public function show(User $user): JsonResponse
    {
        return response()->jsonResponseSuccess($user, 'Success', 200);
    }

    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->all());
        return response()->jsonResponseSuccess($user, 'Success on create', 201);
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        $user = $this->userService->updateUser($user, $request->all());
        return response()->jsonResponseSuccessNoData('Success on update', 200);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->userService->deleteUser($user);
        return response()->jsonResponseSuccessNoData('Success on delete', 204);
    }
}
