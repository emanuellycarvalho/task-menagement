<?php

use App\Models\AccessLevel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\OrganizationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('organizations', OrganizationController::class);
Route::apiResource('tasklists', TaskListController::class);
Route::apiResource('tasks', TaskController::class);

Route::apiResource('users', UserController::class);
Route::put('users/{user}/update-password', [UserController::class, 'updatePassword']);

Route::get('access_levels', function(){
    return response()->jsonResponseSuccess(AccessLevel::all());
});
