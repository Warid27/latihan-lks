<?php

namespace App\Http\Controllers;

use App\Models\Administrator;
class AdministratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Administrator::all();

        $totalElements = count($admin);
        return response()->json([
            'totalElements' => $totalElements,
            'content' => $admin
        ], 200);
    }
}
