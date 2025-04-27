<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Score extends Model
{
    use HasFactory;

    protected $table = "scores";

    protected $fillable = ['user_id', "game_version_id", 'score'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function gameVersion(){
        return $this->belongsTo(GameVersion::class);
    }

    // protected $casts = [
    //     'created_at' => 'datetime',
    //     'updated_at' => 'datetime',
    // ];
}
