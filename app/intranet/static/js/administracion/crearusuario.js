class javacrearusuario{

    constructor(){
        this.usuarios=[];
        this.permisos=[];
        this.cargarpermisos();
        $("#Cargando").show()
    }


   
    cargartabla(){
        let temp=""
        let html=`
        <table>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo de usuario</th>
                <th>Accion</th>
            </tr>

            
                ${this.usuarios.map(useer=>{
                    console.log("se hace")
                    if(useer.idpermiso==null){
                        temp=`<option value="0">Sin asignar</option>
                        ${this.permisos.map(dat=>{
                            return `<option value="${dat.id}">${dat.nombre}</option>`
                        })}`
                    }else{
                        temp=`<option value="${useer.idpermiso}">${useer.nombrepermiso}</option>
                                <option value="0">Sin asignar</option>
                                ${this.permisos.map(dat=>{
                                    if(dat.id==useer.idpermiso){
                                        return
                                    }
                                    return `<option value="${dat.id}">${dat.nombre}</option>`
                                })}`
                    }
                    return `
                    <tr>
                        <td>${useer.nombres} ${useer.apellidos}</td>
                        <td>${useer.email}</td>
                        <td>
                        <select id="S-${useer.id}" onchange="crearusuario.asignarperfil(${useer.id})">
                        ${temp}
                        </select>
                        </td>
                        <td><span><button style=" margin-right: 10px;" class="BotonSmall" onclick="crearusuario.ventanaediruser(${useer.id},'${useer.nombres}','${useer.apellidos}','${useer.email}',${useer.idpermiso},'${useer.nombrepermiso}')">Editar</button><button class="BotonRojo" onclick="crearusuario.eliminaruser(${useer.id})">Eliminar</button></span></td>
                    </tr>
                    `
                }).join("")}
            
        </table>`

        $("#divTablaUsuarios").html(html);
    }
    
    

    ventanaediruser(id,nombres,apellidos,email,perfilid,perfilnombre){
        let html;


        html=`
        <button id="Cerrar" onclick="crearusuario.cerrarventana()">X</button>
        <div id="Contenido">
        <label for="">Nombres</label>
        <input type="text" id="Nombres" value="${nombres}">
        <label for="">Apellidos</label>
        <input type="text" id="Apellidos" value="${apellidos}">
        <label for="">Contraseña</label>
        <input type="password" id="pass" >
        <label for="">Correo</label>
        <input type="email" id="email" value="${email}">
        <label for="">Tipo de usuario</label>
        <select name="perfil" id="Permisos">

            <option value="${perfilid}">${perfilnombre}</option>
            
            ${this.permisos.map(dat=>{
                return`<option value="${dat.id}">${dat.nombre}</option>`
            })}
            

            
            

        </select>

        <button class="BotonNormal" onclick="crearusuario.editarusuario(${id})">Editar Usuario</button>
        </div>
        `

        
        $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");


    }
    editaruser(id){
        let mut=`mutation {
            usuarioedit(id: ${id}, password: "${$("#pass").val()}", email: "${$("#email").val()}", perfil: ${$("#perfil").val()}, user: "${$("#user").val()}") {
              ok
              error
            }
          }`
        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarusuarios();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        })
        .catch(error=>{
            console.log(error);
        })  
    }

    eliminaruser(id){
        $("#Cargando").show()
        let mut=`mutation {
            usuariodelete(id: ${id}) {
              ok
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarusuarios();
          })
          .catch(error=>{
            console.log(error);
          })
    }

    crearventana(){
        let html;


            html=`
            <button id="Cerrar" onclick="crearusuario.cerrarventana()">X</button>
            <div id="Contenido">
            <label >Correo</label>
            <input type="email" id="Email">
            <label for="">Contraseña</label>
            <input type="password" id="Password">
            <label >Nombres</label>
            <input type="text" id="Nombres">
            <label >Apellidos</label>
            <input type="text" id="Apellidos">
            
            
            <label for="">Tipo de usuario</label>
            <select id="Permisos">

                <option value="0">Sin asignar</option>
                
                ${this.permisos.map(dat=>{
                    return`<option value="${dat.id}">${dat.nombre}</option>`
                })}
                

                
                

            </select>

            <button class="BotonNormal" onclick="crearusuario.crearusuario()">Crear Usuario</button>
            </div>
            `

            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
        
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
                crearusuario.permisos=data
                crearusuario.cargarusuarios()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }
    cargarusuarios(){
        
        $("#Cargando").show()
        $.ajax({
            url: '/Listado_Usuarios',
            type: 'GET',
            data: {


                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                crearusuario.usuarios=data
                crearusuario.cargartabla()
                $("#Cargando").hide()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }
    asignarperfil(x){
        console.log(x)
        console.log($(`#S-${x}`).prop("selectedIndex"))
        
        $("#Cargando").show()
        $.ajax({
            url: '/AsignarPerfilPermisos',
            type: 'POST',
            data: {
                "iduser":x,
                "idpermisos":$(`#S-${x}`).val()

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                $("#Cargando").hide()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }
    crearusuario(){
        
        
        
        $("#Cargando").show()
        $.ajax({
            url: '/CreacionUsuario',
            type: 'POST',
            data: {
                "Nombres":$("#Nombres").val(),
                "Apellidos":$("#Apellidos").val(),
                "Email":$("#Email").val(),
                "Password":$("#Password").val(),
                "idpermiso":$("#Permisos").val(),

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                crearusuario.cargarusuarios()
                crearusuario.cerrarventana()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }
    editarusuario(x){
        
        
        
        $("#Cargando").show()
        $.ajax({
            url: '/EditarUsuario',
            type: 'POST',
            data: {
                "id":x,
                "Nombres":$("#Nombres").val(),
                "Apellidos":$("#Apellidos").val(),
                "Email":$("#Email").val(),
                "Password":$("#Password").val(),
                "idpermiso":$("#Permisos").val(),

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                crearusuario.cerrarventana()
                crearusuario.cargarusuarios()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }
    crearventanaimport(){
        let html;


            html=`
            <h1>Importar Usuarios</h1>
            <a href="/static/excel/importacionusuarios.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">
            <p>La contraseña por defecto es el apellido del usuario</p>
            <button onclick="crearusuario.importar()">Importar Usuarios</button>`

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
        
        
        contenido.splice(0,1)

        
        $.ajax({
            url: '/CreacionUsuarioMasivo',
            type: 'POST',
            data: {
                "datinis":JSON.stringify(contenido),
                

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                $("#Cargando").hide()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

        this.cargarusuarios();
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        
    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")

    }
}