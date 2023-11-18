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
        $year = date('Y');
        $request->validate([
            'idUsuario' => 'required|integer',
            'observacion' => 'nullable|string'
        ]);
        $Formulario = new Formulario();
        $Formulario->idUsuario = $request->idUsuario;
        $Formulario->OT = '';
        $Formulario->estado = "Nuevo";
        $Formulario->observacion =null;
        $Formulario->save();
        $Formulario->OT=$Formulario->id."-".$year;
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
