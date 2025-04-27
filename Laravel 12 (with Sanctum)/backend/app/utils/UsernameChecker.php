<?php

namespace App\Utils;

use App\Models\User;
use App\Models\Administrator;

class UsernameChecker
{
    public static function isUsernameTaken(string $username)
    {
        return User::where("username", $username)->exists() || Administrator::where("username", $username)->exists();
    }
}
