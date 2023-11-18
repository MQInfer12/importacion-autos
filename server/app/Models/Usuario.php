<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "usuarios";
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
