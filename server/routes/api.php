<?php

use App\Http\Controllers\FormularioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RespuestaController;
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
Route::put('/usuario/{id}', [UsuarioController::class, 'update']);
Route::get('/usuario/{id}', [UsuarioController::class, 'show']);



Route::post('/formulario', [FormularioController::class, 'store']);
Route::get('/formulario', [FormularioController::class, 'index']);
Route::get('/formulario/{id}', [FormularioController::class, 'show']);
Route::put('/formulario/{id}', [FormularioController::class, 'update']);
Route::delete('/formulario/{id}', [FormularioController::class, 'destroy']);

Route::post('/respuesta', [RespuestaController::class, 'store']);
Route::get('/respuesta', [RespuestaController::class, 'index']);
Route::put('/respuesta/{id}', [RespuestaController::class, 'update']);
Route::delete('/respuesta/{id}', [RespuestaController::class, 'destroy']);
