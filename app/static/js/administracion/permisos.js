class javapermisos{

    constructor(){
        this.permisos=[];
        this.cargarpermisos();
    }


    creartabla(){
        let temp1=""
        let temp2=""
        let temp3=""
        let temp4=""
        let temp5=""
        let temp6=""
        let temp7=""
        let temp8=""
        let temp9=""
        let temp10=""

        let html=`        
    
        <table>
            <tr>
                <th></th>
                <th>Noticias</th>
                <th>Re.Salas</th>
                <th>Impresiones</th>
                <th>CRA</th>
                <th>S.Asistencia</th>
                <th>Calificaciones</th>
                <th>Matriculas</th>
                <th>Calendario</th>
                <th>Junaeb</th>
                <th>Administracion</th>
            </tr>
            ${this.permisos.map(dat=>{
                if(dat.noticias==0){
                    temp1=`<td><input id="C-1-${dat.id}" type="checkbox" onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp1=`<td><input id="C-1-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                if(dat.reservasalas==0){
                    temp2=`<td><input id="C-2-${dat.id}" type="checkbox" onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp2=`<td><input id="C-2-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                if(dat.impresiones==0){
                    temp3=`<td>
                    <select id="C-3-${dat.id}" onchange="permisos.editarpermiso(${dat.id})">
                        <option value="0">Sin acceso</option>
                        <option value="1">Profesor</option>
                        <option value="2">Cordinador</option>
                        <option value="3">Impresor</option>
                        <option value="4">Todos</option>
                    </select>
                    </td>`
                }else{
                    let opt=null
                    switch(dat.impresiones){
                        case 1: opt=`<option value='1'>Profesor</option>
                                    <option value='0'>Sin acceso</option>
                                    <option value='2'>Cordinador</option>
                                    <option value='3'>Impresor</option>
                                    <option value='4'>Todos</option>`
                                    break;

                        case 2: opt=`<option value='2'>Cordinador</option>
                                    <option value='0'>Sin acceso</option>
                                    <option value='1'>Profesor</option>
                                    <option value='3'>Impresor</option>
                                    <option value='4'>Todos</option>`
                                    break;

                        case 3: opt=`<option value='3'>Impresor</option>
                                    <option value='0'>Sin acceso</option>
                                    <option value='1'>Profesor</option>
                                    <option value='2'>Cordinador</option>
                                    <option value='4'>Todos</option>`
                                    break;

                        case 4: opt=`<option value='4'>Todos</option>
                                    <option value='0'>Sin acceso</option>
                                    <option value='1'>Profesor</option>
                                    <option value='2'>Cordinador</option>
                                    <option value='3'>Impresor</option>`
                                    break;
                    }
                    temp3=`<td>
                    <select id="C-3-${dat.id}" onchange="permisos.editarpermiso(${dat.id})">
                        ${opt}
                    </select>
                    </td>`
                }
                if(dat.cra==0){
                    temp4=`<td>
                    <select id="C-4-${dat.id}" onchange="permisos.editarpermiso(${dat.id})">
                        <option value="0">Sin acceso</option>
                        <option value="1">Profesor</option>
                        <option value="2">Administrador</option>
                    </select></td>`
                }else{
                    let opt=""
                    switch(dat.cra){
                        case 1: opt=`<option value="1">Profesor</option>
                                    <option value="0">Sin acceso</option>
                                    <option value="2">Administrador</option>` 
                                    break;

                        case 2: opt=`<option value="2">Administrador</option>
                                    <option value="0">Sin acceso</option>
                                    <option value="1">Profesor</option>`
                                    break;

                    }
                    temp4=`<td>
                    <select id="C-4-${dat.id}" onchange="permisos.editarpermiso(${dat.id})">
                        ${opt}
                    </select></td>`
                }
                if(dat.asistencias==0){
                    temp5=`<td><input id="C-5-${dat.id}" type="checkbox" onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp5=`<td><input id="C-5-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                if(dat.calificaiones==0){
                    temp6=`<td><input id="C-6-${dat.id}" type="checkbox"  onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp6=`<td><input id="C-6-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                if(dat.matricula==0){
                    temp7=`<td><input id="C-7-${dat.id}" type="checkbox"  onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp7=`<td><input id="C-7-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                if(dat.calendario==0){
                    temp8=`<td><select id="C-8-${dat.id}" onchange="permisos.editarpermiso(${dat.id})">
                    <option value="0">Sin acceso</option>
                    <option value="1">Solo lectura</option>
                    <option value="2">Administrador</option>
                    </select></td>`
                }else{
                    let opt=""
                    switch(dat.calendario){
                        case 1: opt=`
                        <option value="1">Solo lectura</option>
                        <option value="0">Sin acceso</option>
                        <option value="2">Administrador</option>`
                        break;

                        case 2: opt=`<option value="2">Administrador</option>
                        <option value="0">Sin acceso</option>
                        <option value="1">Solo lectura</option>`
                        break;
                        
                    }
                    temp8=`<td ><select id="C-8-${dat.id}" onchange="permisos.editarpermiso(${dat.id})">
                        ${opt}
                    </select></td>`
                }
                if(dat.junaeb==0){
                    temp9=`<td><input id="C-9-${dat.id}" type="checkbox"  onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp9=`<td><input id="C-9-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                if(dat.admin==0){
                    temp10=`<td><input id="C-10-${dat.id}" type="checkbox"  onclick="permisos.editarpermiso(${dat.id})"></td>`
                }else{
                    temp10=`<td><input id="C-10-${dat.id}" type="checkbox" checked onclick="permisos.editarpermiso(${dat.id})"></td>`
                }
                
                
                return `<tr>
                            <td>${dat.nombre}</td>
                            ${temp1}
                            ${temp2}
                            ${temp3}
                            ${temp4}
                            ${temp5}
                            ${temp6}
                            ${temp7}
                            ${temp8}
                            ${temp9}
                            ${temp10}
                            <td><button onclick="permisos.eliminarpermiso(${dat.id})">Eliminar</button></td>
                        </tr>
                `
            }).join("")}
        </table>`

        $("#Tablin").html(html)

    }


    cargarpermisos(){
        
        $("#Cargando").show()
        $.ajax({
            url: '/obtenerperfilpermisos',
            type: 'GET',
            data: {


                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                permisos.permisos=data
                permisos.creartabla()
                $("#Cargando").hide()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }


    crearpermiso(){
        
        $("#Cargando").show()
        $.ajax({
            url: '/crearperfilpermisos',
            type: 'POST',
            data: {

                "nombre":$("#Nombre").val()
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                
                permisos.cargarpermisos()
               
            },
            error: function (data) {
                
            }
        });

    }
    editarpermiso(id){
        
        

        
        $("#Cargando").show()
        $.ajax({
            url: '/editarperfilpermisos',
            type: 'POST',
            data: {
                "id":id,
                "noticias":$(`#C-1-${id}`).is(":checked"),
                "reservasalas":$(`#C-2-${id}`).is(":checked"),
                "impresiones":$(`#C-3-${id}`).val(),
                "cra":$(`#C-4-${id}`).val(),
                "asistencia":$(`#C-5-${id}`).is(":checked"),
                "calificaciones":$(`#C-6-${id}`).is(":checked"),
                "matricula":$(`#C-7-${id}`).is(":checked"),
                "calendario":$(`#C-8-${id}`).val(),
                "junaeb":$(`#C-9-${id}`).is(":checked"),
                "admin":$(`#C-10-${id}`).is(":checked"),
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                
                permisos.cargarpermisos()
               
            },
            error: function (data) {
                
            }
        });

    }
    eliminarpermiso(id){
        
        if(confirm("Esta seguro que desea eliminar los permisos?")){
            
        }else{
            return
        }

        
        $("#Cargando").show()
        $.ajax({
            url: '/eliminarperfilpermisos',
            type: 'POST',
            data: {
                "id":id,

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                
                permisos.cargarpermisos()
               
            },
            error: function (data) {
                
            }
        });

    }
    crearventana(){
        let html=`
            <button onclick="permisos.cerrarventana()">X</button>
            <h2>Nombre Perfil</h2>    
            <input type="text" id="Nombre">

            <button onclick="permisos.crearpermiso()">Crear Perfil</button>
            `
            $("#Ventana").html(html)
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
    }

    crearventanaimport(){
        let html;


            html=`
            <h1>Importar Cursos</h1>
            <a href="/static/excel/importacioncursos.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">

            <button onclick="crearcursos.importar()">Importar Cursos</button>`

            setTimeout(()=>{
                $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            },100)
            
            
            setTimeout(()=>{
                window.addEventListener('click',function(e){
                    if(document.getElementById('Ventana').contains(e.target)){

                    }else{
                        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
                    }

                })
            })
        
    }
    async importar(){
        $("#Cargando").show()
        let excel=$("#Excel")[0]

        let contenido= await readXlsxFile(excel.files[0])
        console.log(contenido)
        contenido.forEach((dat,index)=>{
            if(index==0){
                return
            }
            let mut=`mutation {
                cursoscreate(nombre: "${dat}") {
                  success
                  error
                }
              }`
    
            axios.post('/graphql/',{
                query:mut
            })
            .then(response=>{
                
            })
            .catch(error=>{
                console.log(error)
            })
        })

        this.cargarcursos();
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
}