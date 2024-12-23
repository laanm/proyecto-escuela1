class javamenu{

    constructor(){
        this.hoy=new Date()

        this.productos=[]
        this.ventas=[]
        this.carrito=[]
        this.cargarproductos()
    }



    cargarproductos(x){
        $("#Cargando").show()
        $.ajax({
            url: '/obtenerproductos',
            type: 'GET',
            data: {
            },
            headers: {
            },
            success: function (data) {
                console.log(data)
                menu.productos=data
                $("#Cargando").hide()
                menu.mostrarproductos()
                if(x){
                    menu.cargarListaProductos();
                }

            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    cargarventas(){
        $("#Cargando").show()
        $.ajax({
            url: '/obtenerventas',
            type: 'GET',
            data: {
            },
            headers: {
            },
            success: function (data) {
                console.log(data)
                menu.ventas=data
                $("#Cargando").hide()
                menu.mostrarproductos()
                menu.abrirVentas()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    
    mostrarproductos(){
        let html=`
        <div class="overflow">
        ${this.productos.map((dat,index)=>{
            if(dat.categoria==2){
                return
            }
            return`<div class="Items" style="background-image: url('${dat.imagen}')" onclick="menu.agregarcarrito(${index})">
            <label>${dat.nombre}</label>
            <label>$${dat.precio}</label>
            </div>`
        }).join("")}
        </div>
        `
        let html2=`
        <div class="overflow">
        ${this.productos.map((dat,index)=>{
            if(dat.categoria==1 || dat.categoria==3){
                return
            }
            return`<div class="Items" style="background-image: url('${dat.imagen}')" onclick="menu.agregarcarrito(${index})">
            <label>${dat.nombre}</label>
            <label>$${dat.precio}</label>
            </div>`
        }).join("")}
        </div>
        `
        $("#Comidas").html(html)
        $("#Bebidas").html(html2)
    }
    mostrarcarrito(){
        let html=`
        ${this.carrito.map((dat,index)=>{
            return `
            <div class="ItemsCarrito">
                <img style="background-image: url('${dat.imagen}')">
                <div id="ItemsTexto">
                    <p>${dat.nombre}</p>
                    <label>$${dat.precio}</label>
                </div>
                <div id="EliminarCarrito" onclick="menu.eliminarcarrito(${index})">
                    <i class="fa-solid fa-trash" style="color: #ffffff;"></i>                
                </div>
            </div>`
        }).join("")}
        `
        $("#Carrito_Productos").html(html)
        let total=0
        this.carrito.forEach(dat=>{
            total+=dat.precio
        })
        let html2=`
            <label>Cantidad: ${this.carrito.length}</label>
            <label>Total: $ ${total}</label>
            <button id="BotonPagar" onclick="menu.abrirtipoventa()">Pagar</button>
        `
        $("#Total").html(html2)
    }

    agregarcarrito(x){
        
        this.carrito.push(this.productos[x])
        console.log(this.carrito)
        this.mostrarcarrito()
    }
    eliminarcarrito(x){
        this.carrito.splice(x,1)
        this.mostrarcarrito()
    }


    abrirventana(){
        $("#Ventana").html(`
        <button id="Cerrar" onclick="menu.cerrarventana()">X</button>
        <div class="Ventana_Crear_Producto">
            <h2>Crear Producto</h2>
            <label>Nombre de Producto</label>
            <input id="Nombre">

            <label>Imagen</label>
            <input type="file" id="Archivo" accept="image/*">

            <label>Precio</label>
            <input type="number" id="Precio" min="1" value="1">

            <label>Tipo de producto</label>
            <select id="TipoProducto">
                <option value="1">Comida</option>
                <option value="2">Bebida</option>
                <option value="3">Promocion</option>
            </select>
            <label>Descripcion Producto</label>
            <input id="Descripcion">

            <button class="AgregarProducto" onclick="menu.subir2()">Crear Producto</button>
        </div>


        `)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }
    abrirtipoventa(){
        if(this.carrito.length==0){
            return
        }
        $("#Ventana").html(`
        <button id="Cerrar" onclick="menu.cerrarventana()">X</button>
        <div class="Ventana_Tipo_Venta">
            <h2>Metodo de pago</h2>
            
            <div>
                <button onclick="menu.crearventa(0)">Efectivo</button>
                <button onclick="menu.crearventa(1)">Tarjeta credito</button>
                <button onclick="menu.crearventa(2)">Tarjeta debito</button>
                <button onclick="menu.crearventa(3)">Fiado</button>            
            </div>


        </div>


        `)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }

    abrirListaproductos(){
        $("#VentanaGrande").html(`
        <button id="Cerrar" onclick="menu.cerrarventanagrande()">X</button>
        <button onclick="menu.abrirventana()" class="AgregarProducto">Agregar Producto</button>
        <div class="Ventana_Productos">
            
            ${this.productos.map(dat=>{
                return `
                <div class="ItemsCarrito">
                <img style="background-image: url('${dat.imagen}')">
                <div id="ItemsTexto">
                    <label onchange="menu.cambiar(${dat.id})">Nombre producto: <input id="nombre-${dat.id}" type="text" value="${dat.nombre}"></label>
                    <label  onchange="menu.cambiar(${dat.id})">Precio producto: <input id="precio-${dat.id}" type="number" value="${dat.precio}"></label>
                    <label>Categoria producto: <select onchange="menu.cambiar(${dat.id})" id="categoria-${dat.id}">
                    <option value="1">Comida</option>
                    <option value="2">Bebida</option>
                    <option value="3">Promocion</option>
                     </select></label>
                </div>
                <div class="Botones">
                    <div id="guardar-${dat.id}" class="GuardarCarrito deshabilitado" onclick="menu.alertaEditarProducto(${dat.id})">
                        <i class="fa-solid fa-floppy-disk" style="color: #ffffff;"></i>                
                    </div>
                    <div class="EliminarCarrito" onclick="menu.alertaEliminarProducto(${dat.id})">
                        <i class="fa-solid fa-trash" style="color: #ffffff;"></i>                
                    </div>                
                </div>

            </div>
                `
            }).join("")}
        </div>


        `)
        $("#VentanaGrande").removeClass("CerrarVentanaGrande").addClass("AbrirVentanaGrande")
    }

    

    cargarListaProductos(){
        $("#VentanaGrande").html(`
        <button id="Cerrar" onclick="menu.cerrarventanagrande()">X</button>
        <button onclick="menu.abrirventana()" class="AgregarProducto">Agregar Producto</button>
        <div class="Ventana_Productos">
            
            ${this.productos.map(dat=>{
                return `
                <div class="ItemsCarrito">
                <img style="background-image: url('${dat.imagen}')">
                <div id="ItemsTexto">
                    <label onchange="menu.cambiar(${dat.id})">Nombre producto: <input id="nombre-${dat.id}" type="text" value="${dat.nombre}"></label>
                    <label  onchange="menu.cambiar(${dat.id})">Precio producto: <input id="precio-${dat.id}" type="number" value="${dat.precio}"></label>
                    <label>Categoria producto: <select onchange="menu.cambiar(${dat.id})" id="categoria-${dat.id}">
                    <option value="1">Comida</option>
                    <option value="2">Bebida</option>
                    <option value="3">Promocion</option>
                </select></label>
                </div>
                <div class="Botones">
                    <div id="guardar-${dat.id}" class="GuardarCarrito deshabilitado" onclick="menu.alertaEditarProducto(${dat.id})">
                        <i class="fa-solid fa-floppy-disk" style="color: #ffffff;"></i>                
                    </div>
                    <div class="EliminarCarrito" onclick="menu.alertaEliminarProducto(${dat.id})">
                        <i class="fa-solid fa-trash" style="color: #ffffff;"></i>                
                    </div>                
                </div>

            </div>
                `
            }).join("")}
        </div>


        `)
    }
    abrirVentas(){
        let temp=""
        let totales=this.calcularTotales(this.ventas)
        $("#VentanaGrande").html(`
        <button id="Cerrar" onclick="menu.cerrarventanagrande()">X</button>
        <div class="Ventana_Ventas">
            
                <div class="ListaVentas">
                <label>Año seleccionado <select id="VentasYear" onchange="menu.actualizarTotal()">
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select> </label>

                    
                    <div class="OverflowLista">

                        <div class="Lista">
                            <table>
                                <tr>
                                    <th>n° venta</th>
                                    <th>Tipo compra</th>
                                    <th>Hora</th>
                                    <th>Total</th>
                                </tr>
                                ${this.ventas.map(dat=>{
                                    if(dat.tipo_compra==0){
                                        temp="Efectivo"
                                    }else if(dat.tipo_compra==1){
                                        temp="Credito"
                                    }else if(dat.tipo_compra==2){
                                        temp="Debito"
                                    }else if(dat.tipo_compra==3){
                                        temp="Fiado"
                                    }
                                    return `
                                    <tr>
                                        <td>${dat.id}</td>
                                        <td>${temp}</td>
                                        <td>${dat.hora_venta.replace("T"," ").split(".")[0]}</td>
                                        <td>$${dat.total}</td>
                                    </tr>
                                    `
                                }).join("")}
                            </table>
                        </div>    

                    </div>


                </div>

                <div class="Resumen">
                    <label>Mes selecionado <select id="ResumenMes" onchange="menu.actualizarTotal()">
                        <option value='1'>Enero</option>
                        <option value='2'>Febrero</option>
                        <option value='3'>Marzo</option>
                        <option value='4'>Abril</option>
                        <option value='5'>Mayo</option>
                        <option value='6'>Junio</option>
                        <option value='7'>Julio</option>
                        <option value='8'>Agosto</option>
                        <option value='9'>Septiembre</option>
                        <option value='10'>Octubre</option>
                        <option value='11'>Noviembre</option>
                        <option value='12'>Diciembre</option>
                    </select></label>

                    <div id="InfoResumen" class="InfoResumen">
                        <label>Cantidad de ventas: ${totales.cantidadVentas}</label>
                        <label>Cantidad Total efectivo: $${totales.efectivo}</label>
                        <label>Cantidad Total credito: $${totales.credito}</label>
                        <label>Cantidad Total debito: $${totales.debito}</label>
                        <label>Cantidad Total fiado: $${totales.fiado}</label>
                        <label>Cantidad Total: $${totales.total}</label>
                    </div>
                </div>
        </div>


        `)
        
        $("#VentanaGrande").removeClass("CerrarVentanaGrande").addClass("AbrirVentanaGrande")
        $(`#ResumenMes option[value=${this.hoy.getMonth()+1}]`).prop('selected',true)
        $(`#VentasYear option[value=${this.hoy.getFullYear()}]`).prop('selected',true)
    }

    
    cambiar(id){
        $(`#guardar-${id}`).removeClass("deshabilitado")
    }

    actualizarTotal(){
        const mes=parseInt($("#ResumenMes").val())
        const year=parseInt($("#VentasYear").val())
        let totales={
            cantidadVentas:0,
            efectivo:0,
            credito:0,
            debito:0,
            fiado:0,
            total:0
        }
        this.ventas.forEach(datini=>{

            if(datini.mes==mes && datini.year==year){
                if(datini.tipo_compra==0){
                    totales.efectivo+=datini.total
                }else if(datini.tipo_compra==1){
                    totales.credito+=datini.total
                }else if(datini.tipo_compra==2){
                    totales.debito+=datini.total
                }
                console.log(datini.total)
                totales.cantidadVentas+=1
                totales.total+=datini.total
            }
        })
        
        $("#InfoResumen").html(`
        <label>Cantidad de ventas: ${totales.cantidadVentas}</label>
        <label>Cantidad Total efectivo: ${totales.efectivo}</label>
        <label>Cantidad Total credito: ${totales.credito}</label>
        <label>Cantidad Total debito: ${totales.debito}</label>
        <label>Cantidad Total fiado: ${totales.fiado}</label>
        <label>Cantidad Total: ${totales.total}</label>
        `)
    }

    calcularTotales(ventas){
        let json={
            cantidadVentas:0,
            efectivo:0,
            credito:0,
            debito:0,
            fiado:0,
            total:0
        }
        ventas.forEach(datini=>{
            console.log(datini.mes,this.hoy.getMonth()+1)
            console.log(datini.year,this.hoy.getFullYear())
            if(datini.mes==this.hoy.getMonth()+1 && datini.year==this.hoy.getFullYear()){
                if(datini.tipo_compra==0){
                    json.efectivo+=datini.total
                }else if(datini.tipo_compra==1){
                    json.credito+=datini.total
                }else if(datini.tipo_compra==2){
                    json.debito+=datini.total
                }
                console.log(datini.total)
                json.cantidadVentas+=1
                json.total+=datini.total
            }
        })
        console.log(json)
        return json
        
    }

    alertaEliminarProducto(id){
        Swal.fire({
            title: 'Desea eliminar el producto?',
            showDenyButton: true,
            confirmButtonText: 'si'
        }).then((result)=>{
            if(result.isConfirmed){
                $("#Cargando").show()
                $.ajax({
                    url: '/eliminarproducto',
                    type: 'POST',
                    data: {
                        "id":id,
                    },
                    headers: {
                    },
                    success: function (data) {
                        $("#Cargando").hide()
                        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
                        menu.carrito=[]
                        menu.cargarproductos(true)
                        menu.mostrarproductos()
                        menu.mostrarcarrito()
                        menu.cargarListaProductos()
                    },
                    error: function (data) {
                        $("#Cargando").hide()
                    }
                });
            }else{

            }
        })
    }
    alertaEditarProducto(id){
        Swal.fire({
            title: 'Desea actualizar el producto?',
            showDenyButton: true,
            confirmButtonText: 'si'
        }).then((result)=>{
            if(result.isConfirmed){
                $("#Cargando").show()
                $.ajax({
                    url: '/editarproducto',
                    type: 'POST',
                    data: {
                        "id":id,
                        "nombre":$(`#nombre-${id}`).val(),
                        "precio":$(`#precio-${id}`).val(),
                        "categoria":$(`#categoria-${id}`).val()
                    },
                    headers: {
                    },
                    success: function (data) {
                        $("#Cargando").hide()
                        menu.carrito=[]
                        menu.cargarproductos(true)
                        menu.mostrarproductos()
                        menu.mostrarcarrito()
                        menu.cargarListaProductos()
                    },
                    error: function (data) {
                        $("#Cargando").hide()
                    }
                });
            }else{

            }
        })
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
    }
    cerrarventanagrande(){
        $("#VentanaGrande").removeClass("AbrirVentanaGrande").addClass("CerrarVentanaGrande")
    }

    async subir2(){
        
        if($(`#Archivo`).val()=="" || $("#Precio").val()<=0 || $("#Nombre").val()==""){
           return

        }else{

            $("#Cargando").show();
            let files= $(`#Archivo`)[0].files
            for (let i = 0; i < files.length; i++) {

                let file = files[i];
                let name = $('#name').val();
                let cat_id = $('#category').val();

                await this.uploadimg2(files[i])
            }
        }
        

    }

    uploadimg2(file){
        return new Promise(function(resolve,reject){

                let form= new FormData()
                form.append("nombre",$("#Nombre").val())
                form.append("precio",$("#Precio").val())
                form.append("imagen",file)
                form.append("descripcion",$("#Descripcion").val())
                form.append("categoria",$("#TipoProducto").val())


                $.ajax({
                url: '/crearproducto',
                type: 'POST',
                data: form,
                contentType: false,
                processData: false,
                headers: {

                },
                success: function (datinis) {
                    console.log(datinis)
                    menu.cargarproductos(true);
                    menu.cerrarventana();
                    $("#Cargando").hide();
                    
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
                });
            

    })
    }

    crearventa(tipo_compra){
        $("#Cargando").show()
        let total=0
        this.carrito.forEach(dat=>{
            total+=dat.precio
        })
        if(total==0){
            $("#Cargando").hide()
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
            return
        }
        $.ajax({
            url: '/crearventa',
            type: 'POST',
            data: {
                "tipo_compra":tipo_compra,
                "total":total
            },
            headers: {
            },
            success: function (data) {
                $("#Cargando").hide()
                $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
                menu.carrito=[]
                menu.mostrarproductos()
                menu.mostrarcarrito()
                menu.cargarListaProductos()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }

}