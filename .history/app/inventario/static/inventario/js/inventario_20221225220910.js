class Inventario{
    constructor(){
        console.log("Inventario instanciado")
        this.all_data = []

        this.init();
    }

    async init(){
        await this.get_all_data()
        this.cargar_en_select()
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
        $("#centro_costo").html(centro_costo)

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
    }


    // son 11 weas

    crear_centro_costo(){

        //html

        Swal.fire({
            title: 'Crear Centro de Costo',
            html: `aaa`,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                let data = {
                    nombre: $("#nombre_centro_costo").val(),
                    descripcion: $("#descripcion_centro_costo").val(),
                }
                $.ajax({
                    url: "/inventario/crear_centro_costo",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Centro de Costo Creado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.get_all_data()
                        this.cargar_en_select()
                    },
                    error: function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear Centro de Costo',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
        })
                

    }

}