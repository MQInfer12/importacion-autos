<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = [
        "correo",
        "password",
        "rol",
        "nombre",
        "RUT",
        "domicilio",
        "nacionalidad",
        "profesion",
        "firma",
    ];
    protected $hidden = ["password"];
}
