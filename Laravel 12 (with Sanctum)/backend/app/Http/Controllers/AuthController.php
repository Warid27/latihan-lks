<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Administrator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use App\Utils\UsernameChecker;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        // Validate the request with only username and password
        $validated = $request->validate([
            'username' => 'required|string|min:4|max:60',
            'password' => 'required|string|min:5|max:20',
        ]);

        if (UsernameChecker::isUsernameTaken($validated['username'])) {
            return response()->json([
                "status" => "invalid",
                "message" => "Username already exists"
            ], 400);
        }

        $model = User::class;

        // Create the user entity
        $entity = $model::create([
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $entity->createToken('user_auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token' => $token
        ], 201);
    }

    public function signin(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|min:4|max:60',
            'password' => 'required|string|min:5|max:20',
        ]);

        // Try to find the entity in User or Administrator
        $entity = User::where('username', $validated['username'])->first();
        if (!$entity) {
            $entity = Administrator::where('username', $validated['username'])->first();
        }

        if (!$entity || !Hash::check($validated['password'], $entity->password)) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Wrong username or password'
            ]);
        }

        $userType = $this->determineUserType($entity);

        Log::info('Entity found: ' . get_class($entity) . ', Type: ' . $userType);

        $entity->update([
            'last_login_at' => now(),
        ]);

        $entity->refresh();

        $newToken = $entity->createToken("{$userType}_auth_token", [$userType]);

        $newToken->accessToken->expires_at = now()->addDays(7);
        $newToken->accessToken->save();

        return response()->json([
            'status' => 'success',
            'token' => $newToken->plainTextToken,
            'role' => $userType,
            'username' => $entity->username
        ], 200);
    }

    public function signout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'You have been logged out',
        ], 200);
    }

    private function getModelClass(string $userType)
    {
        return match ($userType) {
            'admin' => Administrator::class,
            'user' => User::class,
            default => throw ValidationException::withMessages(['user_type' => ['Invalid User Type Specified']]),
        };
    }
    private function getTableName(string $userType)
    {
        return match ($userType) {
            'admin' => 'administrator',
            'user' => 'users',
            default => throw ValidationException::withMessages(['user_type' => ['Invalid User Type Specified']]),
        };
    }
    private function determineUserType($user)
    {
        if ($user instanceof User) {
            return 'user';
        } else if ($user instanceof Administrator) {
            return 'admin';
        }
        return 'unknown';
    }
}
