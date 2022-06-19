<?php

    // Datos de conexión:
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $db = "tienda";

    // Esta forma de conexión es de estilo Orientado a Objetos, pero está también el estilo por procedimientos. Ej:
    // $conexion = mysqli_connect($servidor, $usuario, $clave, $db).
    $conexion = new mysqli($servidor, $usuario, $clave, $db);

    if (!$conexion) {
        die("Ocurrieron errores en la conexión al servidor." . $conexion->connect_error );
        $conexion->close();
    }

?>