class Inventario{
    constructor(){
        console.log("Inventario instanciado")
        this.all_data = ""

        
    }

    async init(){
        loading_show()
        await this.get_all_data()
        this.cargar_en_select()
        loading_hide()
    }

    get_all_data(){
        let $this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/inventario/all_data",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $this.all_data = data;
                    console.log("all data",data)
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            })
        })
    }

    cargar_en_select(){
        let area_asignacion = `
        <option value="">Seleccionar...</option>
        ${this.all_data.area_asignacion.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}
        `
        $("#area_asignacion").html(area_asignacion)

        let categorizacion = `
        <option value="">Seleccionar...</option>
        ${this.all_data.categorizacion.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}
        `
        $("#categorizacion").html(categorizacion)

        let centro_costo = `
        <option value="">Seleccionar...</option>
        ${this.all_data.centro_costo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}
        `
        $("#centro_de_costo").html(centro_costo)

        let estado_conservacion = `
        <option value="">Seleccionar...</option>
        ${this.all_data.estado_conservacion.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`
        
        $("#estado_conservacion").html(estado_conservacion)

        let grupo = `
        <option value="">Seleccionar...</option>
        ${this.all_data.grupo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#grupo").html(grupo)

        let inventariable = `
        <option value="">Seleccionar...</option>
        ${this.all_data.inventariable.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#inventariable").html(inventariable)

        let nivel_educativo = `
        <option value="">Seleccionar...</option>
        ${this.all_data.nivel_educativo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#nivel_educativo").html(nivel_educativo)

        let origen_fondo = `
        <option value="">Seleccionar...</option>
        ${this.all_data.origen_fondo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#origen_fondo").html(origen_fondo)

        let procedencia = `
        <option value="">Seleccionar...</option>
        ${this.all_data.procedencia.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#procedencia").html(procedencia)

        let salas = `
        <option value="">Seleccionar...</option>
        ${this.all_data.salas.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#salas").html(salas)

        let familias = `
        <option value="">Seleccionar...</option>
        ${this.all_data.familias.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`
        
        $("#familias").html(familias)
    }

    cargar_tabla(){
        let $this = this;
        let filtros = {
            centro_costo : $("#centro_de_costo").val(),
            nivel_educativo : $("#nivel_educativo").val(),
            familia : $("#familias").val(),
            grupo : $("#grupo").val(),
            categorizacion : $("#categorizacion").val(),
            area_asignacion : $("#area_asignacion").val(),
            procedencia : $("#procedencia").val(),
            origen_fondo : $("#origen_fondo").val(),
            estado_conservacion : $("#estado_conservacion").val(),
            inventariable : $("#inventariable").val(),
            sala : $("#salas").val(),
            codigo_barra : $("#codigo_barra").val(),
            valor : $("#valor").val(),
            proveedor : $("#proveedor").val(),
            numero_factura : $("#numero_factura").val(),
            descripcion : $("#descripcion").val(),
            fecha_compra : $("#fecha_compra").val(),
        }

        $.ajax({
            url: '/inventario/bien',
            type: 'GET',
            data: filtros,
            success: function (data) {
                console.log("filtro", filtro)
            }
        })
    }

    crear_centro_costo(){

        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label for="nombre_centro_costo">Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Centro de Costo',
            html: html,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/centro_costo",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Centro de Costo Creado',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.centro_costo.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear Centro de Costo',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
                

    }

    crear_nivel_educativo(){
       
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Nivel Educativo',
            html: html,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/nivel_educativo",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.nivel_educativo.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_familia(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Familia',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/familia",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.familias.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_grupo(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Grupo',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/grupo_activo",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.grupo.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_categorizacion(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Categorización',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/categorizacion",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.categorizacion.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_area_asignacion(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Area de Asignación',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/area_asignacion",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.area_asignacion.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_procedencia(){
       
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Procedencia',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/procedencia",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.procedencia.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_origen_fondo(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Origen de Fondo',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/origen_fondo",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.origen_fondo.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

    crear_estado_conservacion(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Estado de Conservación',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/estado_conservacion",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.estado_conservacion.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }

                })
            }
        })
    }

    crear_inventariable(){
        
        let $this = this;

        let html = `
        <div class="swal_form">
            <div>
                <label>Nombre</label>
                <input type="text" id="swal_nombre">
            </div>
        </div>
        `

        Swal.fire({
            title: 'Crear Inventariable',
            html: html,
            preConfirm: () => {
                return [
                    $("#swal_nombre").val(),
                ]
            },
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                loading_show()
                let data = {
                    nombre: $("#swal_nombre").val(),
                }
                $.ajax({
                    url: "/inventario/inventariable",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        console.log("bien",data)
                        Swal.fire({
                            icon: 'success',
                            title: 'Creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        $this.all_data.inventariable.push(data[0])
                        $this.cargar_en_select()
                        loading_hide()
                    },
                    error: function (error) {
                        console.log("error",error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        loading_hide()
                    }
                })
            }
        })
    }

}