class javamantencion{

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
            <table id="MalditaTabla">
            <thead>
            <tr>
                <th>Estado</th>
                <th>Categoria</th>
                <th>Prioridad</th>
                <th>Tipo De Obra</th>
                <th>Fecha Creacion</th>
                <th>Informacion</th>
                <th>Accion</th>

            </tr>
            </thead>
            <tbody>
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
                            <td><button id="Eliminar" onclick="mantencion.eliminarmantencion(${dat.id})">Eliminar</button></td>
                        </tr>`
            }).join("")}

            </tbody>
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
                <button id="Finalizado" onclick="mantencion.agregarmaterial()">Añadir Recurso</button>
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

    abrircategorias(){
        console.log("entro aqui xd")
        this.materiales=[];
        const html=`
        <div id="Contenido">
        <button id="Cerrar" onclick="mantencion.cerrarventana()">X</button>
        <h2>Crear Categorias</h2>
        <label>Nombre</label>
        <input type="text" id="NombreCategoria" placeholder="Nombre">
        <button class="CrearPeticion" onclick="mantencion.crearcategoria()">Crear Categoria</button>

        <h3>Categorias</h3>
        <table>
            <tr>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>

            ${this.categorias.map(dat=>{
                return `
                    <tr>
                        <td>${dat.nombre}</td>
                        <td><button id="Eliminar" onclick="mantencion.eliminarcategoria(${dat.id})">Eliminar</button></td>
                    </tr>
                
                `
            }).join("")}
            

        </table>
        </div>
    `

    
    $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    
    
    $("#Ventana").html(html)
    }
    crearcategoria(){
        $("#Cargando").show()
        let query2=`mutation {
            categoriamantencioncreate(nombre: "${$("#NombreCategoria").val()}") {
              success
              error
            }
          }`

        axios.post("/graphql/",{

            query:query2

        }).then(response=>{
            console.log("test")
            $("#Cargando").hide()
            this.cargardatos(true)

            
            
        }).catch(error=>{
            console.log(error)
        })

    }
    eliminarcategoria(x){
        $("#Cargando").show()
        let query2=`mutation {
            categoriamantenciondelete(id: ${x}) {
              success
              error
            }
          }`

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
    agregarmaterial(){

        if($("#NombreMaterial").val()=="" || $("#Cantidad").val()==0 ||$("#Costo").val()<0){
            Swal.fire({
                icon: 'error',
                title: 'Campos Faltantes',
                text: 'Hay Campos en blanco o cantidades invalidas',
            })
        }else{
            this.materiales.push({nombre:$("#NombreMaterial").val(),cantidad:$("#Cantidad").val(),costo:$("#Costo").val()})
        
            const html=`

                        <tr>
                            <th>Recurso</th>
                            <th>Cantidad</th>
                            <th>Costo Aprox</th>
                            <th>Accion</th>
                        </tr>
                        ${this.materiales.map((dat,index)=>{
                            return `<tr>
                                        <td>${dat.nombre}</td>
                                        <td>${dat.cantidad}</td>
                                        <td>${dat.costo}</td>
                                        <td><button id="Eliminar" onclick="mantencion.eliminarmaterial(${index})">Eliminar</button></td>
                                    </tr>`
                        })}
                        
            `

            $("#Recursos").html(html)
        }

        
    }
    eliminarmaterial(x){
        this.materiales.splice(x,1);
        const html=`

                    <tr>
                        <th>Recurso</th>
                        <th>Cantidad</th>
                        <th>Costo Aprox</th>
                        <th>Accion</th>
                    </tr>
                    ${this.materiales.map((dat,index)=>{
                        return `<tr>
                                    <td>${dat.nombre}</td>
                                    <td>${dat.cantidad}</td>
                                    <td>${dat.costo}</td>
                                    <td><button id="Eliminar" onclick="mantencion.eliminarmaterial(${index})">Eliminar</button></td>
                                </tr>`
                    })}
                    
