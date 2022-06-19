<?php

    header("Content-Type: text/json");

    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    $valorBuscado = $_POST['inputBuscar'];

    $registros = $metodos->obtenerCoinsidencias("producto",$valorBuscado);
    
    if (mysqli_num_rows($registros) > 0) {
        $matrizAsociativa = array();
    
        while ($registro = mysqli_fetch_assoc($registros)) { 
            $matrizAsociativa[] = array( 
                'idProducto' => $registro['idProducto'],
                'nombre' =>  utf8_encode($registro['nombre']),
                'precio' => $registro['precio'],
                'cantidad' => $registro['cantidad']
            );
        }
        $resultado = json_encode($matrizAsociativa);
        echo $resultado;

    }else{
        $respuesta = false;
        $resultado = json_encode($respuesta);
        echo $resultado;
    }
    
?>