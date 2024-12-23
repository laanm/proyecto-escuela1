class Master{
    constructor(){
        this.init();
        this.save = {}
    }
    init(){
        console.log('Master');
    }

    async agregar_inventario(){
        if (inventario.all_data == ""){
            console.log("esta vacio")
            loading_show();
            await inventario.get_all_data();
            loading_hide();
        }else{
            console.log("no esta vacio")
        }

        this.agregar_inventario_formulario();
    }

    agregar_inventario_formulario(){
        console.log('agregar_inventario');
        let $this = this
        let html = `
            <div class="swal_container">

                <div class="swal_grupo1">
                    <div>
                        <label>Fecha de compra (*)</label>
                        <input type="date" id="F_fecha_compra">
                    </div>

                    <div>
                        <label>RUT Proveedor </label>
                        <input type="text" id="F_rut_proveedor">
                    </div>

                    <div>
                        <label>Número de factura</label>
                        <input type="number" id="F_numero_factura">
                    </div>

                    <div>
                        <label>Codigó de Barra</label>
                        <input type="text" id="F_codigo_barra">
                    </div>

                    <div>
                        <label>Número de serie</label>
                        <input type="text" id="F_numero_serie">
                    </div>

                    <div>
                        <label>Descripción (*)</label>
                        <textarea id="F_descripcion"></textarea>
                    </div>

                    <div>
                        <label>Cantidad (*)</label>
                        <input type="number" id="F_cantidad">
                    </div>

                    <div>
                        <label>Valor total del Bien (*)</label>
                        <input type="number" id="F_valor_total">
                    </div>
                </div>

                <div class="swal_grupo2">
                    <div>
                        <label>Centro de costo (*)</label>
                        <select id="F_centro_costo">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.centro_costo.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Nivel Educativo (*)</label>
                        <select id="F_nivel_educativo">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.nivel_educativo.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Grupo (*)</label>
                        <select id="F_grupo">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.grupo.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Categorización del bien (*)</label>
                        <select id="F_categorizacion">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.categorizacion.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Area de Asignación (*)</label>
                        <select id="F_area_asignación">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.area_asignacion.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Sala (*)</label>
                        <select id="F_sala">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.salas.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Procedencia (*)</label>
                        <select id="F_procedencia">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.procedencia.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Origen del Fondo (*)</label>
                        <select id="F_origen_fondo">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.origen_fondo.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Estado de Conservación (*)</label>
                        <select id="F_estado_conservacion">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.estado_conservacion.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>

                    <div>
                        <label>Observaciones</label>
                        <textarea id="F_observaciones"></textarea>
                    </div>

                    <div>
                        <label>¿Bien inventariable? (*)</label>
                        <select id="F_inventariable">
                            <option value="">Seleccionar...</option>
                            ${inventario.all_data.inventariable.map((item) => {
                                return `<option value="${item.id}">${item.nombre}</option>`
                            }).join('')}
                        </select>
                    </div>


                </div>

                

            </div>
        
        `

        Swal.fire({
            title: 'Agregar Inventario',
            html: html,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            width : '70%',
            preConfirm: () => {
                let data = {
                    fecha_compra : $('#F_fecha_compra').val(),
                    centro_costo : $('#F_centro_costo').val(),
                    nivel_educativo : $('#F_nivel_educativo').val(),
                    cantidad : $('#F_cantidad').val(),
                    descripcion : $('#F_descripcion').val(),
                    grupo : $('#F_grupo').val(),
                    categorizacion : $('#F_categorizacion').val(),
                    numero_series : $('#F_numero_serie').val(),
                    codigo_barra : $('#F_codigo_barra').val(),
                    area_asignacion : $('#F_area_asignación').val(),
                    sala : $('#F_sala').val(),
                    valor_total : $('#F_valor_total').val(),
                    numero_factura : $('#F_numero_factura').val(),
                    procedencia : $('#F_procedencia').val(),
                    origen_fondo : $('#F_origen_fondo').val(),
                    estado_conservacion : $('#F_estado_conservacion').val(),
                    descripcion_baja : "",
                    observaciones : $('#F_observaciones').val(),
                    inventariable : $('#F_inventariable').val(),
                    rut_proveedor : $('#F_rut_proveedor').val(),
                }

                let errores = []
                //COMPROBAR DATOS REQUERIDOS
                if(data.fecha_compra == ""){errores.push("Falta Fecha de Compra")}
                if(data.descripcion == ""){errores.push("Falta Descripción")}
                if(data.cantidad == ""){errores.push("Falta Cantidad")}
                if(data.valor_total == ""){errores.push("Falta Valor Total")}
                if(data.centro_costo == ""){ errores.push("Falta Centro de Costo")}
                if(data.nivel_educativo == ""){errores.push("Falta Nivel Educativo")}
                if(data.grupo == ""){errores.push("Falta Grupo")}
                if(data.categorizacion == ""){errores.push("Falta Categorización")}
                if(data.area_asignacion == ""){errores.push("Falta Área de Asignación")}
                if(data.sala == ""){errores.push("Falta Sala")}
                if(data.procedencia == ""){errores.push("Falta Procedencia")}
                if(data.origen_fondo == ""){errores.push("Falta Origen del Fondo")}
                if(data.estado_conservacion == ""){errores.push("Falta Estado de Conservación")}
                if(data.inventariable == ""){errores.push("Falta Bien Inventariable")}


                if(errores.length > 0){
                    console.log("errores",errores)
                    let mensaje = errores.join("<br>")
                    Swal.showValidationMessage(mensaje) 
                    return false;
                }else{
                    $this.save = data
                }
            }
            }).then((result) => {
                if (result.value) {
                    console.log('guardar');
                    console.log("datos para crear la cosa",$this.save);

                    $ajax({
                        url : '/inventario/bien',
                        method : 'POST',
                        data : $this.save
                    }).then((response) => {
                        console.log("response",response)
                    })
                }
            })
            
    }
}