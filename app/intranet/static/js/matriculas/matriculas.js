
class javamatriculas{

   
    constructor(){
        this.cursos=[];
        this.camposperso=[];
        this.cargardatos()
        this.personalizados=[];
        this.opciones=[];
        this.nselect=0;
        this.tituloseccion=""
        this.nombreopcion=""
        this.tipodeopcion=0
        

        

        this.altura=window.screen.height
        this.anchura=window.screen.width

        $("#DejarEditar").hide()
        this.select=[];
        this.editon=false;
        $("#Firma").hide()
        this.firma=""
        this.solounafirma=true;
        this.canvas= new fabric.Canvas($("#c")[0],{
                isDrawingMode: true,
                width: window.screen.width,
                height: window.screen.height,
                objectCaching:false,
        })

        
            $("#MalditoCanvas").hide()

        this.columnasguardadas=[]
    }
    
    Limpiar(){
        this.canvas.clear()

        let linea1= new fabric.Rect({
            left: this.anchura*0.1,
            top: this.altura*0.6,
            width: this.anchura*0.3,
            height:3,
            selectable: false,
        })
        let apoderados1= new fabric.Text(`${$("#PadreNombres").val()} ${$("#PadreApellidos").val()}`, {
            textAling:'center',
            left:this.anchura*0.1,top:this.altura*0.65,
            selectable: false,})
        
        let linea2= new fabric.Rect({
                left: this.anchura*0.6,
                top: this.altura*0.6,
                width: this.anchura*0.3,
                height:3,
                selectable: false,
            })
        let apoderados2= new fabric.Text(`${$("#MadreNombres").val()} ${$("#MadreApellidos").val()}`, {
                textAling:'center',
                left:this.anchura*0.6,top:this.altura*0.65,
                selectable: false,})

        this.canvas.add(linea1,apoderados1,linea2,apoderados2)
        $("#Firma").hide()
    }

