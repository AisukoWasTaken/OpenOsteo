<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users, email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
            ]);

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return response('success', 200);
    }

    public function login(Request $request) {

        $credentials = $request->validate([
            'email' => 'required|email|string',
            'password' => [
                'required',
            ],
            'remember' => 'boolean',
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        if(!Auth::attempt($credentials, $remember)) {
            return response(
                [
                    'error' => 'Credentials invalid',
                ],
                422
            );
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $sessionId = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'sessionId' => $sessionId
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return response([
            'success' => true,
        ]);
    }
}
