class javacrearhorarios{

    constructor(){
        this.horarios=[];
        this.horarioedit=[];
        this.cargarhorarios();
    }


    creartabla(){
        
        let html=`        
        
        <table>
            <tr>
                <th>HoraInicio</th>
                <th>HoraFinal</th>
                <th>Accion</th>
            </tr>
            ${this.horarios.map(dat=>{
                return `<tr>
                            <td>${dat.horainicio}</td>
                            <td>${dat.horafinal}</td>
                            <td><span><button class="BotonSmall" onclick="crearhorarios.ventanaedirhorario(${dat.id},'${dat.horainicio}','${dat.horafinal}')">Editar</button><button class="BotonRojo" onclick="crearhorarios.eliminarhorario(${dat.id})">Eliminar</button></span></td>

                            </tr>
                `
            }).join("")}
        </table>`

        $("#divTablaHorarios").html(html)
        console.log(this.horarios)
    }
    creartablaorden(){
        
        let html=`        
        
            

        <table>
            <tr>
                
                <th>HoraInicio</th>
                <th>HoraFinal</th>
                <th>Accion</th>
            </tr>
            ${this.horarios.map((dat,index)=>{
                return `<tr id="H-${dat.id}" class="H">
                            
                            <td>${dat.horainicio}</td>
                            <td>${dat.horafinal}</td>
                            <td><span><button class="BotonSmall" onclick="crearhorarios.cambiarorden(${index},true,${dat.id})">Subir</button><button class="BotonRojo" onclick="crearhorarios.cambiarorden(${index},false,${dat.id})">Bajar</button></span></td>

                            </tr>
                `
            }).join("")}
        </table>`

        $("#divTablaHorarios").html(html)
        $("#DivBotones").html(`            
        <button style=" margin-right: 10px;" class="BotonNormal" onclick="crearhorarios.cambiarhorario()">Aplicar orden</button>
        <button style=" margin-right: 10px;" class="BotonNormal" onclick="crearhorarios.cargarhorarios()">Cancelar</button>`)
        console.log(this.horarios)
    }
    cambiarorden(x,e,id){
        let ordenactual=this.horarios[x]["orden"]
        
        this.horarios.forEach(dat=>{
            
            if(e==true){
                if(dat.orden==ordenactual-1){
                    dat.orden+=1
                    this.horarios[x]["orden"]-=1
                }
            }else{
                if(dat.orden==ordenactual+1){
                    dat.orden-=1
                    this.horarios[x]["orden"]+=1
                }
            }
        })
        this.horarios.sort((a,b) =>  {return a.orden-b.orden})
        console.log(this.horarios)
        this.creartablaorden()
        $(".H").removeClass("Movido")
        $(`#H-${id}`).addClass("Movido")
    }

    crearhorarios(){
        
        let mut=`mutation {
            horariocreate(horafinal: "${$("#HoraFinal").val()}", horainicio: "${$("#HoraInicial").val()}") {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarhorarios();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")
            
        })
        .catch(error=>{
            console.log(error)
        })
    }
    cambiarhorario(){
        $("#Cargando").show()
        
        $.ajax({
            url: '/cambiarordenhorarios',
            type: 'POST',
            data: {
                
                
                horarios: JSON.stringify(crearhorarios.horarios)
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                crearhorarios.cargarhorarios()
                
            },
            error: function (data) {
               
            }
        });
    }
    ventanaedirhorario(id,horainicial,horafinal){
        let html;


        html=`
        <h1>Editando Horario</h1>
        <label for="">Hora Inicial</label>
        <input type="text" id="HoraInicial" value="${horainicial}">

        <label for="">Hora Final</label>
        <input type="text" id="HoraFinal" value="${horafinal}">

        

        <button onclick="crearhorarios.editarhorario(${id})">Editar Horario</button>`

        setTimeout(()=>{
            $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
        },100)
        
        
        setTimeout(()=>{
            window.addEventListener('click',function(e){
                if(document.getElementById('Ventana').contains(e.target)){

                }else{
                    $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
                }

            })
        })
    }
    editarhorario(id){
        let mut=`mutation {
            horarioedit(id: ${id}, horainicio: "${$("#HoraInicial").val()}", horafinal: "${$("#HoraFinal").val()}") {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarhorarios();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana")

        })
        .catch(error=>{
            console.log(error)
        })
    }
    eliminarhorario(id){
        let mut=`mutation {
            horariodelete(id: ${id}) {
              success
              error
            }
          }`

        axios.post('/graphql/',{
            query:mut
        })
        .then(response=>{
            this.cargarhorarios();
        })
        .catch(error=>{
            console.log(error)
        })
    }
    cargarhorarios(){
        $("#Cargando").show()
        let query2=`
        query _allHorarios_id_hora661 {
            allHorarios {
              id
              horainicio
              horafinal
              orden
            }
          }
        `

        axios.post("/graphql/",{
            query:query2
        })
        .then(response=>{

            this.horarios=response.data.data.allHorarios
            this.horarioedit=response.data.data.allHorarios
            this.creartabla();
            $("#Cargando").hide()
            $("#DivBotones").html(`<button style=" margin-right: 10px;" class="BotonNormal" onclick="crearhorarios.crearventana()">Crear horario</button>
            <button style=" margin-right: 10px;" class="BotonNormal" onclick="crearhorarios.creartablaorden()">Cambiar orden</button>`)
        })
        .catch(error=>{
            console.log(error);
            $("#Cargando").hide()
        })

    }
    crearventana(){
        let html;


            html=`
            <h1>Creando Horario</h1>
            <label for="">Hora Inicio</label>
            <input type="text" id="HoraInicial">
            <label for="">Hora Final</label>
            <input type="text" id="HoraFinal">

            <button onclick="crearhorarios.crearhorarios()">Crear Horario</button>`

            setTimeout(()=>{
                $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            },100)
            
            
            setTimeout(()=>{
                window.addEventListener('click',function(e){
                    if(document.getElementById('Ventana').contains(e.target)){

                    }else{
                        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
                    }

                })
            })
        
    }


}