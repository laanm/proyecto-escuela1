class javacrearasignaturas{

    constructor(){
        this.asignaturas=[];
        this.cargarasignaturas();
    }


    creartabla(){
        let html=`        
        
            <button id="CrearPeticion" onclick="crearasignaturas.crearventana()">Crear Asignaturas</button>
            <button id="CrearPeticion" onclick="crearasignaturas.crearventanaimport()">Importar Asignaturas</button>
        <table>
            <tr>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>
            ${this.asignaturas.map(dat=>{
                return `<tr>
                            <td>${dat.nombre}</td>
                            <td><span><button onclick="crearasignaturas.eliminarasignatura(${dat.id})">Eliminar</button><button onclick="crearasignaturas.ventanaeditarasignatura(${dat.id},'${dat.nombre}')">Editar</button></span></td>
                        </tr>
                `
            }).join("")}
        </table>`

        $("#divTablaAsignaturas").html(html)

    }

    crearasignaturas(){
        let mut=`mutation {
            asignaturacreate(nombre: "${$("#Nombre").val()}") {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarasignaturas();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    ventanaeditarasignatura(id,nombre){
        let html;


        html=`
        <h1>Editando Asignatura</h1>
        <label for="">Nombre</label>
        <input type="text" id="Nombre" value="${nombre}">

        <button onclick="crearasignaturas.editarasignatura(${id})">Editar Asignatura</button>`

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
    editarasignatura(id){
        $("#Cargando").show()
        let mut=`mutation {
            asignaturaedit(id: ${id}, nombre: "${$("#Nombre").val()}") {
              success
              error
            }
          }
          `

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarasignaturas();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")

        })
        .catch(error=>{
            console.log(error)
        })
    }
    eliminarasignatura(id){
        $("#Cargando").show()
        let mut=`mutation {
            asignaturadelete(id: ${id}) {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarasignaturas();
        })
        .catch(error=>{
            console.log(error)
        })
    }
    cargarasignaturas(){
        $("#Cargando").show()
        let query2=`
        query _allAsignaturas_id_n917 {
            allAsignaturas {
              id
              nombre
            }
          }
          
        `

        axios.post("/graphql/",{
            query:query2
        })
        .then(response=>{

            this.asignaturas=response.data.data.allAsignaturas
            this.creartabla();
            $("#Cargando").hide()
        })
        .catch(error=>{
            console.log(error);
            $("#Cargando").hide()
        })

    }
    crearventana(){
        let html;


            html=`
            <h1>Creando Asignatura</h1>
            <label for="">Nombre</label>
            <input type="text" id="Nombre">

            <button onclick="crearasignaturas.crearasignaturas()">Crear Asignaturas</button>`

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

    crearventanaimport(){
        let html;


            html=`
            <h1>Importar asignaturas</h1>
            <a href="/static/excel/importacionasignaturas.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">

            <button onclick="crearasignaturas.importar()">Importar Asignaturas</button>`

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
                asignaturacreate(nombre: "${dat}") {
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

        this.cargarasignaturas();
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        
    }
}