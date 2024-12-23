class javaadminpedidos{

    constructor(x){
        this.idusuario=x
        this.productos=[]
        this.categorias=[]
        this.cargardatos()
        $("#Buscador").keyup(function(){
            adminpedidos.mostrardatos()
        })
    }

    limpiar(){
        $("#Buscador").val("")
    }
    cargardatos(){

        $.ajax({
            url: '/PeticionesEquipoCRA',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                adminpedidos.productos=data
                adminpedidos.mostrardatos()
                $("#Cargando").hide()
            },
            error: function (data) {
               
            }
        });
    }

    mostrardatos(){
        let estado=""
        let temp=""
        let html=`
            <tr>
                <th>N Solicitud</th>
                <th>Estado</th>
                <th>Profesor</th>
                <th>nombre</th>
                <th>categoria</th>
                <th>cantidad</th>
                <th>Fecha Pedida</th>
                <th>imagen</th>
                <th>Cod.Barra</th>
                <th>Accion</th>
            </tr>

            ${this.productos.map(dat=>{
                
                if(dat.estado==1){
                    estado="Pedido"
                }else if(dat.estado==2){
                    estado="Entregado"
                }else if(dat.estado==3){
                    estado="Devuelto"
                }

                if($("#SelectBuscador").val()==1){
                    if(dat.nombrelibro.toLowerCase().includes($("#Buscador").val())){

                    }else{
                        return
                    }
                }else if($("#SelectBuscador").val()==3){
                    temp=$("#Buscador").val().split("-")
                    console.log(temp[1])
                    if(dat.codigobarra.includes(temp[1])){

                    }else{
                        return
                    }
                }else if ($("#SelectBuscador").val()==2){
                    if(dat.idprofesor.user.toLowerCase().includes($("#Buscador").val())){

                    }else{
                        return
                    }
                }
                let nombre=""
                if(dat.nombreprofesor=="-"){
                    nombre=dat.nombrealumno
                }else{
                    nombre=dat.nombreprofesor+"(Profesor)"
                }
                return `
                    <tr>
                        <td>${dat.id}</td>
                        <td>${estado}</td>
                        <td>${nombre}</td>
                        <td>${dat.nombrelibro}</td>
                        <td>${dat.categoria}</td>
                        <td>${dat.cantidad}</td>
                        <td>${this.solofecha(dat.fechapeticion)}</td>
                        <td><button onclick="adminpedidos.abririmagen('${dat.imagen}')">img</button></td>
                        <td>${dat.codigobarra}</td>
                        <td><button onclick="adminpedidos.productoentregado(2,${dat.id})">Entregado</button><button onclick="adminpedidos.productoentregado(3,${dat.id})">Devuelto</button></td>


                    </tr>
                
                `
            })}

        
        `

        $("#Tabla").html(html)

    }

    productoentregado(x,y){
        $("#Cargando").show()
        let mut=`mutation {
            peticionproductoedit(estado: ${x}, id: ${y}) {
              success
              error
            }
          }
          `

          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            
            this.cargardatos()
            $("#Cargando").hide()
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

            <label>Codigo De Barra</label>
            <input type="text" id="CodigoBarra">

            <button onclick="adminequipos.crearproducto()">Crear Producto!</button>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
    }


    solofecha(x){

        const ekisde=x.split("T")

        return `${ekisde[0]}`

    }

}
