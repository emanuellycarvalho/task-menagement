<?php

use Laravel\Sanctum\Http\Controllers\LoginController;
use Laravel\Sanctum\Http\Controllers\LogoutController;
use Laravel\Sanctum\Http\Controllers\RegisteredUserController;
use Laravel\Sanctum\Http\Controllers\VerifyEmailController;

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

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware(['auth', 'throttle:6,1'])
        ->name('verification.send');

    Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])
        ->middleware(['auth'])
        ->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['auth', 'signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/forgot-password', [ForgotPasswordController::class, 'store'])
        ->middleware(['throttle:6,1'])
        ->name('password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->middleware(['guest'])
        ->name('password.reset');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->middleware(['guest'])
        ->name('password.update');

    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store'])
        ->name('password.confirm');

    Route::get('/confirm-password/{token}', [ConfirmablePasswordController::class, 'create'])
        ->middleware(['auth'])
        ->name('password.confirmation');

    Route::post('/logout-other-browser-sessions', [AuthenticatedSessionController::class, 'destroyOtherSessions'])
        ->name('logout.other-sessions');

    Route::post('/current-password', [ProfileInformationController::class, 'update'])
        ->name('password.update');
});

Route::delete('/api-tokens/{token}', [AuthorizedAccessTokenController::class, 'destroy'])
    ->name('tokens.destroy');

Route::delete('/other-browser-sessions', [OtherBrowserSessionsController::class, 'destroy'])
    ->name('other-browser-sessions.destroy');

Route::group(['prefix' => 'two-factor'], function () {
    Route::get('/two-factor-challenge', [TwoFactorAuthenticatedSessionController::class, 'create'])
        ->middleware(['auth'])
        ->name('two-factor.login');

    Route::post('/two-factor-challenge', [TwoFactorAuthenticatedSessionController::class, 'store'])
        ->middleware(['auth']);

    Route::delete('/two-factor-logout', [TwoFactorAuthenticatedSessionController::class, 'destroy'])
        ->middleware(['auth'])
        ->name('two-factor.logout');

    Route::get('/user/two-factor-qr-code', [TwoFactorQrCodeController::class, 'show'])
        ->middleware(['auth'])
        ->name('two-factor.qr-code');

    Route::get('/user/two-factor-recovery-codes', [TwoFactorRecoveryCodesController::class, 'index'])
        ->middleware(['auth'])
        ->name('two-factor.recovery-codes');

    Route::post('/user/two-factor-recovery-codes', [TwoFactorRecoveryCodesController::class, 'store'])
        ->name('two-factor.recovery-codes');
});
