<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use \App\Http\Middleware\CheckAbility;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(EnsureFrontendRequestsAreStateful::class);
        $middleware->alias([
            'ability' => CheckAbility::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'api/*' // <-- exclude this route
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status' => 'not-found',
                    'message' => 'Not Found'
                ], 404);
            }
        });

        $exceptions->renderable(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status' => 'method-not-allowed',
                    'message' => 'HTTP method not allowed'
                ], 405);
            }
        });

        $exceptions->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                $authHeader = $request->header('Authorization');

                if (is_null($authHeader)) {
                    return response()->json([
                        'status' => 'unauthenticated',
                        'message' => 'Missing token'
                    ], 401);
                }

                return response()->json([
                    'status' => 'unauthenticated',
                    'message' => 'Invalid token'
                ], 401);
            }
        });

        $exceptions->renderable(function (AccessDeniedHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'status' => 'blocked',
                    'message' => 'User blocked',
                    'reason' => 'You have been blocked by an administrator'
                ], 403);
            };
        });

        $exceptions->renderable(function (ValidationException $e, $request) {
            if ($request->is('api/*')) {
                $violations = [];

                foreach ($e->validator->errors()->messages() as $field => $messages) {
                    $message = $messages[0];

                    if (preg_match('/must be at least (\d+)/', $message, $matches)) {
                        $violations[$field] = [
                            'message' => "must be at least {$matches[1]} characters long"
                        ];
                    } elseif (preg_match('/must not be greater than (\d+)/', $message, $matches)) {
                        $violations[$field] = [
                            'message' => "must be at most {$matches[1]} characters long"
                        ];
                    } else {
                        $violations[$field] = [
                            'message' => 'required'
                        ];
                    }
                }

                return response()->json([
                    'status' => 'invalid',
                    'message' => 'Request body is not valid.',
                    'violations' => $violations
                ], 400);
            }
        });
    })->create();
