class javamiorganigrama{

    constructor(nivel,perfil){

        this.nivel=nivel
        this.perfil=perfil
        this.calendario=[]
        this.calendariomes=[]
        this.eventos=[]
        this.hoy= new Date()
        this.messeleccionado=this.hoy.getMonth()+1
        
        this.enseleccion=false
        this.enferiados=false
        this.eventosvisibles=true
        this.seleccionados=[]
        this.yearactual=this.hoy.getFullYear()
        this.cargarotrosyears()
        //FALTA PONER QUE SOLO LOS ADMIN Y CORDINADORES PUEDAN MODIFICAR Y ADEMAS PODER ELIMINAR LOS EVENTOS XD
    }

    cargarotrosyears(){
        $("#Cargando").show()
        
        
        let datos={
            "year":this.yearactual
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.post("/loadcalendario",datos,{headers}).then(response=>{
            
            this.calendario=response.data
            this.calendariomes=[]
            this.eventos=[]
            this.seleccionados=[]
            this.enseleccion=false
            
            this.cargareventos()
            
        }).catch(e=>{
            console.log(e)
            
        })
    }
    cargareventos(){
        
        
        axios.get("/crearevento",{

        }).then(response=>{
            this.eventos=response.data
            this.mostrarcalendario()
            $("#Cargando").hide()
            console.log(response)
        }).catch(e=>{
            console.log(e)
        })
    }
    
    cambiarmes(x){
        if((this.messeleccionado==1 && x==-1) || (this.messeleccionado==12 && x==1)){
            return
        }else{
            this.messeleccionado+=x
            this.mostrarcalendario()
        }
        
    }
    
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    abrirventana(){

            const html=`
                <button id="Cerrar" onclick="miorganigrama.cerrarventana()">X</button>
                <div id="Contenido">

                    <h2>Titulo</h2>
                    <input id="Titulo" type="text">
                    <h2>Descripcion</h2>
                    <textarea id="Descripcion"></textarea>
                    <h2>Requisitos</h2>
                    <textarea id="Requisitos"></textarea>
                    <h2>Solicitar presencia(nombre provisional) <input type="checkbox"></h2>
                    <h2>Hora evento</h2>
                    <input id="Hora" type="time">
                    <button onclick="miorganigrama.seleccionardias()">Seleccionar Dias</button>
                </div>
                <button id="Agregar" class="CrearPeticion" onclick="miorganigrama.crearevento()">Crear Evento</button>
                </div>
            `

            setTimeout(()=>{
                $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
            },100)
            
            $("#Ventana").html(html)
    }
    cambiaryear(){
       this.yearactual=$("#year").val()
    }
    cambiarvisibilidad(){
        this.eventosvisibles=!this.eventosvisibles
    }
    seleccionardias(){
        
        if(this.enseleccion==false){
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
            $("#Menu2").html(`
                <h2>Seleccione los dias</h2>
                <button onclick="miorganigrama.seleccionardias()">Terminar Seleccion</button>
            `).css("display","flex")
            $("#Menu2").addClass("Seleccionardias")
            this.enseleccion=true
        }else{
            let tempeventos=""
            
            if(this.eventosvisibles==true){
                tempeventos="checked"
            }else{
                tempeventos=""
            }
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
            $("#Menu2").html(`<h2>Año</h2>
            <select id="year" onchange="miorganigrama.cambiaryear(),miorganigrama.cargarotrosyears()">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select>
            <label>Ver Eventos</label>
            <input id="coso" type="checkbox" onchange="miorganigrama.cambiarvisibilidad(),miorganigrama.mostrarcalendario()" ${tempeventos}>
            <button id="BCrear" onclick="miorganigrama.abrirventana()">Crear Evento</button>
            <button id="BCrear" onclick="miorganigrama.cambiardias()">Cambiar Feriados</button>`)
            $("#Menu2").removeClass("Seleccionardias")
        }
        
    }

    cambiardias(){
        let temp=""
        console.log($("#coso").val())
        console.log(this.perfil)
        if(this.perfil==2){
            temp=`<button id="BCrear" onclick="miorganigrama.abrirventana()">Crear Evento</button>
            <button id="BCrear" onclick="miorganigrama.cambiardias()">Cambiar Feriados</button>`
        }else{
            temp=""
        }
        if(this.enferiados==false){
            $("#Menu2").html(`
            <h2>Seleccione los dias para cambiar</h2>
            <button onclick="miorganigrama.cambiardias()">Terminar cambios</button>
            `).css("display","flex")
            $("#Menu2").addClass("Seleccionardias")
            this.enferiados=true
        }else{
            this.enferiados=false
            let tempeventos=""
            
            if(this.eventosvisibles==true){
                tempeventos="checked"
            }else{
                tempeventos=""
            }
            $("#Menu2").html(`<h2>Año</h2>
            <select id="year" onchange="miorganigrama.cargarotrosyears()">

                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select>
            <label>Ver Eventos</label>
            <input id="coso" type="checkbox" onchange="miorganigrama.cambiarvisibilidad(),miorganigrama.mostrarcalendario()" ${tempeventos}>
            ${temp}`)
            $("#Menu2").removeClass("Seleccionardias")

        }
        
    }

    
    mostrarcalendario()
    {
        let check=$("#coso").is(":checked")
        let temp2=""
        console.log(check)
        console.log(this.calendario)
        console.log(this.perfil)
        if(this.perfil=="2"){
            temp2=`<button id="BCrear" onclick="miorganigrama.abrirventana()">Crear Evento</button>
            <button id="BCrear" onclick="miorganigrama.cambiardias()">Cambiar Feriados</button>`
        }else{
            temp2=""
        }
        
        let html=""
        if(this.calendario.length==0){

            if(this.perfil==2){
                html=`

            <select id="year" onchange="miorganigrama.cambiaryear() ,miorganigrama.cargarotrosyears()">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select>
                <h1>Año ${this.yearactual} no creado</h1>
                <button onclick="miorganigrama.crearano()">Crear año</button>
            `
            }else{
                html=`Año no creado (se requiere nivel administrador para crearlo)
                <h2>Año</h2>
                <select id="year" onchange="miorganigrama.cambiaryear() ,miorganigrama.cargarotrosyears()">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select>`
            }
            

        }else{
            this.calendario.forEach(dat=>{
                if(dat.mes==this.messeleccionado){
                    this.calendariomes.push(dat)
                }
            })
            const cantidad=this.calendariomes[0].nombredia
            for(let i=1; i<cantidad; i++){
                this.calendariomes.unshift("")
            }
            if(cantidad==0){
                this.calendariomes.unshift("")
                this.calendariomes.unshift("")
                this.calendariomes.unshift("")
                this.calendariomes.unshift("")
                this.calendariomes.unshift("")
                this.calendariomes.unshift("")
            }
            let temp=""
            let tempeventos=""
            console.log(this.calendariomes)
            if(this.eventosvisibles==true){
                tempeventos="checked"
            }else{
                tempeventos=""
            }
            html=`
            
            <div id="Menu2">
                <h2>Año</h2>
                <select id="year" onchange="miorganigrama.cambiaryear(), miorganigrama.cargarotrosyears()">
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
                <label>Ver Eventos2</label>
                
                <input id="coso" type="checkbox" onchange="miorganigrama.cambiarvisibilidad(),miorganigrama.mostrarcalendario()" ${tempeventos}>
                ${temp2}

                
            </div>
            
            <div id="Menu">
                
                <img src="/static/img/imgflechaverde.png" class="flecha1" onclick="miorganigrama.cambiarmes(-1)"></img>
                <h1>${this.quemes(0)}</h1>
                <img src="/static/img/imgflechaverde.png" class="flecha2" onclick="miorganigrama.cambiarmes(+1)"></img>

            </div>
            
            <table>
                <tbody>
                <tr>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miercoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sabado</th>
                    <th>Domingo</th>
                    
                </tr>
                <tr>
                    ${this.calendariomes.map((dat,index)=>{
                        
                        
                        if(dat.tipodia==1){
                            temp=`<td id="D-${dat.id}" class="Laboral" onclick="miorganigrama.convertirferiado(${dat.id},0)"><h2>${dat.dia}</h2> ${this.eventos.map(event=>{
                                if(event.iddia==dat.id && this.eventosvisibles==true){
                                    return `<div class="TituloEvento">${event.titulo}</div>`
                                }
                            }).join("")} </td>`
                        }else if(dat.tipodia==0){
                            temp=`<td id="D-${dat.id}" class="Feriado" onclick="miorganigrama.convertirferiado(${dat.id},1)"><h2>${dat.dia}</h2> ${this.eventos.map(event=>{
                                if(event.iddia==dat.id && this.eventosvisibles==true){
                                    return `<div class="TituloEvento">${event.titulo}</div>`
                                }
                            }).join("")} </td>`
                        }

                        
                        

                        if(index== 7||index==14 || index==21 || index==28 || index==35){
                            return `</tr>
                                    <tr>
                                    ${temp}
                            `
                        }else{

                            if(dat==""){
                                return `<td class="No"></td>`
                            }else{
                                return temp
                            }
                            
                        }
                        
                                        
                    }).join("")}
                    
                </tr>
                
                
                </tbody>
            </table>
            `

        }
        this.calendariomes=[]
        $("#Calendario").html(html)
        $("#year").val(this.yearactual)
        
        if(this.enseleccion==true){
            $("#Menu2").html(`
            <h2>Seleccione los dias</h2>
            <button>Terminar Seleccion</button>
            `).css("display","flex")
            $("#Menu2").addClass("Seleccionardias")
            this.seleccionados.forEach(dat=>{
                $(`#D-${dat}`).addClass("Seleccionados")
            })
        }else if(this.enferiados==true){
            
                $("#Menu2").html(`
                <h2>Seleccione los dias para cambiar</h2>
                <button onclick="miorganigrama.cambiardias()">Terminar cambios</button>
                `).css("display","flex")
                $("#Menu2").addClass("Seleccionardias")
        }
        
        

    }
    crearano(){
        $("#Cargando").show()
        let datos={
            "year":this.yearactual
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.post("/crearyear",datos,{headers}).then(response=>{
            $("#Cargando").hide()
            console.log(response)
        }).catch(e=>{
            $("#Cargando").hide()
            console.log(e)
        })
    }
    eliminarano(){
        $("#Cargando").show()
        let datos={
            "year":this.yearactual
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.post("/eliminaryear",datos,{headers}).then(response=>{
            $("#Cargando").hide()
            console.log(response)
        }).catch(e=>{
            console.log(e)
            $("#Cargando").hide()
        })
    }
    convertirferiado(x,y){
        
        if(this.enseleccion==true){
            if(this.seleccionados.indexOf(x)==-1){
                this.seleccionados.push(x)
                $(`#D-${x}`).addClass("Seleccionados")
                console.log(this.seleccionados)
            }else{
                this.seleccionados.splice(this.seleccionados.indexOf(x),1)
                $(`#D-${x}`).removeClass("Seleccionados")
                console.log(this.seleccionados)
            }
            
        }else{
            if(this.enferiados==true){
                $("#Cargando").show()
                let datos={
                    "id":x,
                    "tipodia": y
                }
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken' : TOKEN,
                }
                axios.post("/cambiardiacalendario",datos,{headers}).then(response=>{
                
                    this.cargarotrosyears()
                    $("#Cargando").hide()
                }).catch(e=>{
                    console.log(e)
                    $("#Cargando").hide()
                })
            }else{
                let temp3=""
                if (this.perfil==2){
                    temp3="<th>Accion</th>"
                }
                $("#Ventana").html(`
                <button id="Cerrar" onclick="miorganigrama.cerrarventana()">X</button>
                <div id="Contenido">
                        <h2>Eventos del dia</h2>
                        <table>
                        <tr>
                            <th>Titulo</th>
                            <th>Hora</th>
                            <th>Descripcion</th>
                            ${temp3}
                        </tr>
                            ${this.eventos.map(dat=>{
                                if(dat.iddia==x)
                                {
                                    temp3=""
                                    if(this.perfil==2){
                                        temp3=`<td><button onclick="miorganigrama.eliminarevento(${dat.idevento})">Eliminar</button></td>`
                                    }
                                    return `<tr>
                                        <td>${dat.titulo}</td>
                                        <td>${dat.hora}</td>
                                        <td>${dat.descripcion}</td>
                                        ${temp3}
                                    </tr>`
                                }
                            }).join("")}
                        
                        </table>
                </div>
                        `
                        )
                
                    
                $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
            }
            
        }
    }
    estadoseleccion(){
        this.cerrarventana()
    }
    crearevento(){
            if(!this.seleccionados){
               
                return
            }
            
            $("#Cargando").show()
            console.log(this.seleccionados)
            let datos={
                "titulo":$("#Titulo").val(),
                "descripcion": $("#Descripcion").val(),
                "requisitos": $("#Requisitos").val(),
                "hora": $("#Hora").val(),
                "dias[]": this.seleccionados
            }
            const headers = {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken' : TOKEN,
            }
            axios.post("/crearevento",datos,{headers}).then(response=>{
                console.log(response)
                this.eventosvisibles=true
                this.cargarotrosyears()

                $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
                $("#Cargando").hide()
            }).catch(e=>{
                console.log(e)
                $("#Cargando").hide()
            })
    }

    eliminarevento(x){
        if(this.perfil==1){
            return
        }
        $("#Cargando").show()
        
        $.ajax({
                url: '/eliminarevento',
                type: 'POST',
                data: {
                    
                    id:x
                },
                headers: {
                    'X-CSRFToken': TOKEN
                },
                success: function (data) {
                    console.log(data)
                    miorganigrama.cargareventos()
                    miorganigrama.cerrarventana()
                },
                error: function (data) {
                   
                }
            });
    }
      
    quemes(x){
        switch(this.messeleccionado+x){
            case 1:
                return "Enero"
            case 2:
                return "Febrero"
            case 3:
                return "Marzo"
            case 4:
                return "Abril"
            case 5:
                return "Mayo"
            case 6:
                return "Junio"
            case 7:
                return "Julio"
            case 8:
                return "Agosto"
            case 9:
                return "Septiembre"
            case 10:
                return "Octubre"
            case 11:
                return "Noviembre"
            case 12:
                return "Diciembre"
        }
    }
}  