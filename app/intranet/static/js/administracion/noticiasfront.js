class javanoticiasfront{

    constructor(x){

        console.log("uwu")
        this.fechareal;
        this.contenido="";
        this.idusuario=x;
        this.noticias=[];
        $("#Cargando").hide();
        this.cargardatos();

        
    }

    cargardatos(){
        $("#Cargando").show()
        let query2=`query _allNoticiasfront_id654 {
            allNoticiasfront {
              id
              titulo
              portada
              encabezado
              contenido
              fecha
              creador {
                id
                user
                email
              }
              orden
              activo
            }
          }`

          axios.post("/graphql/",{
            query:query2
          })
          .then(response=>{
            this.noticias=response.data.data.allNoticiasfront;
            $("#Titulo").val=""
            $("#Encabezado").val=""
            $("#Imagen").val=""
            
            this.mostrardatos()
            $("#Cargando").hide()
          })
          .catch(error=>{
            console.log(error)
            $("#Cargando").hide()
          })


    }

    mostrardatos(){

        let html=`


            ${this.noticias.map((dat,index)=>{
                console.log(dat.activo)
                let x=""
                if(dat.activo==true){
                    x="checked"
                }

                return `
                    <div class="Item">
                    <div class="Oculto"><h2>Editar</h2><button class="BotonNormal" ><label for="Archivo-${dat.id}">Cambiar Portada</label></button><input id="Archivo-${dat.id}" onchange="noticiasfront.subir2(${dat.id})" type="file" style="visibility:hidden;"></div>
                        <img class="Imagen" src="/mediafiles/${dat.portada}">
                        <div class="Informacion">
                            <div class="Titulo" ><h4>Titulo</h4><label>${dat.titulo}</label></div>
                            <div class="Titulo" ><h4>Encabezado</h4><label>${dat.encabezado}</label></div>
                            <div class="Titulo" ><h4>Autor</h4><label>${dat.creador.user}</label></div>
                            <div class="Titulo" ><h4>Fecha</h4><label>${dat.fecha.replaceAll("T"," ")}</label></div>
                            <div class="Titulo" ><h4>Activo</h4><label><input type="checkbox" ${x} onchange="noticiasfront.cambiaractivo(${dat.id},${dat.activo})"></label></div>
                            <div class="Botoneras"><button class="BotonSmall" onclick="noticiasfront.vercontenido(${index})">Ver Contenido</button><button class="BotonSmall" onclick="noticiasfront.editarventana(${index})">Editar</button><button class="BotonRojo" onclick="noticiasfront.eliminar(${dat.id})">Eliminar</button></div>

                        </div>
                    </div>
                `

            })}

        `
            $("#divTablaNoticias").html(html);
           
            
    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        $("#BotonCrear").remove()
        $("#Cargando").hide()
        $(".preloader").show()
        
    }
    vercontenido(x){
            $("#Separador").html(`<h2>${this.noticias[x].titulo}</h2>`)
            tinymce.activeEditor.setContent(this.noticias[x].contenido)
            $("#Ventana").addClass("AbrirVentana").removeClass("CerrarVentana");

    }
    crearventana(){
        let html;

        console.log("ekisde?")

            html=`
            
            
                <div id="etc">
                <label>Titulo</label>
                <input id="Titulo" type="text">
                <label>Encabezado</label>
                <input id="Encabezado" type="text">
                <label>Portada (img)</label>
                <input id="Archivo" type="file" accept="image/*">
 
                
            
            `


            $("#Separador").html(html)
            $(".tox").after(`<button class="BotonNormal" id="BotonCrear" onclick="noticiasfront.subir()">Crear Noticia</button>`)
            $("#Ventana").addClass("AbrirVentana").removeClass("CerrarVentana");
            $("#Cargando").show()
            $(".preloader").hide()


            
        
    }


    editarventana(x){
        let html;

        

            html=`
            
                <div id="etc">
                <label>Titulo</label>
                <input id="Titulo" type="text" value="${this.noticias[x].titulo}">
                <label>Encabezado</label>
                <input id="Encabezado" type="text" value="${this.noticias[x].encabezado}">                
                </div>
            
            
                
            `
            tinymce.activeEditor.setContent(this.noticias[x].contenido)
            $("#Separador").html(html)
            $(".tox").after(`<button class="BotonNormal" id="BotonCrear" onclick="noticiasfront.editarnoticia(${this.noticias[x].id})">Editar Noticia</button>`)
            $("#Ventana").addClass("AbrirVentana").removeClass("CerrarVentana");
            $("#Cargando").show()
            $(".preloader").hide()
            
            
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
                form.append("imagen",file)

                
                $.ajax({
                url: '/editarportadanoticia',
                type: 'POST',
                data: form,
                contentType: false,
                processData: false,
                headers: {
                    'X-CSRFToken': TOKEN,
                    
                },
                success: function (datinis) {
                    console.log(datinis)
                    noticiasfront.cargardatos()
                    $("#Cargando").hide();
                    
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
                });
            

    })
    }


    async editarnoticia(x){
        $("#Cargando").show()
        
        if($("#Archivo")[0].files.length==0){
            await this.editarnoticiaimg(null,x)
            return
        }
        let files= $("#Archivo")[0].files
        for (let i = 0; i < files.length; i++) {

            let file = files[i];
            let name = $('#name').val();
            let cat_id = $('#category').val();

            await this.editarnoticiaimg(files[i],x)
        }
    }

    editarnoticiaimg(file,id){


        return new Promise(function(resolve,reject){

            
            let form= new FormData()
            form.append("file",file)
            form.append("id",id)
            form.append("titulo",$("#Titulo").val())
            form.append("contenido",tinymce.activeEditor.getContent())
            form.append("encabezado",$("#Encabezado").val())
            
            $.ajax({
            url: '/editarnoticia',
            type: 'POST',
            data: form,
            contentType: false,
            processData: false,
            headers: {
                'X-CSRFToken': TOKEN,
                
            },
            success: function (datinis) {
                console.log(datinis)
                resolve(datinis)
                noticiasfront.cerrarventana()
                noticiasfront.cargardatos()
               
            },
            error: function (data) {
                $("#Cargando").hide()
            }
            });
        })
        
    }

    async subir(){
        
        if($("#Titulo").val()==""  || $("#Archivo").val()==""){
            Swal.fire({
                        icon: 'error',
                        title: 'Campos Faltantes',
                        text: 'Debes ingresar los datos faltantes',
                    })
        }else{
            
            $("#BotonCrear").prop( "disabled", true );
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
            $("#Cargando").show();
            this.contenido=tinymce.activeEditor.getContent()
            
            
            let files= $("#Archivo")[0].files
            for (let i = 0; i < files.length; i++) {

                let file = files[i];
                let name = $('#name').val();
                let cat_id = $('#category').val();

                await this.uploadimg(files[i])
            }
        }
        

    }

    uploadimg(file){

        return new Promise(function(resolve,reject){

            
            
            noticiasfront.recalcularfecha();
            let interno=0

            if($("#Interno").is(':checked')){
                interno=2
            }else{
                interno=1
            }
            

            
                let form= new FormData()
                form.append("file",file)
                form.append("titulo",$("#Titulo").val())
                form.append("contenido",tinymce.activeEditor.getContent())
                form.append("encabezado",$("#Encabezado").val())
                form.append("fecha",noticiasfront.fechareal)
                form.append("interno",2)
                form.append("creador",noticiasfront.idusuario)
                
                $.ajax({
                url: '/crearnoticia',
                type: 'POST',
                data: form,
                contentType: false,
                processData: false,
                headers: {
                    'X-CSRFToken': TOKEN,
                    
                },
                success: function (datinis) {
                    console.log(datinis)
                    resolve(datinis)
                    noticiasfront.cerrarventana()
                    noticiasfront.cargardatos()
                    $("#BotonCrear").prop( "disabled", false );
                    $("#Cargando").hide();
                    
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
                });
            

        })
        
    }

    cambiaractivo(id,actual){
        $("#Cargando").show()

        console.log(id)
        $.ajax({
            url: '/editaractivonoticia',
            type: 'POST',
            data: {
                
                id:id,

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                noticiasfront.cargardatos()
                
            },
            error: function (data) {
               
            }
        });
    }
    eliminar(id){
        if(confirm("Esta seguro que desea eliminar?")){
            
        }else{
            return
        }
        $("#Cargando").show()
        let mut=`mutation mutation_noticiasfro910 {
            noticiasfrontdelete(id: ${id}) {
              success
              error
            }
          }
          `
          console.log(id)
          axios.post("/graphql/",{
            query:mut

          }).then(response=>{
            this.cargardatos()
          }).catch(error=>{
            console.log(error)
          })
    }
    recalcularfecha(){
        var fecha=new Date();
        this.fechareal=`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    }

}