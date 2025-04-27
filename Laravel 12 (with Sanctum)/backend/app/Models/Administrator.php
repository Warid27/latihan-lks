<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Administrator extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'administrators';

    protected $fillable = ['username', 'password', 'last_login_at'];

    protected $hidden = ['password'];

    protected $casts = [
        'last_login_at' => 'datetime',
        // 'created_at' => 'datetime',
        // 'updated_at' => 'datetime',
    ];

    public function tokens()
    {
        return $this->morphMany(PersonalAccessToken::class, 'tokenable');
    }
}
