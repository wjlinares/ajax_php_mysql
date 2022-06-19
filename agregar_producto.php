<?php

    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    // Estas validaciones también se hacen con JavaScript desde el Frontend.
    if (isset($_POST['nombre']) && isset($_POST['precio']) && isset($_POST['cantidad'])) {
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $cantidad = $_POST['cantidad'];

        if ($nombre != "" && $precio != "" && $cantidad != "") {
            // Este método "insertarProducto()", devuelve TRUE o FALSE dependiendo del éxito de la consulta MySql.
            $resultado = $metodos->insertarProducto("producto", $nombre, $precio, $cantidad);
            
            // Acá uso un ternario que aparentemente se vé como que es el mismo resultado el que estoy retornando,
            // pero ya que el método insertarProducto() devuelve TRUE o FALSE, será Uno u Otro que se enviará como resultado.
            $respuesta = $resultado == true ? json_encode($resultado) : json_encode($resultado);
            echo $respuesta;
            
        }else{
            $respuesta = false;
            echo json_encode($respuesta);
        }
    }

?>