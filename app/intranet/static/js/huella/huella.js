class javahuella{

    constructor(){
        this.calendario=[] //nueva ver

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
        $("#CalendarioMes").val(this.hoy.getMonth()+1)
        $("#Min").val(`${this.min.getFullYear()}-${this.agregar0xd(this.min.getMonth()+1)}-${this.agregar0xd(this.min.getDate())}`)
        $("#Max").val(`${this.hoy.getFullYear()}-${this.agregar0xd(this.hoy.getMonth()+1)}-${this.agregar0xd(this.hoy.getDate())}`)
        this.cargarcalendario()
        this.scroll=false;
        this.height=0;
        this.anchuradias=0;
        this.paginaactual=1;

        this.listafinalexcel=[]
       
    }

    recargardatos(){
        this.optimizado=true
        this.cargardatos(this.pag)
    }




    cargarcalendario(){ //paso 1
        $.ajax({
            url: '/loadcalendario',
            type: 'GET',
            data: {
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                huella.calendario=data
                huella.cargaralumnos()
            },
            error: function (data) {
            }
        });
    }
    cargaralumnos(){ //paso 2
        $("#Cargando").show()
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
            },
            error: function (data) {
            }
        });
    }
    cargarcursos(){ //paso 3
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
                huella.cargarasistencias()
            },
            error: function (data) {
            }
        });
    }
    cargarasistencias(){ //paso 4
        $.ajax({
            url: '/asistenciaalumnosmes',
            type: 'POST',
            data: {
                mes:$("#CalendarioMes").val()
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                huella.asistencias=data
                huella.mostrardatos(1)
                $("#Cargando").hide()
            },
            error: function (data) {
            }
        });
    }




    cargarasistenciaex(x,y){ //cargar asistencias unicamente los editados

        $.ajax({
            url: '/asistenciaalumnoindividual',
            type: 'POST',
            data: {
                "id":y
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                const asist=huella.asistencias.concat(huella.asistencias,data)
                huella.asistencias=asist
                console.log(huella.asistencias)
                huella.mostrardatos(x)
                
            },
            error: function (data) {
               
            }
        });
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

    mostrardatos(x){
        
        if(x==999){
            x=this.paginaactual
        }

        let verhoras=$("#VerHoras").is(":checked")
        console.log(verhoras)
        let calendariopormes=[]
        let htmlinfo=""
        let htmlasist=""
        let listafinal=[]
        

        this.calendario.forEach(dia=>{
            if($("#CalendarioMes").val()==dia.mes && dia.tipodia==1){
                calendariopormes.push(dia)
            }
            
        })
        console.log(calendariopormes)
        let encabezadofinal=`
        <tr>
            
            ${calendariopormes.map(dia=>{
                switch(dia.nombredia){
                    case 1: return `<th>L</th>`
                    case 2: return `<th>M</th>`
                    case 3: return `<th>Mi</th>`
                    case 4: return `<th>J</th>`
                    case 5: return `<th>V</th>`
                    case 6: return `<th>S</th>`
                    case 7: return `<th>D</th>`
                }
            })}
        </tr>
        <tr>
            ${calendariopormes.map(dia=>{

                   return `<th>${dia.dia}</th>`
            })}
            </tr>
        `
        let trtemporal=""
        let diatemporal=""
        let encontrado=false
        let faltas=0
        let atrasos=0
        this.alumnos.forEach(alumno=>{


            
            if($("#Curso").val()==0){

            }else{
                if($("#Curso").val()!=alumno.cursoid){
                    return
                }
            }
            
            

            faltas=0,atrasos=0,trtemporal=""
            calendariopormes.forEach(dias=>{
                encontrado=false
                    this.asistencias.forEach(asist=>{

                        if(asist.alumno==alumno.id){
                            diatemporal= new Date(asist.horaasistencias)
                            if(diatemporal.getMonth()+1==dias.mes && diatemporal.getDate()==dias.dia){
                                if(diatemporal.getHours()>=9){
                                    if(verhoras==true){
                                        if(diatemporal.getMinutes()<10){
                                            trtemporal+=`<td class="Atrasado">${diatemporal.getHours()}:0${diatemporal.getMinutes()}</td>`
                                        }else{
                                            trtemporal+=`<td class="Atrasado">${diatemporal.getHours()}:${diatemporal.getMinutes()}</td>`
                                        }
                                        
                                    }else{
                                        trtemporal+=`<td class="Atrasado"></td>`
                                    }
                                    atrasos+=1
                                }else{
                                    if(verhoras==true){
                                        if(diatemporal.getMinutes()<10){
                                            trtemporal+=`<td class="Presente">${diatemporal.getHours()}:0${diatemporal.getMinutes()}</td>`
                                        }else{
                                            trtemporal+=`<td class="Presente">${diatemporal.getHours()}:${diatemporal.getMinutes()}</td>`
                                        }
                                        
                                    }else{
                                        trtemporal+=`<td class="Presente"></td>`
                                    }

                                }
                                
                                encontrado=true
                                
                            }
                        }
                        
                    })
                if(encontrado==false){
                    faltas+=1

                    trtemporal+=`<td id="${alumno.id}-${dias.dia}-${dias.mes}" class="Ausente" onclick="huella.seleccionar(${alumno.id},${dias.dia},${dias.mes})">&nbsp;</td>`
                
                }


            })
            listafinal.push({infoalumno:alumno,nfaltas:faltas,natrasos:atrasos,tr:trtemporal})
            this.listafinalexcel.push({nombre:alumno.nombre,curso:alumno.curso,nfaltas:faltas,natrasos:atrasos})
        })
       

        listafinal.sort(function(a,b){
            if(a.nfaltas>b.nfaltas){
                return -1;
            }
            if(a.nfaltas<b.nfaltas){
                return 1;
            }

            return 0;
        })

        console.log(listafinal)
        console.log(x)
        if(this.alumnos.length){

            htmlinfo=`
                <tr>
                    <th colspan="4">Dias de la semana</th>
                </tr>
                <tr>
                    <th>Nombres</th>
                    <th>Curso</th>
                    <th>Falt</th>
                    <th>Atra</th>
                </tr>

                ${listafinal.map((alumnos,index)=>{
                    if(index<(100*x-100) || index > (100*x)){ //100 visualizaciones por pagina
                        
                        return
                    }
                    return `
                    <tr>
                        <td>${alumnos.infoalumno.nombre.replaceAll("-","")}</td>
                        <td>${alumnos.infoalumno.curso}</td>
                        <td>${alumnos.nfaltas}</td>
                        <td>${alumnos.natrasos}</td>
                    </tr>`
                })}
            `
            let diatemp=""
            let tdtemp="<td>A</td>"
            let encontrado=false
            htmlasist=`
                
                    ${encabezadofinal}
                ${listafinal.map((alumno,index)=>{
                    if(index<(100*x-100) || index > (100*x)){ //100 visualizaciones por pagina
                        
                        return
                    }
                    return `<tr>${alumno.tr}</tr>`
                    
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

        $("#TablaInfo").html(htmlinfo)
        $("#TablaAsist").html(htmlasist)
        

        let npag=Math.ceil(listafinal.length/100)+1
        let html="";

        for(var i=1;i<npag;i++){
            if(npag==1){
                html+=`<button id="Pag${i}" class="Actual BotonPagina" onclick="huella.mostrardatos(${i})">${i}</button>`

            }else if(x==i){
                html+=`<button id="Pag${i}" class="Actual BotonPagina" onclick="huella.mostrardatos(${i})">${i}</button>`

            }else{
                html+=`<button id="Pag${i}" class="BotonPagina" onclick="huella.mostrardatos(${i})">${i}</button>`

            }
        }
        
        
        $("#Paginas").html(html)
        this.deseleccionar()
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


    seleccionar(id,dia,mes){
        
        if(this.seleccionados.length==0){

            this.seleccionados.push({id:id,dia:dia,mes:mes})
            $(`#${id}-${dia}-${mes}`).addClass("Seleccionado")

        }else{
            this.seleccionados.forEach((dat,index)=>{

                if(dat.id==id && dat.dia==dia && dat.mes==mes){
                    this.seleccionados.splice(index,1)
                    $(`#${id}-${dia}-${mes}`).removeClass("Seleccionado")
                    return
                }
                if(this.seleccionados.length==index+1){
                    this.seleccionados.push({id:id,dia:dia,mes:mes})
                    $(`#${id}-${dia}-${mes}`).addClass("Seleccionado")
                }
                
            })
        }
        if(this.seleccionados.length==0){
            $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
        }else{
            $("#Menu").removeClass("CerrarMenu").addClass("AbrirMenu")
        }
        $("#Contador").html(`Accion (${this.seleccionados.length})`)

        console.log(this.seleccionados)
    }
    deseleccionar(){
        this.seleccionados=[]
        $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
        $(".Seleccionado").removeClass("Seleccionado")
    }

    ponerpresente(){
        $("#Cargando").show()
        if(this.seleccionados.length==0){
            return
        }
        $.ajax({
            url: '/ponerpresentemasivo',
            type: 'POST',
            data: {
                
                listini:JSON.stringify(this.seleccionados),
                horas:"8",
                minutos:"00"
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                
                huella.cargarasistencias(1)
                this.seleccionados=[]
                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
            },
            error: function (data) {
               
            }
        });
    }
    poneratrasado(){
        $("#Cargando").show()
        if(this.seleccionados.length==0){
            return
        }
        $.ajax({
            url: '/ponerpresentemasivo',
            type: 'POST',
            data: {
                
                listini:JSON.stringify(this.seleccionados),
                horas:$("#MenuTiempo").val().split(":")[0],
                minutos:$("#MenuTiempo").val().split(":")[1]
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                
                huella.cargarasistencias(1)
                this.seleccionados=[]
                $("#Menu").removeClass("AbrirMenu").addClass("CerrarMenu")
            },
            error: function (data) {
               
            }
        });

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
                        
                        huella.cargarasistenciaex(huella.pag,temp[0])
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
                                        huella.cargarasistenciaex(huella.pag,temp[0])
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
                                huella.cargarasistenciaex(huella.pag,temp[0])
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
                                huella.cargarasistenciaex(huella.pag,temp[0])
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
                                huella.cargarasistenciaex(huella.pag,temp[0])
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
                                huella.cargarasistenciaex(huella.pag,temp[0])
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

    generarinformeexcel(){
        var workbook= XLSX.utils.book_new(),
            worksheet= XLSX.utils.json_to_sheet(this.listafinalexcel); // pa jsons
            //worksheet= XLSX.utils.aoa_to_sheet(this.listafinalexcel); // para arrays
        workbook.SheetNames.push("test");
        workbook.Sheets["test"]=worksheet
        XLSX.writeFile(workbook, "test.xlsx");
    }
    
    agregar0xd(x){
        if(x<=9){
            return "0"+x
        }else{
            return x
        }
    }
}