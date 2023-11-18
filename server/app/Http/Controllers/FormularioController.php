<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulario;

class FormularioController extends Controller
{
    public function index()
    {
        $Formulario = Formulario::all();

        return response()->json([
            'status' => 1,
            'message' => 'Formularios recuperados correctamente',
            'data' => $Formulario
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'idUsuario' => 'required|integer',
            'estado' => 'required|in:Nuevo,Firmado,Declinado',
            'observacion' => 'nullable|string'
        ],[
            ''
        ]);
        $Formulario = new Formulario();
        $Formulario->idUsuario = $request->idUsuario;
        $Formulario->OT = $request->OT;
        $Formulario->estado = $request->estado;
        $Formulario->observacion = $request->observacion;
        $Formulario->save();

        return response()->json([
            'status' => 1,
            'message' => 'Formulario creado correctamente',
            'data' => $Formulario
        ]);
    }
    public function show($id)
    {
        $Formulario = Formulario::find($id);
        if ($Formulario) {
            return response()->json([
                'status' => 1,
                'message' => "Formulario encontrado",
                "data" => $Formulario
            ]);
        } else {
            return response()->json([
                'status' => 1,
                'message' => "Formulario no encontrado"
            ]);
        }
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
