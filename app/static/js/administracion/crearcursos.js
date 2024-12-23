class javacrearcursos{

    constructor(){
        this.cursos=[];
        this.cargarcursos();
    }


    creartabla(){
        let html=`        
        
            <button id="CrearPeticion" onclick="crearcursos.crearventana()">Crear Cursos</button>
            <button id="CrearPeticion" onclick="crearcursos.crearventanaimport()">Importar Cursos</button>

        <table>
            <tr>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>
            ${this.cursos.map(dat=>{
                return `<tr>
                            <td>${dat.nombre}</td>
                            <td><span><button onclick="crearcursos.eliminarcursos(${dat.id})">Eliminar</button><button onclick="crearcursos.ventanaeditarcursos(${dat.id},'${dat.nombre}')">Editar</button></span></td>
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
        <h1>Editando Cursos</h1>
        <label for="">Nombre</label>
        <input type="text" id="Nombre" value="${nombre}">

        <button onclick="crearcursos.editarcursos(${id})">Crear Cursos</button>`

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
            <h1>Creando Cursos</h1>
            <label for="">Nombre</label>
            <input type="text" id="Nombre">

            <button onclick="crearcursos.crearcursos()">Crear Cursos</button>`

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
}