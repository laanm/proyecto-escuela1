class javaverlistaespera{


    constructor(){
        this.lista=[]
        this.cursos=[]
        this.config=0
        this.hoy= new Date()
        $("#InicioOrden").hide()
        this.cargarcursos()
        this.cargarlista()

    }
    cargarcursos(){
        $("#Cargando").show()
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
                verlistaespera.cursos=data
                
            },
            error: function (data) {
               
            }
        });
    }
    cargarlista(){
        $("#Cargando").show()
        $.ajax({
            url: '/DatosListaEspera',
            type: 'GET',
            data: {

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                verlistaespera.lista=data.datinis
                verlistaespera.config=data.config
                verlistaespera.mostrardatos()
                $("#Cargando").hide()
            },
            error: function (data) {
               
            }
        });
    }
    
    mostrardatos(){
        let temp=""
        let html=`
            <table>
            <tr>
                <th>Orden</th>
                <th>Estado</th>
                <th>Fecha Emision</th>
                <th>Curso</th>
                <th>Ver Matricula</th>
                <th>Accion</th>
            </tr>
            
            ${this.lista.map((dat,index)=>{
                
                if(dat.estado!=1){
                    return
                }
                return`
                <tr>
                    <td>${this.config+index}</td>
                    <td>Pendiente</td>
                    <td>${dat.fechaemision.slice(0,10)}</td>
                    <td>${dat.nombrecurso}</td>
                    <td><button class="BotonSmall" onclick="verlistaespera.abrirhistorial(${dat.idmatricula})">Ver matricula</button></td>
                    <td><button class="BotonAprobar" onclick="verlistaespera.abrirmini(${dat.id})">Aceptar</button><button class="BotonRechazar" onclick="verlistaespera.editar(${dat.id},0)">Rechazar</button></td>
                </tr>
                `
            }).join("")}
        
            </table>
        `
        $("#Principal").html(html)
        if(this.config>=1){
            $("#Activo").prop("checked",true)
            $("#Inicio").val(this.config)
            $("#InicioOrden").show()
        }else{
            $("#InicioOrden").hide()
        }
        
    }


    abrirmini(x){

        let html=`
        
        <h2>Selecciona curso para asignarlo</h2>
        <select id="CursoSelect">
            ${this.cursos.map(dat=>{
                return `<option value="${dat.id}">${dat.nombre}</option>`
            })}
        </select>
        <div><button class="BotonSmall" onclick="verlistaespera.editar(${x},2)">Matricular</button><button class="BotonRechazar" onclick="verlistaespera.cerrarventana()">Cancelar</button></div>
        `
        $("#Ventana").html(html)
        $("#Ventana").removeClass("MiniVentana").addClass("MiniVentana")
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        $("#Cargando").show()
        $(".preloader").hide()
    }

    

    editar(x,y){
        $("#Cargando").show()
        if($("#CursoSelect").val()!=undefined){
            $.ajax({
                url: '/EditarListaEspera',
                type: 'POST',
                data: {
                   "id":x,
                   "estado":y,
                   "curso":$("#CursoSelect").val()
                },
                headers: {
                    'X-CSRFToken': TOKEN
                },
                success: function (data) {
                    verlistaespera.cargarlista()
                    verlistaespera.cerrarventana()
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
            });
        }else{
            $.ajax({
            url: '/EditarListaEspera',
            type: 'POST',
            data: {
               "id":x,
               "estado":y,
               
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                verlistaespera.cargarlista()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
        }
        
    }

    Activar(){
        
        let temp=0
        if($("#Activo").is(":checked")){
            temp=1
            
        }else{
            if(confirm("Se desactivara el registro publico, esto hara que el inicio de orden cambie a 1")){
            
            }else{
                $("#Activo").prop("checked",true)
                return
            }
        }

        $("#Cargando").show()
        $.ajax({
            url: '/ActivarListaEspera',
            type: 'POST',
            data: {
               "inicio":temp,

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                verlistaespera.cargarlista()  
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }

    Cambiar(){
       
        $("#Cargando").show()
        $.ajax({
            url: '/ActivarListaEspera',
            type: 'POST',
            data: {
               "inicio":$("#Inicio").val(),

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                verlistaespera.cargarlista()  
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
   

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        $("#Ventana").removeClass("MiniVentana")
        $("#Cargando").hide()
        $(".preloader").show()
        
    }
    mostrar(matricula){
        let html=`
        
        
            
            
                <button id="Cerrar" onclick="verlistaespera.cerrarventana()">X</button>
                <div id="Contenido">
                <h2>Estudiante</h2>
                <table id="TablaEstudiante">
                
                <tr>
                    <th>Apellido Paterno</th>
                    <td>${matricula.apellidopaterno}</td>
                    <th>Run Nacional</th>
                    <td>${matricula.runalumno}</td>
                </tr>
                <tr>
                    <th>Apellido Materno</th>
                    <td>${matricula.apellidomaterno}</td>
                    <th>I.P.A(identificador Provisorio)</th>
                    <td>${matricula.ipe}</td>
                </tr>
                
                 <tr>
                    <th>Nombres</th>
                    <td>${matricula.nombres}</td>
                    <th>Nacionalidad</th>
                    <td>${matricula.nacionalidad}</td>
                </tr>
                <tr>
                    <th>Fecha Nacimiento</th>
                    <td>${matricula.fechanacimiento}</td>
                    <th>Etnia</th>
                    <td>${matricula.etnia}</td>
                </tr>
                
                 <tr>
                    <th>Domicilio</th>
                    <td>${matricula.domicilio}</td>
                    <th>Religion</th>
                    <td>${matricula.religion}</td>
                </tr>
                <tr>
                    <th>Comuna</th>
                    <td>${matricula.comuna}</td>
                    <th>Sexo</th>
                    <td>${matricula.sexo}</td>
                </tr>
                
                 <tr>
                    <th>Telefono</th>
                    <td>${matricula.telefono}</td>
                    <th>Edad</th>
                    <td>${matricula.edad}</td>
                </tr>
                <tr>
                    <th>Vive Con</th>
                    <td>${matricula.vivecon}</td>
                    <th>Curso de Matriculacion</th>
                    <td>${matricula.curso}</td>
                </tr>
                
                <tr>
                    <th>Quien Matricula</th>
                    <td>${matricula.quienmatricula}
                    </td>
                    <th>Estudiante</th>
                    <td>${matricula.estudiantenuevo}
                    </td>
                </tr>
                <tr>
                    <th>Sistema de matricula</th>
                    <td>${matricula.sistemadematricula}</td>
                    <th>Correo Institucional</th>
                    <td>${matricula.correoinstitucional}</td>
                </tr>
                
            </table>
    
            <h2>Antecedentes Familiares</h2>
            <h3>Padre</h3>
            <table id="TablaPadre">
                
                
                <tr>
                    <th>Apellidos</th>
                    <td>${matricula.padreapellidos}</td>
                    <th>R.U.N</th>
                    <td>${matricula.padrerun}</td>
                </tr>
                <tr>
                    <th>Nombres</th>
                    <td>${matricula.padrenombres}</td>
                    <th>I.P.A</th>
                    <td>${matricula.padreipa}</td>
                </tr>
                
                <tr>
                    <th>Nacionalidad</th>
                    <td>${matricula.padrenacionalidad}</td>
                    <th>N° Pasaporte</th>
                    <td>${matricula.padrenpasaporte}</td>
                </tr>
                <tr>
                    <th>Domicilio</th>
                    <td>${matricula.padredomicilio}</td>
                    <th>Estudios</th>
                    <td>${matricula.padreestudios}
                    </td>
                </tr>
                
                <tr>
                    <th>Comuna</th>
                    <td>${matricula.padrecomuna}
                    </td>
                    <th>Ocupacion</th>
                    <td>${matricula.padreocupacion}</td>
                </tr>
                <tr>
                    <th>Telefono 1</th>
                    <td>${matricula.padretelefono1}</td>
                    <th>Apoderado</th>
                    <td>${matricula.padreapoderado}
                    </td>
                </tr>
                
                <tr>
                    <th>Telefono 2</th>
                    <td>${matricula.padretelefono2}</td>
                    <th>E-Mail</th>
                    <td>${matricula.padreemail}</td>
                </tr>
            </table>
            <h3>Madre</h3>
            <table id="TablaMadre">
                
                <tr>
                    <th>Apellidos</th>
                    <td>${matricula.madreapellidos}</td>
                    <th>R.U.N</th>
                    <td>${matricula.madrerun}</td>
                </tr>
                <tr>
                    <th>Nombres</th>
                    <td>${matricula.madrenombres}</td>
                    <th>I.P.A</th>
                    <td>${matricula.madreipa}</td>
                </tr>
                
                <tr>
                    <th>Nacionalidad</th>
                    <td>${matricula.madrenacionalidad}</td>
                    <th>N° Pasaporte</th>
                    <td>${matricula.madrenpasaporte}</td>
                </tr>
                <tr>
                    <th>Domicilio</th>
                    <td>${matricula.madredomicilio}</td>
                    <th>Estudios</th>
                    <td>${matricula.madreestudios}</td>
                </tr>
                
                <tr>
                    <th>Comuna</th>
                    <td>${matricula.madrecomuna}</td>
                    <th>Ocupacion</th>
                    <td>${matricula.madreocupacion}</td>
                </tr>
                <tr>
                    <th>Telefono 1</th>
                    <td>${matricula.madretelefono1}</td>
                    <th>Apoderado</th>
                    <td>${matricula.madreapoderado}</td>
                </tr>
                
                <tr>
                    <th>Telefono 2</th>
                    <td>${matricula.madretelefono2}</td>
                    <th>E-Mail</th>
                    <td>${matricula.madreemail}</td>
                </tr>
            </table>
    
            <h2>Antecedentes Academicos</h2>
            <h3></h3>
            <table id="TablaAntecedentesAcademicos">
                <tr>
                    <th>Establecimiento de procedencia</th>
                    <td>${matricula.establecimientoprocedencia}</td>
                </tr>
                <tr>
                    <th>Ultimo Año cursado</th>
                    <td>${matricula.ultimoyearcursado}</td>
                </tr>
                <tr>
                    <th>Ultimo Curso repetido</th>
                    <td>${matricula.cursosqueharepetido}
                    </td>
                </tr>
               
                <tr>
                    <th>Opta por religion</th>
                    <td>${matricula.optaporreligion}
                    </td>
                    <th>Opta por un credo</th>
                    <td>${matricula.optaporuncredo}
                    </td>
                </tr>
            </table>
    
            
    
            <h2>Antecedentes de salud</h2>
    
            <table id="AntecendesDeSalud">
                
                <tr>
                    <th>Sistema de salud</th>
                    <td>${matricula.sistemadesalud}
                    </td>
                </tr>
                <tr>
                    <th>Consultorio o cesfam</th>
                    <td>${matricula.consultorioocesfam}
                    </td>
                </tr>
                <tr>
                    <th>Su hij@ tiene algun diasgnostico medico o impedimiento</th>
                    <td>${matricula.hijoconimpedimentofisico}
                    </td>
                </tr>
                <tr>
                    <th>Tiene alguna enfermedad cronica</th>
                    <td>${matricula.enfermedadcronica}</td>
                </tr>
                <tr>
                    <th>Alergico</th>
                    <td>${matricula.alergico}</td>
                </tr>
                <tr>
                    <th>Toma algun medicamento</th>
                    <td>${matricula.tomamedicamento}</td>
                </tr>
                <tr>
                    <th>En caso de emergencia comunicarse con</th>
                    <td>${matricula.encasodeemergenciacomunicarsecon}</td>
                </tr>
            </table>
            <h2>Documentacion</h2>
    
            <table id="TableDocumentacion">
                
                <tr>
                    <th>Conozco y acepto el reglamento interno del establecimiento</th>
                    <td>${this.ticket(matricula.conoceyaceptareglamentointernodelestablecimiento)}</td>
                </tr>
                <tr>
                    <th>Conozco y acepto el reglamento de evaluacion del establecimiento</th>
                    <td>${this.ticket(matricula.conoceyaceptareglamentodeevaluaciondelestablecimiento)}</td>
                </tr>
                <tr>
                    <th>Tomo conocimiento de registro de huella para fines de registro de horario de llegada al establecimiento</th>
                    <td>${this.ticket(matricula.aceptoelusoderegistrodehuellaconfinesderegistrodehorario)}</td>
                </tr>
                <tr>
                    <th>Encuesta para la asistencia de su pupilo/a a la asignatura de religion</th>
                    <td>${this.ticket(matricula.encuestaparalaasistenciadereligion)}</td>
                </tr>
                <tr>
                    <th>Tomo conocimiento de los protocolos contra el covid-19</th>
                    <td>${this.ticket(matricula.aceptolosprotocoloscontraelcovid19)}</td>
                </tr>
    
                </table>
    
                <h2>Deberes y compromisos</h2>
                <table id="TablaDeberes">
            
                <tr>
                    <th>Asistir a todas las reuniones, citaciones o llamadas que realice los profesores y/o directivos
                        en relacion a mi pupilo/a
                    </th>
                    <td>${this.ticket(matricula.asistiratodaslasreunionescitacionesollamadas)}</td>
                </tr>
                <tr>
                    <th>Cumplir los horarios de entrada y salida establecidos por el liceo</th>
                    <td>${this.ticket(matricula.cumplirhorariodeentradaysalida)}</td>
                </tr>
                <tr>
                    <th>justificar las inasistencias de mi pupilo/a con documentos pertinentes</th>
                    <td>${this.ticket(matricula.justificarinasistenciascondocumentospertinentes)}</td>
                </tr>
                <tr>
                    <th>Revisar y responder la informacion que envie el establecimiento en los diferentes medios de comunicacion establecida</th>
                    <td>${this.ticket(matricula.revisaryresponderinformacionmediantemediosdecomunicacion)}</td>
                </tr>
                <tr>
                    <th>Participa activamente en als diferentes actividades programadas por el establecimiento</th>
                    <td>${this.ticket(matricula.particaendiferentesactividadesprogramadasporelestablecimiento)}</td>
                </tr>
            </table>
        `
        $("#Ventana").html(html)
        $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
    }
    abrirhistorial(x){
        $("#Cargando").show()
        
        $.ajax({
            url: '/alumnosindividual',
            type: 'POST',
            data: {
               "id":x,

            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                verlistaespera.mostrar(data[0])
                $("#Cargando").hide()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
        
        
    }
    
    ticket(x){
        if(x==false || x=="false"){
            return "No"
        }else{
            return "Si"
        }
        
    }
}