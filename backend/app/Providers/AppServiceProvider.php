<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro('jsonResponseSuccess', function ($data, $message = 'Success', $statusCode = 200) {
            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => $message,
            ], $statusCode);
        });

        Response::macro('jsonResponseSuccessNoData', function ($message = 'Success', $statusCode = 200) {
            return response()->json([
                'success' => true,
                'message' => $message,
            ], $statusCode);
        });

        Response::macro('jsonResponseFail', function ($data, $message = 'Fail', $statusCode = 500) {
            return response()->json([
                'success' => false,
                'data' => $data,
                'message' => $message,
            ], $statusCode);
        });

        Response::macro('jsonResponseFailNoData', function ($message = 'Fail', $statusCode = 500) {
            return response()->json([
                'success' => false,
                'message' => $message,
            ], $statusCode);
        });
    }
}
