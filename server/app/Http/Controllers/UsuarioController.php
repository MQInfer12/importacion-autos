<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index()
    {
        $Usuario = Usuario::all();
        return response()->json([
            "status" => 1,
            "message" => "Usuario obtenidos correctamente",
            "data" => $Usuario
        ]);
    }
    public function registro(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'correo' => 'required|email|unique:usuarios',
            'rol' => 'required',
            'password' => 'required'
        ]);
        $User = new Usuario();
        $User->nombre = $request->nombre;
        $User->correo = $request->correo;
        $User->rol = $request->rol;
        $User->RUT = $request->correo;
        $User->domicilio = $request->telefono;
        $User->nacionalidad = $request->correo;
        $User->profesion = $request->telefono;
        $User->firma = $request->rol;
        $User->password = bcrypt($request->password);
        $User->save();
        return response()->json([
            "status" => 1,
            "message" => "Registro exitoso",
            "data" => $User
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Usuario=Usuario::destroy($id);
        return response()->json([
            "status" => 1,
            "message" => "Usuario eliminado correctamente",
            "data" => $Usuario
        ]);
    }
}
