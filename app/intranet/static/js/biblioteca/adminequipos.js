class javaadminequipos{

    constructor(){

        this.productos=[]
        this.categorias=[]
        this.cargardatos()

    }

    cargardatos(x){

        let query2=`{
            allProductoscra {
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
              posicion
              codigobarra
              vecespedido
            }
            allCategoriasproductoscra {
                id
                nombre
                activo
            
              }
          }
          `


        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
            this.productos=response.data.data.allProductoscra
            this.categorias=response.data.data.allCategoriasproductoscra
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
        let temp2=""
        let html=""
        if(x==true){
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="adminequipos.mostrardatos(false)">Ver Menos</button>`)
        }else{
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="adminequipos.mostrardatos(true)">Ver Mas</button>`)
        }

        if($(window).width()<570){
            $("#DivBotones").html(`
           <button class="BotonNormal"> <a href="{% url 'RenderEquiposCra' %}">Ir Catalogo</a></button>
            
            <button class="BotonNormal" onclick="adminequipos.abrircrearproducto()">Crear Producto</button>
            <button class="BotonNormal" onclick="adminequipos.abrircategorias()">Menu Categorias</button>
            
            `)
        }


        if($(window).width()<570){
            html=`

        ${this.productos.map((dat,index)=>{

            if(dat.idcategoria==undefined){
                temp=` 
                <option value="0">Sin Categoria</option>
                ${this.categorias.map(dat2=>{
                    
                    return `<option value="${dat2.id}">${dat2.nombre}</option>`
                })}`
            }else{
                temp=` 
                <option value="${dat.idcategoria.id}">${dat.idcategoria.nombre}</option>
                ${this.categorias.map(dat2=>{
                    if(dat2.id==dat.idcategoria.id){
                        return``
                    }
                    return `<option value="${dat2.id}">${dat2.nombre}</option>`
                })}`
            }
            if(dat.Activo==1){
                temp2=`<input onchange="adminequipos.alternarvisibilidad(${dat.id},0)" type="checkbox" checked>`
            }else{
                temp2=`<input onchange="adminequipos.alternarvisibilidad(${dat.id},1)" type="checkbox">`
            }
            return`<div class="Item">
            <div class="Oculto"><h2>Editar</h2><button class="BotonNormal" ><label for="Archivo-${dat.id}">Cambiar Portada</label></button><input id="Archivo-${dat.id}" onchange="adminequipos.subir2(${dat.id})" type="file" style="visibility:hidden;"><button class="BotonNormal" onclick="adminequipos.abrireditarproducto(${index})">Editar Equipo</button><button class="BotonNormal" onclick="adminequipos.eliminarproductocra(${dat.id})">Eliminar</button></div>
            
            <img class="Imagen" src="/mediafiles/${dat.imagen}">

                <div class="Informacion">
                
                    <div class="Titulo" ><h4>Titulo</h4><label>${dat.nombre}</label></div>
                    <div class="Titulo" ><h4>Categoria</h4><select id="S${dat.id}" onchange="adminequipos.editarcategoria(${dat.id})">
                    ${temp}
               </select></div>
                    <div class="TripleInfo"><h4>Cantidad</h4><label>${dat.cantidad}</label><h4>Posicion</h4><label>${dat.posicion}</label></div>
                   <div class="TripleInfo"><h4>Activo</h4><label>${temp2}</label><h4>Codigo Barra</h4><label>${dat.codigobarra}</label></div> 
                   <div class="Descripcion">${dat.descripcion}</div>
                </div>
                
                

                

            </div>
            `
        })} 
        
        `
        }else{
            html=`

            ${this.productos.map((dat,index)=>{
    
                if(dat.idcategoria==undefined){
                    temp=` 
                    <option value="0">Sin Categoria</option>
                    ${this.categorias.map(dat2=>{
                        
                        return `<option value="${dat2.id}">${dat2.nombre}</option>`
                    })}`
                }else{
                    temp=` 
                    <option value="${dat.idcategoria.id}">${dat.idcategoria.nombre}</option>
                    ${this.categorias.map(dat2=>{
                        if(dat2.id==dat.idcategoria.id){
                            return``
                        }
                        return `<option value="${dat2.id}">${dat2.nombre}</option>`
                    })}`
                }
                if(dat.Activo==1){
                    temp2=`<input onchange="adminequipos.alternarvisibilidad(${dat.id},0)" type="checkbox" checked>`
                }else{
                    temp2=`<input onchange="adminequipos.alternarvisibilidad(${dat.id},1)" type="checkbox">`
                }
                return`<div class="Item">
                <div class="Oculto"><h2>Editar</h2><button class="BotonNormal" ><label for="Archivo-${dat.id}">Cambiar Portada</label></button><input id="Archivo-${dat.id}" onchange="adminequipos.subir2(${dat.id})" type="file" style="visibility:hidden;"><button class="BotonNormal" onclick="adminequipos.abrireditarproducto(${index})">Editar Equipo</button><button class="BotonNormal" onclick="adminequipos.eliminarproductocra(${dat.id})">Eliminar</button></div>
                
                <img class="Imagen" src="/mediafiles/${dat.imagen}">
    
                    <div class="Informacion">
                    
                        <div class="Titulo" ><h4>Titulo</h4><label>${dat.nombre}</label></div>
                        <div class="TripleInfo"><h4>Categoria</h4><select id="S${dat.id}" onchange="adminequipos.editarcategoria(${dat.id})">
                            ${temp}
                       </select><h4>Cantidad</h4><label>${dat.cantidad}</label><h4>Posicion</h4><label>${dat.posicion}</label></div>
                       <div class="TripleInfo"><h4>Activo</h4><label>${temp2}</label><h4>Codigo Barra</h4><label>${dat.codigobarra}</label><h4></h4><label></label></div> 
                       <div class="Descripcion">${dat.descripcion}</div>
                    </div>
                    
                    
    
                    
    
                </div>
                `
            })} 
            
            `
        }
        
        

        $("#Tabla").html(html)

    }
    abrireditarproducto(x){
        const html=`
        <div id="Contenido">
        <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
        <h2>Editar Equipo</h2>
        <label>Nombre</label>
        <input type="text" id="Titulo" value="${this.productos[x].nombre}">

        <label>Cantidad</label>
        <input type="number" id="Cantidad" value="${this.productos[x].cantidad}">

        <label>Descripcion</label>
        <textarea id="Descripcion" >${this.productos[x].descripcion}</textarea>

        <label>Posicion</label>
        <input type="text" id="Posicion" value="${this.productos[x].posicion}">

        <label>Codigo De Barra(No es la imagen final)</label>
        <img id="ImgBarra">
        <input type="text" id="CodigoBarra" onchange="adminequipos.generarcodigobarra()" placeholder="Agregar texto extra(Opcional)" value="${this.productos[x].codigo}">
        

            <button class="BotonNormal" onclick="adminequipos.editarproductofinal(${this.productos[x].id})">Editar</button>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
        if(this.productos[x].codigo!=""){
            this.generarcodigobarra()
        }
        
    }
    editarproductofinal(x){
        $("#Cargando").show()
        $("#Titulo").val()
        $.ajax({
            url: '/EditarEquipoCRAFinal',
            type: 'POST',
            data: {
                "id":x,
                "tipo":2,
                "titulo":$("#Titulo").val(),
                "cantidad":$("#Cantidad").val(),
                "descripcion":$("#Descripcion").val(),
                "posicion":$("#Posicion").val(),
                "codigobarra":$("#CodigoBarra").val(),
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                adminequipos.cargardatos()
                console.log(data)
                $("#Cargando").hide()
                adminequipos.cerrarventana()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

    }
    async subir2(x){
        $("#Cargando").show()
        console.log("wtf")
        if($(`#Archivo-${x}`).val()==""){
            console.log("wtf2")
           return
        }else{
            console.log("wtf3")

            $("#Cargando").show();
            let files= $(`#Archivo-${x}`)[0].files
            for (let i = 0; i < files.length; i++) {

                let file = files[i];
                let name = $('#name').val();
                let cat_id = $('#category').val();

                await this.uploadimg2(files[i],x)
            }
        }
        

    }

    uploadimg2(file,id){

        return new Promise(function(resolve,reject){

                let form= new FormData()
                form.append("id",id)
                form.append("tipo","3")
                form.append("imagen",file)

                
                $.ajax({
                url: '/EditarEquipoCRAFinal',
                type: 'POST',
                data: form,
                contentType: false,
                processData: false,
                headers: {
                    'X-CSRFToken': TOKEN,
                    
                },
                success: function (datinis) {
                    console.log(datinis)
                    adminequipos.cargardatos()
                    $("#Cargando").hide();
                    
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
                });
            

    })
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
        if(confirm("Esta seguro que desea eliminar?")){
            
        }else{
            return
        }
        $("#Cargando").show()
        let mut=`mutation {
            productocradelete(id: ${x}) {
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
            categoriaproductocra(nombre: "${$("#NombreCategoria").val()}") {
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
            categoriaproductocradelete(id: ${x}) {
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
            JsBarcode("#ImgBarra", "E-"+$("#CodigoBarra").val());
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
                productocramicroedit(id: ${x}, visible: ${y}) {
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
        <button class="BotonNormal" onclick="adminequipos.crearcategoria()">Crear Categoria</button>

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
                        <td><button id="Eliminar" class="BotonRojo" onclick="adminequipos.eliminarcategoria(${dat.id})">Eliminar</button></td>
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
            form.append('operations', `{"query": "mutation ($cantidad: Int, $codigobarra: String, $descripcion: String, $idcategoria: Int, $imagen: Upload, $limitecantidad: Int, $nombre: String, $posicion: String) {productocracreate(cantidad: $cantidad, codigobarra: $codigobarra, descripcion: $descripcion, idcategoria: $idcategoria, imagen: $imagen, limitecantidad: $limitecantidad, nombre: $nombre, posicion: $posicion) {success error}}", "variables": { "cantidad": ${$("#Cantidad").val()} , "codigobarra": "E-${$("#CodigoBarra").val()}", "descripcion" : "${$("#Descripcion").val()}", "idcategoria": ${$("#Categoria").val()}, "imagen": null, "limitecantidad": ${$("#LimiteCantidad").val()} , "nombre": "${$("#Nombre").val()}", "posicion": "${$("#Posicion").val()}" }}`);

            
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


