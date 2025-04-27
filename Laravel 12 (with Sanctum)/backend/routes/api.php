<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdministratorController;
use App\Http\Controllers\GameController;

Route::prefix("v1")->group(function () {
    Route::post('/signin', [AuthController::class, 'signin']);
    Route::post('/signup', [AuthController::class, 'signup']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/signout', [AuthController::class, 'signout']);

        Route::get('/users/{username}', [UserController::class, 'show']); // Get user

        Route::get('/games', [GameController::class, 'index']);
        Route::post('/games', [GameController::class, 'store']);
        Route::post('/games/{slug}/upload', [GameController::class, 'upload']);
        Route::get('/games/{slug}', [GameController::class, 'show']);
        Route::put('/games/{slug}', [GameController::class, 'update']);
        Route::delete('/games/{slug}', [GameController::class, 'destroy']);
        Route::post('/games/{slug}/scores', [GameController::class, 'scores']);
        Route::get('/games/{slug}/{version}', [GameController::class, 'download'])->where('version', '[0-9]+');
        Route::get('/games/{slug}/scores', [GameController::class, 'highscore']);

        // Admin rights
        Route::middleware(['ability:admin'])->group(function () {

            // User Related Routes
            Route::get('/users', [UserController::class, 'index']); // Get List Users
            Route::post('/users', [UserController::class, 'store']); // Create User
            Route::put('/users/{id}', [UserController::class, 'update']); // Update user
            Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user
            Route::get('/admin-data', function () {
                return 'Only admins can see this.';
            });
            // Admins Related Routes
            Route::get('/admins', [AdministratorController::class, 'index']); // Get List Administrator

        });
    });
});
