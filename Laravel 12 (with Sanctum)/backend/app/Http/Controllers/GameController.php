<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\Score;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Models\GameVersion;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log as Log;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $page = (int) $request->query("page", 0);
        $size = (int) $request->query("size", 100);
        $sortBy = $request->query("sortBy", 'title');
        $sortDir = $request->query("sortDir", 'asc');

        $validSortBy = ['title', 'popular', 'uploaddate'];
        $validSortDir = ['asc', 'desc'];

        if (!in_array($sortBy, $validSortBy)) {
            return response()->json(['error' => 'Invalid sortBy parameter'], 400);
        }

        if (!in_array($sortDir, $validSortDir)) {
            return response()->json(['error' => 'Invalid sortDir parameter'], 400);
        }

        // Eager load scores, users, and gameVersions
        $query = Game::query()
            ->with(['scores', 'users', 'gameVersions']) // Make sure 'gameVersions' exists
            ->withCount('scores');

        // Sorting logic
        switch ($sortBy) {
            case 'popular':
                $query->orderBy('scores_count', $sortDir);
                break;

            case 'uploaddate':
                $query->orderBy('updated_at', $sortDir);
                break;

            case 'title':
            default:
                $query->orderBy('title', $sortDir);
                break;
        }

        // Fetch the games with pagination
        $games = $query->skip($page * $size)->take($size)->get();
        Log::info("games: {$games}");
        // Filter out games without versions and map the content
        $content = $games->filter(function ($game) {
            return $game->gameVersions->isNotEmpty(); // Filter out games with no versions
        })->map(function ($game) {
            $latestVersion = $game->gameVersions->first();
            $foundThumbnail = collect(['png', 'jpg', 'jpeg', 'gif', 'webp'])
                ->map(fn($ext) => "{$latestVersion->storage_path}/thumbnail.$ext")
                ->first(fn($path) => Storage::disk('public')->exists($path));

            return [
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description,
                'thumbnail' => $foundThumbnail ? $foundThumbnail : null,
                'uploadTimestamp' => $game->updated_at,
                'author' => $game->users->username ?? 'unknown',
                'scoreCount' => $game->scores_count,
            ];
        })->values();

        Log::info("GAME: " . $content);
        $totalElements = $content->count();
        return response()->json([
            'page' => $page,
            'size' => $size,
            'totalElements' => $totalElements,
            'content' => $content,
            'pageCount' => ceil($totalElements / $size),
            'isLastPage' => (($page + 1) * $size) >= $totalElements,
        ]);
    }

    public function store(Request $request)
    {
        // Validate request body
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:60',
            'description' => 'required|string|max:200',
        ]);

        // Generate slug from title
        $slug = Str::slug($validated['title']);

        // Check if slug already exists
        if (Game::where('slug', $slug)->exists()) {
            return response()->json([
                'status' => 'invalid',
                'slug' => 'Game title already exists'
            ], 400);
        }
        $user = Auth::user()->id;
        // Create new game
        $game = Game::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'slug' => $slug,
            'created_by' => $user,
        ]);

        // Return success response
        return response()->json([
            'status' => 'success',
            'slug' => $game->slug
        ], 201);
    }
    public function show($slug)
    {
        // Find the game by slug with its latest version and scores
        $game = Game::where('slug', $slug)
            ->has('gameVersions')
            ->with([
                'gameVersions' => function ($query) {
                    $query->orderBy('version', 'desc')->first();
                },
                'scores',
                'users',
            ])->withCount('scores')
            ->first();

        // Return 404 if game not found or has no versions
        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        $latestVersion = $game->gameVersions->first();
        $foundThumbnail = collect(['png', 'jpg', 'jpeg', 'gif', 'webp'])
            ->map(fn($ext) => "{$latestVersion->storage_path}/thumbnail.$ext")
            ->first(fn($path) => Storage::disk('public')->exists($path));

        // Construct response
        return response()->json([
            'slug' => $game->slug,
            'title' => $game->title,
            'description' => $game->description,
            'thumbnail' => $foundThumbnail ? $foundThumbnail : null,
            'uploadTimestamp' => $latestVersion->created_at->toIso8601String(),
            'author' => $game->users->username,
            'scoreCount' => $game->scores()->count(),
            'gamePath' => $latestVersion->storage_path,
        ], 200);
    }
    public function download($slug, $version)
    {
        // Find the game by slug
        $game = Game::where('slug', $slug)->first();

        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        // Find the specific version
        $gameVersion = $game->gameVersions()
            ->where('version', $version)
            ->first();

        if (!$gameVersion) {
            return response()->json(['error' => 'Game version not found'], 404);
        }

        $filePath = "{$gameVersion->storage_path}/game.zip";
        if (Storage::disk('public')->exists($filePath)) {
            set_time_limit(0);
            return response()->download(
                Storage::disk('public')->path($filePath),
                "game-{$slug}-v{$version}.zip",
                ['Content-Type' => 'application/zip']
            );
        }

        return response()->json(['error' => 'File not found'], 404);
    }


    public function upload(Request $request, $slug)
    {

        // Validate form parameters
        $validated = $request->validate([
            'zipfile' => 'required|file|mimes:zip',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            // 'token' => 'required',
        ]);

        // Find the game by slug
        $game = Game::where('slug', $slug)->first();
        if (!$game) {
            return response('Game not found', 404, ['Content-Type' => 'text/plain']);
        }

        // Verify the user is the author
        if ($game->created_by !== Auth::id()) {
            return response('User is not author of the game', 403, ['Content-Type' => 'text/plain']);
        }

        // Determine the next version number
        $latestVersion = GameVersion::where('game_id', $game->id)
            ->orderBy('version', 'desc')
            ->first();
        $newVersion = $latestVersion ? ((int) $latestVersion->version + 1) : 1;

        // Store the uploaded zip file
        $zipFile = $request->file('zipfile');
        $storagePath = "games/{$slug}/versions/v{$newVersion}";

        $zipPath = $zipFile->storeAs(
            $storagePath,
            "game.zip",
            'public'
        );

        // Initialize thumbnail path
        $thumbnailPath = null;

        // If thumbnail is provided, store it
        if ($request->hasFile('thumbnail') && $request->file('thumbnail')->isValid()) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailPath = $thumbnail->storeAs(
                $storagePath,
                "thumbnail." . $thumbnail->getClientOriginalExtension(),
                'public'
            );
        }

        $gameData = [
            'game_id' => $game->id,
            'version' => $newVersion,
            'storage_path' => $storagePath,
            'thumbnail_path' => $thumbnailPath,
        ];

        GameVersion::create($gameData);

        return response('Upload successful', 200, ['Content-Type' => 'text/plain']);
    }


    public function update(Request $request, $slug)
    {
        // Find the game by slug
        $game = Game::where('slug', $slug)->first();
        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        // Verify the user is the author
        if ($game->created_by !== Auth::user()->id) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the game author'
            ], 403);
        }

        // Validate request body
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:60',
            'description' => 'required|string|max:200',
        ]);

        // Update game (slug remains unchanged)
        $game->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        // Return success response
        return response()->json([
            'status' => 'success'
        ], 200);
    }

    public function destroy($slug)
    {
        // Find the game by slug
        $game = Game::where('slug', $slug)->with(['scores', 'gameVersions'])->first();
        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        // Verify the user is the author
        if ($game->created_by !== Auth::user()->id) {
            return response()->json([
                'status' => 'forbidden',
                'message' => 'You are not the game author'
            ], 403);
        }

        // Get all version IDs for this game
        $versionIds = $game->gameVersions->pluck('id');

        // Delete scores associated with these versions
        Score::whereIn('game_version_id', $versionIds)->delete();

        // Delete game versions
        GameVersion::where('game_id', $game->id)->delete();

        // Delete game files from storage
        Storage::disk('public')->deleteDirectory("games/{$slug}");

        // Delete the game
        $game->delete();

        // Return success response (no content)
        return response('', 204);
    }

    public function scores(Request $request, $slug)
    {
        $validated = $request->validate([
            'score' => 'required|min:0'
        ]);

        $game = Game::where('slug', $slug)
            ->has('gameVersions')
            ->with([
                'gameVersions' => function ($query) {
                    $query->orderBy('version', 'desc')->first();
                },
            ])
            ->first();

        // Return 404 if game not found or has no versions
        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        $latestVersion = $game->gameVersions->first();
        $user = Auth::user()->id;

        Score::create([
            'user_id' => $user,
            'game_version_id' => $latestVersion->id,
            'score' => $validated['score']
        ]);

        return response()->json([
            'status' => 'success',
        ], 201);
    }
    public function highscore($slug)
    {
        $game = Game::where('slug', $slug)
            ->has('gameVersions')
            ->with('scores') // eager load scores
            ->first();

        if (!$game) {
            return response()->json(['error' => 'Game not found'], 404);
        }

        // Ensure scores are available
        $scores = $game->scores;
        if ($scores->isEmpty()) {
            return response()->json([
                'status' => 'not-found',
                'message' => 'There are no scores for this game yet.'
            ], 200);
        }

        // Sort all scores by 'score' in descending order
        $sortedScores = $scores->sortByDesc('score');

        // If you need to format the data or filter it, you can do so here.
        $usernamesWithScores = $sortedScores->map(function ($score) {
            // Get the username of the user associated with this score
            $user = User::find($score->user_id);
            return [
                'username' => $user ? $user->username : 'Unknown', // Default to 'Unknown' if no user found
                'score' => $score->score,
                'timestamp' => $score->created_at,
            ];
        });
        return response()->json([
            'scores' => $usernamesWithScores,
        ], 200);
    }



}
