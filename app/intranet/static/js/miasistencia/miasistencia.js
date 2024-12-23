class javamiasistencia{

    constructor(){
        this.hoy=new Date()
        this.primerdia=new Date(this.hoy.getFullYear(),this.hoy.getMonth(),1)
        this.diasdelmes=[]
        this.horario=[]
        this.asistencias=[]
        console.log(this.hoy)
        $("#CalendarioMes").val(this.hoy.getMonth()+1)
        this.obtenerasistencias()
        



        this.listadousuarios=[]
        this.horarioslaborales=[]
    }

    obtenerasistencias(){
        $("#Cargando").show()
        $.ajax({
            url: '/ListaAsistenciaDocente',
            type: 'POST',
            data: {
                
                mes : $("#CalendarioMes").val(),

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                $("#Cargando").hide()
                miasistencia.asistencias=data.data
                miasistencia.horario=data.horario
                console.log(data)
                miasistencia.obtenerdiasdelmes()
                $("#Informacion").hide()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    obtenerdiasdelmes(){
        let horasdelmes=0
        let horastrabajadas=0
        let mes=$("#CalendarioMes").val()-1
        let dia
        let diaasist
        let finasist

        let minutosentrada, minutossalida
        while(this.primerdia.getMonth()==mes){
            this.diasdelmes.push(new Date(this.primerdia))
            this.primerdia.setDate(this.primerdia.getDate()+1)
            
            console.log("wtf")
            
        }
        console.log(this.diasdelmes)

        let html=`
        <tr>
        ${this.diasdelmes.map(dat=>{
            if(this.hoy.getDate()==dat.getDate()){
                return `<td id='Hoy'>${dat.getDate()}</td>`
            }
            return`<th>${dat.getDate()}</th>`
            
        })}
        </tr>
        <tr>
        ${this.diasdelmes.map(dat=>{
            console.log(dat.getDay())
            switch(dat.getDay()){
                case 1: 
                if(this.horario.lunes==true){
                    horasdelmes+=(parseInt(this.horario.salidalunes.split(":")[0])+parseInt(this.horario.salidalunes.split(":")[1]/60))-(parseInt(this.horario.entradalunes.split(":")[0])+parseInt(this.horario.entradalunes.split(":")[1]/60))
                    return "<th>L</th>"
                }else{
                    return"<th class='DiaNoLaboral'>L</th>"
                }
                case 2: 
                if(this.horario.martes==true){
                    horasdelmes+=(parseInt(this.horario.salidamartes.split(":")[0])+parseInt(this.horario.salidamartes.split(":")[1]/60))-(parseInt(this.horario.entradamartes.split(":")[0])+parseInt(this.horario.entradamartes.split(":")[1]/60))
                    return "<th>M</th>"
                }else{
                    return "<th class='DiaNoLaboral'>M</th>"
                }
                case 3:
                if(this.horario.miercoles==true){
                    horasdelmes+=(parseInt(this.horario.salidamiercoles.split(":")[0])+parseInt(this.horario.salidamiercoles.split(":")[1]/60))-(parseInt(this.horario.entradamiercoles.split(":")[0])+parseInt(this.horario.entradamiercoles.split(":")[1]/60))
                    return "<th>Mi</th>"
                }else{
                    return "<th class='DiaNoLaboral'>Mi</th>"
                }
                case 4: 
                if(this.horario.jueves==true){
                    horasdelmes+=(parseInt(this.horario.salidajueves.split(":")[0])+parseInt(this.horario.salidajueves.split(":")[1]/60))-(parseInt(this.horario.entradajueves.split(":")[0])+parseInt(this.horario.entradajueves.split(":")[1]/60))
                    return "<th>J</th>"
                }else{
                    return "<th class='DiaNoLaboral'>J</th>"
                }
                case 5: 
                if(this.horario.viernes==true){
                    horasdelmes+=(parseInt(this.horario.salidaviernes.split(":")[0])+parseInt(this.horario.salidaviernes.split(":")[1]/60))-(parseInt(this.horario.entradaviernes.split(":")[0])+parseInt(this.horario.entradaviernes.split(":")[1]/60))
                    return "<th>V</th>"
                }else{
                    return "<th class='DiaNoLaboral'>V</th>"
                }
                case 6: 
                if(this.horario.sabado==true){
                    horasdelmes+=(parseInt(this.horario.salidasabado.split(":")[0])+parseInt(this.horario.salidasabado.split(":")[1]/60))-(parseInt(this.horario.entradasabado.split(":")[0])+parseInt(this.horario.entradasabado.split(":")[1]/60))
                    return "<th>S</th>"
                }else{
                    return "<th class='DiaNoLaboral'>S</th>"
                }
                case 0: return "<th class='DiaNoLaboral'>D</th>"
            }
        })}
        </tr>

        <tr>
        ${this.diasdelmes.map(dat=>{
            
            dia=new Date(dat)
            let final="<td class='Ausente'>&nbsp;</td>"
            this.asistencias.forEach((asist,index)=>{

                diaasist=new Date(asist.fechaentrada)
                
                if(dia.getDate()==diaasist.getDate()){
                    if(asist.fechasalida==null){
                        final=`<td class='Atrasado' onclick="miasistencia.mostrarbarra(${index})">!</td>`
                        return
                    }
                    switch(dia.getDay()){
                        case 1: minutosentrada=parseInt(this.horario.entradalunes.split(":")[0])*60+parseInt(this.horario.entradalunes.split(":")[1])
                                minutossalida=parseInt(this.horario.salidalunes.split(":")[0])*60+parseInt(this.horario.salidalunes.split(":")[1])
                        break
                        case 2: minutosentrada=parseInt(this.horario.entradamartes.split(":")[0])*60+parseInt(this.horario.entradamartes.split(":")[1])
                                minutossalida=parseInt(this.horario.salidamartes.split(":")[0])*60+parseInt(this.horario.salidamartes.split(":")[1])
                        break
                        case 3: minutosentrada=parseInt(this.horario.entradamiercoles.split(":")[0])*60+parseInt(this.horario.entradamiercoles.split(":")[1])
                                minutossalida=parseInt(this.horario.salidamiercoles.split(":")[0])*60+parseInt(this.horario.salidamiercoles.split(":")[1])
                        break
                        case 4: minutosentrada=parseInt(this.horario.entradajueves.split(":")[0])*60+parseInt(this.horario.entradajueves.split(":")[1])
                                minutossalida=parseInt(this.horario.salidajueves.split(":")[0])*60+parseInt(this.horario.salidajueves.split(":")[1])
                        break
                        case 5: minutosentrada=parseInt(this.horario.entradaviernes.split(":")[0])*60+parseInt(this.horario.entradaviernes.split(":")[1])
                                minutossalida=parseInt(this.horario.salidaviernes.split(":")[0])*60+parseInt(this.horario.salidaviernes.split(":")[1])
                        break
                        case 6: minutosentrada=parseInt(this.horario.entradasabado.split(":")[0])*60+parseInt(this.horario.entradasabado.split(":")[1])
                                minutossalida=parseInt(this.horario.salidasabado.split(":")[0])*60+parseInt(this.horario.salidasabado.split(":")[1])
                        break
                    }
                    let minutosasistencia=parseInt(asist.fechaentrada.split("T")[1].split(":")[0])*60+parseInt(asist.fechaentrada.split("T")[1].split(":")[1])
                    let minutosasistenciafinal=parseInt(asist.fechasalida.split("T")[1].split(":")[0])*60+parseInt(asist.fechasalida.split("T")[1].split(":")[1])

                    if(minutosasistencia<minutosentrada){
                        
                    }

                    if(minutosasistencia>minutosentrada){
                        final=`<td class='Atrasado' onclick="miasistencia.mostrarbarra(${index})">A</td>`
                    }else if(minutosasistenciafinal<minutossalida){
                        final=`<td class='Atrasado' onclick="miasistencia.mostrarbarra(${index})">S</td>`
                    }
                    else{
                        final=`<td class='Presente' onclick="miasistencia.mostrarbarra(${index})">&nbsp;</td>`
                    }
                    
                }
                
                
            })

            return final

            
        })}
        </tr>
        `

        let horassemanales=0

        let templunes,tempmartes,tempmiercoles,tempjueves,tempviernes,tempsabado
        if(this.horario.lunes==true){
            templunes=`
            <tr>
                <th>Lunes</th>
                <td>${this.horario.entradalunes}</td>
                <td>${this.horario.salidalunes}</td>
            </tr>
            `
            horassemanales+=(parseInt(this.horario.salidalunes.split(":")[0])+parseInt(this.horario.salidalunes.split(":")[1]/60))-(parseInt(this.horario.entradalunes.split(":")[0])+parseInt(this.horario.entradalunes.split(":")[1]/60))
        }else{
            templunes=`
            <tr>
                <th>Lunes</th>
                <td>-</td>
                <td>-</td>
            </tr>
            `
        }
        if(this.horario.martes==true){
            tempmartes=`
            <tr>
                <th>Martes</th>
                <td>${this.horario.entradamartes}</td>
                <td>${this.horario.salidamartes}</td>
            </tr>
            `
            horassemanales+=(parseInt(this.horario.salidamartes.split(":")[0])+parseInt(this.horario.salidamartes.split(":")[1]/60))-(parseInt(this.horario.entradamartes.split(":")[0])+parseInt(this.horario.entradamartes.split(":")[1]/60))

        }else{
            tempmartes=`
            <tr>
                <th>Martes</th>
                <td>-</td>
                <td>-</td>
            </tr>
            `
        }
        if(this.horario.miercoles==true){
            tempmiercoles=`
            <tr>
                <th>Miercoles</th>
                <td>${this.horario.entradamiercoles}</td>
                <td>${this.horario.salidamiercoles}</td>
            </tr>
            `
            horassemanales+=(parseInt(this.horario.salidamiercoles.split(":")[0])+parseInt(this.horario.salidamiercoles.split(":")[1]/60))-(parseInt(this.horario.entradamiercoles.split(":")[0])+parseInt(this.horario.entradamiercoles.split(":")[1]/60))
        }else{
            templtempmiercolesunes=`
            <tr>
                <th>Miercoles</th>
                <td>-</td>
                <td>-</td>
            </tr>
            `
        }
        if(this.horario.jueves==true){
            tempjueves=`
            <tr>
                <th>Jueves</th>
                <td>${this.horario.entradajueves}</td>
                <td>${this.horario.salidajueves}</td>
            </tr>
            `
            horassemanales+=(parseInt(this.horario.salidajueves.split(":")[0])+parseInt(this.horario.salidajueves.split(":")[1]/60))-(parseInt(this.horario.entradajueves.split(":")[0])+parseInt(this.horario.entradajueves.split(":")[1]/60))

        }else{
            tempjueves=`
            <tr>
                <th>Jueves</th>
                <td>-</td>
                <td>-</td>
            </tr>
            `
        }
        if(this.horario.viernes==true){
            tempviernes=`
            <tr>
                <th>Viernes</th>
                <td>${this.horario.entradaviernes}</td>
                <td>${this.horario.salidaviernes}</td>
            </tr>
            `
            horassemanales+=(parseInt(this.horario.salidaviernes.split(":")[0])+parseInt(this.horario.salidaviernes.split(":")[1]/60))-(parseInt(this.horario.entradaviernes.split(":")[0])+parseInt(this.horario.entradaviernes.split(":")[1]/60))

        }else{
            tempviernes=`
            <tr>
                <th>Viernes</th>
                <td>-</td>
                <td>-</td>
            </tr>
            `
        }
        if(this.horario.sabado==true){
            tempsabado=`
            <tr>
                <th>Sabado</th>
                <td>${this.horario.entradasabado}</td>
                <td>${this.horario.salidasabado}</td>
            </tr>
            `
            horassemanales+=(parseInt(this.horario.salidasabado.split(":")[0])+parseInt(this.horario.salidasabado.split(":")[1]/60))-(parseInt(this.horario.entradasabado.split(":")[0])+parseInt(this.horario.entradasabado.split(":")[1]/60))

        }else{
            tempsabado=`
            <tr>
                <th>Sabado</th>
                <td>-</td>
                <td>-</td>
            </tr>
            `
        }

        let htmlhorario=`
        <table>
            <tr>
                <th>Dia</th>
                <th>Entrada</th>
                <th>Salida</th>
            </tr>
            ${templunes}
            ${tempmartes}
            ${tempmiercoles}
            ${tempjueves}
            ${tempviernes}
            ${tempsabado}
        </table>
        `

        $("#InforHorario").html(htmlhorario)
        $("#InforHorarioSemanal").html(`
        <p>Horas semanales: ${horassemanales}</p>
        <p>Horas Mes: ${horasdelmes}</p>
        `)
        $("#Tabla").html(html)
    }



    mostrarbarra(indice){
        $("#Informacion").show()
        $("#BarraAnterior").css("width",'0')
        $("#BarraActual").css("width",'0')
        $("#BarraSiguiente").css("width",'0')
        let minutoshoy=(parseInt(this.hoy.getHours())*60+parseInt(this.hoy.getMinutes())-420)/60

        let dia= new Date(this.asistencias[indice].fechaentrada)
        let final= new Date(this.asistencias[indice].fechasalida)

        let minutosentrada=(parseInt(dia.getHours())*60+parseInt(dia.getMinutes())-420)/60
        let minutossalida=(parseInt(final.getHours())*60+parseInt(final.getMinutes())-420)/60
        
        let HorarioInicio=0
        let HorarioFinal=0

        switch(dia.getDay()){
            case 1: HorarioInicio=this.horario.entradalunes,HorarioFinal=this.horario.salidalunes
            break;
            case 2: HorarioInicio=this.horario.entradamartes,HorarioFinal=this.horario.salidamartes
            break
            case 3: HorarioInicio=this.horario.entradamiercoles,HorarioFinal=this.horario.salidamiercoles
            break
            case 4: HorarioInicio=this.horario.entradajueves,HorarioFinal=this.horario.salidajueves
            break
            case 5: HorarioInicio=this.horario.entradaviernes,HorarioFinal=this.horario.salidaviernes
            break
            case 6: HorarioInicio=this.horario.entradasabado,HorarioFinal=this.horario.salidasabado
            break
        }

        let InicioBarraLaboral=((parseInt(HorarioInicio.split(":")[0])*60+parseInt(HorarioInicio.split(":")[1])-420)/60)
        let FinalBarraLaboral=((parseInt(HorarioFinal.split(":")[0])*60+parseInt(HorarioFinal.split(":")[1])-420)/60)
        $("#BarraHorario").css("margin-left",`${7.14*InicioBarraLaboral}%`)
        $("#BarraHorario").css("width",`${7.14*FinalBarraLaboral}%`)

        
        if(minutosentrada<InicioBarraLaboral){
            $("#BarraAnterior").show()
            $("#BarraAnterior").css("margin-left",`${7.14*minutosentrada}%`)
            $("#BarraAnterior").animate({
                "width": `${7.14*InicioBarraLaboral}%`
            },200);
            
        }else{
            $("#BarraAnterior").hide()
        }
        

        if(minutosentrada>InicioBarraLaboral){
            $("#BarraActual").css("margin-left",`${7.14*minutosentrada}%`)
        }else{
            $("#BarraActual").css("margin-left",`${7.14*InicioBarraLaboral}%`)
        }
        if(minutossalida>FinalBarraLaboral){
            $("#BarraActual").stop().delay(200).animate({
                "width":`${7.14*FinalBarraLaboral}%`
            },500)
        }else{
            $("#BarraActual").stop().delay(200).animate({
                "width":`${7.14*minutossalida-minutosentrada}%`
            },500)
        }
        console.log(minutossalida)
        console.log(minutosentrada)
        console.log(final)

        if(this.asistencias[indice.fechaesalida==null]){
            $("#BarraSiguiente").show()
            $("#BarraSiguiente").css("margin-left",`${7.14*FinalBarraLaboral}%`)
            $("#BarraSiguiente").stop().delay(700).animate({
                "width":`${7.14*14-minutoshoy}%`
            },200)
            $("#BarraSiguiente").html("No marcado")
            $("#BarraActual").html("No marcado")
        }else if(minutossalida>FinalBarraLaboral){
            $("#BarraSiguiente").show()
            $("#BarraSiguiente").css("margin-left",`${7.14*FinalBarraLaboral+7.14}%`)
            $("#BarraSiguiente").stop().delay(700).animate({
                "width":`${7.14*(minutossalida-FinalBarraLaboral-InicioBarraLaboral)}%`
            },200)
            $("#BarraSiguiente").html("")
        }else{
            $("#BarraSiguiente").hide()
        }
        
        
       
    }




    cargarmodoadmin(){
        $("#Cargando").show()
        $.ajax({
            url: '/Listado_Usuarios',
            type: 'GET',
            data: {
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                $("#Cargando").hide()
                miasistencia.listadousuarios=data
                miasistencia.cargarhorarioslaborales()
                
            },  
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    cargarhorarioslaborales(){
        $("#Cargando").show()
        $.ajax({
            url: '/ObtenerHorarioLaboral',
            type: 'GET',
            data: {
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                $("#Cargando").hide()
                miasistencia.horarioslaborales=data
                miasistencia.mostrarusuarios()
            },  
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }

    mostrarusuarios(){
        let temp=""
        let html=`
        <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo de usuario</th>
                <th>Accion</th>
            </tr>

            
                ${this.listadousuarios.map(useer=>{
                    temp=`<button class="BotonSmall" style="background-color: blue;" onclick="miasistencia.abrirventanahorarios(${useer.id})">Crear Horario</button>`
                    this.horarioslaborales.forEach((horario,index)=>{
                        if(horario.iduser==useer.id){
                            temp=`<button class="BotonSmall" onclick="miasistencia.abrirventanahorarios(${useer.id},${index})">Editar Horario</button>`
                        }
                    })
                    return `
                    <tr>
                        <td>${useer.nombres} ${useer.apellidos}</td>
                        <td>${useer.email}</td>
                        <td>${useer.nombrepermiso}</td>
                        <td>${temp}</td>
                    </tr>
                    `
                }).join("")}
            
        `
        $("#Tabla").html(html)
    }

    habilitarhorarios(dia){
        if($(`#${dia}-C`).is(":checked")){
            $(`#${dia}-E`).prop("disabled",false)
            $(`#${dia}-S`).prop("disabled",false)
        }else{
            $(`#${dia}-E`).prop("disabled",true)
            $(`#${dia}-S`).prop("disabled",true)
        }
        
    }
    abrirventanahorarios(x,z){
        
        let html=`
        <button id="Cerrar" onclick="miasistencia.cerrarventana()">X</button>
        <div id="Contenido">
                <h2>Horario laboral</h2>
                <div id="ContenedorDias">
                    <div class="Dias">
                        <h2>Lunes</h2>
                        <input id="L-C" type="checkbox" onchange="miasistencia.habilitarhorarios('L')">
                        <label>Entrada</label><input id="L-E" type="time" disabled>
                        <label>Salida</label><input id="L-S" type="time" disabled>
                    </div>
                    <div class="Dias">
                        <h2>Martes</h2>
                        <input id="M-C" type="checkbox" onchange="miasistencia.habilitarhorarios('M')">
                        <label>Entrada</label><input id="M-E" type="time" disabled>
                        <label>Salida</label><input id="M-S" type="time" disabled>
                    </div>
                    <div class="Dias">
                        <h2>Miercoles</h2>
                        <input id="MI-C" type="checkbox" onchange="miasistencia.habilitarhorarios('MI')">
                        <label>Entrada</label><input id="MI-E" type="time" disabled>
                        <label>Salida</label><input id="MI-S" type="time" disabled>
                    </div>
                    <div class="Dias">
                        <h2>Jueves</h2>
                        <input id="J-C" type="checkbox" onchange="miasistencia.habilitarhorarios('J')">
                        <label>Entrada</label><input id="J-E" type="time" disabled>
                        <label>Salida</label><input id="J-S" type="time" disabled>
                    </div>
                    <div class="Dias">
                        <h2>Viernes</h2>
                        <input id="V-C" type="checkbox" onchange="miasistencia.habilitarhorarios('V')">
                        <label>Entrada</label><input id="V-E" type="time" disabled>
                        <label>Salida</label><input id="V-S" type="time" disabled>
                    </div>
                    <div class="Dias">
                        <h2>Sabado</h2>
                        <input id="S-C" type="checkbox" onchange="miasistencia.habilitarhorarios('S')">
                        <label>Entrada</label><input id="S-E" type="time" disabled>
                        <label>Salida</label><input id="S-S" type="time" disabled>
                    </div>
                </div>
                
                
                <button class="BotonNormal" onclick="miasistencia.cambiarhorariolaboral(${x})">Aplicar</button>

        </div>
        

        `
        if(z!=undefined){
            let templunes="",tempmartes="",tempmiercoles="",tempjueves="",tempviernes="",tempsabado=""
            if(this.horarioslaborales[z].lunes==true){
                templunes=`
                <input id="L-C" type="checkbox" onchange="miasistencia.habilitarhorarios('L')" checked>
                <label>Entrada</label><input id="L-E" type="time" value="${this.horarioslaborales[z].entradalunes}">
                <label>Salida</label><input id="L-S" type="time" value="${this.horarioslaborales[z].salidalunes}">`
            }else{
                templunes=`
                <input id="L-C" type="checkbox" onchange="miasistencia.habilitarhorarios('L')">
                <label>Entrada</label><input id="L-E" type="time" disabled>
                <label>Salida</label><input id="L-S" type="time" disabled>`
            }
            if(this.horarioslaborales[z].martes==true){
                tempmartes=`
                <input id="M-C" type="checkbox" onchange="miasistencia.habilitarhorarios('M')" checked>
                <label>Entrada</label><input id="M-E" type="time" value="${this.horarioslaborales[z].entradamartes}">
                <label>Salida</label><input id="M-S" type="time" value="${this.horarioslaborales[z].salidamartes}">`
            }else{
                tempmartes=`
                <input id="M-C" type="checkbox" onchange="miasistencia.habilitarhorarios('M')">
                <label>Entrada</label><input id="M-E" type="time" disabled>
                <label>Salida</label><input id="M-S" type="time" disabled>`
            }
            if(this.horarioslaborales[z].miercoles==true){
                tempmiercoles=`
                <input id="MI-C" type="checkbox" onchange="miasistencia.habilitarhorarios('MI')" checked>
                <label>Entrada</label><input id="MI-E" type="time" value="${this.horarioslaborales[z].entradamiercoles}">
                <label>Salida</label><input id="MI-S" type="time" value="${this.horarioslaborales[z].salidamiercoles}">
                `
            }else{
                tempmiercoles=`
                <input id="MI-C" type="checkbox" onchange="miasistencia.habilitarhorarios('MI')">
                <label>Entrada</label><input id="MI-E" type="time" disabled>
                <label>Salida</label><input id="MI-S" type="time" disabled>
                `
            }
            if(this.horarioslaborales[z].jueves==true){
                tempjueves=`
                <input id="J-C" type="checkbox" onchange="miasistencia.habilitarhorarios('J')" checked>
                <label>Entrada</label><input id="J-E" type="time" value="${this.horarioslaborales[z].entradajueves}">
                <label>Salida</label><input id="J-S" type="time" value="${this.horarioslaborales[z].salidajueves}">
                `
            }else{
                tempjueves=`
                <input id="J-C" type="checkbox" onchange="miasistencia.habilitarhorarios('J')">
                <label>Entrada</label><input id="J-E" type="time" disabled>
                <label>Salida</label><input id="J-S" type="time" disabled>
                `
            }
            if(this.horarioslaborales[z].viernes==true){
                tempviernes=`
                <input id="V-C" type="checkbox" onchange="miasistencia.habilitarhorarios('V')" checked>
                <label>Entrada</label><input id="V-E" type="time" value="${this.horarioslaborales[z].entradaviernes}">
                <label>Salida</label><input id="V-S" type="time" value="${this.horarioslaborales[z].salidaviernes}">
                `
            }else{
                tempviernes=`
                <input id="V-C" type="checkbox" onchange="miasistencia.habilitarhorarios('V')">
                <label>Entrada</label><input id="V-E" type="time" disabled>
                <label>Salida</label><input id="V-S" type="time" disabled>
                `
            }
            if(this.horarioslaborales[z].sabado==true){
                tempsabado=`
                <input id="S-C" type="checkbox" onchange="miasistencia.habilitarhorarios('S')" checked>
                <label>Entrada</label><input id="S-E" type="time" value="${this.horarioslaborales[z].entradasabado}">
                <label>Salida</label><input id="S-S" type="time" value="${this.horarioslaborales[z].salidasabado}">
                `
            }else{
                tempsabado=`
                <input id="S-C" type="checkbox" onchange="miasistencia.habilitarhorarios('S')">
                <label>Entrada</label><input id="S-E" type="time" disabled>
                <label>Salida</label><input id="S-S" type="time" disabled>
                `
            }

            html=` <button id="Cerrar" onclick="miasistencia.cerrarventana()">X</button>
            <div id="Contenido">
                    <h2>Horario laboral</h2>
                    <div id="ContenedorDias">
                        <div class="Dias">
                            <h2>Lunes</h2>
                            ${templunes}
                        </div>
                        <div class="Dias">
                            <h2>Martes</h2>
                            ${tempmartes}
                        </div>
                        <div class="Dias">
                            <h2>Miercoles</h2>
                            ${tempmiercoles}
                        </div>
                        <div class="Dias">
                            <h2>Jueves</h2>
                            ${tempjueves}
                        </div>
                        <div class="Dias">
                            <h2>Viernes</h2>
                            ${tempviernes}
                        </div>
                        <div class="Dias">
                            <h2>Sabado</h2>
                            ${tempsabado}
                        </div>
                    </div>
                    
                    
                    <button class="BotonNormal" onclick="miasistencia.cambiarhorariolaboral(${x})">Aplicar</button>
    
            </div>
            `
        }
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }

    cambiarhorariolaboral(x){

        
        $("#Cargando").show()
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        console.log($("#L-E").val())
        $.ajax({
            url: '/CambiarHorarioLaboral',
            type: 'POST',
            data: {

                "idusuario":x,

                "lunes":$("#L-C").is(":checked"),
                "Elunes":$("#L-E").val(),
                "Slunes":$("#L-S").val(),

                "martes":$("#M-C").is(":checked"),
                "Emartes":$("#M-E").val(),
                "Smartes":$("#M-S").val(),

                "miercoles":$("#MI-C").is(":checked"),
                "Emiercoles":$("#MI-E").val(),
                "Smiercoles":$("#MI-S").val(),

                "jueves":$("#J-C").is(":checked"),
                "Ejueves":$("#J-E").val(),
                "Sjueves":$("#J-S").val(),

                "viernes":$("#V-C").is(":checked"),
                "Eviernes":$("#V-E").val(),
                "Sviernes":$("#V-S").val(),

                "sabado":$("#S-C").is(":checked"),
                "Esabado":$("#S-E").val(),
                "Ssabado":$("#S-S").val(),
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                $("#Cargando").hide()
                miasistencia.cargarhorarioslaborales()
            },  
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
}