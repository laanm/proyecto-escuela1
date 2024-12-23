class javapedirsalas{

    constructor(x,nivel){
        
        this.idusuario=x;
        this.nivel=nivel;

        this.oas=[];

        this.calendario=[];
        this.mescalendario=[];
        this.hoy= new Date()
        this.diaseleccionado=""
        this.CargarCalendario()
        
        this.fecha= new Date();
        this.diasdiferencia=0;
        this.limitedias=14;

        this.fecha.setDate(this.fecha.getDate());
        this.fechaformat=`${this.fecha.getFullYear()}-${this.fecha.getMonth()+1}-${this.fecha.getDate()}`
        this.recalcularfecha()


        this.asignaturasasignadas=[];
        this.cursos=[];
        this.horarios=[]
        this.salas=[]
        this.salaspedidas=[]
        this.varr=localStorage.getItem("user");
        this.loadtable();
        this.createtable();
        this.ventanaabierta=false;
        
        
        $("#Cargando").hide();
        

        this.fechainputlimite= new Date()
        this.fechainputlimite.setDate(this.fechainputlimite.getDate()+this.limitedias);
        this.fechainputmin= new Date()
        this.fechainputmin.setDate(this.fechainputmin.getDate()-this.limitedias);
       
        $("#fecha").attr("min",`${this.fechainputmin.getFullYear()}-0${this.fechainputmin.getMonth()+1}-${this.agregar0xd(this.fechainputmin.getDate())}`)
        $("#fecha").attr("max",`${this.fechainputlimite.getFullYear()}-0${this.fechainputlimite.getMonth()+1}-${this.agregar0xd(this.fechainputlimite.getDate())}`)
        $("#fecha").val(`${this.fecha.getFullYear()}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.agregar0xd(this.fecha.getDate())}`);
        
        setInterval("location.reload()",36000000);
    }
    CargarOas(){
        
        
        
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/objetivoaprendizaje",{headers}).then(response=>{
            
            
            this.oas=response.data
            console.log(response.data)
           
        }).catch(e=>{
            console.log(e)
            
        })
    }
    CargarCalendario(){ //NUEVO
        let datos={
            
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.get("/loadcalendario",datos,{headers}).then(response=>{
            
            
            this.calendario=response.data
            this.CargarOas()
            console.log(this.calendario)
            this.CambiarMesCalendario(this.fecha.getMonth()+1)
            this.CambiarFecha(this.hoy.getFullYear(),this.hoy.getMonth()+1,this.hoy.getDate(),1,0)
            
        }).catch(e=>{
            console.log(e)
            
        })
    }

    CrearConstancia(x){ //NUEVO
        let datos={
            "idprofe":this.idusuario,
            "idpeticion":x,
            "mensaje":$("#Mensaje").val()
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken' : TOKEN,
        }
        axios.post("/helpdeskdatos",datos,{headers}).then(response=>{
            
            Swal.fire({
                icon: 'success',
                title: 'Mensaje Enviado',
                text: '',
            })
            
            
        }).catch(e=>{
            console.log(e)
            
        })
    }

    CambiarMesCalendario(x){
        if(x==0 || x==13){
            return
        }
        this.mescalendario=[]
        this.calendario.forEach(dat=>{
            if(dat.mes==x){
                this.mescalendario.push(dat)
            }
        })

        const cantidad=this.mescalendario[0].nombredia
            for(let i=1; i<cantidad; i++){
                this.mescalendario.unshift("")
            }
            if(cantidad==0){
                this.mescalendario.unshift("")
                this.mescalendario.unshift("")
                this.mescalendario.unshift("")
                this.mescalendario.unshift("")
                this.mescalendario.unshift("")
                this.mescalendario.unshift("")
            }
        
        this.MostrarCalendarioDinamico(x)
        
    }
    MostrarCalendario(){
        if($("#CalendarioDinamico").hasClass("AbrirCalendario")){
            
            $("#CalendarioDinamico").removeClass("AbrirCalendario").addClass("CerrarCalendario")
            let xde=this.diaseleccionado.slice(1).split("-")
            let dia= new Date(xde[0],xde[1]-1,xde[2])
            $("#diaGrande").html(`${this.quedia(dia.getDay())} ${xde[2]}-${xde[1]}-${xde[0]}`)
            $("#diaGrande").removeClass("BotonCalendario")
            $("#derecha").show()
            $("#izquierda").show()
        }else{
            
            $("#CalendarioDinamico").removeClass("CerrarCalendario").addClass("AbrirCalendario")
            $("#diaGrande").removeClass("BotonCalendario").addClass("BotonCalendario")
            $("#diaGrande").html("Cerrar Calendario")
            $("#derecha").hide()
            $("#izquierda").hide()
        }
        
    }
    MostrarCalendarioDinamico(x){
        let temp=""
        let dias=""
        if($(window).width()<570){
            dias=`
            <th>L</th>
                <th>M</th>
                <th>MI</th>
                <th>J</th>
                <th>V</th>
                <th>S</th>
                <th>D</th>
            `
        }else{
            dias=`
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sabado</th>
                <th>Domingo</th>
            `
        }
        let html=`
        
        <div id="ControlMes"><img onclick="pedirsalas.CambiarMesCalendario(${x-1})" src="/static/img/imgflechaverde.png"><h2 id="Mes">${this.quemes(x)}</h2><img onclick="pedirsalas.CambiarMesCalendario(${x+1})" src="/static/img/imgflechaverde.png"></div>
        
        <table>
            <tr>
                ${dias}
            </tr>
            <tr>
            ${this.mescalendario.map((dat,index)=>{
                
                if(dat.tipodia==1){
                    
                        temp=`<td class="Laboral" id="${dat.year}-${dat.mes}-${dat.dia}" onclick="pedirsalas.CambiarFecha(${dat.year},${dat.mes},${dat.dia})"><p>${dat.dia}</p></td>`
                     
                    
                    
                }else if(dat.tipodia==0){
                    temp=`<td class="Feriado"><p>${dat.dia}</p></td>`
                }else{
                    temp="<td class='No'></td>"
                }
                if(index==7 || index ==14 || index== 21 || index==28 || index==35){

                    
                    return `</tr>
                            <tr>
                                ${temp}
                            `
                }
                
                return temp
                
                    
                
            }).join("")}
            </tr>
        </table>
        `
        $("#CalendarioDinamico").html(html)
        $(".Hoy").removeClass("Hoy")
        $(this.diaseleccionado).addClass("Hoy")
        
    }
    CambiarFecha(year,mes,dia,x,y){
        
        let test=false
        if(y==undefined){
            y=0
        }
        let fechadefinitiva= new Date(year,mes-1,dia)
        
        fechadefinitiva.setDate(fechadefinitiva.getDate()+y)
        
        this.fechaformat=`${fechadefinitiva.getFullYear()}-${fechadefinitiva.getMonth()+1}-${fechadefinitiva.getDate()}`

        let Diferencia= (fechadefinitiva-this.hoy)/(1000*3600)/24
        console.log(fechadefinitiva)
        console.log(Diferencia)
        if(Math.abs(Diferencia)>=15){
            Swal.fire({
                icon: 'error',
                title: 'Diferencia de dias',
                text: 'Limite sobrepasado',
            })
            return
        }
        if(y==0){
            this.diasdiferencia=Diferencia
        }else{
            this.diasdiferencia+=y
        }
        this.diaseleccionado=`#${fechadefinitiva.getFullYear()}-${fechadefinitiva.getMonth()+1}-${fechadefinitiva.getDate()}`
        this.calendario.forEach(dat=>{
            
            if(dat.year==fechadefinitiva.getFullYear() && dat.dia==fechadefinitiva.getDate() && dat.mes==fechadefinitiva.getMonth()+1 && dat.tipodia==0){
                console.log("es feriado prox")
                test=true
                if(y==0){
                    this.CambiarFecha(year,mes,dia,1,1)
                }else{
                    this.CambiarFecha(year,mes,dia+y,1,y)
                }
                
                return
            }
        })
        if(test==true){
            return
        }
        this.loadtable()
        if(x==1){

        }else{
            this.MostrarCalendario()
        }

        $("#izquierda").removeAttr("onclick")
        $("#izquierda").attr("onclick",`pedirsalas.CambiarFecha(${fechadefinitiva.getFullYear()},${fechadefinitiva.getMonth()+1},${fechadefinitiva.getDate()},1,-1)`)

        $("#derecha").removeAttr("onclick")
        $("#derecha").attr("onclick",`pedirsalas.CambiarFecha(${fechadefinitiva.getFullYear()},${fechadefinitiva.getMonth()+1},${fechadefinitiva.getDate()},1,1)`)
        
        $("#diaGrande").html(`${this.quedia(fechadefinitiva.getDay())} ${fechadefinitiva.getDate()}-${fechadefinitiva.getMonth()+1}-${fechadefinitiva.getFullYear()}`)
        
        fechadefinitiva.setDate(fechadefinitiva.getDate()+1)

        $("#diaSiguiente").html(` ${fechadefinitiva.getDate()}-${fechadefinitiva.getMonth()+1}-${fechadefinitiva.getFullYear()}`)

        fechadefinitiva.setDate(fechadefinitiva.getDate()-2)
        
        $("#diaPasado").html(` ${fechadefinitiva.getDate()}-${fechadefinitiva.getMonth()+1}-${fechadefinitiva.getFullYear()}`)
        

    

        
        
        $(".Hoy").removeClass("Hoy")
        $(this.diaseleccionado).addClass("Hoy")
    }

    recalcularfecha(){
        let dia=this.fecha.getDay();
        this.fechaformat=`${this.fecha.getFullYear()}-${this.fecha.getMonth()+1}-${this.fecha.getDate()}`
        if(dia==1){
            dia="Lunes"
        }else if(dia==2){
            dia="Martes"
        }else if(dia==3){
            dia="Miercoles"
        }else if(dia==4){
            dia="Jueves"
        }else if(dia==5){
            dia="Viernes"
        }else if(dia==6){
            dia="Sabado"
        }else{
            dia="Domingo"
        }

        $("#diaPasado").html(`${this.agregar0xd(this.fecha.getDate()-1)}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.fecha.getFullYear()}`);
        $("#diaGrande").html(`${dia} ${this.agregar0xd(this.fecha.getDate())}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.fecha.getFullYear()} `);
        $("#diaSiguiente").html(`${this.agregar0xd(this.fecha.getDate()+1)}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.fecha.getFullYear()}`);
        $("#fecha").attr("value",`${this.fecha.getFullYear()}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.agregar0xd(this.fecha.getDate())}`)

    }
    sumardia(){
        $("#Cargando").show();
        this.diasdiferencia+=1;
        let x;
        if(Math.abs(this.diasdiferencia)>this.limitedias){
            Swal.fire({
                icon: 'error',
                title: 'Diferencia de dias',
                text: 'Limite sobrepasado',
            })
            this.diasdiferencia=this.diasdiferencia-1;
            $("#Cargando").hide();
        }else{
            this.fecha.setDate(this.fecha.getDate()+1);
            console.log(this.fecha.getDay())
            if(this.fecha.getDay()==0){
                this.fecha.setDate(this.fecha.getDate()+1)
                this.diasdiferencia++
            }else if(this.fecha.getDay()==6){
                this.fecha.setDate(this.fecha.getDate()+2)
                this.diasdiferencia+=2
            }
            $("#fecha").val(`${this.fecha.getFullYear()}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.agregar0xd(this.fecha.getDate())}`);

            this.recalcularfecha();
            this.loadtable();
            this.createtable();
            console.log("dia: "+this.fechaformat)
            console.log("test: "+x)
        }
        console.log(this.diasdiferencia)
        
    }
    restardia(){
        $("#Cargando").show();
        this.diasdiferencia--;
        if(Math.abs(this.diasdiferencia)>this.limitedias){
            Swal.fire({
                icon: 'error',
                title: 'Diferencia de dias',
                text: 'Limite sobrepasado',
            })
            this.diasdiferencia++;
            $("#Cargando").hide();
        }else{
            this.fecha.setDate(this.fecha.getDate()-1);
            if(this.fecha.getDay()==0){
                this.fecha.setDate(this.fecha.getDate()-2)
                this.diasdiferencia-=2
            }else if(this.fecha.getDay()==6){
                this.fecha.setDate(this.fecha.getDate()-1)
                this.diasdiferencia--
            }
            console.log(`${this.fecha.getFullYear()}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.agregar0xd(this.fecha.getDate())}`)
            $("#fecha").val(`${this.fecha.getFullYear()}-${this.agregar0xd(this.fecha.getMonth()+1)}-${this.agregar0xd(this.fecha.getDate())}`);
            this.recalcularfecha();
            this.loadtable();
            this.createtable();
            console.log("dia: "+this.fechaformat)
        }
        console.log(this.diasdiferencia)
        console.log(this.fecha);
    }
    traveldia(){
        $("#Cargando").show();
        console.log($("#fecha").val())
        this.fecha= new Date($("#fecha").val())
        this.fecha.setDate(this.fecha.getDate()+1);
        const datehoy= new Date()
        datehoy.setHours(0)
        datehoy.setMinutes(0)
        datehoy.setSeconds(0)
        datehoy.setMilliseconds(0)
        
        this.fecha.setHours(0)
        this.fecha.setMinutes(0)
        this.fecha.setSeconds(0)
        this.fecha.setMilliseconds(0)

        this.diasdiferencia=((this.fecha-datehoy)/(1000*3600*24))
        console.log("fecha elegida"+this.fecha)
        console.log("fecha hoy: "+datehoy)
        console.log(this.diasdiferencia)
        this.recalcularfecha();
        this.loadtable();
        this.createtable();
    }



    cargarvarr(){
        localStorage.setItem("user","holi");

        let x=localStorage.getItem("user");

        //localStorage.clear()//limpia todas las variables

        //localStorage.removeItem()//
        console.log(x);
        
    }
    loadtable(){
        $("#Cargando").show()
        
        /*let qq=`{
            fechaaSalaspedidas(fecha: "${this.varr}") {
              id
              fechaPeticion
              numeroAprendizaje
              objetivoAprendizaje
                }
            }`
        
        let mm=`mutation {
            usuariocreate(
              email: "${string}"
              huella: "${string}"
              password: "string"
              perfil: 1
              user: "string"
            ) {
              ok
              error
            }
          }`
        */
        let queryrial=`query _fechasSalaspedidas_540 {
            fechasSalaspedidas(fecha: "${this.fechaformat}") {
              id
              idProfesor {
                id
                user
              }
              idSala {
                id
                nombre
              }
              idhorario {
                id
                horainicio
                horafinal
              }
              idAsignatura {
                id
                nombre
              }
              idCurso {
                id
                nombre
              }
              fechaPeticion
              numeroAprendizaje
              objetivoAprendizaje
              oa{
                numero
                titulo
              }
            }
          }
          `
        console.log(this.idusuario)
        let query2= `query{
  
            allHorarios{
              id
              horainicio
              horafinal
             
            }
            
            asignaturasasignadas(id: ${this.idusuario}) {
                id
                idprofe{
                  id

                }
                idasignatura {
                  id
                  nombre
                }
            }
            
            allCursos {
                id
                nombre
                
            }

            allSalas{
              id
              nombre
              publica
            }
            fechasSalaspedidas(fecha: "${this.fechaformat}") {
                id
                idProfesor {
                  id
                  user
                  
                }

                idSala {
                  id
                  nombre
                }
                idhorario {
                  id
                  horainicio
                  horafinal
                }
                idAsignatura {
                  id
                  nombre
                }
                idCurso {
                  id
                  nombre
                }
                fechaPeticion
                numeroAprendizaje
                objetivoAprendizaje
                oa{
                    numero
                    titulo
                  }
              }
            
        }`

        axios.post('/graphql/',{
            query:query2
        })
        .then(response =>{
            console.log(response.data.data);
            this.horarios=response.data.data.allHorarios
            this.salas= response.data.data.allSalas
            this.salaspedidas= response.data.data.fechasSalaspedidas
            console.log(this.salaspedidas)
            this.asignaturasasignadas= response.data.data.asignaturasasignadas
            this.cursos=response.data.data.allCursos
            console.log(this.nivel)
            this.createtable()
            $("#Cargando").hide();
        })
        .catch(error=>{
            console.log(error);

        })


    }

    
    
    comprobarhora(standar){
        let horaelegida=$("#SelectHora").val();
        let salaelegida=$("#SelectSala").val();
        let horaocupada=[]

        this.salaspedidas.forEach(dat=>{

            if(dat.idSala.id==salaelegida){

                this.horarios.forEach(horarios=>{
                    console.log(horarios.id+" "+dat.idhorario.id)
                    if(horarios.id==dat.idhorario.id){
                        console.log("ocupadini")
                        horaocupada.push(horarios.id)
                        
                        
                    }
                })

            }
        })
        
        console.log(horaocupada)
        let html=`${this.horarios.map(dat=>{
                console.log(dat.id+" "+horaocupada)
                if(horaocupada.indexOf(dat.id)>-1){
                    console.log("ocupado")
                    return `<option disabled>${dat.horainicio}-${dat.horafinal}</option>`
                }else{
                    console.log("descoupado")
                    return `<option value="${dat.id}">${dat.horainicio}-${dat.horafinal}</option>`
                }
            })}
            `

        
        $("#SelectHora").html(html)
        console.log(standar)
        if(standar){
            $("#SelectHora").val(standar)
        }
        
        

    }

    createtable(){
        let ocupados=[]
        let desocupados=[]
        let temp=""
        let tempcurso=""
        let tempasignatura=""
        let tempn=""
        let html=`
            <table>
                <tr>
                    <th> </th>
                    ${this.salas.map(salax=>{
                        if(salax.publica==0){
                            return
                        }
                        return `<th> 
                                    ${salax.nombre}
                                </th>
                                
                                
                                `
                    }).join("")}
                    
                    ${this.horarios.map(horariox=>{

                        return`
                        <tr>

                            <td>
                                <label>${horariox.horainicio} </label>
                                    -
                                <label>${horariox.horafinal} </label>
                            </td>

                            ${this.salas.map(salax=>{
                                
                                if(salax.publica==0){
                                    return
                                }
                                if(this.salaspedidas.length>0){
                                    
                                    return `
                                        <td class="coso" id="${salax.id}-${horariox.id}">
                                        ${
                                            
                                            this.salaspedidas.map(salaspedidasx=>{
                                            
                                            
                                            if(salaspedidasx.idSala.id==salax.id && salaspedidasx.idhorario.id==horariox.id){
                                                ocupados.push(salax.id+"-"+salax.nombre+"-"+horariox.id+"-"+horariox.horainicio+"~"+horariox.horafinal)

                                                if(this.idusuario==salaspedidasx.idProfesor.id){
                                                    temp=`<a class="DivPropio" id="${salaspedidasx.id}" info="${salaspedidasx.objetivoAprendizaje}" onclick="pedirsalas.eliminarreserva('${salaspedidasx.id}')" >
                                                            <h2 class="Ayuda">Eliminar reserva</h2>
                                                        `
                                                }else{
                                                    temp=`<a class="DivOcupado" id="${salaspedidasx.id}" info="${salaspedidasx.objetivoAprendizaje}">`
                                                }
                                                if(salaspedidasx.idAsignatura!=undefined){
                                                    if(salaspedidasx.idAsignatura.id==38){
                                                        tempasignatura=""
                                                    }else{
                                                        tempasignatura=`<p class="OA">${salaspedidasx.idAsignatura.nombre}</p>`
                                                    }
                                                    if(salaspedidasx.idCurso.id==22){
                                                        tempcurso=""
                                                    }else{
                                                        tempcurso=`<h3>${salaspedidasx.idCurso.nombre}</h3>`
                                                    }
                                                }else{
                                                    tempasignatura=""
                                                    tempcurso=""
                                                }
                                                    

                                                if(salaspedidasx.oa==null){
                                                    tempn=`<p>${salaspedidasx.objetivoAprendizaje}</p></a>`
                                                }else{
                                                    tempn=`<p>${"OA "+salaspedidasx.oa.numero} <span class="OA">${salaspedidasx.oa.titulo}</span></p></a>`
                                                }

                                                return `
                                                    ${temp}
                                                    <h3>${salaspedidasx.idProfesor.user}</h3>
                                                    ${tempasignatura}
                                                    ${tempcurso}
                                                    ${tempn}
                                                
                                                `
                                            }else{
                                                desocupados.push(salax.id+"-"+salax.nombre+"-"+horariox.id+"-"+horariox.horainicio+"~"+horariox.horafinal);
                                            }
                                                
                                            
                                            
                                            
                                            }).join("")
                                        }
                                            
                                        `    
                                }else{

                                    desocupados.push(salax.id+"-"+salax.nombre+"-"+horariox.id+"-"+horariox.horainicio+"~"+horariox.horafinal);
                                    return `<td class="coso" id="${salax.id}-${horariox.id}">`
                                }
                                
                            }).join("")}
                            

                        </tr>
                        
                        
                        `
                    }).join("")}


                </tr>
            </table>
        `

        $("#calendario").html(html)
        let dataarr=new Set(desocupados)
        

        let fechaactual=new Date()
        

        this.fecha.setHours(0)
        this.fecha.setMinutes(0)
        this.fecha.setSeconds(0)
        this.fecha.setMilliseconds(0)
        var pasado=false;
        
        if(this.diasdiferencia<=-0.2){
            pasado=true;
            console.log((this.fecha-fechaactual)/(1000* 3600 )+"No puedes pedir salas")
        }
        dataarr.forEach(function(x,n){

                if(ocupados.indexOf(x)!== -1){
                    
                }else{
                    
                    

                    if(pasado==true){
                        $("#"+x.split("-")[0]+"-"+x.split("-")[2]).html(`<a class="Ocupado"  ><p>X</p></a>`)
                    }
                    else{
                        $("#"+x.split("-")[0]+"-"+x.split("-")[2]).html(`<a class="Ocupado" onclick="pedirsalas.ventanaprofesor('${x}',1)" >Libre</a>`)
                    }
                }

                
            
        })
        

    }
    
    
    alternartipodereserva(x){
        if(x==1){
            $("#B-Otro").removeClass("Seleccionado")
            $("#B-Clase").addClass("Seleccionado")
            $("#Extra").html(`<div>
                <p><label>Asignatura:</label><span>
                                    
                            <select id="SelectAsignatura" required onchange="pedirsalas.mostraroas()">
                                ${this.asignaturasasignadas.map(dato=>{
                                
                                    return`<option value="${dato.idasignatura.id}">${dato.idasignatura.nombre}</option>`
                                    
                                }).join()}
                                <option value=""></option>
                            </select>
                        </span>
                </p>            
            </div>
            <div>
                <p><label>Curso:</label><span>
                                    
                            <select id="SelectCurso" required onchange="pedirsalas.mostraroas()">
                                ${this.cursos.map(dato=>{
                                return`<option value="${dato.id}">${dato.nombre}</option>`
                                }).join()}
                            </select>
                        </span>
                </p>            
            </div>
            

            <h4>Objetivo de aprendizaje</h4>
            <div>
                
                <select id="SelectOas">
                    <option value="0">Sin OA</option>
                    
                </select>
            </div>`)
        }else{
            $("#B-Clase").removeClass("Seleccionado")
            $("#B-Otro").addClass("Seleccionado")
            $("#Extra").html(`<div>
            <p><label>Asunto:</label><span>
                                
                        <input type="text" id="Asunto">
                    </span>
            </p>            
        </div>`)
        }
    }
    mostraroas()
    {
        if($("#SelectAsignatura").val()==undefined || $("#SelectCurso").val()==undefined){
            return
        }
        let html=`
            <option value="0">Sin OA</option>
            ${this.oas.map(dat=>{
                if(dat.asignatura==$("#SelectAsignatura").val() && dat.curso==$("#SelectCurso").val()){
                    return`<option value="${dat.id}">N°:${dat.numero} ${dat.titulo}</option>`
                }
            }).join("")}
        `
        $("#SelectOas").html(html)
    }
    ventanaprofesor(datos,crear){
        let html;

            
                let sala=datos.split("-")[0];
                
                html=`
                <h1>Reserva Sala</h1>
                

                <div>
                    <p>Tipo de reserva:</p>
                    <p><button id="B-Clase" onclick="pedirsalas.alternartipodereserva(1)">Clase</button><button id="B-Otro" onclick="pedirsalas.alternartipodereserva(2)">Otro</button></p>
                    <p><label>Sala:</label> 
                    <span>
                    <select id="SelectSala" onchange="pedirsalas.comprobarhora()" required>
                    <option value="${datos.split("-")[0]}">${datos.split("-")[1]}</option>
                        ${this.salas.map(dato=>{

                            if(sala==dato.id){

                            }else{
                                return`<option value="${dato.id}">${dato.nombre}</option>`
                            }
                        
                        }).join()}
                    </select>
                    </span>
                    </p>
                
                </div>

                <div>
                <p> <label>Hora:</label><span>
                                    
                            <select id="SelectHora" required>
                            
                            </select>
                        </span>
                </p>            
                </div>

                <div id="Extra">

                </div>

                
                <button id="CrearPeticion" onclick="pedirsalas.crearpedirsala()">Pedir sala</button>
                
                ` 
            

        if($('#Ventana').length){
            $("#Ventana").html(html);
                this.comprobarhora(datos.split("-")[2])
                setTimeout(()=>{
                    $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana");
                },100)
        }else{
            const x=`<div id="Ventana" class="AbrirVentana">
                        ${html}
                    </div>
            `
            $("Body").append(x);
            this.comprobarhora(datos.split("-")[2])
            setTimeout(()=>{
                window.addEventListener('click',function(e){
                    
                        if (document.getElementById('Ventana').contains(e.target)){
                            console.log("clickeo dentro");
                        }else{
                            console.log("clickeo afuera");    
                            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");

                        }
                      
                })

            },200);
        }

        this.alternartipodereserva(1)

    }
    crearpedirsala(){
        $("#Cargando").show();
        let oa=0
        let asig=0
        let curso=0
        if($("#SelectAsignatura").val()==undefined){
            
        }else{
            asig=$("#SelectAsignatura").val()
            curso=$("#SelectCurso").val()
            oa=$("#SelectOas").val()
        }
        console.log($("#Asunto").val())
        $.ajax({
            url: '/PedirSala',
            type: 'POST',
            data: {
                "iduser":pedirsalas.idusuario,
                "idsala":$("#SelectSala").val(),
                "idhorario":$("#SelectHora").val(),
                "idasignatura":asig,
                "idcurso":curso,
                "asunto":$("#Asunto").val(),
                "idoa":oa,
                "fecha":pedirsalas.fechaformat
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                pedirsalas.loadtable();
                pedirsalas.createtable();
                $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
                
            },
            error: function (data) {
                console.log(data)
            }
        });
       
    }

    
    eliminarreserva(id){
        $("#Cargando").show();
        if(confirm("¿Desea eliminar la reserva?")){
            
        }else{
            return
        }
        console.log(id)
        let mut=`mutation {
            salaspedidaseliminar(idpeticion: ${id}) {
              ok
              error
            }
          }`
          axios.post('/graphql/',{
            query:mut
        })
        .then(response =>{
            
            this.loadtable();
            this.createtable();
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
            
        })
        .catch(error=>{
            console.log(error);
            $("#Cargando").hide();
        })

    }
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
    }
    agregar0xd(x){
        if(x<=9){
            return "0"+x
        }else{
            return x
        }
    }
    quemes(x){
        switch(x){
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
    quedia(x){
        switch(x){
            case 1:
                return "Lunes"
            case 2:
                return "Martes"
            case 3:
                return "Miercoles"
            case 4:
                return "Jueves"
            case 5:
                return "Viernes"
            case 6:
                return "Sabado"
            case 0:
                return "Domingo"
        }
    }
    

}