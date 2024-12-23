class javacrearsalas{

    constructor(){
        this.salas=[];
        this.usuarios=[];
        this.cargarusuarios()
        this.cargarsalas();
    }

    cargarusuarios(){
        $.ajax({
            url: '/Listado_Usuarios',
            type: 'GET',
            data: {
                
               
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                crearsalas.usuarios=data
                
                
                
            },
            error: function (data) {
               
            }
        });
    }
    async test(){
        
        //let excel=document.getElementById("omg")
        let excel=$("#Excel")[0]

        let contenido= await readXlsxFile(excel.files[0])

        $("#Cargando").show()
        contenido.forEach((dat,index)=>{
            let mut=""
            if(index==0){
                return
            }
            if(dat[1]=="SI"){
                mut=`mutation {
                    salascreate(nombre: "${dat[0]}", publica: 1) {
                      success
                      error
                    }
                  }`
            }else{
                mut=`mutation {
                    salascreate(nombre: "${dat[0]}", publica: 0) {
                      success
                      error
                    }
                  }`
            }
            
            console.log(mut)
            axios.post('/graphql/',{
                query:mut
            })
            .then(response=>{
                
                console.log(index)
                console.log(contenido.length)
                if(contenido.length-1==index){
                    
                    this.cargarsalas()
                }
                
            })
            .catch(error=>{
                console.log(error)
                if(contenido.length-1==index){
                    
                    this.cargarsalas()
                }
            })
        })
        
    }
    abririmportacion(){
        let html;


        html=`
        <button id="Cerrar" onclick="crearsalas.cerrarventana()">X</button>
        <div id="Contenido" >
        <h1>Creacion masiva</h1>
        
        <a href="/static/excel/dependencias.xlsx" download>Plantilla excel</a>
        <h2>Archivo a importar</h2>
        <input type="file" id="Excel">

        
        <button class="BotonNormal" onclick="crearsalas.test()" style="margin-top: 10px">Creacion masiva</button>
        </div>
        `

       
        $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
      
        
        
       
    }
    creartabla(){
        let temp=""
        let temp2=""
        let html=`        
            
            
            
        <table>
            <tr>
                <th>Nombre</th>
                <th>Responsable</th>
                <th>Publica</th>
                <th>Accion</th>
            </tr>
            ${this.salas.map(dat=>{
                temp2=""
                if(dat.publica==1){
                    temp=`<input type="checkbox" onclick="crearsalas.editarsalaindi(${dat.id},${dat.publica})" checked>`
                }else{
                    temp=`<input type="checkbox" onclick="crearsalas.editarsalaindi(${dat.id},${dat.publica})">`
                }
                if(dat.responsable==null){
                    temp2="<option value='0'>No Asignado</option>"
                }else{
                    temp2=`<option value="${dat.responsable.id}">${dat.responsable.user}</option>
                            <option value='0'>No Asignado</option>
                    `
                }
                return `<tr>
                            <td>${dat.nombre}</td>
                            <td><select id="Responsable-${dat.id}" onchange="crearsalas.editarsalaresponsable(${dat.id})">
                            ${temp2}
                            ${this.usuarios.map(user=>{
                                if(dat.responsable!=null){
                                    
                                    if(dat.responsable.id==user.id){
                                        return
                                    }
                                    
                                }
                                return `<option value="${user.id}">${user.user}</option>`
                            })}
                            </select></td>
                            <td>${temp}</td>
                            <td><span><button class="BotonRojo" onclick="crearsalas.eliminarsala(${dat.id})">Eliminar</button><button class="BotonSmall" onclick="crearsalas.ventanaedirsalar(${dat.id},'${dat.nombre}',${dat.publica})">Editar</button></span></td>
                        </tr>
                `
            }).join("")}
        </table>`

        $("#divTablaSalas").html(html)

    }

    crearsala(){
        
        return new Promise(resolve=>{
            let temp=0
            if($("#publica").is(":checked")){
                temp=1
            }
            $("#BotonCrear").attr("disabled",true);
            let mut=`mutation {
                salascreate(nombre: "${$("#nombre").val()}", publica: ${temp}) {
                  success
                  error
                }
              }`
    
            axios.post('/graphql/',{
                query:mut
            })
            .then(response=>{
                this.cargarsalas();
                $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
                $("#BotonCrear").attr("disabled",false);
                resolve()
            })
            .catch(error=>{
                console.log(error)
                resolve()
            })
        })

    }
    ventanaedirsalar(id,nombre,publica){
        let html;
        let temp
        if(publica==1){
            temp=`<input style="margin-left: 5px" type="checkbox" id="publico" checked>`
        }else{
            temp=`<input style="margin-left: 5px" type="checkbox" id="publico">`
        }
        html=`
        <button id="Cerrar" onclick="crearsalas.cerrarventana()">X</button>
        <div id="Contenido" >
        <h1>Editando sala</h1>
        <label for="">Nombre</label>
        <input type="text" id="nombre" value="${nombre}">
        
        
        <button class="BotonNormal" onclick="crearsalas.editarsala(${id})" style="margin-top: 10px">Editar Sala</button>
        </div>
        `

       
        $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
        
    }
    editarsala(id){
        let temp=0
        $("#Cargando").show()
        if($("#publica").is(":checked")){
            temp=1
        }
        let mut=`mutation {
            salasedit(id: ${id}, nombre: "${$("#nombre").val()}", publica: -1) {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarsalas();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")

        })
        .catch(error=>{
            console.log(error)
        })
    }

    editarsalaindi(id,x){
        
        $("#Cargando").show()
        console.log(x)
        if(x==1){
            x=0
        }else{
            x=1
        }
        console.log(x)
        let mut=`mutation {
            salasedit(id: ${id}, nombre: "", publica: ${x}) {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarsalas();
        })
        .catch(error=>{
            console.log(error)
        })
    }

    editarsalaresponsable(id){
        
        $("#Cargando").show()
        console.log($("#Responsable-"+id).val())
        $.ajax({
            url: '/editarsala',
            type: 'POST',
            data: {
                
                id:id,
                iduser: $("#Responsable-"+id).val()
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                crearsalas.cargarsalas()
                
            },
            error: function (data) {
               
            }
        });
    }


   

    eliminarsala(id){
        if(confirm("Esta seguro que desea eliminar la sala?, se eliminaran las peticiones de esa sala")){
            
        }else{
            return
        }
        $("#Cargando").show()
        let mut=`mutation {
            salasdelete(id: ${id}) {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarsalas();
            
        })
        .catch(error=>{
            console.log(error)
        })
    }
    cargarsalas(){
        $("#Cargando").show()
        let query2=`
        query _allSalas_id_nombre_117 {
            allSalas {
              id
              nombre
              publica
              responsable{
                id
                
                user
              }
            }
          }
        `

        axios.post("/graphql/",{
            query:query2
        })
        .then(response=>{

            this.salas=response.data.data.allSalas
            this.creartabla();
            $("#Cargando").hide()
        })
        .catch(error=>{
            console.log(error);
        })

    }
    crearventana(){
        let html;


            html=`
            <button id="Cerrar" onclick="crearsalas.cerrarventana()">X</button>
            <div id="Contenido" >
            <h1>Creando sala</h1>
            <label for="">Nombre</label>
            <input type="text" id="nombre">
            <label>Sala pedible(nombre provisional)<input style="margin-left: 5px" type="checkbox" id="publico"></label>

            <button class="BotonNormal" style="margin-top: 5px" onclick="crearsalas.crearsala()">Crear Sala</button>
            </div>
            `
            
            
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            
        
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    
}