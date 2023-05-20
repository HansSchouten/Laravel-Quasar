<?php

namespace App\Http\Controllers\Settings;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|confirmed|min:4',
        ]);

        $request->user()->update([
            'password' => bcrypt($request->password),
        ]);
    }
}
