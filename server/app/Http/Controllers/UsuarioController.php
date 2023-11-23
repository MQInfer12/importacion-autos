<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;

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
    public function cliente()
    {
        $Cliente = Usuario::where("rol", "=", "Cliente")->get();
        return response()->json([
            "status" => 1,
            "message" => "Clientes obtenidos correctamente",
            "data" => $Cliente
        ]);
    }
    public function registro(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'correo' => 'required|email|unique:usuarios',
            'rol' => 'required',
            'password' => 'required'
        ], [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'correo.required' => 'El campo correo es obligatorio.',
            'correo.email' => 'El formato del correo no es válido.',
            'correo.unique' => 'Este correo ya está en uso.',
            'rol.required' => 'El campo rol es obligatorio.',
            'password.required' => 'El campo password es obligatorio.',
        ]);
        $User = new Usuario();
        $User->nombre = $request->nombre;
        $User->correo = $request->correo;
        $User->rol = $request->rol;
        $User->RUT = $request->RUT;
        $User->domicilio = $request->domicilio;
        $User->nacionalidad = $request->nacionalidad;
        $User->profesion = $request->profesion;
        $User->firma = $request->firma;
        $User->password = bcrypt($request->password);
        $User->save();
        return response()->json([
            "status" => 1,
            "message" => "Registro exitoso",
            "data" => $User
        ]);
    }
    public function update(Request $request, $id)
    {
        $User = Usuario::find($id);
        $User->nombre = $request->nombre;
        $User->correo = $request->correo;
        $User->rol = $request->rol;
        $User->RUT = $request->RUT;
        $User->domicilio = $request->domicilio;
        $User->nacionalidad = $request->nacionalidad;
        $User->profesion = $request->profesion;
        $User->firma = $request->firma;
        $User->save();
        return response()->json([
            "status" => 1,
            "message" => "Usuario actualizado correctamente",
            "data" => $User
        ]);
    }
    public function show($id)
    {
        $Usuario = Usuario::find($id);
        if ($Usuario) {
            return response()->json([
                'status' => 1,
                'message' => "Usuario encontrada",
                "data" => $Usuario
            ]);
        } else {
            return response()->json([
                'status' => 1,
                'message' => "Usuario no encontrada"
            ]);
        }
    }

    public function destroy($id)
    {
        $Usuario = Usuario::destroy($id);
        return response()->json([
            "status" => 1,
            "message" => "Usuario eliminado correctamente",
            "data" => $Usuario
        ]);
    }
    public function login(Request $request)
    {
        $request->validate([
            "correo" => "required|email",
            "password" => "required"
        ], [
            'correo.required' => "El correo es obligatorio",
            "password.required" => "La contraseña es obligatoria"
        ]);
        $user = Usuario::where("correo", "=", $request->correo)->first();
        if (isset($user->id)) {
            if (Hash::check($request->password, $user->password)) {
                $userData=$user;
                $token = $user->createToken("auth_token")->plainTextToken;
                return response()->json([
                    "status" => 1,
                    "message" => "Inicio de sesión correcto",
                    "data" => [
                        "access_token" => $token,
                        "user" => $userData,
                    ]
                ]);
            } else {
                return response()->json([
                    "status" => 3,
                    "message" => "Contraseña incorrecta",
                ], 404);
            }
        } else {
            return response()->json([
                "status" => 2,
                "message" => "Correo no registrado",
            ], 404);
        }
        ;
    }
    public function Logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => 0,
            "message" => "Cierre de sesión correcto",
        ]);
    }
    public function usuarioPerfil()
    {
        return response()->json([
            "status" => 0,
            "message" => "Usuario recuperado correctamente",
            "data" => auth()->user()
        ]);
    }
}
