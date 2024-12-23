class javajunaeb{


    constructor(idprofe,nivel){
        this.alumnos=[]
        this.historial=[]
        this.hoy= new Date()
        
        this.cargaralumnos()

    }
    cargaralumnos(){
        $("#Cargando").show()
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/junaebalumnos",datos,{headers}).then(response=>{
            
            
            this.alumnos=response.data
            $("#Cargando").hide()
            this.cargarhistorial()
           
            
        }).catch(e=>{
            console.log(e)
            
        })
    }
    cargarhistorial(){
        $("#Cargando").show()
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/historialjunaeb",datos,{headers}).then(response=>{
            
            
            this.historial=response.data
            $("#Cargando").hide()
            console.log(this.alumnos)
            this.mostrardatos()
            
        }).catch(e=>{
            console.log(e)
            
        })
    }
    
    
    mostrardatos(){
        let temp=""
        let temp2=""
        let html=`
            <table>
            <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Rut/IPE</th>
                <th>Curso</th>
                <th>Acceso</th>
                
                <th>Ultima visita</th>
                <th>Ver Historial</th>
                <th>Accion</th>
            </tr>
            
            ${this.alumnos.map((dat,index)=>{
                temp=""
                this.historial.every(dat2=>{
                    if(dat2.idalumno==dat.id){
                        temp=this.calcularhoras(dat2.fecha).toFixed(1)
                        
                        console.log("Test")
                        return false
                    }
                })

                if(dat.nivel==0){
                    temp2=`<option value="0">No Asignado</option>
                    <option value="1">Desayuno</option>
                    <option value="2">Almuerzo</option>
                    <option value="3">Todo</option>
                    `
                }else if(dat.nivel==1){
                    temp2=`
                    <option value="1">Desayuno</option>
                    <option value="2">Almuerzo</option>
                    <option value="3">Todo</option>
                    <option value="0">No Asignado</option>
                    `
                }else if(dat.nivel==2){
                    temp2=`
                    <option value="2">Almuerzo</option>
                    <option value="3">Todo</option>
                    <option value="0">No Asignado</option>
                    <option value="1">Desayuno</option>
                    `
                }else if(dat.nivel==3){
                    temp2=`
                    <option value="3">Todo</option>
                    <option value="0">No Asignado</option>
                    <option value="1">Desayuno</option>
                    <option value="2">Almuerzo</option>
                    `
                }

                return`
                <tr>
                    <td>${dat.nombres.replaceAll("-","")}</td>
                    <td>${dat.apellidos.replaceAll("-","")}</td>
                    <td>${dat.rut.replaceAll("-","")}</td>
                    <td>${dat.curso}</td>
                    <td><select id="Nivel-${dat.id}" onchange="junaeb.editarjunaeb(${dat.id})">${temp2}</select></td>
                    <td>Hrs${temp}</td>
                    <td><button class="BotonSmall" onclick="junaeb.abrirhistorial(${index})">Historial</button></td>
                    <td><button>Aviso</button><button class="BotonRojo" onclick="junaeb.desasignarjunaeb(${dat.id})">Quitar</button></td>
                </tr>
                `
            })}
        
            </table>
        `
        $("#Principal").html(html)
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

    asignarjunaeb(){
        $("#Cargando").show()
        console.log($("#Rut").val())
        console.log($("#Nivel").val())
        $.ajax({
            url: '/junaebasignar',
            type: 'POST',
            data: {
               "rut-ipe":$("#Rut").val(),
               "nivel":$("#Nivel").val(),

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                if(data=="No"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Alumno no existe',
                        text: 'Ingrese otro Rut/Ipe',
                    })
                }else if(data=="ok"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Alumno Asignado',
                        text: '',
                    })
                    junaeb.cargaralumnos()
                }

                
            },
            error: function (data) {
               
            }
        });
    }
    editarjunaeb(x){
        $("#Cargando").show()
        $.ajax({
            url: '/junaebeditar',
            type: 'POST',
            data: {
               "id":x,
               "nivel":$(`#Nivel-${x}`).val(),

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                 if(data=="ok"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Alumno Asignado',
                        text: '',
                    })
                    
                }
                $("#Cargando").hide()
                
            },
            error: function (data) {
               
            }
        });
    }
    desasignarjunaeb(x){
        if(confirm("¿Desea quitar el beneficio?")){
            
        }else{
            return
        }
        $("#Cargando").show()
        $.ajax({
            url: '/junaebdesasignar',
            type: 'POST',
            data: {
               "id":x,
               

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                if(data=="ok"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Alumno Asignado',
                        text: '',
                    })
                    junaeb.cargaralumnos()
                }

                
            },
            error: function (data) {
               
            }
        });
    }


    abrirventana(){
        let html=`
        <button id="Cerrar" onclick="junaeb.cerrarventana()">X</button>
        <div id="Contenido">
        <h1>Agregar junaeb</h1>
        
        <h2>Rut o ipe</h2>
        <input type="text" id="Rut">
        <select id="Nivel">
            <option value="0">Pendiente</option>
            <option value="1">Desayuno</option>
            <option value="2">Almuerzo</option>
            <option value="3">Todo</option>
        </select>
        <button class="BotonNormal" onclick="junaeb.asignarjunaeb()">Asignar junaeb</button>
        </div>
        `
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")

        /*
        $("#Rut").keyup(function(e){
            console.log(e.keyCode,e.which)
            if((e.keyCode || e.which) == 8 || (e.keyCode || e.which) == 37 || (e.keyCode || e.which) == 39){

                return
            }else{
                console.log(e.keyCode)
                junaeb.agregarpuntos()
               
            }
        })*/
    }

    abrirventanaimportacion(){
        let html=`
        <button id="Cerrar" onclick="junaeb.cerrarventana()">X</button>
        <div id="Contenido">
        <h1>Agregar junaeb masivamente</h1>
        
        <h1>Importar junaeb</h1>
            <a href="/static/excel/importacionjunaeb.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">
        <button class="BotonNormal" onclick="junaeb.importar(0)">Asignar junaeb</button>
        <button class="BotonNormal" onclick="junaeb.importar(1)">Borrar y asignar</button>
        </div>
        `
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }
    async importar(x){

        $("#Cargando").show()
        console.log(x)
        let excel=$("#Excel")[0]

        let contenido= await readXlsxFile(excel.files[0])
        console.log(contenido)
        let lista=[]
        contenido.forEach((dat,index)=>{
            if(index==0){
                return
            }
            if(dat[0]==null){
                return
            }
            lista.push({rut:dat[0],nivel:dat[1]})
        })
        $.ajax({
            url: '/junaebasignarmasivo',
            type: 'POST',
            data: {
               "datos":JSON.stringify(lista),
               "opcion":x
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log("listo")
                $("#Cargando").hide()
                Swal.fire({
                    icon: 'success',
                    title: 'Alumnos asignados',
                    text: '',
                })
                junaeb.cargaralumnos()
            },
            error: function (data) {
               
            }
        });
        console.log(lista)
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    abrirhistorial(x){
        const id=this.alumnos[x].id
        let html=`
        <button id="Cerrar" onclick="junaeb.cerrarventana()">X</button>
        <div id="Contenido">
            <table>
                <tr>
                    <th>Fecha</th>
                    <th>Tipo almuerzo</th>
                </tr>
            ${this.historial.map(dat=>{
                if(dat.idalumno==id){
                    return`<tr>
                                <td>${dat.fecha.replace("T"," ").slice(0,-4)}</td>
                                <td>${this.calcularnivel(dat.nivel)}</td>
                            </tr>
                    `
                }
            }).join("")}
            </table>
        </div>
        `
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }
    calcularhoras(x){
        const test=new Date(x)
        return (this.hoy-test)/3600000
    }
    calcularnivel(x){
        switch(x){
            case 0:
                return "No Asignado"
            case 1:
                return "Desayuno"
            case 2:
                return "Almuerzo"
            case 3:
                return "Todo"
        }
    }

    agregarpuntos(){
        let temp=""
        let ncar=0
        
        
        
        if(parseInt($("#Rut").val().replaceAll(".","").replaceAll("-",""))>=1000){
            
            
            
            temp=$("#Rut").val().replaceAll(".","").replaceAll("-","")
            ncar=temp.length
            console.log(ncar)
            console.log(temp)
            switch(ncar){
                case 4: $("#Rut").val(temp.slice(0,1)+"."+temp.slice(1,5))
                break;
                case 5: $("#Rut").val(temp.slice(0,2)+"."+temp.slice(2,6))
                break;
                case 6: $("#Rut").val(temp.slice(0,3)+"."+temp.slice(3,7))
                break;
                case 7: $("#Rut").val(temp.slice(0,1)+"."+temp.slice(1,4)+"."+temp.slice(4,8))
                break;
                case 8: $("#Rut").val(temp.slice(0,2)+"."+temp.slice(2,5)+"."+temp.slice(5,8)+"-")
                break;
                case 9: $("#Rut").val(temp.slice(0,2)+"."+temp.slice(2,5)+"."+temp.slice(5,8)+"-"+temp.slice(8,9))
                break;
                case 10: $("#Rut").val(temp.slice(0,3)+"."+temp.slice(3,6)+"."+temp.slice(6,9)+"-"+temp.slice(9,10))
                break;
            }
            if(ncar>=11){
                $("#Rut").val(temp.slice(0,3)+"."+temp.slice(3,6)+"."+temp.slice(6,9)+"-"+temp.slice(9,10))
            }
            
        }

        
    }
   
}

