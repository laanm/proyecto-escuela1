class javaadminlibros{

    constructor(){

        this.productos=[]
        this.categorias=[]
        this.cargardatos()

    }

    cargardatos(x){

        let query2=`{
            allLibroscra {
              id
              nombre
              cantidad
              limitecantidad
              imagen
              descripcion
              infinito
              Activo
              idcategoria {
                id
                nombre
                activo
              }
              autor
              posicion
              codigobarra
              vecespedido
            }
            allCategoriaslibroscra {
                id
                nombre
                activo
            
              }
          }
          `


        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
            this.productos=response.data.data.allLibroscra
            this.categorias=response.data.data.allCategoriaslibroscra
            this.mostrardatos(false)
            if(x==true){
                this.abrircategorias()
            }
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }

    mostrardatos(x){
        let temp=""
        let html=""
        if(x==true){
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="adminequipos.mostrardatos(false)">Ver Menos</button>`)
        }else{
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="adminequipos.mostrardatos(true)">Ver Mas</button>`)
        }
        if($(window).width()<600 && x==false){
            html=`
            <tr>
                <th>nombre</th>
                <th>autor</th>
                <th>imagen</th>
                <th>visible</th>
                <th>Posicion</th>
                <th>Cod.barra</th>
                <th>Accion</th>
            </tr>

            ${this.productos.map(dat=>{
                if(dat.Activo==1){
                    temp=`<td><input type="checkbox" checked onclick="adminequipos.alternarvisibilidad(${dat.id},0)"></td>`
                }else{
                    temp=`<td><input type="checkbox" onclick="adminequipos.alternarvisibilidad(${dat.id},1)"></td>`
                }

                return `
                    <tr>
                        <td>${dat.nombre}</td>
                        <td>${dat.autor}</td>
                        <td><button onclick="adminequipos.abririmagen('${dat.imagen}')">Imagen</button></td>
                        ${temp}
                        <td>${dat.posicion}</td>
                        <td><button onclick="adminequipos.abrircodigo('${dat.codigobarra}',${dat.cantidad})">Ver Codigo</button></td>
                        <td><button class="Eliminar" onclick="adminequipos.eliminarproductocra(${dat.id})">Eliminar</button></td>

                    </tr>
                
                `
            })}
        `

        }else{
         html=`
            <tr>
                <th>id</th>
                <th>nombre</th>
                <th>categoria</th>
                <th>autor</th>
                <th>cantidad</th>
                <th>imagen</th>
                <th>descripcion</th>
                <th>visible</th>
                <th>Posicion</th>
                <th>Cod.barra</th>
                <th>Accion</th>
            </tr>

            ${this.productos.map(dat=>{
                if(dat.Activo==1){
                    temp=`<td><input type="checkbox" checked onclick="adminequipos.alternarvisibilidad(${dat.id},0)"></td>`
                }else{
                    temp=`<td><input type="checkbox" onclick="adminequipos.alternarvisibilidad(${dat.id},1)"></td>`
                }

                return `
                    <tr>
                        <td>${dat.id}</td>
                        <td>${dat.nombre}</td>
                        <td>${dat.idcategoria.nombre}</td>
                        <td>${dat.autor}</td>
                        <td>${dat.cantidad}</td>
                        <td><button onclick="adminequipos.abririmagen('${dat.imagen}')">Imagen</button></td>
                        <td>${dat.descripcion}</td>
                        ${temp}
                        <td>${dat.posicion}</td>
                        <td><button onclick="adminequipos.abrircodigo('${dat.codigobarra}',${dat.cantidad})">Ver Codigo</button></td>
                        <td><button class="Eliminar" onclick="adminequipos.eliminarproductocra(${dat.id})">Eliminar</button><button onclick="adminequipos.abrireditarproducto(${dat.id},'${dat.nombre}','${dat.autor}',${dat.idcategoria.id},${dat.cantidad},'${dat.descripcion}','${dat.posicion}','${dat.codigobarra}')">Editar</button></td>

                    </tr>
                
                `
            })}
        `
        }

        $("#Tabla").html(html)

    }
    abrireditarproducto(x,nombre,autor,categoria,cantidad,descripcion,posicion,codigo){
        const html=`
        <div id="Contenido">
        <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
            <h2>Editar Libro</h2>
            <label>Nombre</label>
            <input type="text" id="Nombre" value="${nombre}">

            <label>Autor</label>
            <input type="text" id="Autor" value="${autor}">

            <label>Categoria</label>
            <select id="Categoria">
                ${this.categorias.map(dat=>{
                    if(categoria==dat.id){
                        return `<option value="${dat.id}">${dat.nombre}</option> `
                    }
                    
                })}
                ${this.categorias.map(dat=>{
                    if(categoria==dat.id){
                        return 
                    }
                    return `<option value="${dat.id}">${dat.nombre}</option> `
                })}
                
            </select>

            <label>Imagen</label>
            <input type="file" id="Archivo">

            <label>Cantidad</label>
            <input type="number" id="Cantidad" value="${cantidad}">

            <label>Descripcion</label>
            <textarea id="Descripcion" >${descripcion}</textarea>

            <label>Cantidad Limite por peticion</label>
            <input type="number" id="LimiteCantidad">

            <label>Posicion</label>
            <input type="text" id="Posicion" value="${posicion}">

            <label>Codigo De Barra(No es la imagen final)</label>
            <img id="ImgBarra">
            <input type="text" id="CodigoBarra" onchange="adminequipos.generarcodigobarra()" placeholder="Agregar texto extra(Opcional)" value="${codigo}">

            <button class="CrearPeticion" onclick="adminequipos.editarproducto(${x})">Editar</button>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
        if(codigo!=""){
            this.generarcodigobarra()
        }
        
    }
    async editarproducto(x){
        $("#Cargando").show()
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")

        if($("#Archivo")[0].files.length==0){
            await this.subirimagen(null,x)
            return
        }
        let files= $("#Archivo")[0].files
        for (let i = 0; i < files.length; i++) {

            let file = files[i];
            let name = $('#name').val();
            let cat_id = $('#category').val();

            await this.subirimagen(files[i],x)
        }
        
            /*$.ajax({
                    url: '/EditarLibrosCRA',
                    type: 'POST',
                    data: {
                        
                        id: x,
                        nombre: $("#Nombre").val(),
                        autor: $("#Autor").val(),
                        cantidad: $("#Cantidad").val(),
                        descripcion: $("#Descripcion").val(),
                        posicion:$("#Posicion").val(),
                        codigobarra:$("#CodigoBarra").val(),
                        idcategoria:$("#Categoria").val()
                    },
                    headers: {
                        'X-CSRFToken': TOKEN
                    },
                    success: function (datinis) {
                        console.log(datinis)
                        adminequipos.cargardatos()
                        
                       
                    },
                    error: function (data) {
                       
                    }
                });*/
    }

    subirimagen(file,id){
        return new Promise(function(resolve,reject){
            let formulario= new FormData()
            formulario.append('imagen',file)
            formulario.append('id',id)
            formulario.append('nombre',$("#Nombre").val())
            formulario.append('autor',$("#Autor").val())
            formulario.append('cantidad',$("#Cantidad").val())
            formulario.append('descripcion',$("#Descripcion").val())
            formulario.append('posicion',$("#Posicion").val())
            formulario.append('codigobarra',$("#CodigoBarra").val())
            formulario.append('idcategoria',$("#Categoria").val())
            // show form data for debugging
            for (var pair of formulario.entries()) {
                console.log(pair[0]+ ', ' + pair[1]);
            }

            $.ajax({
                url: '/EditarLibrosCRA',
                type: 'POST',
                data: formulario,
                contentType: false,
                processData: false,
                headers: {
                    'X-CSRFToken': TOKEN,
                    
                },
                success: function (datinis) {
                    console.log(datinis)
                    resolve(datinis)
                    adminequipos.cargardatos()
                   
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
            });
        })
    }
    eliminarproductocra(x){
        $("#Cargando").show()
        let mut=`mutation {
            libroscradelete(id: ${x}) {
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
            $("#Cargando").hide()
        })
    }

    crearcategoria(){
        $("#Cargando").show()
        if($("#NombreCategoria").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Nombre',
                text: 'La categoria no puede no tener nombre.',
                })
        }
        let mut=`mutation {
            categorialibroscra(nombre: "${$("#NombreCategoria").val()}") {
              success
              error
            }
          }`

          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            
            this.cargardatos(true)
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })

    }

    eliminarcategoria(x){
        $("#Cargando").show()
        let mut=`mutation {
            categorialibroscradelete(id: ${x}) {
              success
              error
            }
          }
          `

          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            
            this.cargardatos(true)
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    abrircrearproducto(){
        const html=`
        <div id="Contenido">
        <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
            <h2>Crear Producto</h2>
            <label>Nombre</label>
            <input type="text" id="Nombre">

            <label>Autor</label>
            <input type="text" id="Autor">

            <label>Categoria</label>
            <select id="Categoria">
                ${this.categorias.map(dat=>{

                    return `<option value="${dat.id}">${dat.nombre}</option> `
                })}
                
            </select>

            <label>Imagen</label>
            <input type="file" id="Archivo">

            <label>Cantidad</label>
            <input type="number" id="Cantidad">

            <label>Descripcion</label>
            <textarea id="Descripcion" ></textarea>

            <label>Cantidad Limite por peticion</label>
            <input type="number" id="LimiteCantidad">

            <label>Posicion</label>
            <input type="text" id="Posicion">

            <label>Codigo De Barra(No es la imagen final)</label>
            <img id="ImgBarra">
            <input type="text" id="CodigoBarra" onchange="adminequipos.generarcodigobarra()" placeholder="Agregar texto extra(Opcional)">

            <button class="CrearPeticion" onclick="adminequipos.crearproducto()">Crear Producto!</button>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
    }
    generarcodigobarra(){
        let temp=""
        if($("#CodigoBarra").val()!=""){
            temp=$("#CodigoBarra").val().replaceAll("-","")
            $("#CodigoBarra").val(temp)
            JsBarcode("#ImgBarra", "L-"+$("#CodigoBarra").val());
        }
        
    }
    abririmagen(x){
        
        const html=`
        <div id="ContenidoImagen">
        <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
            <h2>Imagen del producto</h2>
            <img src="/mediafiles/${x}" >
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
    }
    abrircodigo(x,c){
        let imagenes="";
        for(let i=0;i<c;i++){
            imagenes+=`<img id="CodigoBarra${i+1}">`
        }
        
        const html=`
        <div id="ContenidoCodigos">
            <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
            <h2>Codigo de barra del producto</h2>
            <div>
                
                <label>Separacion Entre Imagenes</label>
                <input type "number">
                
            </div>
            <button onclick="adminequipos.descargarcodigo(${c})">Descargar Codigo</button>
            
            

            ${imagenes}
            
            
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)

        for(let i=0;i<c;i++){
            
            JsBarcode(`#CodigoBarra${i+1}`,`${x}-${i+1}`)
        }
        
    }
    descargarcodigo(c){
        var doc = new jsPDF()
        var pag=1;

        var imagen= $("#CodigoBarra").attr('src')
        for(let i=0;i<c;i++){
            
            if(i+1>7*pag){
                pag++;
                doc.addPage()
            }
            imagen= $(`#CodigoBarra${i+1}`).attr('src')
            doc.addImage(imagen,'PNG', 15,40*i-(280*(pag-1)),40,30);
            
        }

        
        
        doc.save("test.pdf")
    }
    alternarvisibilidad(x,y){
        $("#Cargando").show()
        let mut
        
            mut=`mutation {
                libroscramicroedit(id: ${x}, visible: ${y}) {
                  success
                  error
                }
              }`
        axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            this.cargardatos()
        }).catch(error=>{
            console.log(error)
        })

        
    }

    abrircategorias(){
        console.log("entro aqui xd")
        
        const html=`
        <div id="Contenido">
        <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
        <h2>Crear Categorias</h2>
        <label>Nombre</label>
        <input type="text" id="NombreCategoria" placeholder="Nombre">
        <button class="CrearPeticion" onclick="adminequipos.crearcategoria()">Crear Categoria</button>

        <h3>Categorias</h3>
        <table id="TablaCategorias">
            <tr>
                <th>Nombre</th>
                <th>Accion</th>
            </tr>

            ${this.categorias.map(dat=>{
                return `
                    <tr>
                        <td>${dat.nombre}</td>
                        <td><button id="Eliminar" class="Eliminar" onclick="adminequipos.eliminarcategoria(${dat.id})">Eliminar</button></td>
                    </tr>
                
                `
            }).join("")}
            

        </table>
        </div>
    `

    
    $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    
    
    $("#Ventana").html(html)
    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }


    async crearproducto(){
        
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
        adminequipos.cerrarventana()
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
    

    uploadimg(file){

        return new Promise(function(resolve,reject){

            
            
            const form= new FormData()
            console.log($("#Nombre").val())
            console.log($("#Categoria").val())
            console.log($("#Cantidad").val())
            console.log($("#Descripcion").val())
            console.log($("#LimiteCantidad").val())
            console.log($("#Posicion").val())
            console.log($("#CodigoBarra").val())
            
            
            
            //form.append('operations', `{"query": "mutation ($cantidad: Int, $codigobarra: String, $descripcion: String, $idcategoria: Int, $img: Upload, $limitecantidad: Int, $nombre: String, $posicion: String) {productocracreate(cantidad: $cantidad, codigobarra: $codigobarra, descripcion: $descripcion, idcategoria: $idcategoria, img: $img, limitecantidad: $limitecantidad, nombre: $nombre, posicion: $posicion) {success error}}", "variables": { "cantidad": ${$("#Cantidad").val()}, "codigobarra": "${$("#CodigoBarra").val()}", "descripcion" : "${$("#Descripcion").val()}", "idcategoria": ${$("#Categoria").val()}, "img": null, "limitecantidad": ${$("#LimiteCantidad").val()}, "nombre": "${$("#Nombre").val()}", "posicion": "${$("#Posicion").val()}" }}`);
            form.append('operations', `{"query": "mutation ($cantidad: Int, $codigobarra: String, $descripcion: String, $idcategoria: Int, $imagen: Upload, $limitecantidad: Int, $nombre: String, $posicion: String, $autor: String) {libroscracreate(cantidad: $cantidad, codigobarra: $codigobarra, descripcion: $descripcion, idcategoria: $idcategoria, imagen: $imagen, limitecantidad: $limitecantidad, nombre: $nombre, posicion: $posicion, autor: $autor) {success msg error}}", "variables": { "cantidad": ${$("#Cantidad").val()} , "codigobarra": "E-${$("#CodigoBarra").val()}", "descripcion" : "${$("#Descripcion").val()}", "idcategoria": ${$("#Categoria").val()}, "imagen": null, "limitecantidad": ${$("#LimiteCantidad").val()} , "nombre": "${$("#Nombre").val()}", "posicion": "${$("#Posicion").val()}", "autor": "${$("#Autor").val()}" }}`);

            
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
                
                if(response.data.data.libroscracreate.msg=="Codigo De Barra Existente"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Codigo de barra existente',
                        text: 'Codigo de barra existente',
                    })
                }
            
                adminequipos.cargardatos()
                $("#Agregar").prop("disabled",false);
                resolve(response.data)
            }).catch(error => {
                reject(error)
                adminequipos.cargardatos()
                
                $("#Agregar").prop("disabled",false);
            });

        })
        
    }

}


