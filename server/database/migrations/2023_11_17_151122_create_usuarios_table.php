<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string("correo");
            $table->string("password");
            $table->string("rol");
            $table->string("nombre");
            $table->string("RUT")->nullable();
            $table->string("domicilio")->nullable();
            $table->string("nacionalidad")->nullable();
            $table->string("profesion")->nullable();
            $table->string("firma")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
};
