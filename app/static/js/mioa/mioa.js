class javaoa{


    constructor(idprofe,nivel){
        this.asignaturas=[]
        this.cantidadactividades=[]
        this.cursos=[]
        this.oas=[]
        this.idprofe=idprofe
        this.asignatura=0
        this.curso=0
        this.cargarcursos()
        
        this.cargaroas()

    }
    cargarcursos(){
        $("#Cargando").show()
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/datoscursos",datos,{headers}).then(response=>{
            
            
            this.cursos=response.data
            this.cargarasignaturas()
            
        }).catch(e=>{
            console.log(e)
            
        })
    }
    cargarasignaturas(){
        
        
        
        
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/listado_asignaturas",{headers}).then(response=>{
            
            
            this.asignaturas=response.data
            this.cargaroas()
            
            
        }).catch(e=>{
            console.log(e)
            
        })
    }
    cargaroas(){
        
        
        
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/objetivoaprendizaje",{headers}).then(response=>{
            
            
            this.oas=response.data
            this.mostrardatos()
            $("#Cargando").hide()
        }).catch(e=>{
            console.log(e)
            
        })
    }
    
    mostrardatos(){

        let html=`
        
            <h2>Asignatura</h2>
            ${this.asignaturas.map(dat=>{
                return `<button id="A${dat.id}" class="BA" onclick="oa.cambiar(${dat.id},1)">${dat.nombre}</button>`
            }).join("")}

            <h2>Curso</h2>
            ${this.cursos.map(dat=>{
                return `<button id="C${dat.id}" class="BC" onclick="oa.cambiar(${dat.id},2)">${dat.nombre}</button>`
            }).join("")}
            
        
        
        `
        $("#Botones").html(html)
    }

    cambiar(x,e){
        if(e==1){
            $(".BA").removeClass("Seleccionado")
            this.asignatura=x
            $(`#A${x}`).addClass("Seleccionado")
        }else if (e==2){
            $(".BC").removeClass("Seleccionado")
            this.curso=x
            $(`#C${x}`).addClass("Seleccionado")
        }

        if(this.asignatura!=0 && this.curso!=0){
            this.mostraroas()
        }

    }
    mostraroas(){
        let html=`
        
        ${this.oas.map(dat=>{
            if(dat.asignatura==this.asignatura && dat.curso==this.curso){
                return`<div>N°:${dat.numero} Titulo:${dat.titulo}</div>`
            }
        }).join("")}
        
        `
        $("#Items").html(html)
    }

    abrirventana(){

            let html=`
            <button onclick="oa.cerrarventana()">X</button>
            <h2>Asignatura</h2>    
            <select id="SelectAsignatura">
                ${this.asignaturas.map(dat=>{
                    return `<option value="${dat.id}">${dat.nombre}</option>`
                })}
            </select>

            <h2>Curso</h2>
            <select id="SelectCurso">
            ${this.cursos.map(dat=>{
                return `<option value="${dat.id}">${dat.nombre}</option>`
            })}
            </select>

            <h2>N°</h2>
            <input type="number" id="Numero">

            <h2>Titulo</h2>
            <input type="text" id="Titulo">

            <h2>Descripcion</h2>
            <input type="text" id="Descripcion">

            <button onclick="oa.crearoa()">Crear oa</button>
            `
            $("#Ventana").html(html)
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
           
    }

    crearoa(){
        $("#Cargando").show()
        $.ajax({
            url: '/crearoa',
            type: 'POST',
            data: {
               "idasignatura":$("#SelectAsignatura").val(),
               "idcurso":$("#SelectCurso").val(),
               "numero":$("#Numero").val(),
               "titulo":$("#Titulo").val(),
               "descripcion":$("#Descripcion").val()
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                $("#Numero").attr("placeholder","Numero anterior: "+$("#Numero").val())
                $("#Numero").val("")
                $("#Cargando").hide()
                $("#Titulo").val("")
                $("#Descripcion").val("")
                
            },
            error: function (data) {
               
            }
        });
    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    
}