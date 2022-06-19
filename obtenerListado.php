<?php
    // Esta línea es opcional, sólo es para que el navegador interprete correctamente el contenido.
    header("Content-Type: text/json");

    // Importando el archivo PHP donde se encuentra la CLASE con los métodos CRUD.
    require_once("metodos_crud.php");
    
    // Genrando la instancia de la clase Crud:
    $metodos = new Crud();

    /*
        MUCHOOOO OJOOO CON LAS PALABRAS TILDADAS, YA QUE POR DEFECTO LAS CONSULTAS MYSQL NO DEVUELVEN CORRECTAMENTE LAS VOCALES TILDADAS YYYY
        ESTO AFECTA MUUUUCHO A LA HORA DE QUERER ENVIAR EL RESULTADO DE LA CONSULTA CON LA FUNCIÓN DE PHP json_encode() AL FRONTEND.
        ANTES DE ENVIAR CUALQUIER DATO AL FRONTEND VERIFICAR QUE TODO SE VEA CORRECTAMENTE, TRATÁNDOSE PRINCIPALMENTE DE LAS TILDES,
        ESTO SE PUEDE HACER VERIFICANDO EL CONTENIDO CON LA FUNCIÓN print_r(json_encode(mysqli_fetch_assoc($consultaObtenidaPorMySql))).
        RECALCOOO TIENEN QUE VERSE BIEN LAS TILDES U OTRO CARACTER ANTES DE ENVIAR EL RESULTADO AL FRONTEND.

    */

    // Este OBJETO devuelto por MySql debe OBLIGATORIAMENTE ser recorrido para poder extraer de manera independiente cada uno de los arreglos dentro de él.
    $registros = $metodos->obtenerTodos("producto");
    
    // NOTA ====================================
    // El Array Vacío y el Recorrido con el bucle While, se hace únicamente para crear un Arreglo Asociativo, pero NO ES NECESARIO,
    // ya que se puede enviar al Frontend y recorrerlo sin problemas.
    // =========================================

    // Esta matriz vacía será rellenada con CADA UNO de los Arreglos Asociativos devueltos por Mysql tras recorrer el Objeto MySql con el bucle While.
    $matrizAsociativa = array();
    // En la EXPRESIÓN(condición) del bucle While, lo que se está haciendo es TRAS recorrer el resultado, CONVERTIRLO al mismo tiempo a un arreglo asociativo y por último asignarlo a la variable $registro.
    while ($registro = mysqli_fetch_assoc($registros)) { 
        // Rellenando la Matriz con cada uno de los arreglos que vienen de la DB.
        $matrizAsociativa[] = array( // Por cada iteración con el While se crea un nuevo arra() y se almacena dentro de la matriz vacía.
            'idProducto' => $registro['idProducto'],
            'nombre' =>  utf8_encode($registro['nombre']), // IMPORTANTE: Debido a que hay palabras con Tildes es Necesario usar el método "utf8_encode()" para que json_encode() NO de problemas. Esto sería de hacerlo para todos aquellos campos que posean palabras con tildes.
            'precio' => $registro['precio'],
            'cantidad' => $registro['cantidad']
        );
    }
   
    // DENTRO de las instrucciones del While, lo que se está haciendo es rellenar la MATRIZ VACÍA previamente creada con NUEVOS arreglos asociativos que
    // se almacenan dentro de la variable "registro" después de convertirlos por cada iteración con "mysqli_fetch_assoc".
    // En Resumen, se crea una Matriz con un conjunto de Arreglos Asociativos para poderlos enviar al Frontend.

    // Invirtiendo la matriz para que los resultados nuevos ingresados aparezcan al principio de la lista y no al final.
    // Esto hace que en la lista se muestren de primero los últimos registros insertados. Esto es para más plante NO es obligatorio:
    $arrayReverso = array_reverse($matrizAsociativa);

    // Codificando la matriz a un formato JSON y String al mismo tiempo, para luego enviarla al Frontend:
    $resultado = json_encode($arrayReverso);
    echo $resultado; // Esta variable es la que se envía al Frontend.

    //NOTA:
    /*
        El método json_encode(elementoAcodificar) codifica ya sea una matriz, vector, cadena, etc.
        El resultado de json_encode() es un STRING(cadena) pero con Formato JSON.

        MUY IMPORTANTE:
            El método json_encode() normalmente TIENE PROBLEMAS en tratar las letras TILDADAS.
            Para resolver el problema utilizar el método "utf8_encode(palabraConTildes)" para conservar las tildes de las palabras.
     */
       

?>