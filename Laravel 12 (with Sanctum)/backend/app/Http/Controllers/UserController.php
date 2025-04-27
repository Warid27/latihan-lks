<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Utils\UsernameChecker;
use Illuminate\Support\Facades\Hash;
use App\Models\GameVersion;
use Illuminate\Support\Facades\Log as Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all users, including soft deleted ones
        $users = User::withTrashed()->get();

        // Prepare the users data with added status field
        $userData = $users->map(function ($user) {
            // Check if the user is soft deleted
            $user->status = $user->trashed() ? 'deleted' : 'active';
            return $user;
        });

        $totalElements = $userData->count();

        return response()->json([
            'totalElements' => $totalElements,
            'content' => $userData
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);
        return response()->json([
            'status' => 'success',
            'username' => $validated['username'],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($username)
    {
        $requestingUser = auth()->user();
        Log::info("REQUESTING USER: " . ($requestingUser ? $requestingUser->username : 'guest'));
        Log::info("USERNAME: {$username}");

        $user = User::where('username', $username)
            ->with('games', 'scores', 'gameVersions.game')->firstOrFail();

        Log::info("USER: " . json_encode($user));

        // Prepare response data
        $responseData = [
            'username' => $user->username,
            'registeredTimestamp' => $user->created_at->toIso8601String(),
            'authoredGames' => [],
            'highscores' => []
        ];

        // Handle authored games
        $authoredGames = collect();

        // If this is the user viewing their own profile, include all games
        if ($requestingUser && $requestingUser->id === $user->id) {
            $authoredGames = $user->games;
        } else {
            // For other users viewing this profile, only include games with at least one version
            $gamesWithVersions = $user->gameVersions->pluck('game_id')->unique();
            $authoredGames = $user->games->filter(function ($game) use ($gamesWithVersions) {
                return $gamesWithVersions->contains($game->id);
            });
        }

        foreach ($authoredGames as $game) {
            $responseData['authoredGames'][] = [
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description
            ];
        }

        // Load the gameVersions for the scores if not already loaded
        $gameVersionIds = $user->scores->pluck('game_version_id')->unique();
        $gameVersions = GameVersion::whereIn('id', $gameVersionIds)->with('game')->get();

        // Group scores by game
        $scoresByGame = [];

        foreach ($user->scores as $score) {
            $gameVersion = $gameVersions->firstWhere('id', $score->game_version_id);
            if ($gameVersion) {
                $gameId = $gameVersion->game_id;

                if (!isset($scoresByGame[$gameId])) {
                    $scoresByGame[$gameId] = [
                        'game' => $gameVersion->game,
                        'scores' => collect()
                    ];
                }

                $scoresByGame[$gameId]['scores']->push($score);
            }
        }

        // Get highest score per game
        foreach ($scoresByGame as $gameData) {
            $game = $gameData['game'];
            $highestScore = $gameData['scores']->sortByDesc('score')->first();

            $responseData['highscores'][] = [
                'game' => [
                    'slug' => $game->slug,
                    'title' => $game->title,
                    'description' => $game->description
                ],
                'score' => $highestScore->score,
                'timestamp' => $highestScore->created_at->toIso8601String()
            ];
        }

        return response()->json($responseData, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'username' => 'required|string|min:4|max:60',  // Use 'users' table for validation
            'password' => 'required|string|min:5|max:20',
        ]);

        if (UsernameChecker::isUsernameTaken($validated['username'])) {
            return response()->json([
                "status" => "invalid",
                "message" => "Username already exists"
            ], 400);
        }

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'username' => $validated['username'],
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        // Find the user by ID or fail with 404 if not found
        $user = User::findOrFail($id);

        // Validate that 'delete_reason' is passed as a query parameter (not as request body)
        $validate = $request->validate([
            'delete_reason' => 'required|string|min:1|max:255',
        ]);

        // Set the 'delete_reason' on the user model
        $user->delete_reason = $request->input('delete_reason'); // Get 'delete_reason' from query params

        // Save the delete_reason in the user record (optional, depending on your use case)
        $user->save();

        // Finally, delete the user from the database
        $user->delete();

        // Return success response with status 204 (No Content)
        return response()->json([
            'status' => 'success',
        ], 204);
    }

}
