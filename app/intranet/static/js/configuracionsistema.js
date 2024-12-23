class javaconfiguracionsistema{

    constructor(){
        this.calendario=[]
        this.mescalendario=[]
        this.cargarcalendario()
        this.cargarconfiguracion()
        this.datos
        this.hoy=new Date()
        this.messeleccionado=this.hoy.getMonth()+1
        this.ini=0
        this.f1=0
        this.f2=0
        this.f3=0
        this.f4=0
        
    }
    cargarconfiguracion(){
        $.ajax({
            url: '/ConfiguracionSistema',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                configuracion.datos=data
                configuracion.mostrardatos()
                $("#Cargando").hide()
            },
            error: function (data) {
               
            }
        });
    }
    aplicarferiadosnuevos(){
        $("#Cargando").show()
        $.ajax({
            url: '/aplicarferiadosnuevos',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                configuracion.cargarconfiguracion()
            },
            error: function (data) {
               
            }
        });
    }
    cargarcalendario(){
        $("#Cargando").show()
        $.ajax({
            url: '/loadcalendario',
            type: 'POST',
            data: {
                year:2023
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                configuracion.calendario=data
                
                
            },
            error: function (data) {
               
            }
        });
    }
    CambiarMesCalendario(x,division){
        if(x==0 || x==13){
            return
        }
        this.messeleccionado=x
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
        
        this.MostrarCalendarioDinamico(division)
        
    }
    abrircalendario(division){
        if($("#CalendarioDinamico").hasClass("AbrirCalendario")){
            
            $("#CalendarioDinamico").removeClass("AbrirCalendario").addClass("CerrarCalendario")
            
        }else{
            
            $("#CalendarioDinamico").removeClass("CerrarCalendario").addClass("AbrirCalendario")
            this.CambiarMesCalendario(this.messeleccionado,division)
        }
    }
    cerrarcalendario(){
        
            
        $("#CalendarioDinamico").removeClass("AbrirCalendario").addClass("CerrarCalendario")
            

    }
    MostrarCalendarioDinamico(division)
    {
        let temp2=""
        if(division==1){
            temp2="Seleccionar inicio de la asistencia"
        }else if(division==2){
            temp2="Seleccionar primera parte"
        }else if(division==3){
            temp2="Seleccionar segunda parte"
        }else if(division==4){
            temp2="Seleccionar tercera parte"
        }else if(division==5){
            temp2="Seleccionar cuarta parte"
        }
        let temp=""
        let html=`
        <button onclick="configuracion.cerrarcalendario()" id="cerrar">Cerrar</button>
        <div id="mensaje">${temp2}</div>
        <div id="ControlMes"><img onclick="configuracion.CambiarMesCalendario(${this.messeleccionado-1},${division})" src="/static/img/imgflechaverde.png"><h2 id="Mes">${this.quemes(this.messeleccionado)}</h2><img onclick="configuracion.CambiarMesCalendario(${this.messeleccionado+1},${division})" src="/static/img/imgflechaverde.png"></div>
        
        <table>
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
            ${this.mescalendario.map((dat,index)=>{
                
                if(dat.tipodia==1){
                    
                        temp=`<td class="Laboral" id="${dat.year}-${dat.mes}-${dat.dia}" onclick="configuracion.cambiarfechas(${division},${dat.id})"><p>${dat.dia}</p></td>`
                     
                    
                    
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
    }
    
    mostrardatos(){
        let html=""
        let html2=""
        if(this.datos.divisionyear==0){
            html=`<option value="0">Selecciona</option>
            <option value="2">Semestre</option>
            <option value="3">Trimestre</option>

            `

        }else if(this.datos.divisionyear==2){
            html=`<option value="0">Semestre</option>
            <option value="3">Trimestre</option>

            `
            html2=`<button onclick="configuracion.abrircalendario(1)">Inicio de clases ${this.quemes2(this.datos.ninicio)}</button>
                    <button onclick="configuracion.abrircalendario(2)">Final de primer semestre ${this.quemes2(this.datos.nfinal1)} (${this.datos.c1})</button>
                    <button onclick="configuracion.abrircalendario(3)">Final de segundo semestre ${this.quemes2(this.datos.nfinal2)} (${this.datos.c2})</button>
            `
        }else if(this.datos.divisionyear==3){
            html=`<option value="0">Trimestre</option>
            <option value="2">Semestre</option>

            `
            html2=`<button onclick="configuracion.abrircalendario(1)">Inicio de clases ${this.quemes2(this.datos.ninicio)}</button>
                    <button onclick="configuracion.abrircalendario(2)">Final de primer semestre ${this.quemes2(this.datos.nfinal1)} (${this.datos.c1})</button>
                    <button onclick="configuracion.abrircalendario(3)">Final de segundo semestre ${this.quemes2(this.datos.nfinal2)} (${this.datos.c2})</button>
                    <button onclick="configuracion.abrircalendario(4)">Final de tercer semestre ${this.quemes2(this.datos.nfinal3)} (${this.datos.c3})</button>
            `
        }
        $("#TipoYear").html(html)
        $("#Division").html(html2)


    }
    cambiardivision(){
        if($("#TipoYear").val()==0){
            return
        }
        $("#Cargando").show()
        $.ajax({
            url: '/ConfiguracionSistema',
            type: 'POST',
            data: {
                "division":$("#TipoYear").val()
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                
                configuracion.cargarconfiguracion()
                $("#Cargando").hide()
            },
            error: function (data) {
               
            }
        });
    }
    cambiarfechas(division,id){
        
        $("#Cargando").show()
        this.cerrarcalendario()
        let ini=0,f1=0,f2=0,f3=0,f4=0
        if(division==1){
            ini=id
        }else if(division==2){
            f1=id
        }else if(division==3){
            f2=id
        }else if(division==4){
            f3=id
        }else if(division==5){
            f4=id
        }
        console.log(f1,f2,f3,f4,ini)
        $.ajax({
            url: '/ConfiguracionSistema',
            type: 'POST',
            data: {
                "division":0,
                "inicio":ini,
                "f1":f1,
                "f2":f2,
                "f3":f3,
                "f4":f4
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                
                configuracion.cargarconfiguracion()
                
            },
            error: function (data) {
               $("#Cargando").hide()
            }
        });
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
    quemes2(x){
        if(x=="-"){
            return "(Sin asignar)"
        }
        let string=x.split("-")
        console.log(x)
        console.log(string[1])
        switch(parseInt(string[1])){
            case 1:
                return String(string[0])+" Enero"
            case 2:
                return String(string[0])+" Febrero"
            case 3:
                return String(string[0])+" Marzo"
            case 4:
                return String(string[0])+" Abril"
            case 5:
                return String(string[0])+" Mayo"
            case 6:
                return String(string[0])+" Junio"
            case 7:
                return String(string[0])+" Julio"
            case 8:
                return String(string[0])+" Agosto"
            case 9:
                return String(string[0])+" Septiembre"
            case 10:
                return String(string[0])+" Octubre"
            case 11:
                return String(string[0])+" Noviembre"
            case 12:
                return String(string[0])+" Diciembre"
        }
    }
}