        `

        $("#Recursos").html(html)
    }

     async crearmantencion(){
        
        $("#Cargando").show()
        if($("#Archivo").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Agregar Imagen',
                text: 'Falta agregar imagen',
            })
            $("#Cargando").hide()
            return
        }
        $("#Agregar").prop('disabled',true);
        mantencion.cerrarventana()
        let files=$("#Archivo")[0].files

        let archivos= Array.from(files)
        console.log(archivos)
        for(const img of archivos.entries()){
            try{
                const imagensubida= await this.uploadimg(img);

            }catch (error){
                console.log(error)
            }
        }
    }
    
    subirmateriales(x){
        
        if(this.materiales.length==0){
            
            this.cargardatos()
            return
        }
        
            let query2=""
                    this.materiales.forEach((dat,index)=>{
                        $("#Cargando").show()
                        query2=`mutation {
                                    recursoscreate(cantidad: ${dat.cantidad}, costoaprox: ${dat.costo}, mantencion: ${x}, nombre: "${dat.nombre}") {
                                    success
                                    error
                                    }
                                }
                                `
                                axios.post("/graphql/",{

                                    query:query2
                        
                                }).then(response=>{
                                    console.log("Un rico material")
                                    console.log(this.materiales.length)
                                    console.log(index+1)
                                    if(this.materiales.length==index+1){
                                        console.log("termino")
                                        this.cargardatos()
                                        this.materiales=[];
                                    }
                                }).catch(error=>{
                                    console.log(error)
                                })
                        
            })
        
        
        
        
    }

    uploadimg(file){

        return new Promise(function(resolve,reject){

            
            
            const form= new FormData()
            
            console.log($("#Categoria").val())
            console.log($("#Prioridad").val())
            console.log($("#TipoObra").val())
            console.log($("#Texto").val())
            
            
            form.append('operations', `{"query": "mutation ($categoria: Int , $imagen: Upload , $prioridad: Int , $texto: String , $tipoobra: Int) {mantencioncreate(imagen: $imagen, categoria: $categoria , prioridad: $prioridad , texto: $texto , tipoobra: $tipoobra) {success msg error}}", "variables": { "imagen": null , "categoria": ${$("#Categoria").val()} , "prioridad": ${$("#Prioridad").val()} , "texto": "${$("#Texto").val()}" , "tipoobra": ${$("#TipoObra").val()} }}`);
            
            
            form.append('map', '{ "0": ["variables.imagen"]}');
            form.append('0', file[1]);
            
            

            /*
            console.log(file)
            const form= new FormData()
            form.append('operations', '{"query": "mutation ($imagen: Upload! ,  $nombre: String!) {imagencreate(imagen: $imagen , nombre: $nombre) {success error}}", "variables": { "imagen": null , "nombre": "uwu" }}');
            form.append('map', '{ "0": ["variables.imagen"]}');
            form.append('0', file[1]);
            */

            const headers = {
                'Content-Type': 'multipart/form-data',
            }

            axios({
                method: 'post',
                url: '/graphql/',
                data: form,
                headers: headers,

            }).then(response => {
                console.log("funciono")
                
            
                mantencion.subirmateriales(response.data.data.mantencioncreate.msg)
                $("#Agregar").prop("disabled",false);
                resolve(response.data)
            }).catch(error => {
                reject(error)
                mantencion.cargardatos()
                
                $("#Agregar").prop("disabled",false);
            });

        })
        
    }
    eliminarmantencion(x){
        
            $("#Cargando").show()
            let query2=`mutation {
                mantenciondelete(id: ${x}) {
                  success
                  error
                }
              }`
    
            axios.post("/graphql/",{
    
                query:query2
    
            }).then(response=>{
                console.log("test")
                
                this.cargardatos()
    
                
                
            }).catch(error=>{
                console.log(error)
                
            })
    
        
    }

    solofecha(x){

        const ekisde=x.split("T")

        return `${ekisde[0]}`

    }

}