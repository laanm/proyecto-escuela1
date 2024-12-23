class javaequipos{


    constructor(x){
        this.idusernormal=x
        this.iduser=x
        this.productos=[]
        this.categorias=[]
        this.pedidos=[]
        this.categoriaactual=0
        $("#Cargando").show()
        this.cargardatos()
        $("#Buscador").keyup(function(){
            equipos.busqueda(equipos.categoriaactual)
        })
    }

    cargardatos(){

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
            allPeticionesproductocra {
                id
                estado
                cantidad
                idproducto {
                  id
                }
            }
          }
          `


        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
           
            this.productos=response.data.data.allProductoscra
            this.categorias=response.data.data.allCategoriasproductoscra
            this.pedidos=response.data.data.allPeticionesproductocra
            this.mostrardatos()
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    
    busqueda(x){
        $("#Actual-"+this.categoriaactual).removeClass("Actual")
        this.categoriaactual=x
        $("#Actual-"+this.categoriaactual).addClass("Actual")
        let cantidad=0
        let cantidadpedidas=0
        let temp=""
        let html=`
        
            ${this.productos.map(dat=>{
                if(dat.Activo==0){
                    return
                }
                cantidad=dat.cantidad
                if(dat.idcategoria.id!= x && x!= 0){
                    return
                }
                this.pedidos.forEach(dat2=>{
                    
                    if(dat2.idproducto.id==dat.id){
                        cantidad-=dat2.cantidad
                    }

                })
                if($("#SelectBuscador").val()==1){
                    if(dat.nombre.toLowerCase().includes($("#Buscador").val().toLowerCase()) || $("#Buscador").val()==""){

                    }else{
                        return
                    }
                }else if($("#SelectBuscador").val()==2 || $("#Buscador").val()==""){
                    temp=$("#Buscador").val().split("-")
                    console.log(temp[1])
                    if(dat.codigobarra.includes(temp[1])){

                    }else{
                        return
                    }
                }
                

                if(cantidad<=0){
                    return `
                                <div class="Item-Equipos">
                                    <label>${dat.nombre}</label>
                                    <div class="Imagen" style="background-image: url('/mediafiles/${dat.imagen}'); filter: grayscale(100%);"></div>
                                    
                                    <label class="NoDisponible">No Disponible</label>
                                </div>
                            `
                }else{
                    return `
                                <div class="Item-Equipos" onclick="equipos.pedirequipo(${dat.idcategoria.id},${dat.id})">
                                    <label>${dat.nombre}</label>
                                    <div class="Imagen" style="background-image: url('/mediafiles/${dat.imagen}')"></div>
                                    
                                    <label class="Disponible">Disponible(${cantidad})</label>
                                </div>
                            `
                }

                

            }).join("")}
        
        `


        $("#Equipos").html(html)
    }
    mostrardatos(){
        let cantidad=0
        let cantidadpedidas=0
        let temp=""
        let html=`
        
            ${this.productos.map(dat=>{
                if(dat.Activo==0){
                    return
                }
                cantidad=dat.cantidad

                this.pedidos.forEach(dat2=>{
                    
                    if(dat2.idproducto.id==dat.id){
                        cantidad-=dat2.cantidad
                    }

                })

                if(cantidad<=0){
                    return `
                                <div class="Item-Equipos">
                                    <label>${dat.nombre}</label>
                                    <div class="Imagen" style="background-image: url('/mediafiles/${dat.imagen}'); filter: grayscale(100%);"></div>
                                    
                                    <label class="NoDisponible">No Disponible</label>
                                </div>
                            `
                }else{
                    return `
                                <div class="Item-Equipos" onclick="equipos.pedirequipo(${dat.id})">
                                    <label>${dat.nombre}</label>
                                    <div class="Imagen" style="background-image: url('/mediafiles/${dat.imagen}')"></div>
                                    
                                    <label class="Disponible">Disponible(${cantidad})</label>
                                </div>
                            `
                }

                

            }).join("")}
        
        `

        let html2=`
        <button class="BotonesCategoria Actual" id="Actual-0" onclick="equipos.busqueda(0)">Todos</button>
            ${this.categorias.map(dat=>{

                return `  
                
                    <button class="BotonesCategoria" id="Actual-${dat.id}" onclick="equipos.busqueda(${dat.id})">${dat.nombre}</button>
                `
            }).join("")}
        
        `
        $("#Categorias").html(html2)
        $("#Equipos").html(html)
    }
    
    pedirequipo(z){

        if(confirm("¿Desea Pedir Equipo?")){
            
            $.ajax({
                url: '/CrearPeticionesEquiposCRA',
                type: 'POST',
                data: {
                    "idproducto": z,
                    "idprofesor": this.iduser,
                    
                    
                },
                headers: {
                    'X-CSRFToken': TOKEN
                },
                success: function (data) {
                    console.log(data)
                    if(data=="No Disponible"){
                        Swal.fire({
                            icon: 'error',
                            title: 'Equipo No Disponible',
                            text: 'No queda stock del equipo.',
                            })
                    }else{
                        Swal.fire({
                        icon: 'success',
                        title: 'Equipo Pedido',
                        text: 'En su historial podra ver el estado de su peticion.',
                        })
                    }
                    
                    equipos.cargardatos()
                    $("#Cargando").hide()
                },
                error: function (data) {
                   
                }
                });
        }


    }

}