<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;


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
        return response()->jsonResponseSuccess($users);
    }

    public function show(User $user): JsonResponse
    {
        return response()->jsonResponseSuccess($user);
    }

    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->all());
        return response()->jsonResponseSuccess($user, 'Success on create', 201);
    }

    public function update(UserRequest $request, User $user): JsonResponse
    {
        if($request->has('password') && !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => "User's password is incorrect."], 422);
        }

        $user = $this->userService->updateUser($user, $request->all());
        return response()->jsonResponseSuccessNoData('Success on update', 200);
    }

    public function updatePassword(Request $request, User $user): JsonResponse
    {
        if($request->has('old_password') && !Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'The old password is incorrect.'], 422);
        }

        $request = $request->all();
        $data['password'] = Hash::make($request['password']);

        $user = $this->userService->updateUser($user, $data);
        return response()->jsonResponseSuccessNoData('Success on update', 200);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->userService->deleteUser($user);
        return response()->jsonResponseSuccessNoData('Success on delete', 204);
    }
}
