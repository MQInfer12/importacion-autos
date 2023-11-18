<?php

namespace App\Http\Controllers;
use App\Models\Respuesta;
use Illuminate\Http\Request;

class RespuestaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Respuesta = Respuesta::all();

        return response()->json([
            'status' => 1,
            'message' => 'Respuestas recuperados correctamente',
            'data' => $Respuesta
        ]);
    }
    public function store(Request $request)
    {
        $Respuesta = new Respuesta();
        $Respuesta->idFormulario = $request->idFormulario;
        $Respuesta->tipo = $request->tipo;
        $Respuesta->dato = $request->dato;
        $Respuesta->save();
        return response()->json([
            'status' => 1,
            'message' => 'Respuesta enviada',
            'data' => $Respuesta
        ]);
    }

    public function show($id)
    {
        $Respuesta = Respuesta::find($id);
        if ($Respuesta) {
            return response()->json([
                'status' => 1,
                'message' => "Respuesta encontrada",
                "data" => $Respuesta
            ]);
        } else {
            return response()->json([
                'status' => 1,
                'message' => "Respuesta no encontrada"
            ]);
        }
    }
    public function update(Request $request, $id)
    {
        $Respuesta = Respuesta::find($id);
        $Respuesta->tipo = $request->tipo;
        $Respuesta->dato = $request->dato;
        $Respuesta->save();
        return response()->json([
            'status' => 1,
            'message' => 'Respuesta actualizada',
            'data' => $Respuesta
        ]);
    }
    public function destroy($id)
    {
        $Respuesta = Respuesta::destroy($id);
        return response()->json([
            "status" => 1,
            "message" => "Respuesta eliminado correctamente",
            "data" => $Respuesta
        ]);
    }
}
