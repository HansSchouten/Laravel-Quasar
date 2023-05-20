<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\PasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'auth:api'], function () {
  Route::post('logout', [LoginController::class, 'logout']);
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::patch('settings/profile', [ProfileController::class, 'update']);
  Route::patch('settings/password', [PasswordController::class, 'update']);
});

Route::group(['middleware' => 'guest:api'], function () {
  Route::post('login', [LoginController::class, 'login']);
  Route::post('register', [RegisterController::class, 'register']);
  Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
  Route::post('password/reset', [ResetPasswordController::class, 'reset']);
});
