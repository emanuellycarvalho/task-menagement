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
    }
}
