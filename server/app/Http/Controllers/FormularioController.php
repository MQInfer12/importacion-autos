<?php

namespace App\Http\Controllers;

use App\Models\Respuesta;
use Illuminate\Http\Request;
use App\Models\Formulario;
use Illuminate\Support\Carbon;

class FormularioController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $Formularios = Formulario::join("usuarios", "formularios.idUsuario", "=", "usuarios.id")
            ->join("respuestas", "respuestas.idFormulario", "=", "formularios.id")
            ->select("formularios.*", "usuarios.nombre as nombre_usuario", "respuestas.dato as fecha")
            ->where("respuestas.tipo", "=", "formularioFecha");
        if ($user->rol == 'Cliente') {
            $Formularios->where("formularios.idUsuario", "=", $user->id)->where("formularios.estado", "!=", "Borrador");
        }
        $Formularios = $Formularios->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 1,
            'message' => 'Formularios recuperados correctamente',
            'data' => $Formularios
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'idUsuario' => 'required|integer'
            ],
            [
                "idUsuario.required" => "El usuario es requerido"
            ]
        );
        // CREAR FORMULARIO
        $Formulario = new Formulario();
        $Formulario->idUsuario = $request->idUsuario;
        $Formulario->OT = '';
        $Formulario->estado = "Nuevo";
        $Formulario->observacion = null;
        $Formulario->save();
        $year = date('Y');
        $Formulario->OT = $Formulario->id . "-" . $year;
        $Formulario->save();

        //CREAR LAS RESPUESTAS DEL FORMULARIO
        $respuestas = $request->respuestas;
        foreach ($respuestas as $key => $value) {
            $Respuesta = new Respuesta();
            $Respuesta->idFormulario = $Formulario->id;
            $Respuesta->tipo = $key;
            if ($value == null) {
                $Respuesta->dato = "";
            } else {
                $Respuesta->dato = $value;
            }
            $Respuesta->save();
        }

        //DEVOLVEMOS EL FORMULARIO
        return response()->json([
            'status' => 1,
            'message' => 'Formulario creado correctamente',
            'data' => $Formulario
        ]);
    }

    public function storeEraser(Request $request)
    {
        $request->validate(
            [
                'idUsuario' => 'required|integer'
            ],
            [
                "idUsuario.required" => "El usuario es requerido"
            ]
        );
        // CREAR FORMULARIO
        $Formulario = new Formulario();
        $Formulario->idUsuario = $request->idUsuario;
        $Formulario->OT = '';
        $Formulario->estado = "Borrador";
        $Formulario->observacion = null;
        $Formulario->save();
        $year = date('Y');
        $Formulario->OT = $Formulario->id . "-" . $year;
        $Formulario->save();

        //CREAR LAS RESPUESTAS DEL FORMULARIO
        $respuestas = $request->respuestas;
        foreach ($respuestas as $key => $value) {
            $Respuesta = new Respuesta();
            $Respuesta->idFormulario = $Formulario->id;
            $Respuesta->tipo = $key;
            if ($value == null) {
                $Respuesta->dato = "";
            } else {
                $Respuesta->dato = $value;
            }
            $Respuesta->save();
        }

        //DEVOLVEMOS EL FORMULARIO
        return response()->json([
            'status' => 1,
            'message' => 'Borrador guardado correctamente',
            'data' => $Formulario
        ]);
    }

    public function storeEdit(Request $request, $id)
    {
        $delete = Respuesta::where("idFormulario", intval($id))->delete();
        if(!$delete) {
            return response()->json([
                'status' => 2,
                'message' => 'Ocurrió un error inesperado',
                'data' => ""
            ]);
        }
        //CREAR LAS RESPUESTAS DEL FORMULARIO
        $respuestas = $request->respuestas;
        foreach ($respuestas as $key => $value) {
            $Respuesta = new Respuesta();
            $Respuesta->idFormulario = intval($id);
            $Respuesta->tipo = $key;
            if ($value == null) {
                $Respuesta->dato = "";
            } else {
                $Respuesta->dato = $value;
            }
            $Respuesta->save();
        }
        return response()->json([
            'status' => 1,
            'message' => 'Formulario editado correctamente',
            'data' => ""
        ]);
    }
    
    public function show($id)
    {
        $User = auth()->user();
        $Formulario = Formulario::with("respuestas")->with("usuario")->find($id);
        if($Formulario == null) {
            return response()->json([
                'status' => 2,
                'message' => "Formulario no encontrado"
            ]);
        }
        if($User->rol == "Admin" || $Formulario->idUsuario == $User->id) {
            if($Formulario->estado == "Borrador" && $User->rol != "Admin") {
                return response()->json([
                    'status' => 3,
                    'message' => "No tienes permisos para ver esto",
                    "data" => null
                ]);
            }
            return response()->json([
                'status' => 1,
                'message' => "Formulario encontrado",
                "data" => $Formulario
            ]);
        }
        return response()->json([
            'status' => 3,
            'message' => "No tienes permisos para ver esto",
            "data" => null
        ]);
    }

    public function update(Request $request, $id)
    {
        $Formulario = Formulario::find($id);
        $Formulario->estado = $request->estado;
        $Formulario->observacion = $request->observacion;
        $Formulario->save();
        return response()->json([
            'status' => 1,
            'message' => 'Formulario actualizado',
            'data' => $Formulario
        ]);
    }

    public function destroy($id)
    {
        $Formulario = Formulario::destroy($id);
        return response()->json([
            "status" => 1,
            "message" => "Formulario eliminado correctamente",
            "data" => $Formulario
        ]);
    }

    public function sign($idForm) 
    {
        $Formulario = Formulario::find($idForm);
        $User = auth()->user();
        if($User->firma == null) {
            return response()->json([
                "status" => 3,
                "message" => "Añade una firma desde tu perfil",
                "data" => null
            ]);
        }
        if($Formulario->idUsuario == $User->id) {
            $Formulario->estado = "Firmado";
            $Formulario->save();
            return response()->json([
                "status" => 1,
                "message" => "Formulario firmado correctamente",
                "data" => $Formulario
            ]);
        }
        return response()->json([
            "status" => 2,
            "message" => "No tienes permisos para hacer esto",
            "data" => null
        ]);
    }

    public function decline(Request $request, $idForm)
    {
        $Formulario = Formulario::find($idForm);
        $User = auth()->user();
        if($Formulario->idUsuario == $User->id) {
            $Formulario->observacion = $request->observacion;
            $Formulario->estado = "Declinado";
            $Formulario->save();
            return response()->json([
                "status" => 1,
                "message" => "Se declinó el formulario y la observación fué enviada",
                "data" => $Formulario
            ]);
        }
        return response()->json([
            "status" => 2,
            "message" => "No tienes permisos para hacer esto",
            "data" => null
        ]);
    }

    public function check($id)
    {
        $Formulario = Formulario::find($id);
        $Formulario->estado = "Nuevo";
        $Formulario->save();
        return response()->json([
            "status" => 1,
            "message" => "Formulario enviado correctamente",
            "data" => $Formulario
        ]);
    }
}
