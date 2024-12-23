class javatemasfront{


    constructor(x){
        this.idusuario=x;
        this.temashablados=[];
        this.profesores=[];
        this.opinionesprofesor=[];
        this.cargardatos()
    }


    cargardatos(){
        let query2=`
        {
            allTemashablado {
              id
              nombre
              activo
              opinionesprofesoresSet {
                id
          
                contenido
              }
            }
            allOpinionesprofesor {
                id
                tema {
                  id
                  nombre
                  activo
            
                }
                profesor {
                  id
                  user
                  email
                }
                contenido
              }
            allUsuarios {
                id
                perfil {
                  id
                  nombre
            
                }
                user
                email
              }
          }
        
        `

        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
            this.profesores=response.data.data.allUsuarios
            this.temashablados=response.data.data.allTemashablado
            this.opinionesprofesor=response.data.data.allOpinionesprofesor
            $(".CrearPeticion").prop("disabled",false);
            this.mostrardatos()
        }).catch(error=>{
            console.log(error)
        })
    }

    mostrardatos(){
        let tablaopinion=`
            <tr>
                <th>Profesor</th>
                <th>Tema</th>
                <th>Opinion</th>
                <th>Accion</th>
            </tr>

            ${this.opinionesprofesor.map((dat, index)=>{
                
                return `<tr>
                        <td>${dat.profesor.user}</td>
                        <td>${dat.tema.nombre}</td>
                        <td>${dat.contenido}</td>
                        <td><button onclick="temasfront.eliminaropinion(${dat.id})">Eliminar</button><button onclick="temasfront.crearventana(3,${index})">Editar</button></td>
                </tr>
                `
            })}
        `
        let tablatema=`
            <tr>
                <th>Tema</th>
                <th>Activo</th>
                <th>Accion</th>
            </tr>

            ${this.temashablados.map((dat,index)=>{

                return `
                    <tr>
                        <td>${dat.nombre}</td>
                        <td>${dat.activo}</td>
                        <td><button onclick="temasfront.eliminartema(${dat.id})">Eliminar</button><button onclick="temasfront.crearventana(2,${index})">Editar</button></td>
                    </tr>
                `
            })}
        `
        $("#TablaOpinion").html(tablaopinion)
        $("#TablaTema").html(tablatema)

    }
    crearventana(x,datos){
        let html;

        console.log("antes de eso")
            if(x==0){
                html=`<div>
                
                    <p>Nombre tema</p>
                    <input type="text" id="Nombre">
                    <button onclick="temasfront.creartema()">Crear Tema</button>
                </div>`
            }else if(x==1){
                html=`<div>
                    <p>Selecciona profesor</p>
                    <select id="Profesor">
                        ${this.profesores.map(dat=>{
                            return `<option value="${dat.id}">${dat.user}</option>`
                        })}
                    </select>
                    <p>Selecciona Tema</p>
                    <select id="Tema">
                        ${this.temashablados.map(dat=>{
                            return `<option value="${dat.id}">${dat.nombre}</option>`
                        })}
                    </select>
                    <p>Opinion del profesor</p>
                    <textarea id="Opinion"></textarea>
                    <button onclick="temasfront.crearopinion()">Crear Opinion</button>

                </div>
                `
            }else if(x==2){
                html=`<div>
                
                    <p>Nombre tema</p>
                    <input type="text" id="Nombre" value="${this.temashablados[datos].nombre}">
                    <button onclick="temasfront.editartema(${this.temashablados[datos].id})">Editar Tema</button>
                </div>`
            }else if (x==3){
                html=`<div>
                    <p>Selecciona profesor</p>
                    <select id="Profesor">
                        <option value="${this.opinionesprofesor[datos].profesor.id}">${this.opinionesprofesor[datos].profesor.user}</option>
                        ${this.profesores.map(dat=>{
                            if(this.opinionesprofesor[datos].profesor.id!=dat.id){
                                return `<option value="${dat.id}">${dat.user}</option>`
                            }
                            
                        })}
                    </select>
                    <p>Selecciona Tema</p>
                    <select id="Tema">
                        <option value="${this.opinionesprofesor[datos].tema.id}">${this.opinionesprofesor[datos].tema.nombre}</option>
                        ${this.temashablados.map(dat=>{
                            if(this.opinionesprofesor[datos].tema.id!=dat.id){
                                return `<option value="${dat.id}">${dat.nombre}</option>`
                            }
                            
                        })}
                    </select>
                    <p>Opinion del profesor</p>
                    <textarea id="Opinion">${this.opinionesprofesor[datos].contenido}</textarea>
                    <button onclick="temasfront.editaropinion(${this.opinionesprofesor[datos].id})">Editar Opinion</button>

                </div>
                `
            }
            
            


            setTimeout(()=>{
                if($("#Separador").length){
                    $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana");
                }else{
                    $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
                    tinymce.init({
                        selector: '#contenido',
                        language: 'es',
                    });
                }
                
                    
                    
                
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

    crearopinion(){

        let mut=`mutation {
            opinionprofesorcreate(contenido: "${$("#Opinion").val()}", profesor: ${$("#Profesor").val()}, tema: ${$("#Tema").val()}) {
              success
              error
            }
          }
          `

          axios.post("/graphql/",{
            query:mut
          }).then(response=>{
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
            this.cargardatos()
          }).catch(error=>{
            console.log(error)
          })
    }
    editaropinion(x){
        let mut=`mutation {
            opinionprofesoredit(contenido: "${$("#Opinion").val()}", id: ${x}, profesor: ${$("#Profesor").val()}, tema: ${$("#Tema").val()}) {
              success
              error
            }
          }
          
          `

          axios.post("/graphql/",{
            query:mut
          }).then(response=>{
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
            this.cargardatos()
          }).catch(error=>{
            console.log(error)
          })
    }
    eliminaropinion(x){
        let mut=`mutation {
            opinionprofesordelete(id: ${x}) {
              success
              error
            }
          }
          
          
          `

          axios.post("/graphql/",{
            query:mut
          }).then(response=>{
            
            this.cargardatos()
          }).catch(error=>{
            console.log()
          })
    }

    creartema(){
        let mut=`mutation {
            temafrontcreado(activo: true, nombre: "${$("#Nombre").val()}") {
              success
              error
            }
          }
          
          `

          axios.post("/graphql/",{
            query:mut
          }).then(response=>{
            this.cargardatos()
          }).catch(error=>{
            console.log(error)
          })
    }
    editartema(x){
        console.log(x+"--"+$("#Nombre").val())
        let mut=`mutation {
            temafrontedit(activo: "ss", id: ${x}, nombre: "${$("#Nombre").val()}") {
              success
              error
            }
          }
          
          
          `

          axios.post("/graphql/",{
            query:mut
          }).then(response=>{
            this.cargardatos()
          }).catch(error=>{
            console.log(error)
          })
    }
    eliminartema(x){
        let mut=`
        mutation {
          temafrontdelete(id: ${x}) {
            success
            error
          }
        }
        
          
          `

          axios.post("/graphql/",{
            query:mut
          }).then(response=>{
            this.cargardatos()
          }).catch(error=>{
            console.log(error)
          })
    }
}