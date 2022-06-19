<?php

    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    if( isset($_POST['idA']) && isset($_POST['nombreA']) && isset($_POST['precioA']) && isset($_POST['cantidadA']) ){
        // Esta verificación de campos vacíos es opcional ya que en el Frontend ya se realizó.
        $idProducto = $_POST['idA']; $nombre = $_POST['nombreA']; $precio = $_POST['precioA']; $cantidad = $_POST['cantidadA'];
        if ($idProducto != "" && $nombre != "" && $precio != "" && $cantidad != "") {
            // El método actualizarProducto() retorna un valor booleano dependiendo el resultado de éxito o fracaso a la hora de actualizar con MySql.
            $actualizacion = $metodos->actualizarProducto("producto", $idProducto, $nombre, $precio, $cantidad);
            if ($actualizacion) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            
        } else {
            echo json_encode(false);
        }
        
    }


?>