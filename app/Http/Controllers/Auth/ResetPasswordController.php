<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
  use ResetsPasswords;

  /**
   * Create a new controller instance.
   */
  public function __construct()
  {
    $this->middleware('guest');
  }

  /**
   * Get the response for a successful password reset.
   *
   * @param Request $request
   * @param $response
   * @return array
   */
  protected function sendResetResponse(Request $request, $response)
  {
    return ['status' => trans($response)];
  }

  /**
   * Get the response for a failed password reset.
   *
   * @param Request $request
   * @param $response
   * @return \Illuminate\Http\JsonResponse
   */
  protected function sendResetFailedResponse(Request $request, $response)
  {
    return response()->json(['email' => trans($response)], 400);
  }
}