    requerido(){
        
        if($("#Nombres").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Nombres Faltantes',
                text: '',
            })
            return false
        }
        if($("#FechaNacimiento").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Fecha nacimiento faltante',
                text: '',
            })
            return false
        }
        if($("#RunNacional").val()=="" && $("#IPE").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese un RUN o IPE',
                text: '',
            })
            return false
        }
        if($("#Edad").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Edad faltante',
                text: '',
            })
            return false
        }
        if($("#PadreApellidos").val()=="" && $("#MadreApellidos").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Apellidos de un tutor faltante',
                text: '',
            })
            return false
        }
        if($("#PadreNombres").val()=="" && $("#MadreNombres").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Nombres de un tutor faltante',
                text: '',
            })
            return false
        }
        
    }
    blanquearcampos(){
        $("#ApellidoPaterno").val("")
        $("#RunNacional").val("")
        $("#ApellidoMaterno").val("")
        $("#IPE").val("")
        $("#Nombres").val("")
        $("#Nacionalidad").val("")
        $("#FechaNacimiento").val("")
        $("#Etnia").val("")
        $("#Domicilio").val("")
        $("#Religion").val("")
        $("#Comuna").val("")
        $("#Sexo").val("")
        $("#Telefono").val("")
        $("#Edad").val("")
        $("#ViveCon").val("")
        $("#CursoNuevo").val("")
        $("#QuienMatricula").val("")
        $("#EstudianteNuevo").val("")
        $("#SistemaDeMatricula").val("")
        $("#CorreoInstitucional").val("")
        $("#PadreApellidos").val("")
        $("#PadreRun").val("")
        $("#PadreNombres").val("")
        $("#PadreIpa").val("")
        $("#PadreNacionalidad").val("")
        $("#PadrePasaporte").val("")
        $("#PadreDomicilio").val("")
        $("#PadreEstudios").val("")
        $("#PadreComuna").val("")
        $("#PadreOcupacion").val("")
        $("#PadreTelefono1").val("")
        $("#PadreApoderado").val("")
        $("#PadreTelefono2").val("")
        $("#PadreEmail").val("")
        $("#MadreApellidos").val("")
        $("#MadreRun").val("")
        $("#MadreNombres").val("")
        $("#MadreIpa").val("")
        $("#MadreNacionalidad").val("")
        $("#MadrePasaporte").val("")
        $("#MadreDomicilio").val("")
        $("#MadreEstudios").val("")
        $("#MadreComuna").val("")
        $("#MadreOcupacion").val("")
        $("#MadreTelefono1").val("")
        $("#MadreApoderado").val("")
        $("#MadreTelefono2").val("")
        $("#MadreEmail").val("")
        $("#EstablecimientoProcedencia").val("")
        $("#EnfermedadCronica").val("")
        $("#Alergico").val("")
        $("#Medicamento").val("")
        $("#CasoEmergencia").val("")
        

    }
    TerminarFirma(){
        $("#Firma").show()
        console.log(this.canvas.toSVG())
        console.log(JSON.stringify(this.canvas))
        //this.firma=JSON.stringify(this.canvas).replaceAll('"',"°")
        this.firma=this.canvas.toDataURL('png')
        console.log(this.firma)
        
       
        


        document.exitFullscreen()
        .then(function(){
            console.log($("#c").get(0))

            $("#c").get(0).toBlob(function(blob){
                //saveAs(blob,"teessst.png")
                console.log(blob)
                console.log(canvas2.toDataURL('png'))
                
                
               
            })
            

            let canvas2=new fabric.Canvas($("#xfr")[0],{
            width:384,
            height:216,
            objectCaching: false
        })
        //canvas2.loadFromJSON(this.firma.replaceAll("°",'"'))
            canvas2._objects=matriculas.canvas._objects
            
            canvas2.setZoom(0.2)
            let all=canvas2.getObjects()
            
            all.forEach(dat=>{

                
                dat.objectCaching=false;

            })
                
            canvas2.renderAll()
            $("#MalditoCanvas").hide()
        }).catch(function(error){

        })
    }

    

    ventanaagregarfirma(){
        $("#MalditoCanvas").show()
        $("#MalditoCanvas")[0].requestFullscreen()
        .then(function(){
            
            $("#FondoBlanco").width(window.screen.width)
            $("#FondoBlanco").height(window.screen.height)
            
            /*
            let linea= new fabric.Rect({
            id: 1,
            left: window.screen.width*0.1,
            top: window.screen.height*0.6,
            width: window.screen.width*0.3,
            height:3,
            selectable: false,
            objectCaching: false
            })
            let apoderados= new fabric.Text(`${$("#PadreNombres").val()} ${$("#PadreApellidos").val()}`, {
                textAling:'center',
                left:window.screen.width*0.1,top:window.screen.height*0.65,
                objectCaching: false,
                selectable: false,
                
            })

            let linea2= new fabric.Rect({
                id: 2,
                left: window.screen.width*0.6,
                top: window.screen.height*0.6,
                width: window.screen.width*0.3,
                height:3,
                selectable: false,
                objectCaching: false
            })
            let apoderados2= new fabric.Text(`${$("#MadreNombres").val()} ${$("#MadreApellidos").val()}`, {
                textAling:'center',
                left:window.screen.width*0.6,top:window.screen.height*0.65,
                selectable: false,
                objectCaching: false
            })
            
            matriculas.canvas.add(apoderados,apoderados2)
            matriculas.canvas.add(linea,linea2)
            */
        }).catch(function(error){

        })
    }
    
    cargardatos(){

        $("#Cargando").show()
        let query2=`
        {
            allCursos {
              id
              nombre
              cantidadestudiantes
            }

            allSeccionesmatriculas {
                id
                nombreseccion
                orden
                matriculasopcionpersonalizadaSet {
                  id
                  nombreopcion
                  tipodeopcion
                  matriculasalternativasopcionSet{
                    id
                    nombre
                    valor
                  }
                }
              }
          }
          
        `


        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
            
            this.cursos=response.data.data.allCursos
            this.camposperso=response.data.data.allSeccionesmatriculas
            this.vincular()
            this.cargarpersonalizacion()
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })

    }
    cargarpersonalizacion(){
        let html=`
        
            ${this.camposperso.map(dat=>{
                if(this.editon==true){
                    return `
                    
                    <h2 id="Sec-${dat.id}">${dat.nombreseccion}<button class="BEdit" onclick="matriculas.activareditseccion(${dat.id})">Edit</button><button class="BEliminar" onclick="matriculas.eliminarseccion(${dat.id})" >Eliminar</button></h2>
                    <table class="TablaPersonalizada">
                        ${dat.matriculasopcionpersonalizadaSet.map(dat2=>{
                            let temp=""
                            if(dat2.tipodeopcion==3){
                                return ` <tr>
                                        <th id="${dat.id}-${dat2.id}">${dat2.nombreopcion}<button class="BEliminar" onclick="matriculas.eliminaropcionseccion(${dat2.id})">Eliminar</button></th>
                                        <td><select>
                                            ${dat2.matriculasalternativasopcionSet.map(dat3=>{
                                                return `<option>${dat3.nombre}</option>`
                                            }).join("")}
                                        </select></td>
                                        </tr>
                                `
                            }
                            if(dat2.tipodeopcion==1){
                                temp=`<td><input type="text"></td>`
                            }else if(dat2.tipodeopcion==2){
                                temp=`<td><input type="number"></td>`
                            }else if(dat2.tipodeopcion==4){
                                temp=`<td><input type="checkbox"></td>`
                            }

                            return`
                            <tr>
                                <th id="Op${dat.id}-${dat2.id}">${dat2.nombreopcion} <button class="BEdit" onclick="matriculas.activareditaroption(${dat.id},${dat2.id})">Editar</button><button class="BEliminar" onclick="matriculas.eliminaropcionseccion(${dat2.id})">Eliminar</button></th>
                                        ${temp}
                            </tr>
                            `
                        }).join("")}
                        <tr>
                            <th>Agregar Campo nuevo: <input id="NewOp-${dat.id}" type="text"></th>
                            <td><button onclick="matriculas.agregaropcionenseccion(${dat.id},'NewOp-${dat.id}',1)">texto</button><button onclick="matriculas.agregaropcionenseccion(${dat.id},'NewOp-${dat.id}',2)">numerico</button><button onclick="matriculas.agregaropcionenseccion(${dat.id},'NewOp-${dat.id}',3)">lista</button><button onclick="matriculas.agregaropcionenseccion(${dat.id},'NewOp-${dat.id}',4)">check</button></td>
                        </tr>
                    </table>
                    `

                }else{
                    return `
                    
                    <h2 id="Sec-${dat.id}">${dat.nombreseccion}</h2>
                    <table class="TablaPersonalizada">
                        ${dat.matriculasopcionpersonalizadaSet.map(dat2=>{
                            let temp=""
                            if(dat2.tipodeopcion==3){
                                return ` <tr>
                                        <th id="${dat.id}-${dat2.id}">${dat2.nombreopcion}</th>
                                        <td><select id="Value-${dat2.id}">
                                            ${dat2.matriculasalternativasopcionSet.map(dat3=>{
                                                return `<option>${dat3.nombre}</option>`
                                            }).join("")}
                                        </select></td>
                                        </tr>
                                `
                            }
                            if(dat2.tipodeopcion==1){
                                temp=`<td><input id="Value-${dat2.id}" type="text"></td>`
                            }else if(dat2.tipodeopcion==2){
                                temp=`<td><input id="Value-${dat2.id}" type="number"></td>`
                            }else if(dat2.tipodeopcion==4){
                                temp=`<td><input id="Value-${dat2.id}" type="checkbox"></td>`
                            }

                            return`
                            <tr>
                                <th id="Op${dat.id}-${dat2.id}">${dat2.nombreopcion}</th>
                                        ${temp}
                            </tr>
                            `
                        }).join("")}
                        
                    </table>
                    ` 
                }
                
            }).join("")}
        
        `
        if(this.editon==true){
            $("#TablasPersonalizadas").html(html+`<h2><input id="InputNuevaSeccion" type="text"><button onclick="matriculas.agregarseccion()">Añadir seccion</button></h2>`)
        }else{
            $("#TablasPersonalizadas").html(html)
        }
        

    }
    
    agregarseccion(){
        $("#Cargando").show()
        let mut=`mutation {
            matriculaseccioncreate(nombre: "${$("#InputNuevaSeccion").val()}") {
              success
              id
              error
            }
          }
          
          `
          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            this.cargardatos()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })

    }
    activareditseccion(idsec){
        $(`#Sec-${idsec}`).html(`Nuevo titulo: <input id="E${idsec}" type="text"> <button onclick="matriculas.editseccion(${idsec})">Aplicar</button>`)
    }
    editseccion(idsec){
        $("#Cargando").show()
        let mut=`mutation {
            matriculaseccionedit(id: ${idsec}, nombre: "${$(`#E${idsec}`).val()}" ) {
              success
              error
            }
        }
          `
          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            this.cargardatos()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    eliminarseccion(idsec){
        $("#Cargando").show()
        let mut=`mutation {
            matriculasecciondelete(id: ${idsec}) {
              success
              error
            }
          }
          
          `
          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            this.cargardatos()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    agregaropcionenseccion(seccion,input,tipo){
        console.log(input)
        $("#Cargando").show()

        let mut=`mutation {
            matriculaopcionpersocreate(
              idseccion: ${seccion}
              nombreopcion: "${$(`#${input}`).val()}"
              tipodeopcion: ${tipo}
            ) {
              success
              id
              error
            }
          }
          `
          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            
            if(tipo==3){
                this.abriropcionesselect(response.data.data.matriculaopcionpersocreate.id)
            }else{
                this.cargardatos()
            }
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    abriropcionesselect(x){
        let html=`
        <div id="Contenido">
            <h1>Opciones para ${x}</h1>
            <h2>Nombre Visible</h2>
            <input id="NombreVisible" type="text">

            <button onclick="matriculas.agregaroption()">Añadir a lista desplegable</button>
            <table id="Tabla">
                <tr>
                    <th>Valor</th>
                    <th>Accion</th>
                </tr>
            </table>
            <button class="CrearPeticion" onclick="matriculas.asignaroption(${x})">Asignar Opciones</button>
        </div>
        `

        
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        
        
        $("#Ventana").html(html)
    }
    agregaroption(){
        this.select.push($("#NombreVisible").val())
        $("#NombreVisible").val("")
        this.renderoptions()
    }
    renderoptions(){
        $("#Tabla").html(`
                <tr>
                    <th>Valor</th>
                    <th>Accion</th>
                </tr>
            ${this.select.map((dat,index)=>{
                return `<tr>
                            <td>${dat}</td>
                            <td><button onclick="matriculas.select.splice(${index},1), matriculas.renderoptions()">Eliminar</button></td>
                    </tr>
                `
            })}
        
        `)
    }
    asignaroption(idop){
        $("#Cargando").show()
        this.cerrarventana()
        this.select.forEach((dat,index)=>{
            let mut=`mutation {
                matriculaalternativaopcioncreate(
                  idopcion: ${idop}
                  nombre: "${dat}"
                  valor: "z"
                ) {
                  success
                  id
                  error
                }
              }
              
              `
              axios.post("/graphql/",{
                query:mut
            }).then(response=>{
                if(this.select.length==index+1){
                    this.cargardatos()
                    this.select=[];
                    
                }
                
            }).catch(error=>{
                console.log(error)
                $("#Cargando").hide()
            })
        })

    }
    eliminaropcionseccion(idopcion){
        $("#Cargando").show()
        let mut=`mutation {
            matriculaopcionpersodelete(
              idopcion: ${idopcion}
            ) {
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
    activareditaroption(idsec,idop){
        $(`#Op${idsec}-${idop}`).html(`Nuevo nombre: <input id="E${idsec}-${idop}" type="text"><button onclick="matriculas.editaroption(${idsec},${idop})">Aplicar</button>`)
    }
    editaroption(idsec,idop){
        $("#Cargando").show()
        let mut=`mutation {
            matriculaopcionpersoedit(
              idopcion: ${idop}
              nombreopcion: "${$(`#E${idsec}-${idop}`).val()}"
              tipodeopcion: 0
            ) {
              success
              error
            }
          }
          
          
          `
          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            this.cargardatos()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    vincular(){
        let html=`
        
        ${this.cursos.map(dat=>{
            if(dat.nombre=="Funcionario"){
                return
            }
            return `<option value="${dat.id}">${dat.nombre}</option>`
        })}
        
        `

        $("#CursoNuevo").html(html)
    }

    visualizarseccion(){
            window.scrollTo(0, document.body.scrollHeight);
            this.editon=true
            $("#DejarEditar").show()
            this.cargarpersonalizacion()
    }
    dejardeeditar(){
        this.editon=false;
        $("#DejarEditar").hide()
        this.cargarpersonalizacion()
    }
    
    
    

    
    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
    abrirventana(){
        const years=`
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
        <option value="2031">2031</option>
        <option value="2032">2032</option>
        <option value="2033">2033</option>

        `
        
            const html=`
                <button id="Cerrar" onclick="matriculas.cerrarventana()">X</button>
                <div id="Contenido">
                    <div id="MenuContenido">
                        <label>Año <select id="years">${years}</select></label>
                        <label>S.Matricula<select id="SistemaMatricula">
                            <option value="Matricula">Matricula</option>
                            <option value="SAE">SAE</option>
                            <option value="Registro Público">Registro Público</option>
                        </select></label>
                        
                        <label>Curso<select id="CursoObjetivo">
                            ${this.cursos.map(dat=>{

                                return`<option value="${dat.id}">${dat.nombre}</option>`
                            })}
                        </select> </label>
                        
                        <label>Archivo Excel <input type="file" id="Excel" onchange="matriculas.CargarTablaExcel()"></label>
                        
                        <label>Tiene encabezado? <input type="checkbox" id="Encabezado" checked></label>
                        <label>Seleccionar Hoja Excel <input type="number" id="HojaExcel" onchange="matriculas.CargarTablaExcel()" value="1" min="1"></label>
                        
                    </div>
                    <div class="OverFlow">
                        <h1 id="subirarchivo">Suba archivo excel para visualizar</h1>
                        <table id="TablaExcel">
                            
                            

                        </table>
                        
                    </div>
                    
                
                <button id="Agregar" class="BotonNormal" onclick="matriculas.importacionmasiva()">Subida Masiva</button>
                </div>
            `

            setTimeout(()=>{
                $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
            },100)
            
            $("#Ventana").html(html)
    }


    async CargarTablaExcel(){

        let excel=$("#Excel")[0]
        if(excel.files[0]==undefined){
            return
        }
        
        let html=""
        let contenido
        try{
            contenido= await readXlsxFile(excel.files[0],{sheet: parseInt($("#HojaExcel").val()) })
        }
        catch{
            Swal.fire({
                icon: 'error',
                title: 'Pagina no existe',
                text: '',
                })
            $("#HojaExcel").val($("#HojaExcel").val()-1)
            return
        }
        $("#Agregar").html("Agregar Masivamente ("+contenido.length+")")
        
        //await readSheetNames(excel.files[0])
        let htmlcabezera="<tr>"
        const opciones=`
        <option value="999">Sin Columna</option>
        <option value="ERun">Rut</option>
        <option value="EIPA">IPA</option>
        <option value="EApellidoPaterno">Apellido Paterno</option>
        <option value="EApellidoMaterno">Apeliido Materno</option>
        <option value="ENombres">Nombres</option>
        <option value="EFechaNacimiento">Fecha Nacimiento</option>
        <option value="ENacionalidad">Nacionalidad</option>
        <option value="EEtnia">Etnia</option>
        <option value="EDomicilio">Domicilio</option>
        <option value="EReligion">Religion</option>
        <option value="EComuna">Comuna</option>
        <option value="ESexo">Sexo</option>
        <option value="ETelefono">Telefono</option>
        <option value="EEdad">Edad</option>
        <option value="EViveCon">Vive con</option>
        <option value="EQuienMatricula">Quien Matricula</option>
        <option value="EEstudiante">Estudiante</option>
        <option value="ECorreoInstitucional">Correo Institucional</option>
        <option value="EApellidosPadre">Apellidos Padre</option>
        <option value="ENombresPadre">Nombres Padre</option>
        <option value="ERunPadre">Run Padre</option>
        <option value="EIPAPadre">IPA Padre</option>
        <option value="ENacionalidadPadre">Nacionalidad Padre</option>
        <option value="EPasaportePadre">Pasaporte Padre</option>
        <option value="EDomicilioPadre">Domicilio Padre</option>
        <option value="EEstudiosPadre">Estudios Padre</option>
        <option value="EComunaPadre">Comuna Padre</option>
        <option value="EOcupacionPadre">Ocupacion Padre</option>
        <option value="ETelefono1Padre">Telefono 1 Padre</option>
        <option value="EApoderadoPadre">Apoderado Padre</option>
        <option value="ETelefono2Padre">Telefono 2 Padre</option>
        <option value="EEmailPadre">Email Padre</option>
        <option value="EApellidosMadre">Apellidos Madre</option>
        <option value="ENombresMadre">Nombres Madre</option>
        <option value="ERunMadre">Run Madre</option>
        <option value="EIPAMadre">IPA Madre</option>
        <option value="ENacionalidadMadre">Nacionalidad Madre</option>
        <option value="EPasaporteMadre">Pasaporte Madre</option>
        <option value="EDomicilioMadre">Domicilio Madre</option>
        <option value="EEstudiosMadre">Estudios Madre</option>
        <option value="EComunaMadre">Comuna Madre</option>
        <option value="EOcupacionMadre">Ocupacion Madre</option>
        <option value="ETelefono1Madre">Telefono 1 Madre</option>
        <option value="EApoderadoMadre">Apoderado Madre</option>
        <option value="ETelefono2Madre">Telefono 2 Madre</option>
        <option value="EEmailMadre">Email Madre</option>
        <option value="EEstablecimiento">Establecimiento Procedencia</option>
        <option value="EUltimoyearcursado">Ultimo año cursado</option>
        <option value="EUltimocursorepetido">Ultimo curso repetido</option>
        <option value="EPertenecePIE">Pertenece a PIE</option>
        <option value="EOptareligion">Opta por religion</option>
        <option value="EOptaCredo">Opta por credo</option>
        <option value="EBecaIndigena">Tiene beca indigena</option>
        <option value="EOtrabeca">Tiene otra beca</option>
        <option value="EProgramaSocial">Programa Social</option>
        <option value="EPrioritario">Es Prioritario</option>
        <option value="EPreferente">Es Preferente</option>
        <option value="ERegistroSocialHogares">Registro social de hogares</option>
        <option value="ESistemaSalud">Sistema de salud</option>
        <option value="EConsultorioCesfam">Consultorio o Cesfam)</option>
        <option value="EMedicoImpedimiento">Impedimiento medico</option>
        <option value="EEnfermedadCronica">Enfermedad cronica</option>
        <option value="EAlergico">Alergico</option>
        <option value="ETomaMedicamento">Toma medicamento</option>
        <option value="EEmergencia">En caso de emergencia</option>
        <option value="EAceptoReglamento">Acepto reglamento interno</option>
        <option value="EHuella">Acepta uso de huella</option>
        <option value="EAsistenciaReligion">Asistencia religion</option>
        
        <option value="EAsistirReuniones">Asistir a reuniones</option>
        <option value="ECumplirHorarios">Cumplir horarios de entrada y salida</option>
        <option value="EJustificar">Justificar inasistencias</option>
        <option value="EInformacion">Revisar y responder informacion</option>
        <option value="EParticipar">Participar activamente en las actividades</option>

        `
        let temp=""
        let temp2=""
        html=`
        
                
                ${contenido.map((dat,index)=>{
                if(index==0){
                    console.log(dat)
                    return`<tr>
                        ${dat.map((cabezera,index)=>{
                            
                            
                            this.columnasguardadas.forEach((dat,index2)=>{
                                if(index2==index){
                                    temp=`class="${dat}"`
                                    temp2=`value="${dat}"`
                                }
                            })
                            htmlcabezera+=`<th><select id="${index}" ${temp} onchange="matriculas.asignarcabezera(${index})">
                                ${opciones}
                            </select></th>`
                            temp=""
                            temp2=""
                            if(cabezera==null){
                                return `<th>-</th>`
                            }
                            return `<th>${cabezera}</th>`
                        })}
                    </tr>`
                }
                return `<tr>${dat.map(td=>{
                        if(td==null){
                            return `<td>-</td>`
                        }
                        return `<td>${td}</td>`
                })}</tr>`
        })}`
        $("#TablaExcel").html(htmlcabezera+"</tr>"+html)
        this.columnasguardadas.forEach((dat,index)=>{
            $("#"+index).val(dat)
        })
        $("#subirarchivo").hide()
    }

    asignarcabezera(x){
        $("#"+x).removeClass().addClass($("#"+x).val())
        this.columnasguardadas[x]=$("#"+x).val()
        console.log(this.columnasguardadas)
        
        console.log($(".ERun").attr("id"))
    }
    async importacionmasiva(){
        
            if($("#Excel").val()==""){
                Swal.fire({
                    icon: 'error',
                    title: 'Excel no cargado',
                    text: '',
                    })
                return
            }
            //let excel=document.getElementById("omg")
            let excel=$("#Excel")[0]
             
            
            let contenido= await readXlsxFile(excel.files[0],{sheet: parseInt($("#HojaExcel").val()) })
            
            
            let contenidofiltrado=[]
            let cabezera=true
            if($("#Encabezado").is(":checked")){
                cabezera=true
                contenido.shift()
            }else{
                cabezera=false
            }
            let fecha=""
           
            console.log(contenido)
            
            
            contenido.forEach(dat=>{
                console.log(dat)
                dat[999]="-"
                
                
                let fecha= new Date(dat[$("#EFechaNacimiento").val()])
                
                console.log(fecha)
                let fechatemp=""
                if(fecha=="Invalid Date"){
                    fechatemp=dat[$("#EFechaNacimiento").val()]
                }else{
                    fechatemp=`${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
                }
                contenidofiltrado.push( { 
                    smatricula:$("#SistemaMatricula").val(),
                    year:$("#years").val(),
                    curso:$("#CursoObjetivo").val(),
                    
                    run:dat[$(".ERun").attr("id")],
                    ipa:dat[$(".EIPA").attr("id")],
                    apellidopaterno:dat[$(".EApellidoPaterno").attr("id")],
                    apellidomaterno:dat[$(".EApellidoMaterno").attr("id")],
                    nombres:dat[$(".ENombres").attr("id")],
                    fechanacimiento:fechatemp,
                    nacionalidad:dat[$(".ENacionalidad").attr("id")],
                    etnia:dat[$(".EEtnia").attr("id")],
                    domicilio:dat[$(".EDomicilio").attr("id")],
                    religion:dat[$(".EReligion").attr("id")],
                    comuna:dat[$(".EComuna").attr("id")],
                    sexo:dat[$(".ESexo").attr("id")],
                    telefono:dat[$(".ETelefono").attr("id")],
                    edad:dat[$(".EEdad").attr("id")],
                    vivecon:dat[$(".EViveCon").attr("id")],
                    quienmatricula:dat[$(".EQuienMatricula").attr("id")],
                    estudiante:dat[$(".EEstudiante").attr("id")],
                    correoinstitucional:dat[$(".ECorreoInstitucional").attr("id")],

                    apellidospadre:dat[$(".EApellidosPadre").attr("id")],
                    nombrespadre:dat[$(".ENombresPadre").attr("id")],
                    runpadre:dat[$(".ERunPadre").attr("id")],
                    ipapadre:dat[$(".EIPAPadre").attr("id")],
                    nacionalidadpadre:dat[$(".ENacionalidadPadre").attr("id")],
                    pasaportepadre:dat[$(".EPasaportePadre").attr("id")],
                    domiciliopadre:dat[$(".EDomicilioPadre").attr("id")],
                    estudiospadre:dat[$(".EEstudiosPadre").attr("id")],
                    comunapadre:dat[$(".EComunaPadre").attr("id")],
                    ocupacionpadre:dat[$(".EOcupacionPadre").attr("id")],
                    telefono1padre:dat[$(".ETelefono1Padre").attr("id")],
                    apoderadopadre:dat[$(".EApoderadoPadre").attr("id")],
                    telefono2padre:dat[$(".ETelefono2Padre").attr("id")],
                    emailpadre:dat[$(".EEmailPadre").attr("id")],

                    apellidosmadre:dat[$(".EApellidosMadre").attr("id")],
                    nombresmadre:dat[$(".ENombresMadre").attr("id")],
                    runmadre:dat[$(".ERunMadre").attr("id")],
                    ipamadre:dat[$(".EIPAMadre").attr("id")],
                    nacionalidadmadre:dat[$(".ENacionalidadMadre").attr("id")],
                    pasaportemadre:dat[$(".EPasaporteMadre").attr("id")],
                    domiciliopadre:dat[$(".EDomicilioMadre").attr("id")],
                    estudiosmadre:dat[$(".EEstudiosMadre").attr("id")],
                    comunamadre:dat[$(".EComunaMadre").attr("id")],
                    ocupacionmadre:dat[$(".EOcupacionMadre").attr("id")],
                    telefono1madre:dat[$(".ETelefono1Madre").attr("id")],
                    apoderadomadre:dat[$(".EApoderadoMadre").attr("id")],
                    telefono2madre:dat[$(".ETelefono2Madre").attr("id")],
                    emailmadre:dat[$(".EEmailMadre").attr("id")],

                    establecimientoprocedencia:dat[$(".EEstablecimiento").attr("id")],
                    ultimoyearcursado:dat[$(".EUltimoyearcursado").attr("id")],
                    ultimocursocursado:dat[$(".EUltimocursorepetido").attr("id")],
                    pertenecepie:dat[$(".EPertenecePIE").attr("id")],
                    optaporreligion:dat[$(".EOptareligion").attr("id")],
                    optaporcredo:dat[$(".EOptaCredo").attr("id")],
                    becaindigena:dat[$(".EBecaIndigena").attr("id")],
                    otrabeca:dat[$(".EOtrabeca").attr("id")],
                    
                    perteneceprogramasocial:dat[$(".EProgramaSocial").attr("id")],
                    prioritario:dat[$(".EPrioritario").attr("id")],
                    preferente:dat[$(".EPreferente").attr("id")],
                    registrosocialdehogares:dat[$(".ERegistroSocialHogares").attr("id")],
                    
                    sistemadesalud:dat[$(".ESistemaSalud").attr("id")],
                    ceonsultoriocesfam:dat[$(".EConsultorioCesfam").attr("id")],
                    diagnosticomedico:dat[$(".EMedicoImpedimiento").attr("id")],
                    enfermedadcronica:dat[$(".EEnfermedadCronica").attr("id")],
                    alergico:dat[$(".EAlergico").attr("id")],
                    tomamedicamento:dat[$(".ETomaMedicamento").attr("id")],
                    encasodeemergencia:dat[$(".EEmergencia").attr("id")],

                    conozcoreglamento:dat[$(".EAceptoReglamento").attr("id")],
                    registrohuella:dat[$(".EHuella").attr("id")],
                    encuestareligion:dat[$(".EAsistenciaReligion").attr("id")],
                    protocolocovid:dat[$(".Ecovid19").attr("id")],
                    asistirreuniones:dat[$(".EAsistirReuniones").attr("id")],
                    cumplirhorario:dat[$(".ECumplirHorarios").attr("id")],
                    justificarinasistencias:dat[$(".EJustificar").attr("id")],
                    revisarinformacion:dat[$(".EInformacion").attr("id")],
                    participaactivamente:dat[$(".EParticipar").attr("id")],

                    

                } )
                
            })
            contenidofiltrado.forEach(dat=>{
                if(dat.run==undefined){
                    dat.run="-"
                }
                if(dat.ipa==undefined){
                    dat.ipa="-"
                }
                if(dat.apellidopaterno==undefined){
                    dat.apellidopaterno="-"
                }
                if(dat.apellidomaterno==undefined){
                    dat.apellidomaterno="-"
                }
                if(dat.nombres==undefined){
                    dat.nombres="-"
                }
                if(dat.fechanacimiento==undefined){
                    dat.fechanacimiento="-"
                }
                if(dat.nacionalidad==undefined){
                    dat.nacionalidad="-"
                }
                if(dat.etnia==undefined){
                    dat.etnia="-"
                }
                if(dat.domicilio==undefined){
                    dat.domicilio="-"
                }
                if(dat.religion==undefined){
                    dat.religion="-"
                }
                if(dat.comuna==undefined){
                    dat.comuna="-"
                }
                if(dat.sexo==undefined){
                    dat.sexo="-"
                }
                if(dat.telefono==undefined){
                    dat.telefono="-"
                }
                if(dat.edad==undefined){
                    dat.edad="-"
                }
                if(dat.vivecon==undefined){
                    dat.vivecon="-"
                }
                if(dat.quienmatricula==undefined){
                    dat.quienmatricula="-"
                }
                if(dat.estudiante==undefined){
                    dat.estudiante="-"
                }
                if(dat.correoinstitucional==undefined){
                    dat.correoinstitucional="-"
                }
                if(dat.apellidospadre==undefined){
                    dat.apellidospadre="-"
                }
                if(dat.nombrespadre==undefined){
                    dat.nombrespadre="-"
                }
                if(dat.runpadre==undefined){
                    dat.runpadre="-"
                }
                if(dat.ipapadre==undefined){
                    dat.ipapadre="-"
                }
                if(dat.nacionalidadpadre==undefined){
                    dat.nacionalidadpadre="-"
                }
                if(dat.pasaportepadre==undefined){
                    dat.pasaportepadre="-"
                }
                if(dat.domiciliopadre==undefined){
                    dat.domiciliopadre="-"
                }
                if(dat.estudiospadre==undefined){
                    dat.estudiospadre="-"
                }
                if(dat.comunapadre==undefined){
                    dat.comunapadre="-"
                }
                if(dat.ocupacionpadre==undefined){
                    dat.ocupacionpadre="-"
                }
                if(dat.telefono1padre==undefined){
                    dat.telefono1padre="-"
                }
                if(dat.apoderadopadre==undefined){
                    dat.apoderadopadre="-"
                }
                if(dat.telefono2padre==undefined){
                    dat.telefono2padre="-"
                }
                if(dat.emailpadre==undefined){
                    dat.emailpadre="-"
                }

                if(dat.apellidosmadre==undefined){
                    dat.apellidosmadre="-"
                }
                if(dat.nombresmadre==undefined){
                    dat.nombresmadre="-"
                }
                if(dat.runmadre==undefined){
                    dat.runmadre="-"
                }
                if(dat.ipamadre==undefined){
                    dat.ipamadre="-"
                }
                if(dat.nacionalidadmadre==undefined){
                    dat.nacionalidadmadre="-"
                }
                if(dat.pasaportemadre==undefined){
                    dat.pasaportemadre="-"
                }
                if(dat.domiciliopadre==undefined){
                    dat.domiciliopadre="-"
                }
                if(dat.estudiosmadre==undefined){
                    dat.estudiosmadre="-"
                }
                if(dat.comunamadre==undefined){
                    dat.comunamadre="-"
                }
                if(dat.ocupacionmadre==undefined){
                    dat.ocupacionmadre="-"
                }
                if(dat.telefono1madre==undefined){
                    dat.telefono1madre="-"
                }
                if(dat.apoderadomadre==undefined){
                    dat.apoderadomadre="-"
                }
                if(dat.telefono2madre==undefined){
                    dat.telefono2madre="-"
                }
                if(dat.emailmadre==undefined){
                    dat.emailmadre="-"
                }

                if(dat.establecimientoprocedencia==undefined){
                    dat.establecimientoprocedencia="-"
                }
                if(dat.ultimoyearcursado==undefined){
                    dat.ultimoyearcursado="-"
                }
                if(dat.ultimocursocursado==undefined){
                    dat.ultimocursocursado="-"
                }
                if(dat.pertenecepie==undefined){
                    dat.pertenecepie="-"
                }
                if(dat.optaporreligion==undefined){
                    dat.optaporreligion="-"
                }
                if(dat.optaporcredo==undefined){
                    dat.optaporcredo="-"
                }
                if(dat.becaindigena==undefined){
                    dat.becaindigena="-"
                }
                if(dat.otrabeca==undefined){
                    dat.otrabeca="-"
                }
                if(dat.perteneceprogramasocial==undefined){
                    dat.perteneceprogramasocial="-"
                }
                if(dat.prioritario==undefined){
                    dat.prioritario="-"
                }
                if(dat.preferente==undefined){
                    dat.preferente="-"
                }
                if(dat.registrosocialdehogares==undefined){
                    dat.registrosocialdehogares="-"
                }
                
                if(dat.sistemadesalud==undefined){
                    dat.sistemadesalud="-"
                }
                if(dat.ceonsultoriocesfam==undefined){
                    dat.ceonsultoriocesfam="-"
                }
                
                if(dat.diagnosticomedico==undefined){
                    dat.diagnosticomedico="-"
                }
                if(dat.enfermedadcronica==undefined){
                    dat.enfermedadcronica="-"
                }
                if(dat.alergico==undefined){
                    dat.alergico="-"
                }
                if(dat.tomamedicamento==undefined){
                    dat.tomamedicamento="-"
                }
                if(dat.encasodeemergencia==undefined){
                    dat.encasodeemergencia="-"
                }
                if(dat.conozcoreglamento==undefined){
                    dat.conozcoreglamento="-"
                }
                if(dat.registrohuella==undefined){
                    dat.registrohuella="-"
                }
                if(dat.encuestareligion==undefined){
                    dat.encuestareligion="-"
                }
                if(dat.protocolocovid==undefined){
                    dat.protocolocovid="-"
                }
                if(dat.asistirreuniones==undefined){
                    dat.asistirreuniones="-"
                }
                if(dat.cumplirhorario==undefined){
                    dat.cumplirhorario="-"
                }
                if(dat.justificarinasistencias==undefined){
                    dat.justificarinasistencias="-"
                }
                if(dat.revisarinformacion==undefined){
                    dat.revisarinformacion="-"
                }
                if(dat.participaactivamente==undefined){
                    dat.participaactivamente="-"
                }

            })
            console.log(contenidofiltrado)
            $("#Cargando").show()
            

            $.ajax({
                url: '/ImportacionMasiva',
                type: 'POST',
                data: {
                    
                    datinis : JSON.stringify(contenidofiltrado),
                    
                },
                headers: {
                    'X-CSRFToken': TOKEN
                },
                success: function (test) {
                    console.log(test)
                    $("#Cargando").hide()
                    Swal.fire({
                        icon: 'success',
                        title: 'Alumnos Matriculados',
                        text: '',
                        })
                },
                error: function (data) {
                   
                }
            });
            
    }
    

    crearmatricula(){


        if(this.requerido()==false){
            return
        }
        $("#Cargando").show()
        let mut=`
        mutation {
          matriculacreate(
            cursodematricula: ${$("#CursoNuevo").val()}

            aceptaregistrohuella: ${$("#AceptoHuella").is(":checked")}
            aceptoprotocoloscovid: ${$("#AceptoProtocolo19").is(":checked")}
            alergico: "${$("#Alergico").val()}"
            alumnoapellidomaterno: "${$("#ApellidoMaterno").val()}"
            alumnoapellidopaterno: "${$("#ApellidoPaterno").val()}"
            alumnocomuna: "${$("#Comuna").val()}"
            alumnocorreoinstitucional: "${$("#CorreoInstitucional").val()}"
            
            alumnodomicilio: "${$("#Domicilio").val()}"
            alumnoedad: "${$("#Edad").val()}"
            alumnoestudiantenuevo: "${$("#EstudianteNuevo").val()}"
            alumnoetnia: "${$("#Etnia").val()}"
            alumnofechanacimiento: "${$("#FechaNacimiento").val()}"
            alumnoipe: "${$("#IPE").val()}"
            alumnonacionalidad: "${$("#Nacionalidad").val()}"
            alumnonombres: "${$("#Nombres").val()}"
            alumnoquienmatricula: "${$("#QuienMatricula").val()}"
            alumnoreligion: "${$("#Religion").val()}"
            alumnosexo: "${$("#Sexo").val()}"
            alumnosistemadematricula: "${$("#SistemaDeMatricula").val()}"
            alumnotelefono: "${$("#Telefono").val()}"
            alumnovivecon: "${$("#ViveCon").val()}"
            asistenciareligion: ${$("#AceptoReligion").is(":checked")}
            asistiratodaslasreuniones: ${$("#AsistirReuniones").is(":checked")}
            becaindigena: "${$("#BecaIndigena").val()}"
            conocereglamentoevaluacion: ${$("#AceptoReglamentoEvaluacion").is(":checked")}
            conocereglamentointerno: ${$("#AceptoReglamentoInterno").is(":checked")}
            consultorioocesfam: "${$("#ConsultorioCesfam").val()}"
            cumplirhoradeentradaysalida: ${$("#CumplirHorarios").is(":checked")}
            cursosqueharepetido: "${$("#CursosRepetidos").val()}"
            encasodeemergenciacomunicarsecon: "${$("#CasoEmergencia").val()}"
            enfermedadcronica: "${$("#EnfermedadCronica").val()}"
            establecimientoprocedencia: "${$("#EstablecimientoProcedencia").val()}"
            impedimentofisico: "${$("#DiagnosticoMedico").val()}"
            justificarinasistencias: ${$("#JustificarInasistencias").is(":checked")}
            madreapellidos: "${$("#MadreApellidos").val()}"
            madreapoderado: "${$("#MadreApoderado").val()}"
            madrecomuna: "${$("#MadreComuna").val()}"
            madredomicilio: "${$("#MadreDomicilio").val()}"
            madreemail: "${$("#MadreEmail").val()}"
            madreestudios: "${$("#MadreEstudios").val()}"
            madreipa: "${$("#MadreIpa").val()}"
            madrenacionalidad: "${$("#MadreNacionalidad").val()}"
            madrenombres: "${$("#MadreNombres").val()}"
            madreocupacion: "${$("#MadreOcupacion").val()}"
            madrepasaporte: "${$("#MadrePasaporte").val()}"
            madrerun: "${$("#MadreRun").val()}"
            madretelefono1: "${$("#MadreTelefono1").val()}"
            madretelefono2: "${$("#MadreTelefono2").val()}"
            optaporuncredo: "${$("#OptaCredo").val()}"
            optareligion: "${$("#OptaCredo").val()}"
            otrabeca: "${$("#OtraBeca").val()}"
            padreapellidos: "${$("#PadreApellidos").val()}"
            padreapoderado: "${$("#PadreApoderado").val()}"
            padrecomuna: "${$("#PadreComuna").val()}"
            padredomicilio: "${$("#PadreDomicilio").val()}"
            padreemail: "${$("#PadreEmail").val()}"
            padreipa: "${$("#PadreIpa").val()}"
            padrenacionalidad: "${$("#PadreNacionalidad").val()}"
            padrenombres: "${$("#PadreNombres").val()}"
            padreocupacion: "${$("#PadreOcupacion").val()}"
            padreestudios: "${$("#PadreEstudios").val()}"
            padrepasaporte: "${$("#PadrePasaporte").val()}"
            padrerun: "${$("#PadreRun").val()}"
            padretelefono1: "${$("#PadreTelefono1").val()}"
            padretelefono2: "${$("#PadreTelefono2").val()}"
            participarenactividades: ${$("#ParticiparActivamente").is(":checked")}
            perteneceinegracionescolar: "${$("#PerteneceIntegracionEscolar").val()}"
            perteneceprogramasocial: "${$("#PerteneceProgramaSocial").val()}"
            preferente: "${$("#Preferente").val()}"
            prioritario: "${$("#Prioritario").val()}"
            registrosocial: "${$("#RegistroSocial").val()}"
            revisaryresponderinfo: ${$("#RevisarInfo").is(":checked")}
            runalumno: "${$("#RunNacional").val()}"
            sistemasalud: "${$("#SistemaSalud").val()}"
            tienejuna: "${$("#Junaeb").val()}"
            tomamedicamentos: "${$("#Medicamento").val()}"
            ultimoyearcursado: "${$("#UltimoYearCursado").val()}"
            firmas: "${this.firma}"
          ) {
            success
            id
            error
          }
        }
          `

          axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            console.log(mut)
            //this.creardatospersomatricula(response.data.data.matriculacreate.id)   
            console.log(response.data.data.matriculacreate.id)
            this.Limpiar()
            Swal.fire({
                icon: 'success',
                title: 'Alumno Matriculado',
                text: '',
                })
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(mut)
            console.log(error)
            $("#Cargando").hide()
        })
    }
    creardatospersomatricula(x){
        let query=""
        console.log(this.camposperso)
        this.camposperso.forEach(seccion=>{

            seccion.matriculasopcionpersonalizadaSet.forEach(opciones=>{
                console.log("valor"+$(`#Value-${opciones.id}`).val())
                if($(`#Value-${opciones.id}`).val()=="on"){
                    query=`
                    mutation {
                        matriculaopcionvalorcreate(idmatricula: ${x}, idopcion: ${opciones.id}, valor: "${$(`#Value-${opciones.id}`).is(':checked')}") {
                        success
                        error
                        }
                    }
                `
                }else{
                    query=`
                                        mutation {
                                            matriculaopcionvalorcreate(idmatricula: ${x}, idopcion: ${opciones.id}, valor: "${$(`#Value-${opciones.id}`).val()}") {
                                            success
                                            error
                                            }
                                        }
                                    `
                }
                
                axios.post("/graphql/",{
                    query:query
                }).then(response=>{
                    console.log(x)
                    console.log(opciones.id)
                    
                    console.log($(`#Value-${opciones.id}`).val())
                    
                }).catch(error=>{
                    
                    console.log(error)
                    console.log(query)
                    $("#Cargando").hide()
                })
            })

        })
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }
}