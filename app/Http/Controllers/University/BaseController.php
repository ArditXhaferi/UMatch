<?php

declare(strict_types=1);

namespace App\Http\Controllers\University;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class BaseController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

} 