<?php
    header ('Content-type: text/json');
    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    if (isset($_GET['idProducto'])) {
        $id = $_GET['idProducto'];
        // En este caso no se recorrerá con While el registro ya que sólo es uno.
        $registro = $metodos->obtenerProductoUnico("producto", $id);
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

    }
    

?>