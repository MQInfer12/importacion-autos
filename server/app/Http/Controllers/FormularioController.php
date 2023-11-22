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
        $Formularios = Formulario::join("usuarios", "formularios.idUsuario", "=", "usuarios.id")
            ->select("formularios.*", "usuarios.nombre as nombre_usuario")
            ->get();

        foreach ($Formularios as $Formulario) {
            $Formulario->fecha = Carbon::parse($Formulario->created_at)->format('d/m/Y');
            ;
        }

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
    public function show($id)
    {
        $Formulario = Formulario::with("respuestas")->find($id);
        if ($Formulario) {
            return response()->json([
                'status' => 1,
                'message' => "Formulario encontrado",
                "data" => $Formulario
            ]);
        } else {
            return response()->json([
                'status' => 2,
                'message' => "Formulario no encontrado"
            ]);
        }
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
}
