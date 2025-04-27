<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Game extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'games';

    protected $fillable = ['title', 'slug', 'description', 'created_by'];

    // protected $casts = [
    //     'created_at' => 'datetime',
    //     'updated_at' => 'datetime',
    //     'deleted_at' => 'datetime',
    // ];

    public function users(){
        return $this->belongsTo(User::class,'created_by');
    }

    public function gameVersions(){
        return $this->hasMany(GameVersion::class);
    }
    public function scores()
    {
        return $this->hasManyThrough(
            Score::class,
            GameVersion::class          // Local key on GameVersion
        );
    }
}
