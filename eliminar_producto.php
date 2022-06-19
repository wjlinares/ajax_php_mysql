<?php

    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    if (isset($_GET['idProducto'])) {
        $idProducto = $_GET['idProducto'];
        $eliminarProducto = $metodos->eliminarProducto("producto", $idProducto);
        
        // Sea Falso o Verdadero el resultado de la conconsulta siempre se almacenará dentro de la variable "$respuesta".
        $respuesta = $eliminarProducto ? $eliminarProducto : $eliminarProducto;

        echo json_encode($respuesta);
    }


?>