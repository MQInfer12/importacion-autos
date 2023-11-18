<?php

use App\Http\Controllers\FormularioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/registro', [UsuarioController::class, 'registro']);
Route::get('/usuario', [UsuarioController::class, 'index']);
Route::delete('/usuario/{id}', [UsuarioController::class, 'destroy']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::get('/perfilusuario', [UsuarioController::class, 'usuarioPerfil']);

Route::post('/formulario', [FormularioController::class, 'store']);
Route::get('/formulario', [FormularioController::class, 'index']);