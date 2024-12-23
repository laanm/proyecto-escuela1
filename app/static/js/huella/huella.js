class javahuella{

    constructor(){
        this.asistencias=[]
        this.alumnos=[]
        this.cursos=[]
        this.th=[];
        this.thexcel=[];
        this.lista=[];
        this.boolhora=false;
        this.filtros=[];
        this.seleccionados=[];
        this.optimizado=true;
        this.pag=1;
        this.hoy=new Date()
        this.min=new Date()
        this.min.setDate(this.min.getDate()-10)
        $("#Min").val(`${this.min.getFullYear()}-${this.agregar0xd(this.min.getMonth()+1)}-${this.agregar0xd(this.min.getDate())}`)
        $("#Max").val(`${this.hoy.getFullYear()}-${this.agregar0xd(this.hoy.getMonth()+1)}-${this.agregar0xd(this.hoy.getDate())}`)
        
        this.scroll=false;
        this.height=0;
        this.cargardatos()
        this.anchuradias=0;

        $(window).scroll(function() {
            let alturini=$(window).scrollTop();
            huella.height = alturini
            console.log(alturini)
            if(alturini  > 55 && !($("#Realth").hasClass("Especial"))) {
                $("#Filtros").removeClass("DesAjustar").addClass("Ajustar")
                $("#Realth").removeClass("Especial").removeClass("DesAjustarth").addClass("Ajustarth")
                $("#Realth2").removeClass("Especial").removeClass("DesAjustarth").addClass("Ajustarth")
                this.scroll=true;
                console.log("Ahora es terrible true")
            }else if(alturini < 55 && this.scroll==true){
                $("#Filtros").removeClass("Ajustar").addClass("DesAjustar")
                $("#Realth").removeClass("Especial").removeClass("Ajustarth").addClass("DesAjustarth")
                $("#Realth2").removeClass("Especial").removeClass("Ajustarth").addClass("DesAjustarth")
                this.scroll=false
                console.log("Ahora es terrible false")
            }
        });

        $("#MalditoScroll").hide()
          
       
    }

    recargardatos(){
        this.optimizado=true
        this.cargardatos(this.pag)
    }

    cargardatos(x){
        $("#Cargando").show()
        let altaquery="rangoAsistenciaalumno"
        let fechamin=new Date($("#Min").val())
        fechamin.setDate(fechamin.getDate())
        let fechamax= new Date($("#Max").val())
        fechamax.setDate(fechamax.getDate()+1)

        let diffdias2=Math.abs((fechamin.getTime()-fechamax.getTime())/(1000*3600*24))
        console.log(diffdias2)
        if(diffdias2 >= 29 && this.optimizado==true){
            Swal.fire({
                icon: 'info',
                title: 'Optimizacion',
                text: 'Al superar los 30 dias demorara un poco mas la carga de la informacion.',
                })
            altaquery="allAsistenciaalumno"
            this.optimizado=false;
            
        }

        

        $.ajax({
            url: '/alumnosporcurso',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                huella.alumnos=data
                huella.cargarcursos()
                huella.cargarasistencia(0)
                
            },
            error: function (data) {
               
            }
        });
    }

    cargarcursos(){
        $.ajax({
            url: '/datoscursos',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                huella.cursos=data
                huella.mostrarcursos()
            },
            error: function (data) {
               
            }
        });
    }

    cargarasistencia(){

        $.ajax({
            url: '/asistenciaalumnos',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                huella.asistencias=data
                huella.mostrardatos(1)
                
            },
            error: function (data) {
               
            }
        });
    }


    cargardatoscurso(){
        
        if($("#MultipleCursos").is(':checked')){
            
            $("#Cargando").show()
            console.log(this.filtros)
            let temp;
            let query2;
            this.filtros.forEach((dat,index)=>{
                console.log(dat.id)
                query2=`{
                    cursoasistenciaalumno(idcurso: ${dat.id}) {
                      id
                      horaasitencias
                      horasalida
                      atrasoresuelto
                      alumno {
                        id
                        rut
                        nombre
                        correo
                      }
                    }
                    cursohuellaalumno(idcurso: ${dat.id}) {
                        id
                        rut
                        nombre
                        correo
                        curso {
                        id
                        nombre
                        }
                        junaeb
                    }
                  }                  
                `
                axios.post("/graphql/",{
                                query:query2
                            }).then(response=>{
                                console.log(this.asistencias)
                                console.log(response.data.data.cursoasistenciaalumno)
                                temp=response.data.data.cursoasistenciaalumno
                                if(index==0){
                                    this.asistencias=response.data.data.cursoasistenciaalumno
                                    this.alumnos=response.data.data.cursohuellaalumno
                                }else{
                                    this.asistencias= this.asistencias.concat(temp)
                                    this.alumnos= this.alumnos.concat(response.data.data.cursohuellaalumno)
                                }
                                console.log(`Curso ${dat.texto}`)
                                console.log(this.asistencias)
                                if(index==this.filtros.length-1){
                                    $("#Cargando").hide()
                                    this.mostrardatos(1)
                                    console.log("Resultado final:")
                                    console.log(this.asistencias)
                                }
                                
                            }).catch(error=>{
                                console.log(error)
                                $("#Cargando").hide()
                            })

            })

            
        
            
        }else{
            $("#Cargando").show()
            if($("#Curso").val()==0){
                this.cargardatos()
            }else{
                let query2=`
                {
                    cursoasistenciaalumno(idcurso: ${$("#Curso").val()}) {
                    id
                    horaasitencias
                    horasalida
                    atrasoresuelto
                    alumno {
                        id
                        rut
                        nombre
                        correo
                    }
                    }

                    cursohuellaalumno(idcurso: ${$("#Curso").val()}) {
                        id
                        rut
                        nombre
                        correo
                        curso {
                        id
                        nombre
                        }
                        junaeb
                    }
                }
                    
                `
        
                axios.post("/graphql/",{
                    query:query2
                }).then(response=>{
                    this.asistencias=response.data.data.cursoasistenciaalumno
                    this.alumnos=response.data.data.cursohuellaalumno
                    $("#Cargando").hide()
                    this.mostrardatos()
                }).catch(error=>{
                    console.log(error)
                    $("#Cargando").hide()
                })
            }
        }
        
      }

    mostrarcursos(){
        let html=`
            <option id="op0" value="0">Todos</option>
        ${this.cursos.map(dat=>{

            return `<option id="op${dat.id}" value="${dat.id}">${dat.nombre}</option>`

        })}
        `
        $("#Curso").html(html)
    }
    paginar(x){
        let npag=Math.ceil(x/100)+1
        let html="";

        for(var i=1;i<npag;i++){
            if(i==1){
                html+=`<button id="Pag${i}" class="Actual BotonPagina" onclick="huella.mostrardatos(${i})">${i}</button>`

            }else{
                html+=`<button id="Pag${i}" class="BotonPagina" onclick="huella.mostrardatos(${i})">${i}</button>`

            }
        }
        
        
        $("#Paginas").html(html)
        $(".BotonPagina").removeClass("Actual")
        $(`#Pag${this.pag}`).addClass("Actual")
    }
    
    mostrardatos(x){
        $("#Cargando").show()
        

        
        let aux=false;
        this.pag=x;

        let lista=[]
        let th=""
        this.thexcel=[];
        let primera=true;
        let limitefaltas=0;
        let faltas=0;
        let atrasos=0;
        let pts=0;
        let filtro=false;
        let nfiltros=0;
        let temp2="";
        let fechamin=new Date($("#Min").val())
        fechamin.setDate(fechamin.getDate())
        let fechamax= new Date($("#Max").val())
        fechamax.setDate(fechamax.getDate()+1)

        if(fechamin>=fechamax){
            Swal.fire({
                icon: 'error',
                title: 'Rango invalido',
                text: 'El rango minimo no puede superar al maximo',
            })
            $("#Min").val(`${this.min.getFullYear()}-${this.agregar0xd(this.min.getMonth()+1)}-${this.agregar0xd(this.min.getDate())}`)
            $("#Max").val(`${this.hoy.getFullYear()}-${this.agregar0xd(this.hoy.getMonth()+1)}-${this.agregar0xd(this.hoy.getDate())}`)
            fechamin=new Date($("#Min").val())
            fechamin.setDate(fechamin.getDate())
            fechamax= new Date($("#Max").val())
            fechamax.setDate(fechamax.getDate()+1)
        }

        
        
        let diffdias=Math.abs((fechamin.getTime()-fechamax.getTime())/(1000*3600*24))

        if(diffdias >= 29 && this.optimizado==true){
            console.log("x")
            this.cargardatos(this.pag)
            return
        }
    
        this.alumnos.forEach((dat2,index)=>{

            
            console.log("test"+dat2.cursoid)
            console.log(this.filtros)
            this.filtros.forEach(filtro2=>{
                
                if(dat2.cursoid==filtro2.id){
                    filtro=true
                }
            })
                
            
                

            
            if($("#Curso").val()==0){

            }else{
                if(filtro==false && this.filtros.length){
                
                filtro=false;
                nfiltros++;
                return
                }else{
                    filtro=false;
                }
            }
            

            

            if(dat2.rut=="-"){
                lista.push({id:dat2.id,nombre:dat2.nombre,rut:dat2.ipe,curso:dat2.curso,faltas:0,atrasos:0,minatraso:0,atrasopromedio:0,td:"",tdhora:""})

            }else{
                lista.push({id:dat2.id,nombre:dat2.nombre,rut:dat2.rut,curso:dat2.curso,faltas:0,atrasos:0,minatraso:0,atrasopromedio:0,td:"",tdhora:""})

            }
            faltas=limitefaltas;
            atrasos=0;
            
            let util=new Date(fechamin)
            let util2=new Date()
            let temp="";
            
            let temphora="";
            let minatraso=0;
            

            for(var i=0;i<diffdias;i++){
            
                util.setDate(util.getDate()+1);

                
                if(util.getDay()==1 || util.getDay()==2 || util.getDay()==3 || util.getDay()==4 || util.getDay()==5){
                    
                    lista[index-nfiltros][`${util.getFullYear()}-${util.getMonth()+1}-${util.getDate()}`]="-";
                    
                    temp="-";
                    temphora="-";
                    temp2=`${dat2.id}T${util.getFullYear()}T${util.getMonth()+1}T${util.getDate()}`
                    
                    if(primera==true){
                        faltas++;
                        limitefaltas++;
                        switch(util.getDay()){
                            case 1:
                                th+=`<th>L-${util.getDate()}</th>`
                            break;
                            case 2:
                                th+=`<th>M-${util.getDate()}</th>`
                            break;
                            case 3:
                                th+=`<th>MI-${util.getDate()}</th>`
                            break;
                            case 4:
                                th+=`<th>J-${util.getDate()}</th>`
                            break;
                            case 5:
                                th+=`<th>V-${util.getDate()}</th>`
                            break;
                        }
                        this.thexcel+=`<th>${util.getDate()}-${util.getMonth()}-${util.getFullYear()}</th>`
                    }
                    this.asistencias.map(dat=>{
                        util2=new Date(dat.horaasistencias)
                        
                        if(util2.getFullYear()==util.getFullYear() &&
                        util2.getMonth()+1==util.getMonth()+1 &&
                        util2.getDate()==util.getDate() &&
                        dat.alumno==dat2.id
                        ){
                            if(lista[index-nfiltros][`${util.getFullYear()}-${util.getMonth()+1}-${util.getDate()}`]=="-"){
                                faltas--;
                                
                                if(dat.atrasoresuelto==true){
                                    lista[index-nfiltros][`${util.getFullYear()}-${util.getMonth()+1}-${util.getDate()}`]=`${util2.getHours()}:${this.agregar0xd(util2.getMinutes())}`;
                                    temp="R"
                                    temp2=dat.id
                                    temphora=`${util2.getHours()}:${this.agregar0xd(util2.getMinutes())}`
                                }else if(util2.getHours()>=8 && util2.getMinutes()>=0){
                                    lista[index-nfiltros][`${util.getFullYear()}-${util.getMonth()+1}-${util.getDate()}`]=`${util2.getHours()}:${this.agregar0xd(util2.getMinutes())}`;
                                    temp="ø"
                                    temphora=`${util2.getHours()}:${this.agregar0xd(util2.getMinutes())}`
                                    minatraso+=((util2.getHours()-8)*60)+util2.getMinutes()
                                    temp2=dat.id
                                    atrasos++;
                                    
                                }else if(util2.getHours()<=8){
                                    lista[index-nfiltros][`${util.getFullYear()}-${util.getMonth()+1}-${util.getDate()}`]=`${util2.getHours()}:${this.agregar0xd(util2.getMinutes())}`;
                                    temp="✓"
                                    temp2=dat.id
                                    temphora=`${util2.getHours()}:${this.agregar0xd(util2.getMinutes())}`
                                    
                                }
                                
                                
                            }
                            
                            
                            
                            
                        }
                    })
                    if(temp=="✓" || temp=="R"){
                        
                        lista[index-nfiltros]['td']+=`<td>${temp}</td>`
                        lista[index-nfiltros]['tdhora']+=`<td>${temphora}</td>`
                    }else{
                        
                        this.seleccionados.forEach(dat=>{
                            if(temp2==dat){
                                lista[index-nfiltros]['td']+=`<td id="A${temp2}" class="Seleccionado" onclick="huella.seleccionar('${temp2}')">${temp}</td>`
                                lista[index-nfiltros]['tdhora']+=`<td id="A${temp2}" class="Seleccionado" onclick="huella.seleccionar('${temp2}')">${temphora}</td>`
                                aux=true
                            }

                        })
                        if(aux==false){
                            lista[index-nfiltros]['td']+=`<td id="A${temp2}" onclick="huella.seleccionar('${temp2}')">${temp}</td>`
                            lista[index-nfiltros]['tdhora']+=`<td id="A${temp2}" onclick="huella.seleccionar('${temp2}')">${temphora}</td>`
                        }
                        
                        aux=false;
                    }
                    
                    
                    lista[index-nfiltros]['faltas']=faltas
                    lista[index-nfiltros]['atrasos']=atrasos
                    lista[index-nfiltros]['minatrasos']=minatraso
                    if(atrasos==0){
                        lista[index-nfiltros]['atrasopromedio']=0;
                    }else{
                        lista[index-nfiltros]['atrasopromedio']=minatraso/atrasos
                    }
                    
                    
                    
                }
            }
            primera=false;
            
            
            

        })
        

        //console.log(lista)

        lista.sort(function(a,b){
            if(a.faltas===b.faltas){
                
            }
            if(a.faltas<b.faltas){
                return 1;
            }
            if(a.faltas>b.faltas){
                return -1;
            }
            return 0;
       })

       
       
        
        this.th=th;
        this.lista=lista;
        let html="";
        let htmldias="";
        let encabezado=""
        let encabezado2=""
        console.log(this.scroll)
        console.log(this.height)
        console.log(th)
        console.log(this.th)
        if(this.height > 55){
            encabezado=`<tr id="Realth" class="Especial">`
            encabezado2=`<tr id="Realth2" class="Especial">`
        }else{
            encabezado=`<tr id="Realth">`
            encabezado2=`<tr id="Realth2">`
        }
        console.log(lista)
        this.paginar(lista.length)
        console.log(x)
        

        if(lista.length){
                htmldias=`

                    <table id="TablaDias">
                    <tbody id="CuerpoDias">
                        ${encabezado2}
                            ${th}
                        </tr>

                        <tr class="Faketh">
                            ${th}
                        </tr>
                        <tr>
                            <td></td>
                        </tr>

                        ${lista.map((dat,index2)=>{
                            if(index2<(100*x-100) || index2 > (100*x)){
                                console.log("paso");
                                return "";
                            }

                            return `
                                <tr>
                                    ${dat.td}
                                </tr>
                            
                            `
                        }).join("")}

                    </tbody>
                    </table>
                `
                html=`
                        
                            ${encabezado}
                                <th class="DatoGrande">Nombre</th>
                                <th  class="DatoGrande">RUN/IPA</th>
                                <th  class="DatoGrande">Curso</th>
                                
                                
                                <th class="DatoMediano">N° Faltas</th>
                                <th class="DatoMediano">N° Atrasos</th>
                                <th class="DatoMediano">Minutos atrasado</th>
                                
                                
                            </tr>
                            
                            <tr class="Faketh">
                                <th class="DatoGrande">Nombre</th>
                                <th  class="DatoGrande">Rut</th>
                                <th  class="DatoGrande">Curso</th>
                                
                                
                                <th class="DatoMediano">N° Faltas</th>
                                <th class="DatoMediano">N° Atrasos</th>
                                <th class="DatoMediano">Minutos atrasado</th>


                            </tr>
                               
                            
                                          
                        </tr>
                            ${lista.map((dat,index2)=>{
                                
                                if(index2<(100*x-100) || index2 > (100*x)){
                                    console.log("paso");
                                    return
                                }
                                

                                return`
                                <tr>
                                    <td>${dat.nombre}</td>
                                    <td>${dat.rut}</td>
                                    <td>${dat.curso}</td>
                                    
                                    <td>${dat.faltas}</td>
                                    <td>${dat.atrasos}</td>
                                    <td>${dat.minatrasos}</td>
                                    
                                </tr>
                                `
                            })}
                            
                        `


                
        }else{
            if($("#MultipleCursos").is(':checked')){
                html=`<h1>Selecciona los cursos</h1>
                    
                    `
            }else{
                Swal.fire({
                icon: 'info',
                title: 'Datos no encontrados',
                text: 'Intente con otro filtro',
                })
            }
            
        }
        $("#Cargando").hide()
        $("#ScrollTabla").html(htmldias)
        
        this.anchuradias=$("#CuerpoDias").width();
        
        if(this.anchuradias > $("#TablaDias").width()){
            $("#MalditoScroll").show()
        }
        $("#MalditoScroll").prop("min",$("#TablaDias").width())
        $("#MalditoScroll").prop("value",$("#TablaDias").width())
        $("#MalditoScroll").prop("max",this.anchuradias)
        $("#TablaAsistencia").html(html)
        
        this.boolhora=false;
        $("#Check").prop("checked",false);
    }

    verhora(){
        console.log(this.height)
        
        let encabezado2=""
        let htmldias=""
        if(this.height > 55){
            
            encabezado2=`<tr id="Realth2" class="Especial">`
        }else{
            
            encabezado2=`<tr id="Realth2">`
        }
        if(this.boolhora==false && this.lista.length){
            htmldias=`

            <table id="TablaDias">
            <tbody id="CuerpoDias">
                ${encabezado2}
                    ${this.th}
                </tr>

                <tr class="Faketh">
                    ${this.th}
                </tr>
                <tr>
                    <td></td>
                </tr>

                ${this.lista.map((dat,index2)=>{
                    if(index2<(100*this.pag-100) || index2 > (100*this.pag)){
                        console.log("paso");
                        return "";
                    }

                    return `
                        <tr>
                            ${dat.tdhora}
                        </tr>
                    
                    `
                }).join("")}

            </tbody>
            </table>
        `
        this.boolhora=true;


        }else if(this.lista.length){
            htmldias=`

            <table id="TablaDias">
            <tbody id="CuerpoDias">
                ${encabezado2}
                    ${this.th}
                </tr>

                <tr class="Faketh">
                    ${this.th}
                </tr>

                <tr>
                    <td></td>
                </tr>

                ${this.lista.map((dat,index2)=>{
                    if(index2<(100*this.pag-100) || index2 > (100*this.pag)){
                        console.log("paso");
                        return "";
                    }


                    return `
                        <tr>
                            ${dat.td}
                        </tr>
                    
                    `
                }).join("")}

            </tbody>
            </table>
        `
        
        this.boolhora=false;
        
        }else{
            this.boolhora=false;
            $("#Check").prop("checked",false);
        }
        $("#ScrollTabla").html(htmldias)
        
        this.seleccionados.forEach(dat=>{
            $(`#A${dat}`).addClass("Seleccionado")
        })
        $("#TablaDias").css({'left': `-${$("#MalditoScroll").val()-$("#TablaDias").width()+17}px`});
        $("#Cargando").hide()
        
    }
    malditoscroll(){
        
        console.log("Omg")
        console.log(this.anchuradias-$("#MalditoScroll").val())
        console.log($("#MalditoScroll").val()-this.anchuradias)
        
        $("#TablaDias").css({'left': `-${$("#MalditoScroll").val()-$("#TablaDias").width()+17}px`});
    }
    generarinformeexcel(){
        let html=`
        
                <tr>
                    <th>Nombre</th>
                    <th>RUN/IPA</th>
                    <th>Curso</th>
                    <th>N° Faltas</th>
                    <th>N° Atrasos</th>
                    <th>Minutos Atrasos</th>

                    ${this.thexcel}

                </tr>

                ${this.lista.map(dat=>{

                    return `
                    
                    <tr>
                        <td>${dat.nombre}</td>
                        <td>${dat.rut}</td>
                        <td>${dat.curso}</td>
                        <td>${dat.faltas}</td>
                        <td>${dat.atrasos}</td>
                        <td>${dat.minatrasos}</td>
                        ${dat.tdhora}
                    </tr>

                    
                    `

                })}
        
        `

            
        $("#TablaExcel").html(html)
        if(this.lista.length){
            let wb= XLSX.utils.table_to_book(document.getElementById("TablaExcel"));  //let wb= XLSX.utils.table_to_book(document.getElementById("TablaAsistencia"));
            XLSX.writeFile(wb,"Informe.xlsx");
        }else{

        }
        
        $("#TablaExcel").html("")

    }

    aviso(){

        if(!$("#MultipleCursos").is(':checked')){

            Swal.fire({
                icon: 'info',
                title: 'Se desactivo el filtro multiple',
                text: 'Se mostraran todos los cursos',
                })
            
            this.filtros=[];
            $("#FiltroCursos").html("")
            $("#Curso option").prop('disabled', false)
            $("#FiltroCursos").removeClass("desplegar").addClass("cerrar")
            this.optimizado=true
            this.cargardatos();
        }else{
            
                Swal.fire({
                icon: 'info',
                title: 'Se activo el filtro multiple de cursos',
                text: 'Al seleccionar un curso se agregara a la lista de filtros. estos pueden ser removidos al apretarlos en el cajon de filtros',
                })
                
            this.filtros=[];
            this.deseleccionar();
            $("#Curso").val("0");
            $("#op0").prop('disabled', true)
            
            $("#FiltroCursos").addClass("desplegar").removeClass("cerrar")
            
            
        }


    }

    agregarfiltro(){
        if($("#MultipleCursos").is(':checked')){
                
                this.filtros.push({id:$("#Curso").val(),texto:$("#Curso option:selected").text()})
                console.log("Test")
                let html=`${this.filtros.map((dat,index)=>{
                    return `<button onclick="huella.quitarfiltro(${index})">${dat.texto}</button>`
                }).join("")}`

                $("#FiltroCursos").html(html)
                this.mostrardatos(1);
                
                $("#Curso option:selected").attr('disabled',true)
        }else{

            this.filtros=[]
            this.filtros.push({id:$("#Curso").val(),texto:$("#Curso option:selected").text()})
            this.deseleccionar()
            this.mostrardatos(1);
        }
        
    }
    quitarfiltro(x){
        $(`#op${this.filtros[x].id}`).prop('disabled',false)
        $("#Curso").val('0');

        this.filtros.splice(x,1);
        if(this.filtros.length==0){
           $("#Curso option").prop('disabled', false)
        }
        let html=`${this.filtros.map((dat,index)=>{
            
            
            return `<button onclick="huella.quitarfiltro(${index})">${dat.texto}</button>`
        }).join("")}`

        $("#FiltroCursos").html(html)
        this.mostrardatos(1);
        this.deseleccionar();
    }


    seleccionar(x){
        console.log("test")
        
        
        const index= this.seleccionados.indexOf(x)
        
        $("#Menu").removeClass("CerrarMenu").addClass("AbrirMenu")
        if(index>=0){
            console.log(index)
            this.seleccionados.splice(index,1);
            $(`#A${x}`).removeClass("Seleccionado")
            if(this.seleccionados.length==0){
                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
            }
        }else{
            this.seleccionados.push(x)
            $(`#A${x}`).addClass("Seleccionado")
        }
        $("#Contador").html(`Accion (${this.seleccionados.length})`)
        console.log(this.seleccionados)
    }

    deseleccionar(){
        this.seleccionados=[]
        $("#Contador").html(`Accion (${this.seleccionados.length})`)
        $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
        this.mostrardatos(this.pag)
    }
    menucitarapoderado(){ //FALTA QUE SE ENVIE UN CORREO AL APODERADO
        $("#Cargando").show()
        let temp
        let x=this.seleccionados.length;
        this.seleccionados.forEach(dat=>{
            temp= dat.split("T")
            if(dat.length<7){
                console.log(temp[0])
                let mut=`mutation {
                    asistenciaalumnoedit(atraso: "True", fecha: "", id: ${temp[0]}) {
                        success
                        error
                      }
                }
                `

                axios.post("/graphql/",{
                    query:mut
                }).then(response=>{
                    x--;
                    console.log(x)
                    if(x==0){
                        
                        this.cargardatos(this.pag)
                        $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
                    }
                }).catch(error=>{
                    console.log(error)
                })

            }else{
                console.log(`${temp[0]} ${temp[1]}-${temp[2]}-${temp[3]}`)
                let mut=`mutation {
                                    asistenciaalumnomanual(alumno: ${temp[0]}, fecha: "${temp[1]}-${temp[2]}-${temp[3]} 08:10:00", atraso: "True") {
                                        success
                                        error
                                    }
                                }
                                `

                                axios.post("/graphql/",{
                                    query:mut
                                }).then(response=>{
                                    x--;
                                    console.log(x)
                                    if(x==0){
                                        this.cargardatos(this.pag)
                                        $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
                                    }
                                }).catch(error=>{
                                    console.log(error)
                                })
            }
        })
        this.seleccionados=[]

    }

    menupresente(){
        $("#Cargando").show()
        let temp;
        let x=this.seleccionados.length;
        this.seleccionados.forEach(dat=>{
                temp= dat.split("T")
                if(dat.length<7){
                    
                    console.log(temp[0])
                    $.ajax({
                        url: '/asistenciaalumnos',
                        type: 'POST',
                        data: {
                            fecha: `07:50`, 
                            atraso: 0,
                            id: temp[0]
                        },
                        headers: {
                            'X-CSRFToken': TOKEN
                        },
                        success: function (data) {
                            console.log(data)
                            x--;
                            if(x==0){
                                huella.cargardatos(huella.pag)
                                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
                            }
                            
                        },
                        error: function (data) {
                            x--;
                        }
                    });
                }else{
                    console.log(`${temp[0]} ${temp[1]}-${temp[2]}-${temp[3]}`)
                    $.ajax({
                        url: '/asistenciaalumnos',
                        type: 'POST',
                        data: {
                            fecha: `${temp[1]}-${temp[2]}-${temp[3]} 07:50:00`,
                            idalumno: temp[0],
                            id: 0
                        },
                        headers: {
                            'X-CSRFToken': TOKEN
                        },
                        success: function (data) {
                            console.log(data)
                            x--;
                            if(x==0){
                                huella.cargardatos(huella.pag)
                                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
                            }
                            
                        },
                        error: function (data) {
                            x--;
                        }
                    });
                    
                }

                


        })

        this.seleccionados=[]
    }
    menuatrasado(){
        $("#Cargando").show()
        let temp;
        let x=this.seleccionados.length;
        this.seleccionados.forEach(dat=>{
                temp= dat.split("T")
                if(dat.length<7){
                    console.log(`${temp[0]} ${temp[1]}-${temp[2]}-${temp[3]}`)
                    $.ajax({
                        url: '/asistenciaalumnos',
                        type: 'POST',
                        data: {
                            fecha: $("#MenuTiempo").val(),
                            atraso: 1,
                            id: temp[0]
                        },
                        headers: {
                            'X-CSRFToken': TOKEN
                        },
                        success: function (data) {
                            console.log(data)
                            x--;
                            if(x==0){
                                huella.cargardatos(huella.pag)
                                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
                            }
                            
                        },
                        error: function (data) {
                            x--;
                        }
                    });

                }else{
                    console.log(`${temp[0]} ${temp[1]}-${temp[2]}-${temp[3]}`)
                    $.ajax({
                        url: '/asistenciaalumnos',
                        type: 'POST',
                        data: {
                            fecha: `${temp[1]}-${temp[2]}-${temp[3]} ${$("#MenuTiempo").val()}:00`,
                            idalumno: temp[0],
                            id: 0
                        },
                        headers: {
                            'X-CSRFToken': TOKEN
                        },
                        success: function (data) {
                            console.log(data)
                           
                            x--;
                            if(x==0){
                                huella.cargardatos(huella.pag)
                                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
                            }
                        },
                        error: function (data) {
                            x--;
                        }
                    });
                }

                


        })
        this.seleccionados=[]
        
    }
    
    agregar0xd(x){
        if(x<=9){
            return "0"+x
        }else{
            return x
        }
    }
}