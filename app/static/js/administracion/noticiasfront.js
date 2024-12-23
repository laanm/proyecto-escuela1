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

            <tr>
                <th>Titulo</th>
                <th>Portada</th>
                <th>Encabezado</th>
                <th>Contenido</th>
                <th>Fecha</th>
                <th>Creador</th>
                <th>Activo</th>
                <th>Accion</th>

            </tr>

            ${this.noticias.map((dat,index)=>{
                console.log(dat.activo)
                let x=""
                if(dat.activo==true){
                    x="checked"
                }
                return `
                <tr>
                    <td>${dat.titulo}</td>
                    <td><a href="/mediafiles/${dat.portada}">${dat.portada}</a></td>
                    <td>${dat.encabezado}</td>
                    <td><button onclick="noticiasfront.vercontenido(${index})">Ver Contenido</button></td>
                    <td>${dat.fecha.replaceAll("T"," ")}</td>
                    <td>${dat.creador.user}</td>
                    <td><input type="checkbox" ${x} onchange="noticiasfront.cambiaractivo(${dat.id},${dat.activo})"></td>
                    <td><button onclick="noticiasfront.eliminar(${dat.id})">Eliminar</button><button onclick="noticiasfront.editarventana(${index})">Editar</button></td>

                </tr>
                `

            })}

        `
            $("#Tablauwu").html(html);
           
            
    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
        tinymce.remove("#contenido")
    }
    vercontenido(x){
        let html;

        console.log("ekisde?")

            html=`<button onclick="noticiasfront.cerrarventana()">X</button>
            <div id="Separador">
                
                <textarea id="contenido" readonly>
                    ${this.noticias[x].contenido}
                </textarea>
                 
                </div>
            
            
            
            </div>`


            
                    
               
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            tinymce.init({
                        selector: '#contenido',
                        language: 'es',
                        menubar: false,
                        plugins: 'noneditable'
                    });
        
    }
    crearventana(){
        let html;

        console.log("ekisde?")

            html=`
            <button onclick="noticiasfront.cerrarventana()">X</button>
            <div id="Separador">
                <div id="etc">
                <label>Titulo</label>
                <input id="Titulo" type="text">
                <label>Encabezado</label>
                <input id="Encabezado" type="text">
                <label>Noticia Interna</label>
                <input type="checkbox" id="Interno">
                <label>Portada (img)</label>
                <input id="Archivo" type="file" accept="image/*">
                <textarea id="contenido">
            
                </textarea>
                <button class="CrearPeticion2" id="BotonCrear" onclick="noticiasfront.subir()">Crear Noticia</button>

                </div>
            
            
            
            </div>`


            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            tinymce.init({
                        selector: '#contenido',
                        language: 'es',
                        contenteditable: false,
                        menubar: false
                        
            });

            
        
    }


    editarventana(x){
        let html;

        console.log("ekisde?")

            html=`
            <button onclick="noticiasfront.cerrarventana()">X</button>
            <div id="Separador">
                <div id="etc">
                <label>Titulo</label>
                <input id="Titulo" type="text" value="${this.noticias[x].titulo}">
                <label>Encabezado</label>
                <input id="Encabezado" type="text" value="${this.noticias[x].encabezado}">
                <label>Noticia Interna</label>
                <input type="checkbox" id="Interno">
                <label>Portada (img)</label>
                <input id="Archivo" type="file" accept="image/*">
                <textarea id="contenido">
                ${this.noticias[x].contenido}
                </textarea>
                    <button class="CrearPeticion2" id="BotonCrear" onclick="noticiasfront.editarnoticia(${this.noticias[x].id})">Editar Noticia</button>
                </div>
            
            
                
            </div>`


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
            
            
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            tinymce.init({
                        selector: '#contenido',
                        language: 'es',
                        contenteditable: false,
                        menubar: false
                        
            });

            
            
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
        
        if($("#Titulo").val()=="" || $("#Encabezado").val()=="" || $("#Archivo").val()==""){
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
                form.append("interno",interno)
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
        let x;
        console.log(actual)
        if(actual){
            x=false
        }else{
            x=true
        }
        console.log(id)
        let mut=`mutation {
            noticiasfrontedit(
              activo: ${x}
              contenido: ""
              encabezado: ""
              fecha: ""
              id: ${id}
            ) {
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
    eliminar(id){
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