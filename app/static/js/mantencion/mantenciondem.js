class javamantenciondem{

    constructor(x){

        

        this.materiales=[];
        
        this.mantenciones=[];
        this.categorias=[];
        this.cargardatos();

    }

    cargardatos(x){
        let query2=`{
            allMantencion {
              id
              estado
              categoria {
                id
                nombre
                
              }
              prioridad
              tipoobra
              imagen
              texto
              fechaemision
              fechaultimamodificacion
              recursosmantencionSet {
                id
                nombre
                cantidad
                costoaprox
                
              }
            }
            allCategoriasmantencion {
                id
                nombre
              }
          }
          
          `


          axios.post("/graphql/",{
            query:query2
          }).then(response=>{
            this.mantenciones=response.data.data.allMantencion
            this.categorias=response.data.data.allCategoriasmantencion
            $("#Cargando").hide();
            this.mostrardatos()
            if(x==true){
                this.abrircategorias()
            }
          }).catch(error=>{
            console.log(error)
            $("#Cargando").hide();
          })
    }

    mostrardatos(){
        const html=`
            <table>
            <tr>
                <th>Estado</th>
                <th>Categoria</th>
                <th>Prioridad</th>
                <th>Tipo De Obra</th>
                <th>Fecha Creacion</th>
                <th>Informacion</th>
                <th>Accion</th>

            </tr>

            ${this.mantenciones.map((dat,index)=>{
                let prio=null;
                let obra=null;
                let estado=0;
                if(dat.estado==1){
                    estado="Pendiente"
                }else if(dat.estado==2){
                    estado="En Ejecucion"
                }else if(dat.estado==3){
                    estado="Finalizado"
                }
                if(dat.prioridad==1){
                    prio="Baja Prioridad"
                }else{
                    prio="Alta Prioridad"
                }
                if(dat.tipoobra==1){
                    obra="Obra Menor"
                }else{
                    obra="Obra Mayor"
                }


                return`<tr>
                            <td>${estado}</td>
                            <td>${dat.categoria.nombre}</td>
                            <td>${prio}</td>
                            <td>${obra}</td>
                            <td>${this.solofecha(dat.fechaemision)}</td>
                            <td><button id="Info" onclick="mantencion.abririnfo(${index})">Info</button></td>
                            <td>
                                <div class="Accion">
                                    <button id="EnEjecucion" onclick="mantencion.editarestado(2,${dat.id})">En Ejecucion</button>
                                    <button id="Finalizado" onclick="mantencion.editarestado(3,${dat.id})">Finalizado</button>
                                </div>
                            </td>
                        </tr>`
            }).join("")}
            </table>
        `
        $("#Tabla").html(html)
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    abrirventana(){

            const html=`
                <button id="Cerrar" onclick="mantencion.cerrarventana()">X</button>
                <div id="Contenido">

                <h2>Crear Solicitud</h2>
                <label>Categoria</label>
                <select id="Categoria">
                    ${this.categorias.map(dat=>{
                        return `<option value="${dat.id}">${dat.nombre}</option>`
                    })}
                </select>
                <label>Prioridad</label>
                <select id="Prioridad">
                    <option value="1">Baja</option>
                    <option value="2">Alta</option>
                </select>
                <label>Tipo de obra</label>
                <select id="TipoObra">
                    <option value="1">Obra Menor</option>
                    <option value="2">Obra Mayor</option>
                </select>
                <label>Imagen y texto</label>
                <input type="file" id="Archivo">
                <textarea id="Texto"></textarea>
                <h2>Agregar Recurso</h2>
                <input type="text" placeholder="Nombre Material" id="NombreMaterial">
                <div>
                    
                    <input type="number" placeholder="Cantidad" id="Cantidad" min="1">
                    <input type="number" placeholder="Costo Aprox" id="Costo" min="0">
                    
                </div>
                <button onclick="mantencion.agregarmaterial()">Añadir Recurso</button>
                <div id="Recursos2">
                <table id="Recursos">
                    <tr>
                        <th>Recurso</th>
                        <th>Cantidad</th>
                        <th>Costo Aprox</th>
                        <th>Accion</th>
                    </tr>
                    <tr>
                        <td>Recursos no asignados</td>
                    </tr>
                    
                </table>
                </div>
                <button id="Agregar" class="CrearPeticion" onclick="mantencion.crearmantencion()">Enviar Solicitud</button>
                </div>
            `

            setTimeout(()=>{
                $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
            },100)
            
            $("#Ventana").html(html)
    }

    
    editarestado(x,id){
        $("#Cargando").show()
        let query2=`mutation {
            mantencionedit(estado: ${x}, id: ${id}) {
              success
              error
            }
          }
          `

        axios.post("/graphql/",{

            query:query2

        }).then(response=>{
            console.log("test")
            this.cargardatos(true)
        }).catch(error=>{
            console.log(error)
        })
    }
    abririnfo(x){
        const html=`
                <button id="Cerrar" onclick="mantencion.cerrarventana()">X</button>
                <div id="Contenido">

                <img src="/mediafiles/${this.mantenciones[x].imagen}" width="300" height="400">
                <textarea readonly>${this.mantenciones[x].texto}</textarea>

                    <table id="Recursos">
                        <tr>
                            <th>Recurso</th>
                            <th>Cantidad</th>
                            <th>Costo Aprox</th>
                            
                        </tr>
                        
                            ${this.mantenciones[x].recursosmantencionSet.map(dat=>{
                                
                                return `
                                <tr>
                                        <td>${dat.nombre}</td>
                                        <td>${dat.cantidad}</td>
                                        <td>${dat.costoaprox}</td>

                                
                                </tr>
                                `
                            }).join("")}
                            
                        
                        
                    </table>

                </div>

                
            `

           
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
            
            
            $("#Ventana").html(html)
    }
    

    solofecha(x){

        const ekisde=x.split("T")

        return `${ekisde[0]}`

    }

}