class javanoticias{

    constructor(){

        this.noticias=[]
        this.cargardatos()
        
    }




    cargardatos(){
        $("#Cargando").show()
        let query=`{
            noticiasInternas {
                id
                titulo
                portada
                encabezado
                contenido
                fecha
            }
          }`

          axios.post("/graphql/",{
            query:query
        }).then(response=>{

            this.noticias=response.data.data.noticiasInternas
            this.mostrardatos()
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }

    mostrardatos(){
        let xd=""
        let xd2=""
        if($(window).width()<700){
            xd=""
        }else{
            xd="<div class='OverFlow'>"
            xd2="</div>"
        }
        let html=`
                
                ${xd}
            ${this.noticias.map((dat,index)=>{
                if(dat.activo==false){
                    return
                }
                let x=""
                if(dat.titulo.length>=20){
                  x=`<div class="NoticiaTitulo"><p id="efectotexto">${dat.titulo}</p></div>`
                }else{
                  x=`<div class="NoticiaTitulo"><p id="noefectotexto">${dat.titulo}</p></div>`

                }
                return `
                <div class="Contenedor" onclick="noticias.abrirventana(${index})">
                    ${x}
                    <img id="NoticiaImagen" src="/mediafiles/${dat.portada}" width="300" height="400">
                    <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                    <p id="NoticiaEncabezado">${dat.encabezado}</p>

                </div>`
            }).join("")}
            ${xd2}
        `
        $("#DivNoticias").html(html)
    }

    abrirventana(x){
        const html=`
        <div id="Contenido">
        <button id="Cerrar" onclick="noticias.cerrarventana()">X</button>
        <h1>${this.noticias[x].titulo}</h1>
            <div id="DivImagen">

            <textarea id="texto">
                ${this.noticias[x].contenido}
            </textarea>

            </div>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
        tinymce.init({
            selector: '#texto',
           
            
            language: 'es',
            menubar: 'help',
            toolbar: false
            
        });
    }
    solofecha(x){

        const time= new Date(x)
        return `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
      
      }
      cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        tinymce.remove("#texto")
        
    }

}