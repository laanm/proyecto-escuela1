class javanoticias{

    constructor(){

        this.noticias=[]
        this.cargardatos()
        $("#InfoNoticia").hide()
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
        if(window.innerWidth<768){
            $("#DivNoticias").hide()
        }
        let html=`
                
               
            ${this.noticias.map((dat,index)=>{
                if(window.innerWidth<768){
                    return `
                    <div class="Items" onclick="noticias.abrirventana(${index})">
                       
                        <img id="NoticiaImagen" src="/mediafiles/${dat.portada}">
                        <div class="Contenido">
                            <h2>${dat.titulo}</h2>
                            <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                            <p id="NoticiaEncabezado">${dat.encabezado}</p>
                        </div>
                        
    
                    </div>`

                }
                if(index==0){
                    $("#FNoticia").html(`<div class="Items" onclick="noticias.abrirventana(${index})" >
                   
                    <img id="NoticiaImagen" src="/mediafiles/${dat.portada}">
                    <div class="ContF">
                        <h2>${dat.titulo}</h2>
                        <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                        <p id="NoticiaEncabezado">${dat.encabezado}</p>
                    </div>
                </div>`)
                    return
                }else if(index==1){
                    $("#SNoticia").html(`<div class="Items" onclick="noticias.abrirventana(${index})" >
                   
                    <img id="NoticiaImagen" src="/mediafiles/${dat.portada}">
                        <div class="Cont">
                            <h3>${dat.titulo}</h3>
                            <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                            <p id="NoticiaEncabezado">${dat.encabezado}</p>
                        </div>
                    </div>`)
                    return
                }else if(index==2){
                    $("#TNoticia").html(`<div class="Items">
                   
                    <img id="NoticiaImagen" src="/mediafiles/${dat.portada}">
                    <div class="Cont">
                        <h3>${dat.titulo}</h3>
                        <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                        <p id="NoticiaEncabezado">${dat.encabezado}</p>
                    </div>
                    

                    </div>`)
                    return
                }

                return `
                <div class="Items" onclick="noticias.abrirventana(${index})">
                   
                    <img id="NoticiaImagen" src="/mediafiles/${dat.portada}">
                    <div class="Contenido">
                        <h2>${dat.titulo}</h2>
                        <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                        <p id="NoticiaEncabezado">${dat.encabezado}</p>
                    </div>
                    

                </div>`
            }).join("")}
            
        `
        $("#DivNoticiasLista").html(html)
    }

    abrirventana(x){
        const html=`
        <button id="Cerrar" onclick="noticias.cerrarventana()">X</button>
        <div>${this.noticias[x].titulo} ${this.solofecha(this.noticias[x].fecha)}</div>
        <img id="ImagenInfo" src="/mediafiles/${this.noticias[x].portada}">
        <div id="Contenido">${this.noticias[x].contenido.replaceAll("/n","")}</div>
        `

        $("#DivNoticias").hide()
        $("#DivNoticiasLista").hide()
        $("#InfoNoticia").show()
        
        
        $("#InfoNoticia").html(html)
        
    }
    cerrarventana(){
        if(window.innerWidth>768){
            $("#DivNoticias").show()
        }
        $("#InfoNoticia").hide()
        
        $("#DivNoticiasLista").show()
        
    }
    solofecha(x){

        const time= new Date(x)
        return `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
      
      }


}