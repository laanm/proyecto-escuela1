class Master{
    constructor(){
        this.init();
    }
    init(){
        console.log('Master');
    }

    async agregar_inventario(){
        if (inventario.all_data == ""){
            console.log("esta vacio")
            loading.show();
            await inventario.get_all_data();
            loading.hide();
        }else{
            console.log("no esta vacio")
        }
    }

    agregar_inventario_formulario(){
        console.log('agregar_inventario');
        let html = `
            <div class="swal_container">

                <div class="swal_grupo1">
                    <div>
                        <label>Fecha de compra</label>
                        <input type="date" id="fecha_compra">
                    </div>

                    <div>
                        <label>Número de factura</label>
                        <input type="number" id="numero_factura">
                    </div>

                    <div>
                        <label>Codigó de Barra</label>
                        <input type="text" id="codigo_barra">
                    </div>

                    <div>
                        <label>Número de serie</label>
                        <input type="text" id="numero_serie">
                    </div>

                    <div>
                        <label>Descripción</label>
                        <textarea id="descripcion"></textarea>
                    </div>

                    <div>
                        <label>Cantidad</label>
                        <input type="number" id="cantidad">
                    </div>

                    <div>
                        <label>Valor total del Bien</label>
                        <input type="number" id="valor_total">
                    </div>
                </div>

                <div class="swal_grupo2">
                    <div>
                        <label>Centro de costo</label>
                        <select id="centro_costo">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Nivel Educativo</label>
                        <select id="centro_costo">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Grupo</label>
                        <select id="grupo">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Categorización del Bien</label>
                        <select id="categorizacion">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Area de Asignación</label>
                        <select id="area_asignación">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Sala</label>
                        <select id="sala">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Procedencia</label>
                        <select id="procedencia">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Origen del Fondo</label>
                        <select id="origen_fondo">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Estado de Conservación</label>
                        <select id="estado_conservacion">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>

                    <div>
                        <label>Observaciones</label>
                        <textarea id="observaciones"></textarea>
                    </div>

                    <div>
                        <label>¿Bien inventariable?</label>
                        <select id="inventariable">
                            <option value="">Seleccionar...</option>
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
            }).then((result) => {
                if (result.value) {
                    console.log('guardar');
                }
            })
            
    }
}