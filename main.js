// Evento puro de JavaScript para indicar que ya se cargó todo el HTML. Es el equivalente al método "ready" de jQuery.
document.addEventListener("DOMContentLoaded", function(){

    // Cargando todos los registros de la tabla:
    CargarRegistros();
    // Cargando las alertas por defecto vacías:
    var contenedorAlertas = $("#contenedorAlertas");
    contenedorAlertas.innerHTML = ""; // lo hice así por la pereza de no quitar el innerHTML donde ya lo había puesto xDD

    // Función que hago para poder seleccionar facilmente los elementos como si fuera jQuery:
    function $(elemento){
        // querySelector sólo retorna UN elemento. Si se necesita retornar un array de elementos usar: document.getElementsByClassName ó  document.querySelectorAll("selector").
        return document.querySelector(elemento);
    }


    // =========================== FUNCIÓN PARA REALIZAR LA PETICIÓN AJAX Y CARGAR TODOS LOS REGISTROS DE MANERA ASÍNCRONA ===========================
    function CargarRegistros(){
        // Cuando NO se especifica método, por defecto realiza el método GET.
        fetch('obtenerListado.php')
            .then(respuesta => respuesta.json())
            .then(productos => {
                
                var plantilla = ``;
                for (const producto of productos) {
                    plantilla += `
                        <tr>
                            <td>${producto["nombre"]}</td>
                            <td>$${producto["precio"]}</td>
                            <td>${producto["cantidad"]}</td>
                            <td class='text-center'>
                                <button type='submit' class='btn btn-primary btn-sm botones_detalle' data-toggle='modal' data-target='#modal-frmVerDetalleProducto' data-id-Detalle=${producto["idProducto"]}>Detalle &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns-reverse" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"/>
                                    </svg>
                                </button>

                                <button type='button' class='btn btn-warning btn-sm botones_editar' data-toggle='modal' data-target='#modal-frmActualizarProducto' data-id-Editar=${producto["idProducto"]}>Editar &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>

                                <button type='submit' class='btn btn-danger btn-sm botones_Eliminar' data-toggle='modal' data-target='#modal-frmEliminarProducto' data-id-Eliminar=${producto["idProducto"]}>Eliminar &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                      <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    `;
                }
                $("#contenedorRegistros").innerHTML = plantilla;
                
            });

    }


    // ================================================= FUNCIÓN PARA CARGAR LA BÚSQUEDA FILTRADA =================================================
    $("#inputBuscar").addEventListener("keyup", function(){
        var valorBuscado = $("#inputBuscar").value; // Obteniendo el valor a buscar.
        var frmBusqueda = $("#frmBusqueda");
        // Recuperando el único input de este formulario a través de la clase FormData().
        var datosFormulario = new FormData(frmBusqueda);

        if(valorBuscado != ""){
                    
            fetch("busqueda_filtrada.php", {
                method: "POST",
                body: datosFormulario
            })
                .then(respuesta => respuesta.json())
                .then(productos => {
                    
                    var plantilla = ``;

                    if (!productos) { // Acá estoy verificando "si productos ES FALSO ya que así lo programé en el backend".
                        plantilla = `
                            <tr>
                                <td colspan=4 class='bg-warning text-danger text-center'>No se encontraron resultados...</td>
                            </tr>
                        `;
                        $("#contenedorRegistros").innerHTML = plantilla;

                    }else{

                        // Creando el nuevo listado de acuerdo a la búsqueda filtrada:
                        for (const producto of productos) {
                            plantilla += `
                                <tr>
                                    <td>${producto["nombre"]}</td>
                                    <td>$${producto["precio"]}</td>
                                    <td>${producto["cantidad"]}</td>
                                    <td class='text-center'>
                                    <button type='submit' class='btn btn-primary btn-sm botones_detalle' data-toggle='modal' data-target='#modal-frmVerDetalleProducto' data-id-Detalle=${producto["idProducto"]}>Detalle &nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-columns-reverse" viewBox="0 0 16 16">
                                          <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"/>
                                        </svg>
                                    </button>

                                        <button type='button' class='botones_editar btn btn-warning btn-sm' data-toggle='modal' data-target='#modal-frmActualizarProducto' data-id-Editar=${producto["idProducto"]}>Editar &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>

                                        <button type='submit' class='btn btn-danger btn-sm botones_Eliminar' data-toggle='modal' data-target='#modal-frmEliminarProducto' data-id-Eliminar=${producto["idProducto"]}>Eliminar &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                              <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }
                        $("#contenedorRegistros").innerHTML = plantilla;

                        // Cargando el retardo para Enlazar los botones nuevamente de forma correcta(es decir, cuando ya existan en el DOM):
                        tiempoDeEsperaParaPoderVerDetalles();
                        tiempoDeEsperaParaPoderEditar();
                        tiempoDeEsperaParaPoderEliminar(); 
                    }

                });
        }else{
            CargarRegistros();
            // Cargando el retardo para Enlazar los botones nuevamente de forma correcta(es decir, cuando ya existan en el DOM):
            tiempoDeEsperaParaPoderVerDetalles();
            tiempoDeEsperaParaPoderEditar();
            tiempoDeEsperaParaPoderEliminar();
        }

    });
    
    // ================================================= FUNCIÓN PARA INSERTAR NUEVOS REGISTROS =================================================
    $("#frmAgregarProducto").addEventListener("submit", function(e){
        e.preventDefault();
        var plantilla = ``;

        var nombre = $("#nombre").value, precio = $("#precio").value, cantidad = $("#cantidad").value;

        const frmAgregarProducto = $("#frmAgregarProducto");

        const datosFormulario = new FormData(frmAgregarProducto);

        if (nombre != "" && precio != "" && cantidad != "") {
            fetch("agregar_producto.php", {
                method: 'POST',
                body: datosFormulario
            })
                .then(respuesta => respuesta.json())
                .then(datos => {
                    // Verificación del dato "TRUE o FALSE" recibido por el Backend:
                    if (datos) {
                        // Cerrando el Modal luego de insertar el producto:
                        cerrarModalAgregar();
                        // Limpiamos el div de alerta de errores de campos vacíos si contenía y si la inserción fué exitosa.
                        $("#alertaDeCamposInsertarProducto").innerHTML = "";

                        // Limpiando los controles del formulario luego de agregar un registro.
                        // Toca que volverlos a llamar con $("#elemento") para que funcione el limpiado jaja
                        $("#nombre").value = "", $("#precio").value = "", $("#cantidad").value = "";
                        $("#nombre").focus(); // Asignando el cursor al input nombre.

                        // Este sólo es plante, para que una alerta aparesca en el documento durante un tiempo, luego desaparesca.
                        // Acá inicio el temporizador:
                        setTimeout(() => {
                            contenedorAlertas.innerHTML = "";
                            plantilla = `
                                <div class='alert alert-dismissible alert-success'>
                                    <strong>¡ÉXITO!</strong> El registro fué agreado correctamente.
                                </div>
                            `
                            contenedorAlertas.innerHTML = plantilla;
                        }, 1000); // 1 segundo.

                        // Acá detengo el temporizador y limpio el div que contiene la alerta que se mostró en el documento anteriormente.
                        // (este es necesario que tenga el DOBLE de tiempo que el anterior para que funcione correctamente. 10 segundos).
                        setTimeout(() => {
                            contenedorAlertas.innerHTML = "";
                        },5000);
                        
                        // Limpiando el cuadro de búsqueda por si se habia hecho alguna previamente.
                        $("#inputBuscar").value = "";
                        // Cargamos nuevamente los registros.
                        CargarRegistros();
                        // Cargando el retardo para Enlazar los botones nuevamente de forma correcta(es decir, cuando ya existan en el DOM):
                        tiempoDeEsperaParaPoderVerDetalles();
                        tiempoDeEsperaParaPoderEditar();
                        tiempoDeEsperaParaPoderEliminar();

                    } else {
                        $("#nombre").value = "", $("#precio").value = "", $("#cantidad").value = "";
                        $("#nombre").focus();
                        contenedorAlertas.innerHTML = "";
                        plantilla = `
                            <div class='alert alert-dismissible alert-danger'>
                                <strong>ERROR</strong> Ocurrieron errores. Ningún registro fué agreado.
                            </div>
                        `
                        contenedorAlertas.innerHTML = plantilla;
                    }
                });
        } else {
            //Por si alguno de los campos se quieren enviar vacíos.
            $("#alertaDeCamposInsertarProducto").innerHTML = "<p>Todos los campos son obligatorios</p>";
        }

    });


    // =================== FUNCIÓN PARA LIMPIAR LOS CAMPOS DE FORMULARIO, TANTO PARA EL DE AGREGAR PRODUCTO COMO EL DE ACTUALIZAR ===================
    // La Clase "limpiarDatos" la tienen AMBOS botones "CERRAR" de los Modales para que así utilicen la misma función.
    var botonesCerrarModales = document.getElementsByClassName("limpiarDatos");

    for(let boton of botonesCerrarModales){
        // Aplicando el evento click a cada uno de los botones.
        boton.addEventListener("click", function(){
            $("#alertaDeCamposInsertarProducto").innerHTML = ""; // Limpiamos el div de alerta de errores de campos vacíos si contenía.
            $("#alertaDeCamposActualizarProducto").innerHTML = ""; // Limpiamos el div de alerta de errores de campos vacíos si contenía.
            $("#nombre").value = "", $("#precio").value = "", $("#cantidad").value = "";
            $("#nombreA").value = "", $("#precioA").value = "", $("#cantidadA").value = "";
        });
    }
    

    // ================================================= PROCESO PARA EDITAR(actualizar) REGISTROS ============================================================
    // ========== ::::::::::::: Extrayendo datos del servidor para Colocarlos Dentro de los inputs del formulario para poder actualizar :::::::::::::==========
        // Se ejecuta DESPUÉS de 1 segundo para que se lean correctamente los nuevos elementos HTML insertados con JavaScript.
        function  tiempoDeEsperaParaPoderEditar(){
            /*
                NOTA MUY IMPORTANTE!!!!
                Por el hecho de que en esta ocación se está haciendo referencia a elementos(botones) agregados con JavaScript,
                es necesario ejecutar éste Enlazado de elementos, "un breve tiempo después que también ya se haya ejecutado el 
                APARTADO de donde se Insertan dichos elementos". Sino, el "document.getElementsByClassName" NO DETECTA nada creado,
                ya que al parecer se ejecuta este vinculado Antes de insertar dichos elementos, por lo tanto NO los Encuentra para enlazarlos.
                Debido a eso he creado Este "setTimeout()" con 1 segundo de retraso, para poder enlazar correctamente los botones que previamente
                ya se han de haber creado. La misma Idea aplicará para cuando se quiera 'Eliminar' y 'Ver Detalles'.
            */
            setTimeout(() => {
    
                // Enlazando los elementos después de 3 segundos, para ASEGURAR el Enlazado de los elementos creados con JavaScript.
                var botonesEditar = document.getElementsByClassName("botones_editar");
    
                for(let boton of botonesEditar){
                    boton.addEventListener("click", function(){
                        // Leyendo y almacenando el ID capturado con data-id-Editar:
                        var idProducto = this.getAttribute("data-id-Editar"); // "this" hace referencia al elemento Clickeado en el momento.
                        /*
                            Para hacer la petición en este caso NO usaré fetch() api, ya que fetch() obliga a usar la clase "FormData()" para capturar y enviar
                            los datos al backend (es decir DEBE OBLIGATORIAMENTE haber un FORMULARIO para capturar los inputs, selects, textareas),
                            por lo tanto no se puede enviar un Objeto o Variable de manera INDEPENDIENTE usando fetch().
                            NOTA: FormData() recoge todos los componentes que puedan alojar contenido en su interior (inputs, selects, textareas), pero NO de 
                            Botones, y en este caso se está haiciendo uso de un "data-*" para lograr capturar un ID.
                            Para evitar el inconveniente usaré la forma Tradicional de hacer peticiones AJAX usando el Objeto "XMLHttpRequest()" así podré enviar
                            UN parámetro sin problemas.
                        */
    
                        // Realizando una petición AJAX de la manera antigua pero 100% Eficaz, ya que es en base a este Objeto "XMLHttpRequest"
                        // que han hecho las otras formas o sintaxis (fetch() y jQuery).
                        peticion = new XMLHttpRequest();
                        // Configurando la apertura de la petición:
                        peticion.open("GET","obtener_registro_para_actualizar.php?idProducto=" + idProducto, true); // Directamente en la URL se pasan los parámetros INDIVIDUALES y que es precisamente lo que no se puede con fetch().
                        // Obteniendo la respuesta del servidor de acuerdo a su STATUS (estado):
                        peticion.onreadystatechange = function(){
                            if (peticion.readyState == 4 && peticion.status == 200) {
                                // Parseando el resultado a formato Json para una mejor lectura e iteración:
                                var producto = JSON.parse(peticion.responseText);
                                // Para este ejemplo se coloca "resultado[indice].propiedad" porque así viene la respuesta, además sólamente es UN registro el que retorna el Backend.
                                $("#idA").value = producto[0].idProducto; // Este campo servirá para enviar el ID al backend y así poder Actualizar un producto.
                                $("#nombreA").value = producto[0].nombre;
                                $("#precioA").value = producto[0].precio;
                                $("#cantidadA").value = producto[0].cantidad;
                            }
                        }
                        peticion.send();
    
                    });
                }
            
            },1000);
            
        }
        // Ejecutando la función para cuando se INICIA el Navegador por primera ves:
        tiempoDeEsperaParaPoderEditar();

    // ===================== ::::::::::::: Editando Registros en la Base de Datos ::::::::::::: =====================
    
    $("#frmActualizarProducto").addEventListener("submit", function(e){
        e.preventDefault();

        if ( $("#nombreA").value != "" && $("#precioA").value != "" && $("#cantidadA").value != "" ) {
            var formularioActualizar = $("#frmActualizarProducto");
            var datosFormulario = new FormData(formularioActualizar);
    
            fetch("actualizar_producto.php", {
                method: 'POST',
                body: datosFormulario
            })
                .then(respuesta => respuesta.json())
                .then(datos => {

                    if(datos){
                        // Cerrando el modal después de la actualización:
                        cerrarModalActualizar();
                        // Limpiamos el div de alerta de errores de campos vacíos si contenía y si la actualización fué exitosa.
                        $("#alertaDeCamposActualizarProducto").innerHTML = "";

                        // Este contenedorAlertas NO es por campos vacíos, sino por que Todo Salió Bien.
                        setTimeout(() => {
                            contenedorAlertas.innerHTML = "";
                            plantilla = `
                                <div class='alert alert-dismissible alert-success'>
                                    <strong>¡ÉXITO!</strong> Registro Actualizado correctamente.
                                </div>
                            `
                            contenedorAlertas.innerHTML = plantilla;
                        }, 1000);

                        setTimeout(() => {
                            contenedorAlertas.innerHTML = "";
                        },5000);

                        // Limpiando el cuadro de búsqueda por si se habia hecho alguna previamente.
                        $("#inputBuscar").value = "";
                        // Cargando los registros de la tabla después de la actualización para reflejar el cambio inmediatamente.
                        CargarRegistros();

                        // Cargando el retardo para Enlazar los botones nuevamente de forma correcta(es decir, cuando ya existan en el DOM):
                        tiempoDeEsperaParaPoderVerDetalles();
                        tiempoDeEsperaParaPoderEditar();
                        tiempoDeEsperaParaPoderEliminar();

                    }
                });

        } else {
            //Por si alguno de los campos se quieren enviar vacíos.
            $("#alertaDeCamposActualizarProducto").innerHTML = "<p>Todos los campos son obligatorios</p>";
        }

    });

    
    // ================================================= PROCESO PARA ELIMINAR REGISTROS ============================================================
    // Siguiendo el mismo proceso de usar los Temporizadores para reconocer correctamente los botones creados con JavaScript:
      function tiempoDeEsperaParaPoderEliminar(){
        // Para almacenar el data-id-Eliminar del botón y poderlo pasar al formulario del modal eliminar.
        var inputIdEliminarRegistro = $("#inputIdEliminarRegistro");
        setTimeout( () => {
            var botonesEliminar = document.getElementsByClassName("botones_Eliminar");
            for(let boton of botonesEliminar){
                boton.addEventListener("click", function() {
                    var idProducto = this.getAttribute("data-id-Eliminar");
                    inputIdEliminarRegistro.value = idProducto; // Pasando el id obtenido a través del click, hacia el input de tipo hidden del modal eliminar.
                });
            }
        }, 1000);
    }
    // Ejecutando la función para cuando se INICIA el Navegador por primera ves:
    // Iniciando el retraso de un segundo, para reconocer los botones generados con JavaScript y así poder realizar la petición AJAX:
    tiempoDeEsperaParaPoderEliminar();

    // Petición AJAX aplicado al botón eliminar del modal eliminar:
    $("#btnModalEliminarProducto").addEventListener("click", function(){
        var idProducto = $("#inputIdEliminarRegistro").value;
        // Instancia del objeto XMLHttpRequest:
        xmlhttprequest = new XMLHttpRequest();
        xmlhttprequest.open("GET", "eliminar_producto.php?idProducto=" + idProducto);
        xmlhttprequest.onreadystatechange = function(){
            if(xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200){
                var respuesta = JSON.parse(xmlhttprequest.responseText);
                if (respuesta) {
                    setTimeout(() => {
                        contenedorAlertas.innerHTML = "";
                        plantilla = `
                            <div class='alert alert-dismissible alert-success'>
                                <strong>¡ÉXITO!</strong> Registro Eliminado correctamente.
                            </div>
                        `
                        contenedorAlertas.innerHTML = plantilla;
                    }, 1000);

                    setTimeout(() => {
                        contenedorAlertas.innerHTML = "";
                    },5000);

                    // Limpiando el cuadro de búsqueda por si se habia hecho alguna previamente.
                    $("#inputBuscar").value = "";
                    // Cargando todos los registros nuevamente para poder realizar todas las acciones(buscar,editar,eliminar,verDetalles).
                    CargarRegistros();
                    // Cargando el retardo para Enlazar los botones nuevamente de forma correcta(es decir, cuando ya existan en el DOM):
                    tiempoDeEsperaParaPoderVerDetalles();
                    tiempoDeEsperaParaPoderEditar();
                    tiempoDeEsperaParaPoderEliminar();

                } else {
                    console.log("Ningún registro fué elminado.");
                }
            }
        }
        xmlhttprequest.send();
    });



    // ============================================ PROCESO PARA VER LOS DETALLES DE UN REGISTRO =======================================================
    function tiempoDeEsperaParaPoderVerDetalles(){
        setTimeout( () => {
            var botonesDetalle = document.getElementsByClassName("botones_detalle");
            for(let boton of botonesDetalle){
                boton.addEventListener("click", function(){
                    var idProducto = this.getAttribute("data-id-Detalle");
                    var xmlhttprequest = new XMLHttpRequest();
                    xmlhttprequest.open("GET","obtener_registro_para_ver_detalles.php?idProducto=" + idProducto);
                    xmlhttprequest.onreadystatechange = function(){
                        if (xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200) {
                            var resultado = JSON.parse(xmlhttprequest.responseText);
                            $("#spanId").innerHTML = resultado[0].idProducto;
                            $("#spanNombre").innerHTML = resultado[0].nombre;
                            $("#spanPrecio").innerHTML = resultado[0].precio;
                            $("#spanCantidad").innerHTML = resultado[0].cantidad;
                        }
                    }
                    xmlhttprequest.send();
                });
            }
        }, 1000);
    }

    // Ejecutando la función al inicio, después de cargar todo el DOM.
    tiempoDeEsperaParaPoderVerDetalles();

    

});

/*
    Estas funciones las coloqué Fuera de la función del evento "DOMContentLoaded" Para poder tener el Alcanse y así acceder a las funciones
    JavaScript de Bootstrap para poder controlar el cierre de ventanas modales:
*/
function cerrarModalActualizar(){
    $('#modal-frmActualizarProducto').modal('hide');
}

function cerrarModalAgregar(){
    $('#modal-frmAgregarProducto').modal('hide');
}










