class javamisequipos{

    constructor(x){
        this.idusuario=x
        this.productos=[]
        this.categorias=[]
        this.cargardatos()

    }

    cargardatos(){

        $.ajax({
            url: '/MisPeticionesProductosCRA',
            type: 'POST',
            data: {
                
                "idprofesor":this.idusuario
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                misequipos.productos=data
                misequipos.mostrardatos()
                $("#Cargando").hide()
            },
            error: function (data) {
               
            }
        });
    }

    mostrardatos(){
        let estado=""
        let html=`
            <tr>
                <th>N Solicitud</th>
                <th>Estado</th>
                <th>nombre</th>
                <th>categoria</th>
                <th>cantidad</th>
                <th>imagen</th>

            </tr>

            ${this.productos.map(dat=>{
                
                if(dat.estado==1){
                    estado="Pedido"
                }else if(dat.estado==2){
                    estado="Entregado"
                }else if(dat.estado==3){
                    estado="Devuelto"
                }

                return `
                    <tr>
                        <td>${dat.id}</td>
                        <td>${estado}</td>
                        <td>${dat.nombreequipo}</td>
                        <td>${dat.categoria}</td>
                        <td>${dat.cantidad}</td>
                        <td><button>img</button></td>


                    </tr>
                
                `
            })}

        
        `

        $("#Tabla").html(html)

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


    

}
