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
        let html=`
        
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

                return`
                <tr>
                    <td>${dat.nombres.replaceAll("-","")}</td>
                    <td>${dat.apellidos.replaceAll("-","")}</td>
                    <td>${dat.rut.replaceAll("-","")}</td>
                    <td>${dat.curso}</td>
                    <td>${this.calcularnivel(dat.nivel)}</td>
                    <td>Hrs${temp}</td>
                    <td><button onclick="junaeb.abrirhistorial(${index})">Historial</button></td>
                    <td><button>Aviso</button><button onclick="junaeb.desasignarjunaeb(${dat.id})">Quitar</button></td>
                </tr>
                `
            })}
        
        
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
        <button onclick="junaeb.cerrarventana()">X</button>
        <h1>Agregar junaeb</h1>
        
        <h2>Rut o ipe</h2>
        <input type="text" id="Rut">
        <select id="Nivel">
            <option value="0">Pendiente</option>
            <option value="1">Desayuno</option>
            <option value="2">Almuerzo</option>
            <option value="3">Todo</option>
        </select>
        <button onclick="junaeb.asignarjunaeb()">Asignar junaeb</button>
        
        `
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }

    abrirventanaimportacion(){
        let html=`
        <button onclick="junaeb.cerrarventana()">X</button>
        <h1>Agregar junaeb masivamente</h1>
        
        <h1>Importar junaeb</h1>
            <a href="/static/excel/importacionjunaeb.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">
        <button onclick="junaeb.importar(0)">Asignar junaeb</button>
        <button onclick="junaeb.importar(1)">Borrar y asignar</button>
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
        <button onclick="junaeb.cerrarventana()">X</button>
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
   
}