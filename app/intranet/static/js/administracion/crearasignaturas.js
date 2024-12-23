class javacrearasignaturas{

    constructor(){
        this.asignaturas=[];
        this.cargarasignaturas();
    }


    creartabla(){
        let html=`        
        

        <table>
            <tr>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>
            ${this.asignaturas.map(dat=>{
                return `<tr>
                            <td>${dat.nombre}</td>
                            <td><span><button style=" margin-right: 10px;" class="BotonSmall" onclick="crearasignaturas.ventanaeditarasignatura(${dat.id},'${dat.nombre}')">Editar</button><button class="BotonRojo" onclick="crearasignaturas.eliminarasignatura(${dat.id})">Eliminar</button></span></td>
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
        <button id="Cerrar" onclick="crearasignaturas.cerrarventana()">X</button>
        <div id="Contenido">
        <h1>Editando Asignatura</h1>
        <label for="">Nombre</label>
        <input type="text" id="Nombre" value="${nombre}">

        <button  class="BotonNormal" onclick="crearasignaturas.editarasignatura(${id})">Editar Asignatura</button>
        </div>
        `

        $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
        
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
        if(confirm("Esta seguro que desea eliminar?")){
            
        }else{
            return
        }
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
            <button id="Cerrar" onclick="crearasignaturas.cerrarventana()">X</button>
            <div id="Contenido">
            <h1>Creando Asignatura</h1>
            <label for="">Nombre</label>
            <input type="text" id="Nombre">

            <button class="BotonNormal" onclick="crearasignaturas.crearasignaturas()">Crear Asignaturas</button>
            </div>
            `

            
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            
        
    }

    crearventanaimport(){
        let html;


            html=`
            <button id="Cerrar" onclick="crearasignaturas.cerrarventana()">X</button>
            <div id="Contenido">
            <h1>Importar asignaturas</h1>
            <a href="/static/excel/importacionasignaturas.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">

            <button class="BotonNormal" onclick="crearasignaturas.importar()">Importar Asignaturas</button>
            </div>
            `

            
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            
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

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    
}