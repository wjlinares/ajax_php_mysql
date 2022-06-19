<?php

    // Importando el archivo PHP donde se encuentra la conexión.
    require_once("conexion.php");
    

    class Crud{ // Es opcional crear la clase. Esto se hace si se quiere hacer con POO. Sino, se podría hacer con el estilo de procesos.

        // Obtener Todos los registros:
        public function obtenerTodos($tabla){
            global $conexion; // Es necesario hacer Global la variable que se ha declarado en otro archivo para poder tener acceso a dicha variable.
            $sql = "SELECT * FROM $tabla";
            $resultado = $conexion->query($sql); // Acá el resultado es devuelto a través de un OBJETO que debe ser convertido a un Arreglo Asociativo.
            return $resultado;
            /*
                NOTA 1:
                Para que la consulta MySql devuelva los campos de tipo String correctamente tildados, se puede colocar la siguiente conversión de campos DENTRO de la consulta:
                CAST(CONVERT(CampoQueContieneTildes USING utf8) AS binary). Ejemplo:
                $sql = "SELECT idProducto, CAST(CONVERT(nombre USING utf8) AS binary), precio, cantidad FROM producto";
                
                Nota 2:
                La función de PHP utf8_encode(PalabraTildada), permite mostrar correctamente una palabra tildada, esto es directamente aplicandolo a un String.
            */
        }

        // Obtener un registro por su ID:
        public function obtenerProductoUnico($tabla, $id){
            global $conexion;
            $sql = "SELECT * FROM $tabla WHERE(idProducto = $id)";
            $resultado = $conexion->query($sql);
            return $resultado;
        }

         // Obtener registros por COINSIDENCIAS:
         public function obtenerCoinsidencias($tabla, $valor){
            global $conexion;
            $sql = "SELECT * FROM $tabla WHERE(nombre LIKE '%$valor%' OR precio LIKE '%$valor%' OR cantidad LIKE '%$valor%')";
            $resultado = $conexion->query($sql);
            return $resultado;
        }

        // Insertar nuevos registros:
        public function insertarProducto($tabla, $nombre, $precio, $cantidad){
            global $conexion;
            $sql = "INSERT INTO $tabla (nombre, precio, cantidad) VALUES ('$nombre', '$precio', '$cantidad')";
            // Esta verificación es buena hacerla para saber si la query tubo éxito o no. Así se tomarán desiciones en el Frontend.
            if ( $conexion->query($sql) ) {
                return true;
            }else{
                return false;
            }
        }

        // Actualizar un registro:
        public function actualizarProducto($tabla, $id, $nombre, $precio, $cantidad){
            global $conexion;
            $sql = "UPDATE $tabla SET nombre='$nombre', precio='$precio', cantidad='$cantidad' WHERE(idProducto = $id)";
            if ( $conexion->query($sql) ) {
                return true;
            }else{
                return false;
            }
        }

        // Eliminar un registro:
        public function eliminarProducto($tabla, $id){
            global $conexion;
            $sql = "DELETE FROM $tabla WHERE(idProducto = $id)";
            if ( $conexion->query($sql) ) {
                return true;
            }else{
                return false;
            }
        }

    }



?>