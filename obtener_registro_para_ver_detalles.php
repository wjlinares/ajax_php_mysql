<?php

    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    if (isset($_GET['idProducto'])) {
        $idProducto = $_GET['idProducto'];
        $registro = $metodos->obtenerProductoUnico("producto", $idProducto);
        $registroAsociativo = mysqli_fetch_assoc($registro);
    
        $nuevoArrayAsociativoFormateadoCorrectamente = array();
        $nuevoArrayAsociativoFormateadoCorrectamente[] = array(
            'idProducto' => $registroAsociativo['idProducto'],
            'nombre' => utf8_encode($registroAsociativo['nombre']), // Hago todo esto sólo por formatear bien el nombre con tildes antes de enviar con json_encode().
            'precio' => $registroAsociativo['precio'],
            'cantidad' => $registroAsociativo['cantidad']
        );

        $registroAenviar = json_encode($nuevoArrayAsociativoFormateadoCorrectamente);
        echo $registroAenviar;

    } else {
        echo json_encode(false);
    }
    


?>