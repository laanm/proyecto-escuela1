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
        ${this.all_data.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}
        `
        $("#area_asignacion").html(area_asignacion)

        let categorizacion = `
        ${this.all_data.categorizacion.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}
        `
        $("#categorizacion").html(categorizacion)

        let centro_costo = `
        ${this.all_data.centro_costo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}
        `
        $("#centro_costo").html(centro_costo)

        let estado_conservacion = `
        ${this.all_data.estado_conservacion.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`
        
        $("#estado_conservacion").html(estado_conservacion)

        let grupo = `
        ${this.all_data.grupo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#grupo").html(grupo)

        let inventariable = `
        ${this.all_data.inventariable.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#inventariable").html(inventariable)

        let nivel_educativo = `
        ${this.all_data.nivel_educativo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#nivel_educativo").html(nivel_educativo)

        let origen_fondo = `
        ${this.all_data.origen_fondo.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#origen_fondo").html(origen_fondo)

        let procedencia = `
        ${this.all_data.procedencia.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#procedencia").html(procedencia)

        let salas = `
        ${this.all_data.salas.map( d=>{return `<option value="${d.id}">${d.nombre}</option>`}).join('')}`

        $("#salas").html(salas)
    }

}