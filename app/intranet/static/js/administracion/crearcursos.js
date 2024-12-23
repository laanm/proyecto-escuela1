class javacrearcursos{

    constructor(){
        this.cursos=[];
        this.cargarcursos();
    }


    creartabla(){
        let html=`        
        
            
        <table>
            <tr>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>
            ${this.cursos.map(dat=>{
                return `<tr>
                            <td>${dat.nombre}</td>
                            <td><span><button class="BotonSmall" style=" margin-right: 10px;" onclick="crearcursos.ventanaeditarcursos(${dat.id},'${dat.nombre}')">Editar</button><button class="BotonRojo" onclick="crearcursos.eliminarcursos(${dat.id})">Eliminar</button></span></td>
                        </tr>
                `
            }).join("")}
        </table>`

        $("#divTablaCursos").html(html)

    }

    crearcursos(){
        $("#Cargando").show()
        let mut=`mutation {
            cursoscreate(nombre: "${$("#Nombre").val()}") {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarcursos();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    ventanaeditarcursos(id,nombre){
        let html;


        html=`
        <button id="Cerrar" onclick="crearcursos.cerrarventana()">X</button>
        <div id="Contenido">
        <h1>Editando Cursos</h1>
        <label for="">Nombre</label>
        <input type="text" id="Nombre" value="${nombre}">

        <button class="BotonNormal" onclick="crearcursos.editarcursos(${id})">Crear Cursos</button>
        </div>
        `

        
        $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");

    }
    editarcursos(id){
        $("#Cargando").show()
        let mut=`mutation {
            cursosedit(id: ${id}, nombre: "${$("#Nombre").val()}") {
              success
              error
            }
          }
          `

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarcursos();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")

        })
        .catch(error=>{
            console.log(error)
        })
    }
    eliminarcursos(id){
        if(confirm("Esta seguro que desea eliminar?")){
            
        }else{
            return
        }
        $("#Cargando").show()
        let mut=`mutation {
            cursosdelete(id: ${id}) {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarcursos();
        })
        .catch(error=>{
            console.log(error)
        })
    }
    cargarcursos(){
        $("#Cargando").show()
        let query2=`
        query _allCursos_id_nombre546 {
            allCursos {
              id
              nombre
            }
          }
          
        `

        axios.post("/graphql/",{
            query:query2
        })
        .then(response=>{

            this.cursos=response.data.data.allCursos
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
            <button id="Cerrar" onclick="crearcursos.cerrarventana()">X</button>
            <div id="Contenido">
            <h1>Creando Cursos</h1>
            <label for="">Nombre</label>
            <input type="text" id="Nombre">

            <button class="BotonNormal" onclick="crearcursos.crearcursos()">Crear Cursos</button>
            </div>`

           
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");

        
    }

    crearventanaimport(){
        let html;


            html=`
            <button id="Cerrar" onclick="crearcursos.cerrarventana()">X</button>
            <div id="Contenido">
            <h1>Importar Cursos</h1>
            <a href="/static/excel/importacioncursos.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">

            <button class="BotonNormal" onclick="crearcursos.importar()">Importar Cursos</button>
            </div>`


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