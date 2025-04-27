<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $table = "users";
    protected $date = ['deleted_at'];

    protected $fillable = [
        'username',
        'password',
        'last_login_at',
        'delete_reason',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'last_login_at' => 'datetime',
            // 'created_at' => 'datetime',
            // 'updated_at' => 'datetime',
            // 'deleted_at' => 'datetime',
        ];
    }

    public function tokens()
    {
        return $this->morphMany(PersonalAccessToken::class, 'tokenable');
    }

    public function games()
    {
        return $this->hasMany(Game::class, 'created_by');
    }

    public function scores(){
        return $this->hasMany(Score::class);
    }

    public function gameVersions()
    {
        return $this->hasManyThrough(
            GameVersion::class,  // The final model we want to access
            Game::class,         // The intermediate model
            'created_by',        // Foreign key on the Games table that references users
            'game_id',           // Foreign key on the GameVersions table that references games
            'id',                // Local key on the Users table
            'id'                 // Local key on the Games table
        );
    }
}
