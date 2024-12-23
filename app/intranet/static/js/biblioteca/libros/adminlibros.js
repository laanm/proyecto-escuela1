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
              isbn
              editorial
              yearedicion
              cursodestinado
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
        let temp2=""
        let html=""
        if(x==true){
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="adminequipos.mostrardatos(false)">Ver Menos</button>`)
        }else{
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="adminequipos.mostrardatos(true)">Ver Mas</button>`)
        }
        
        if($(window).width()<570){
            $("#DivBotones").html(`
                <button class="BotonNormal"><a href="{% url 'RenderLibrosCra' %}"></a>Catalogo</a></button>
                <button class="BotonNormal" onclick="adminequipos.abririmportacion()">Importar</button>
                <button class="BotonNormal" onclick="adminequipos.abrircrearproducto()">Crear Libro</button>
                <button class="BotonNormal" onclick="adminequipos.abrircategorias()">Categorias</button>
            
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
            <div class="Oculto"><h2>Editar</h2><button class="BotonNormal" ><label for="Archivo-${dat.id}">Cambiar Portada</label></button><input id="Archivo-${dat.id}" onchange="adminequipos.subir2(${dat.id})" type="file" style="visibility:hidden;"><button class="BotonNormal" onclick="adminequipos.abrireditarproducto(${index})">Editar libro</button><button class="BotonNormal" onclick="adminequipos.eliminarproductocra(${dat.id})">Eliminar</button></div>
            
            <img class="Imagen" src="/mediafiles/${dat.imagen}">

                <div class="Informacion">
                
                    <div class="Titulo" ><h4>Titulo</h4><label>${dat.nombre}</label></div>
                    <div class="DobleInfo"><h4>Autor</h4><label>${dat.autor}</label><h4>Año</h4><label>${dat.yearedicion}</label></div>
                    <div class="DobleInfo"><h4>Categoria</h4><select id="S${dat.id}" onchange="adminequipos.editarcategoria(${dat.id})">
                        ${temp}
                   </select><h4>Curso</h4><label>${dat.cursodestinado}</label></div>
                   <div class="TripleInfo"><h4>Cantidad</h4><label>${dat.cantidad}</label><h4>Pos</h4><label>${dat.posicion}</label><h4>Activo</h4><label>${temp2}</label></div>
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
            <div class="Oculto"><h2>Editar</h2><button class="BotonNormal" ><label for="Archivo-${dat.id}">Cambiar Portada</label></button><input id="Archivo-${dat.id}" onchange="adminequipos.subir2(${dat.id})" type="file" style="visibility:hidden;"><button class="BotonNormal" onclick="adminequipos.abrireditarproducto(${index})">Editar libro</button><button class="BotonNormal" onclick="adminequipos.eliminarproductocra(${dat.id})">Eliminar</button></div>
            
            <img class="Imagen" src="/mediafiles/${dat.imagen}">

                <div class="Informacion">
                
                    <div class="Titulo" ><h4>Titulo</h4><label>${dat.nombre}</label></div>
                    <div class="TripleInfo"><h4>Autor</h4><label>${dat.autor}</label><h4>Editorial</h4><label>${dat.editorial}</label><h4>Año Edicion</h4><label>${dat.yearedicion}</label></div>
                    <div class="TripleInfo"><h4>Categoria</h4><select id="S${dat.id}" onchange="adminequipos.editarcategoria(${dat.id})">
                        ${temp}
                   </select><h4>Curso</h4><label>${dat.cursodestinado}</label><h4>ISBN/Cod.Barra</h4><label>${dat.isbn}/${dat.codigobarra}</label></div>
                   <div class="TripleInfo"><h4>Cantidad</h4><label>${dat.cantidad}</label><h4>Posicion</h4><label>${dat.posicion}</label><h4>Activo</h4><label>${temp2}</label></div>
                    <div class="Descripcion">${dat.descripcion}</div>
                </div>
            </div>
            `
        })} 
        
        `
        }
        
       
        

        $("#Tabla").html(html)
        $(".InputFile").html("")
    }


    abrireditarproducto(x){
        const html=`
        <button id="Cerrar" onclick="adminequipos.cerrarventana()">X</button>
        <div id="Contenido">
        
            <h2>Editar Libro</h2>
            <label>Nombre</label>
            <input type="text" id="Titulo" value="${this.productos[x].nombre}">

            <label>Autor</label>
            <input type="text" id="Autor" value="${this.productos[x].autor}">

            <label>Editorial</label>
            <input type="text" id="Editorial" value="${this.productos[x].editorial}">

            <label>Año edicion</label>
            <input type="text" id="YearEdicion" value="${this.productos[x].yearedicion}">

            <label>Curso destinado</label>
            <input type="text" id="CursoDestinado" value="${this.productos[x].cursodestinado}">

            <label>Cantidad</label>
            <input type="number" id="Cantidad" value="${this.productos[x].cantidad}">

            <label>Descripcion</label>
            <textarea id="Descripcion" >${this.productos[x].descripcion}</textarea>

            <label>Posicion</label>
            <input type="text" id="Posicion" value="${this.productos[x].posicion}">

            <label>Codigo De Barra(No es la imagen final)</label>
            <img id="ImgBarra">
            <input type="text" id="CodigoBarra" onchange="adminequipos.generarcodigobarra()" placeholder="Agregar texto extra(Opcional)" value="${this.productos[x].codigo}">
            
            <label>ISBN</label>
            <input type="text" id="ISBN" value="${this.productos[x].isbn}">


            <button class="BotonNormal" onclick="adminequipos.editarlibro(${this.productos[x].id})">Editar</button>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
        if($("#CodigoBarra").val()!=""){
            this.generarcodigobarra()
        }
        
    }

    editarlibro(x){
        $("#Cargando").show()
        $("#Titulo").val()
        $.ajax({
            url: '/EditarLibrosCRAFinal',
            type: 'POST',
            data: {
                "id":x,
                "tipo":2,
                "titulo":$("#Titulo").val(),
                "autor":$("#Autor").val(),
                "cantidad":$("#Cantidad").val(),
                "descripcion":$("#Descripcion").val(),
                "posicion":$("#Posicion").val(),
                "codigobarra":$("#CodigoBarra").val(),
                "isbn":$("#ISBN").val(),
                "cursodestinado":$("#CursoDestinado").val(),
                "yearedicion":$("#YearEdicion").val(),
                "editorial":$("#Editorial").val(),
                

                
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
    editarcategoria(x){
        $("#Cargando").show()
        console.log($(`#S${x}`).val())
        console.log(x)
        $.ajax({
            url: '/EditarLibrosCRAFinal',
            type: 'POST',
            data: {
                "id":x,
                "tipo":1,
                "idcategoria":$(`#S${x}`).val(),
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                adminequipos.cargardatos()
                console.log(data)
                $("#Cargando").hide()
                
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
                url: '/EditarLibrosCRAFinal',
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

    async subircrear(){
        $("#Cargando").show()
        console.log("wtf")
        if($(`#Archivo`).val()==""){
            console.log("wtf2")
           return
        }else{
            console.log("wtf3")

            $("#Cargando").show();
            let files= $(`#Archivo`)[0].files
            for (let i = 0; i < files.length; i++) {

                let file = files[i];
                let name = $('#name').val();
                let cat_id = $('#category').val();

                await this.uploadcrear(files[i])
            }
        }
        

    }

    uploadcrear(file){

        return new Promise(function(resolve,reject){

                let form= new FormData()
                form.append("titulo",$("#Titulo").val())
                form.append("autor",$("#Autor").val())
                form.append("idcategoria",$("#Categoria").val())
                form.append("cantidad",$("#Cantidad").val())
                form.append("descripcion",$("#Descripcion").val())
                form.append("posicion",$("#Posicion").val())
                form.append("codigobarra",$("#CodigoBarra").val())
                form.append("isbn",$("#ISBN").val())
                form.append("cursodestinado",$("#CursoDestinado").val())
                form.append("yearedicion",$("#YearEdicion").val())
                form.append("editorial",$("#Editorial").val())
                form.append("imagen",file)

                
                $.ajax({
                url: '/CrearLibroFinal',
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
                    adminequipos.cerrarventana()
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

        if(confirm("Esta seguro que desea eliminar?")){
            
        }else{
            return
        }
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
            <h2>Crear Libro</h2>
            <label>Nombre</label>
            <input type="text" id="Titulo">

            <label>Autor</label>
            <input type="text" id="Autor">

            <label>Editorial</label>
            <input type="text" id="Editorial">

            <label>Año edicion</label>
            <input type="text" id="YearEdicion">

            <label>Curso destinado</label>
            <input type="text" id="CursoDestinado">


            <label>Categoria</label>
            <select id="Categoria">
                ${this.categorias.map(dat=>{

                    return `<option value="${dat.id}">${dat.nombre}</option> `
                })}
                
            </select>

            <label>Imagen</label>
            <input type="file" id="Archivo">

            <label>Cantidad</label>
            <input type="number" id="Cantidad" min="0" value="0">

            <label>Descripcion</label>
            <textarea id="Descripcion" ></textarea>


            <label>Posicion</label>
            <input type="text" id="Posicion">

            <label>Codigo De Barra(No es la imagen final)</label>
            <img id="ImgBarra">
            <input type="text" id="CodigoBarra" onchange="adminequipos.generarcodigobarra()" placeholder="Agregar texto extra(Opcional)">

            <label>ISBN</label>
            <input type="text" id="ISBN">

            <button class="BotonNormal" onclick="adminequipos.subircrear()">Crear Libro</button>
        </div>
        `

        
        
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
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
            <img src="/mediafiles/${this.productos[x].imagen}" >
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

    abririmportacion(){
        let html;


            html=`
            <h1>Importar Libros</h1>
            <a href="/static/excel/ImportLibros.xlsx" download>Plantilla excel</a>
            
            <h2>Archivo a importar</h2>
            <input type="file" id="Excel">
            <p>Los libros agregados estaran invisibles por defecto</p>
            <button onclick="adminequipos.importar()">Importar Usuarios</button>`

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
        
        
        contenido.splice(0,1)

        
        $.ajax({
            url: '/ImportacionLibrosMasivo',
            type: 'POST',
            data: {
                "datinis":JSON.stringify(contenido),
                

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                $("#Cargando").hide()
                console.log(data)
                adminequipos.cargardatos()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });

        
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        
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


