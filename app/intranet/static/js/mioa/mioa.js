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
    cargaroas(x){
        
        
        
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/objetivoaprendizaje",{headers}).then(response=>{
            
            
            this.oas=response.data
            if(x!=undefined){
                this.mostraroas()
                
            }else{
                this.mostrardatos()
            }
            
            $("#Cargando").hide()
        }).catch(e=>{
            console.log(e)
            
        })
    }
    
    mostrardatos(){

        let html=`

            <div id="Asignaturas">
            <h2>Asignaturas</h2>
            ${this.asignaturas.map(dat=>{
                return `<button id="A${dat.id}" class="BA BotonSmall" onclick="oa.cambiar(${dat.id},1)">${dat.nombre}</button>`
            }).join("")}
            </div>

            <div id="Cursos">
            <h2>Curso</h2>
            ${this.cursos.map(dat=>{
                return `<button id="C${dat.id}" class="BC BotonSmall" onclick="oa.cambiar(${dat.id},2)">${dat.nombre}</button>`
            }).join("")}
            </div>
        
            <div id="Items">

            </div>
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
        
        ${this.oas.map((dat,index)=>{
            if(dat.asignatura==this.asignatura && dat.curso==this.curso){
                return`
                <div class="TrueItem">
                <div class="Oculto"><button onclick="oa.abrireditventana(${index})" class="BotonSmall">Editar</button><button class="BotonRojo" onclick="oa.eliminaroa(${dat.id})">Eliminar</button></div>
                <h4>Unidad ${dat.numero}: ${dat.titulo}</h4>
                ${dat.descripcion}
                </div>`
            }
        }).join("")}
        
        `
        $("#Items").html(html)
    }

    abrirventana(){

            let html=`
            <button id="Cerrar" onclick="oa.cerrarventana()">X</button>
            <div id="Contenido">
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

                <h2>Unidad</h2>
                <input type="number" id="Numero">

                <h2>Titulo</h2>
                <input type="text" id="Titulo">

                <h2>Descripcion</h2>
                <textarea id="Descripcion"></textarea>
                

                <button class="BotonNormal" onclick="oa.crearoa()">Crear OA</button>
            </div>
            
            `
            $("#Ventana").html(html)
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
           
    }
    abrireditventana(x){

        let html=`
        <button id="Cerrar" onclick="oa.cerrarventana()">X</button>
        <div id="Contenido">
            
            <h2>Unidad</h2>
            <input type="number" id="Numero" value="${this.oas[x].numero}">

            <h2>Titulo</h2>
            <input type="text" id="Titulo" value="${this.oas[x].titulo}">

            <h2>Descripcion</h2>
            <textarea id="Descripcion">${this.oas[x].descripcion}</textarea>
            

            <button class="BotonNormal" onclick="oa.editaroa(${this.oas[x].id})">Editar OA</button>
        </div>
        
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
                oa.cargaroas("x")
            },
            error: function (data) {
               
            }
        });
    }
    editaroa(x){
        $("#Cargando").show()
        $.ajax({
            url: '/editaroa',
            type: 'POST',
            data: {
                "id":x,
               "unidad":$("#Numero").val(),
               "titulo":$("#Titulo").val(),
               "descripcion":$("#Descripcion").val()
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                
                $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
                oa.cargaroas("x")
            },
            error: function (data) {
               
            }
        });
    }
    eliminaroa(x){
        if(confirm("Esta seguro que desea eliminar?")){
            
        }else{
            return
        }
        $("#Cargando").show()
        $.ajax({
            url: '/eliminaroa',
            type: 'POST',
            data: {
               "id":x,

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
               $("#Cargando").hide()
               oa.cargaroas("x")
            },
            error: function (data) {
               
            }
        });
    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    
}