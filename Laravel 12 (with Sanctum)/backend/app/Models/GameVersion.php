<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GameVersion extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'game_versions';

    protected $fillable = ['game_id', 'version', 'storage_path'];

    // protected $casts = [
    //     'created_at' => 'datetime',
    //     'updated_at' => 'datetime',
    //     'deleted_at' => 'datetime',
    // ];

    public function game(){
        return $this->belongsTo(Game::class);
    }
    public function scores()
    {
        return $this->hasMany(Score::class);
    }
}

