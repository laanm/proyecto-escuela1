class javaindex{

    constructor(){
        this.noticias=[];
        this.cargardatos();
        $("#Ventana").hide();
        
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
            this.mostrardatos()
          })
          .catch(error=>{
            console.log(error)
          })


    }

    mostrardatos(){

        let html=`

            ${this.noticias.map(dat=>{
              if(dat.activo==true){
                   let x=""
                    if(dat.titulo.length>=20){
                      x=`<div id="NoticiaTitulo"><p id="efectotexto">${dat.titulo}</p></div>`
                    }else{
                      x=`<div id="NoticiaTitulo"><p id="noefectotexto">${dat.titulo}</p></div>`

                    }

                    return `
                    
                    <div id="Contenedor" onclick="index.abrirventana('${dat.titulo}','${dat.portada}','${dat.contenido.replaceAll(",","x-x").replaceAll("(","c-c").replaceAll(")","v-v").replaceAll("'","b-b")}','${dat.fecha}','${dat.encabezado}','${dat.creador.user}')">
                        ${x}
                        <img id="NoticiaImagen" src="/mediafiles/${dat.portada}" width="300" height="400">
                        <p id="NoticiaFecha">${this.solofecha(dat.fecha)}</p>
                        <p id="NoticiaEncabezado">${dat.encabezado}</p>
                        
                        
                        
                        

                    </div>
                    
                    `
              }else{
                return ``
              }
                

            }).join("")}

        `
            $("#ContenedorNoticias").html(html);
    }

abrirventana(titulo,portada,contenido,fecha,encabezado,creador){
  
  console.log("hasta aqui bien xd")
  let html=`
    <button onclick="index.cerrarventana()">X</button>
    
    <h1>${titulo}</h1>
    <div id="DivImagen">

      
      <img src="/mediafiles/${portada}">
      
      <div >
          <p>${contenido.replaceAll("/n","<br>").replaceAll("x-x",",").replaceAll("c-c","(").replaceAll("v-v",")").replaceAll("b-b","'")}</p>
      </div>

    </div>
   
    `
    $("#Ventana").html(html)
    $("#Ventana").show().removeClass("VentanaCerrar").addClass("VentanaAbrir")
  

}
cerrarventana(){
  $("#Ventana").addClass("VentanaCerrar").removeClass("VentanaAbrir")
}
solofecha(x){

  const time= new Date(x)
  return `${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`

}

}
