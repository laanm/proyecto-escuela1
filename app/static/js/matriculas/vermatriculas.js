

class javavermatriculas{

    constructor(){

        this.matriculas=[]
        this.peronalizadas=[]
        this.cursos=[]
        this.cursostarget=[];
        this.canvas;
        this.doc;
        $(document).ready(function(){
            vermatriculas.doc = new jsPDF({
                        unit: "mm",
                        format: [220,340]
                        
            })
            vermatriculas.cargardatos()
        })
        
        
    }

    crearplantilla(){
        
        
        
        this.doc.rect(10,10,200,320)
        
        this.doc.setFontSize(10)
        //recuadritos base
        var tamanore=5;
        
        
        this.doc.rect(5,5,210,330)
        this.doc.line(10, 50, 210, 50)
        this.doc.line(10, 60, 210, 60)
        this.doc.line(10, 70, 210, 70)
        this.doc.rect(10,70,50,tamanore)
        this.doc.rect(10,70,100,tamanore)
        this.doc.rect(10,70,150,tamanore)
        this.doc.rect(10,70,200,tamanore)
        this.doc.rect(10,75,50,tamanore)
        this.doc.rect(10,75,100,tamanore)
        this.doc.rect(10,75,150,tamanore)
        this.doc.rect(10,75,200,tamanore)
        this.doc.rect(10,80,50,tamanore)
        this.doc.rect(10,80,100,tamanore)
        this.doc.rect(10,80,150,tamanore)
        this.doc.rect(10,80,200,tamanore)
        this.doc.rect(10,85,50,tamanore)
        this.doc.rect(10,85,100,tamanore)
        this.doc.rect(10,85,150,tamanore)
        this.doc.rect(10,85,200,tamanore)
        this.doc.rect(10,90,50,tamanore)
        this.doc.rect(10,90,100,tamanore)
        this.doc.rect(10,90,150,tamanore)
        this.doc.rect(10,90,200,tamanore)
        this.doc.rect(10,95,50,tamanore)
        this.doc.rect(10,95,100,tamanore)
        this.doc.rect(10,95,150,tamanore)
        this.doc.rect(10,95,200,tamanore)
        this.doc.rect(10,100,50,tamanore)
        this.doc.rect(10,100,100,tamanore)
        this.doc.rect(10,100,150,tamanore)
        this.doc.rect(10,100,200,tamanore)
        this.doc.rect(10,105,50,tamanore)
        this.doc.rect(10,105,100,tamanore)
        this.doc.rect(10,105,150,tamanore)
        this.doc.rect(10,105,200,tamanore)
        this.doc.rect(10,110,50,tamanore)
        this.doc.rect(10,110,100,tamanore)
        this.doc.rect(10,110,150,tamanore)
        this.doc.rect(10,110,200,tamanore)
        this.doc.rect(10,115,50,tamanore)
        this.doc.rect(10,115,100,tamanore)
        this.doc.rect(10,115,150,tamanore)
        this.doc.rect(10,115,200,tamanore)
        this.doc.rect(10,132,50,tamanore)
        this.doc.rect(10,132,100,tamanore)
        this.doc.rect(10,132,150,tamanore)
        this.doc.rect(10,132,200,tamanore)
        this.doc.rect(10,137,50,tamanore)
        this.doc.rect(10,137,100,tamanore)
        this.doc.rect(10,137,150,tamanore)
        this.doc.rect(10,137,200,tamanore)
        this.doc.rect(10,142,50,tamanore)
        this.doc.rect(10,142,100,tamanore)
        this.doc.rect(10,142,150,tamanore)
        this.doc.rect(10,142,200,tamanore)
        this.doc.rect(10,147,50,tamanore)
        this.doc.rect(10,147,100,tamanore)
        this.doc.rect(10,147,150,tamanore)
        this.doc.rect(10,147,200,tamanore)
        this.doc.rect(10,152,50,tamanore)
        this.doc.rect(10,152,100,tamanore)
        this.doc.rect(10,152,150,tamanore)
        this.doc.rect(10,152,200,tamanore)
        this.doc.rect(10,157,50,tamanore)
        this.doc.rect(10,157,100,tamanore)
        this.doc.rect(10,157,150,tamanore)
        this.doc.rect(10,157,200,tamanore)
        this.doc.rect(10,162,50,tamanore)
        this.doc.rect(10,162,100,tamanore)
        this.doc.rect(10,162,150,tamanore)
        this.doc.rect(10,162,200,tamanore)
        this.doc.line(10, 178, 210, 178)
        this.doc.rect(10,178,50,tamanore)
        this.doc.rect(10,178,100,tamanore)
        this.doc.rect(10,178,150,tamanore)
        this.doc.rect(10,178,200,tamanore)
        this.doc.rect(10,183,50,tamanore)
        this.doc.rect(10,183,100,tamanore)
        this.doc.rect(10,183,150,tamanore)
        this.doc.rect(10,183,200,tamanore)
        this.doc.rect(10,188,50,tamanore)
        this.doc.rect(10,188,100,tamanore)
        this.doc.rect(10,188,150,tamanore)
        this.doc.rect(10,188,200,tamanore)
        this.doc.rect(10,193,50,tamanore)
        this.doc.rect(10,193,100,tamanore)
        this.doc.rect(10,193,150,tamanore)
        this.doc.rect(10,193,200,tamanore)
        this.doc.rect(10,198,50,tamanore)
        this.doc.rect(10,198,100,tamanore)
        this.doc.rect(10,198,150,tamanore)
        this.doc.rect(10,198,200,tamanore)
        this.doc.rect(10,203,50,tamanore)
        this.doc.rect(10,203,100,tamanore)
        this.doc.rect(10,203,150,tamanore)
        this.doc.rect(10,203,200,tamanore)
        this.doc.rect(10,208,50,tamanore)
        this.doc.rect(10,208,100,tamanore)
        this.doc.rect(10,208,150,tamanore)
        this.doc.rect(10,208,200,tamanore)
        this.doc.line(10, 219, 210, 219)
        this.doc.rect(10,219,100,tamanore)
        this.doc.rect(10,219,200,tamanore)
        this.doc.rect(10,224,100,tamanore)
        this.doc.rect(10,224,200,tamanore)
        this.doc.rect(10,229,100,tamanore)
        this.doc.rect(10,229,200,tamanore)
        this.doc.rect(10,234,100,tamanore)
        this.doc.rect(10,234,200,tamanore)
        
        this.doc.rect(10,239,80,tamanore)
        this.doc.rect(90,239,20,tamanore)
        
        //religion
        this.doc.rect(90,239,80,tamanore)
        
        
        this.doc.rect(10,239,200,tamanore)
        this.doc.rect(10,250,100,tamanore)
        
        this.doc.rect(10,250,180,tamanore)//es beneficiario de alguna beca
        this.doc.rect(190,250,20,tamanore)//pertenece algun programa social
        
        this.doc.rect(10,255,100,tamanore)//junaeb
        this.doc.rect(60,255,50,tamanore)
        
        this.doc.rect(10,255,200,tamanore)//prioritario
        this.doc.rect(160,255,50,tamanore)
        
        this.doc.rect(10,260,100,tamanore)
        this.doc.rect(60,260,50,tamanore)
        this.doc.rect(60,265,50,tamanore)
        
        this.doc.rect(160,260,50,tamanore)
        this.doc.rect(160,265,50,tamanore)
        
        this.doc.rect(10,260,200,tamanore)
        this.doc.rect(10,265,100,tamanore)
        this.doc.rect(10,265,200,tamanore)
        this.doc.rect(10,276,100,tamanore)
        this.doc.rect(10,276,200,tamanore)
        this.doc.rect(10,281,100,tamanore)
        this.doc.rect(10,281,200,tamanore)
        this.doc.rect(10,286,185,tamanore)
        this.doc.rect(10,286,200,tamanore)
        this.doc.rect(10,291,100,tamanore)
        this.doc.rect(10,291,200,tamanore)
        this.doc.rect(10,296,100,tamanore)
        this.doc.rect(10,296,200,tamanore)
        this.doc.rect(10,301,100,tamanore)
        this.doc.rect(10,301,200,tamanore)
        this.doc.rect(10,306,100,tamanore)
        this.doc.rect(10,306,200,tamanore)
        this.doc.rect(10,10,200,320)


        this.doc.setFontStyle('bold')
        this.doc.text("ANTECEDENTES PERSONALES",110,57,"center")
        this.doc.text("ESTUDIANTE",110,67,'center')
        this.doc.text("Apellido Paterno",35,74,'center')
        this.doc.text("Run Nacional",135,74,'center')
        this.doc.text("Apellido Materno",35,79,'center')
        this.doc.text("I.P.E",135,79,'center')
        this.doc.text("Nombres",35,84,'center')
        this.doc.text("Nacionalidad",135,84,'center')
        this.doc.text("Fecha Nacimiento",35,89,'center')
        this.doc.text("Etnia",135,89,'center')
        this.doc.text("Domicilio",35,94,'center')
        this.doc.text("Religión",135,94,'center')
        this.doc.text("Comuna",35,99,'center')
        this.doc.text("Sexo",135,99,'center')
        this.doc.text("Teléfono",35,104,'center')
        this.doc.text("Edad",135,104,'center')
        this.doc.text("Vive con",35,109,'center')
        this.doc.text("Curso de matricula",135,109,'center')
        this.doc.text("Quien matrícula",35,114,'center')
        this.doc.text("Estudiante",135,114,'center')
        this.doc.text("Sistema de matricula",35,119,'center')
        this.doc.text("Correo institucional",135,119,'center')
        this.doc.text("ANTECEDENTES FAMILIARES",110,125,'center')
        this.doc.text("PADRE",110,131,'center')
        this.doc.text("Apellidos",35,136,'center')
        this.doc.text("R.U.N",135,136,'center')
        this.doc.text("Nombres",35,141,'center')
        this.doc.text("I.P.E",135,141,'center')
        this.doc.text("Nacionalidad",35,146,'center')
        this.doc.text("N° Pasaporte",135,146,'center')
        this.doc.text("Domicilio",35,151,'center')
        this.doc.text("Estudios",135,151,'center')
        this.doc.text("Comuna",35,156,'center')
        this.doc.text("Ocupacion",135,156,'center')
        this.doc.text("Teléfono 1",35,161,'center')
        this.doc.text("Apoderado",135,161,'center')
        this.doc.text("Teléfono 2",35,166,'center')
        this.doc.text("ANTECEDENTES FAMILIARES",110,172,'center')
        this.doc.text("MADRE",110,177,'center')
        this.doc.text("Apellidos",35,182,'center')
        this.doc.text("R.U.N",135,182,'center')
        this.doc.text("Nombres",35,187,'center')
        this.doc.text("I.P.A",135,187,'center')
        this.doc.text("Nacionalidad",35,192,'center')
        this.doc.text("N°Pasaporte",135,192,'center')
        this.doc.text("Domicilio",35,197,'center')
        this.doc.text("Estudios",135,197,'center')
        this.doc.text("Comuna",35,202,'center')
        this.doc.text("Ocupacion",135,202,'center')
        this.doc.text("Teléfono 1",35,207,'center')
        this.doc.text("Apoderado",135,207,'center')
        this.doc.text("Teléfono 2",35,212,'center')
        this.doc.text("E-Mail",135,212,'center')
        this.doc.text("ANTECEDENTES ACADEMICOS",110,218,'center')
        this.doc.text("Establecimiento de procedencia",60,223,'center')
        this.doc.text("Ultimo año cursado",60,228,'center')
        this.doc.text("Pertenece al proyecto de integracion escolar",60,238,'center')
        this.doc.text("Opta por religión",60,243,'center')
        this.doc.text("Opta por un credo",140,243,'center')
        this.doc.text("Es Beneficiario de alguna beca",60,254,'center')
        this.doc.text("Junaeb",40,259,'center')
        this.doc.text("Beca Indigena",40,264,'center')
        this.doc.text("Otra Beca",40,269,'center')
        this.doc.text("Pertenece algún programa social",150,254,'center')
        this.doc.text("Prioritario",135,259,'center')
        this.doc.text("Preferente",135,264,'center')
        this.doc.text("Registro social de hogares",135,269,'center')
        this.doc.text("ANTECEDENTES SOCIALES",110,249,'center')
        this.doc.text("Su hijo/a tiene algún diagnóstico médico o impedimento físico, que no permita desarrollar actividad fisica",100,290,'center')
        this.doc.text("Consultorio o Cesfam",60,285,'center')
        this.doc.text("Sistema de salud",60,280,'center')
        this.doc.text("Cursos que a repetido",60,233,'center')
        this.doc.text("Tiene alguna enfermedad crónica",60,295,'center')
        this.doc.text("Alergico",60,300,'center')
        this.doc.text("ANTECEDENTES DE SALUD",110,275,'center')
        this.doc.text("En caso de emergencia comunicarse con",60,310,'center')
        this.doc.text("Toma algún medicamento",60,305,'center')
        this.doc.text("E-Mail",135,166,'center')

        console.log(this.personalizadas)
        this.doc.addPage()
        this.doc.rect(10,10,200,320)//recuadro del pdf
        this.doc.rect(5,5,210,330)

        //otros documentos de pagina 2 
        this.doc.rect(10,10,200,320)//recuadro del pdf
        this.doc.rect(5,5,210,330)
        
        this.doc.rect(10,10,200,10)
        this.doc.text("DOCUMENTACION",110,17,"center")
        this.doc.rect(10,20,180,7)
        this.doc.rect(190,20,20,7)
        this.doc.text("Conozco y acepto el reglamento de interno del establecimiento",100,26,"center")

        this.doc.rect(10,27,180,7)
        this.doc.rect(190,27,20,7)
        this.doc.text("Conozco Y Acepto El Reglamento De Evaluación Del Establecimiento",100,33,"center")

        this.doc.rect(10,34,180,7)
        this.doc.rect(190,34,20,7)
        this.doc.text("Acepto la huella digitar para fines de registro de horario de llegada al establecimiento",100,40,"center")

        this.doc.rect(10,41,180,7)
        this.doc.rect(190,41,20,7)
        this.doc.text("encuesta para la asistencia de su pupilo/a a la asignatura de religión",100,47,"center")

        this.doc.rect(10,48,180,7)
        this.doc.rect(190,48,20,7)
        this.doc.text("Tomo conocimiento de los protocolos contra el covid-19 ",100,54,"center")

        this.doc.rect(10,55,200,10)
        this.doc.text("DEBERES Y COMPROMISOS",110,61,"center")
        this.doc.rect(10,65,180,7)
        this.doc.rect(190,65,20,7)
        this.doc.setFontSize(8.5)
        this.doc.text("Asistir a todas las reuniones, citaciones o llamadas que realice los profesores y/o directivos en relación a mi pupilo(a)",100,70,"center")
        this.doc.setFontSize(10)
        this.doc.rect(10,72,180,7)
        this.doc.rect(190,72,20,7)
        this.doc.text("Cumplir los horarios de entrada y salida establecidos por el liceo",100,77,"center")

        this.doc.rect(10,79,180,7)
        this.doc.rect(190,79,20,7)
        this.doc.text("Justificar las inasistencias de mi pupilo(a) con los documentos pertinentes",100,84,"center")

        this.doc.rect(10,86,180,7)
        this.doc.rect(190,86,20,7)
        this.doc.setFontSize(7.5)
        this.doc.text("Revisar y responder la información que envíe el establecimiento en los diferentes en los diferentes medios de comunicación establecida",100,91,"center")
        this.doc.setFontSize(10)
        this.doc.rect(10,93,180,7)
        this.doc.rect(190,93,20,7)
        this.doc.text("Participar activamente en las diferentes actividades programadas por el establecimiento",100,98,"center")



        let espacio=100;
        this.personalizadas.forEach((dat,index) => {
            this.doc.rect(10,espacio,200,8)
            espacio+=8;
            this.doc.setFontSize(13)
            this.doc.text(dat.nombreseccion,110,espacio-2,"center")
            this.doc.setFontSize(10)
            dat.matriculasopcionpersonalizadaSet.forEach((dat2,index)=>{
                this.doc.rect(10,espacio,100,tamanore)
                this.doc.rect(110,espacio,100,tamanore)
                espacio+=tamanore
                this.doc.text(dat2.nombreopcion,55,espacio-1,"center")
            })
        });
        
        
        
    }

    cargardatos(){

        $("#Cargando").show()
        let query2=`
        
    {
    allMatriculas {
      id
      yearmatricula
      imagenalumno
      firmaapoderados
      runalumno
      apellidopaterno
      apellidomaterno
      ipe
      nombres
      nacionalidad
      fechanacimiento
      etnia
      domicilio
      religion
      comuna
      sexo
      telefono
      edad
      vivecon
      cursodematricula{
        id
        nombre
      }
      quienmatricula
      estudiantenuevo
      sistemadematricula
      correoinstitucional
      padreapellidos
      padrerun
      padrenombres
      padreipa
      padrenacionalidad
      padrenpasaporte
      padredomicilio
      padreestudios
      padrecomuna
      padreocupacion
      padreapoderado
      padretelefono1
      padretelefono2
      padreemail
      madreapellidos
      madrerun
      madrenombres
      madreipa
      madrenacionalidad
      madrenpasaporte
      madredomicilio
      madreestudios
      madrecomuna
      madreocupacion
      madreapoderado
      madretelefono1
      madretelefono2
      madreemail
      establecimientoprocedencia
      ultimoyearcursado
      cursosqueharepetido
      perteneceaproyectodeintegracionescolar
      optaporreligion
      optaporuncredo
      tienejunaeb
      becaindigena
      otrabeca
      perteneceprogramasocial
      prioritario
      preferente
      registrosocialdehogares
      sistemadesalud
      consultorioocesfam
      hijoconimpedimentofisico
      enfermedadcronica
      alergico
      tomamedicamento
      encasodeemergenciacomunicarsecon
      conoceyaceptareglamentointernodelestablecimiento
      conoceyaceptareglamentodeevaluaciondelestablecimiento
      aceptoelusoderegistrodehuellaconfinesderegistrodehorario
      encuestaparalaasistenciadereligion
      aceptolosprotocoloscontraelcovid19
      asistiratodaslasreunionescitacionesollamadas
      cumplirhorariodeentradaysalida
      justificarinasistenciascondocumentospertinentes
      revisaryresponderinformacionmediantemediosdecomunicacion
      particaendiferentesactividadesprogramadasporelestablecimiento
      matriculasdatosopcionSet {
        id
        valor
        idopcion{
            id
        }
      }
    }
    allCursos {
        id
        nombre
        cantidadestudiantes
        orden
        tipodecurso
    }
    allSeccionesmatriculas {
        id
        nombreseccion
        orden
        matriculasopcionpersonalizadaSet {
          id
          nombreopcion
          tipodeopcion
          
        }
      }
  }
  
          
        `


        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
            
            this.matriculas=response.data.data.allMatriculas
            this.personalizadas=response.data.data.allSeccionesmatriculas
            this.cursos=response.data.data.allCursos
            this.mostrardatos()
            
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })

    }

    cambiartipodebusqueda(){
        if($("#TipoBusqueda").val()==1){

            $("#Buscador").replaceWith(`<input type="text" id="Buscador">`)
        }else if ($("#TipoBusqueda").val()==2){

            $("#Buscador").replaceWith(`<input type="text" id="Buscador">`)
        }else if($("#TipoBusqueda").val()==0){
            $("#Buscador").replaceWith(`<input type="text" id="Buscador" disabled>`)
            this.mostrardatos()
        }else if($("#TipoBusqueda").val()==3){
            $("#Buscador").replaceWith(`
                <select id="Buscador" onchange="vermatriculas.mostrardatos()">
                ${this.cursos.map(dat=>{
                    return `<option value="${dat.id}">${dat.nombre}</option>`
                })}
                </select>
                `
            )
            this.mostrardatos()
        }
        $("#Buscador").keyup(function(){
            vermatriculas.mostrardatos()
        })

    }
    mostrardatos(){
        
        let runoipe=""
        let html=`
        
            ${this.matriculas.map((dat,index)=>{
                
                if($("#TipoBusqueda").val()==1){
                    if(dat.nombres.toLowerCase().includes($("#Buscador").val().toLowerCase())){

                    }else{
                        return
                    }  
                }else if($("#TipoBusqueda").val()==2){
                    if(dat.runalumno.toLowerCase().includes($("#Buscador").val().toLowerCase())){

                    }else{
                        return
                    }  
                }else if($("#TipoBusqueda").val()==3){
                    if(dat.cursodematricula.id==$("#Buscador").val()){

                    }else{
                        return
                    }
                }
                if(dat.runalumno!=""){
                    runoipe=dat.runalumno
                }else if(dat.ipe!=""){
                    runoipe=dat.ipe
                }else{
                    runoipe="-"
                }

                return `
                <tr >
                    <td onclick="vermatriculas.abrirventana(${index})">${dat.nombres} ${dat.apellidopaterno} ${dat.apellidomaterno} ${runoipe} ${dat.cursodematricula.nombre}</td>
                    <td class="TdEliminar"><button class="BEliminar" onclick="vermatriculas.eliminarmatricula(${dat.id})">Eliminar</button></td>

                </tr>
                

                ` 

            }).join("")}
        
        `

        $("#Tabla").html(html)
        
    }


    abrirventana(x){
        const matricula=this.matriculas[x]
        const html=`
            <button id="Cerrar" onclick="vermatriculas.cerrarventana()">X</button>
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
                <td>${matricula.cursodematricula.nombre}</td>
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
                <th>Pertenece al proyecto de integracion escolar(PIE)</th>
                <td>${matricula.perteneceaproyectodeintegracionescolar}</td>
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

        <h2>Antecedentes Sociales</h3>

        <table id="AntecedentesSociales">
            
            <tr>
                <th>Es Benefiriacio de alguna beca</th>
                <th></th>
                <th>Pertenece a algun programa social</th>
                <td>${matricula.perteneceprogramasocial}</td>
            </tr>
            <tr>
                <th>JUNAEB</th>
                <td>${matricula.tienejunaeb}</td>
                <th>Prioritario</th>
                <td>${matricula.prioritario}</td>
            </tr>
            <tr>
                <th>Beca indigena</th>
                <td>${matricula.becaindigena}</td>
                <th>Preferente</th>
                <td>${matricula.preferente}</td>
            </tr>
            <tr>
                <th>Otra Beca</th>
                <td>${matricula.otrabeca}</td>
                <th>Registro social de hogares</th>
                <td>${matricula.registrosocialdehogares}</td>
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
        <div id="TablasPersonalizadas">
            

                    ${this.personalizadas.map(dat=>{
                        
                        return `
                            <h2>${dat.nombreseccion}</h2>
                            <table class="TablaPersonalizada">
                                ${dat.matriculasopcionpersonalizadaSet.map(opcion=>{
                                    return `<tr>
                                                <th>${opcion.nombreopcion}</th>
                                                <td>${matricula.matriculasdatosopcionSet.map(dato=>{
                                                    console.log(dato)
                                                    if(dato.idopcion.id==opcion.id){
                                                        if(opcion.tipodeopcion==4){
                                                            console.log(dato.valor)
                                                            return this.ticket(dato.valor)
                                                        }else{
                                                            return dato.valor
                                                        }
                                                        
                                                    }
                                                }).join("")}</td>
                                            </tr>
                                    `
                                }).join("")}
                            </table>
                        `

                    }).join("")}

            
        </div>

                <div id="DivImagen">
                    <img id="ultratest2" width="768px" height="432px" >

                </div>

                <button onclick="vermatriculas.descargarindividual(${x})">download</button>
            </div>
            <button id="Agregar" class="CrearPeticion" onclick="mantencion.crearmantencion()">Enviar Solicitud</button>
            </div>
        `

        setTimeout(()=>{
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        },100)
        
        $("#Ventana").html(html)
        let canvas=new fabric.Canvas($("#xfr")[0],{
            width:1920,
            height:1080,
            
        })
        
        /*if(matricula.firmaapoderados!=null){
            if(matricula.firmaapoderados.length>20){
                console.log(matricula.firmaapoderados)
                canvas.loadFromJSON(matricula.firmaapoderados.replaceAll("°",'"'))
                canvas.setZoom(1)
                console.log(canvas.toDataURL('png'))
                $("#ultratest2").attr('src',canvas.toDataURL('png'))
            }
            
        }*/
        console.log(matricula.firmaapoderados)
        $("#ultratest2").attr('src',matricula.firmaapoderados)
        
    }
    ventanadecursos(){
        const html=`
            <button id="Cerrar" onclick="vermatriculas.cerrarventana()">X</button>
            <div id="Contenido" style="display: flex; flex-direction: column; align-items: center;">
            <h2>Cursos</h2>
            ${this.cursos.map(dat=>{

                return `<div class="DivCursos">${dat.nombre}<input type="checkbox" onclick="vermatriculas.agregarcurso('${dat.nombre}')"></div>`

            }).join("")}
            
            

            <button id="Agregar" class="CrearPeticion" onclick="vermatriculas.descargartodos()">Descargar pdf</button>
            </div>
        `

        setTimeout(()=>{
            $("#Ventana").removeClass("CerrarVentana").addClass("AbrirVentana")
        },100)
        
        $("#Ventana").html(html)
    }

    agregarcurso(x){
        const tru=this.cursostarget.indexOf(x)
        
        if(tru>-1){
            
            this.cursostarget.splice(tru,1)
        }else{
            this.cursostarget.push(x)
        }
        console.log(this.cursostarget)
        
    }

    descargartodos(){
        $("#Cargando").show()
        let eliminar=0;
        
        if($("#Ventana").hasClass("CerrarVentana")){
            this.cursostarget=[]
        }

        this.matriculas.forEach((matricula,index)=>{
                
                if(index==this.matriculas.length-1){
                    this.cerrarventana()
                }
                if(this.cursostarget.length>0){
                    if(this.cursostarget.includes(matricula.cursodematricula)){

                        }else{
                            eliminar++
                            console.log("paso xd")
                            return
                        }


                }
                
                let pag=index+1-eliminar
                
                if(pag>1){
                    this.doc.addPage()
                    this.doc.setPage(pag*2-1)
                }
                
                
                
                
                
                this.doc.setFontSize(10)
                this.doc.setFontStyle("normal")
                this.doc.text(matricula.apellidopaterno,85,74,"center")
                this.doc.text(matricula.runalumno,185,74,"center")

                this.doc.text(matricula.apellidomaterno,85,79,"center")
                this.doc.text(matricula.ipe,185,79,"center")

                this.doc.text(matricula.nombres,85,84,"center")
                this.doc.text(matricula.nacionalidad,185,84,"center")

                this.doc.text(matricula.fechanacimiento,85,89,"center")
                this.doc.text(matricula.etnia,185,89,"center")

                this.doc.text(matricula.domicilio,85,94,"center")
                this.doc.text(matricula.religion,185,94,"center")

                this.doc.text(matricula.comuna,85,99,"center")
                this.doc.text(matricula.sexo,185,99,"center")

                this.doc.text(matricula.telefono,85,104,"center")
                this.doc.text(matricula.edad.toString(),185,104,"center")

                this.doc.text(matricula.vivecon,85,109,"center")
                this.doc.text(matricula.cursodematricula.nombre,185,109,"center")

                this.doc.text(matricula.quienmatricula,85,114,"center")
                this.doc.text(matricula.estudiantenuevo,185,114,"center")

                this.doc.text(matricula.sistemadematricula,85,119,"center")
                this.doc.text(matricula.correoinstitucional,185,119,"center")

                this.doc.text(matricula.padreapellidos,85,136,"center")
                this.doc.text(matricula.padrerun,185,136,"center")

                this.doc.text(matricula.padrenombres,85,141,"center")
                this.doc.text(matricula.padreipa,185,141,"center")

                this.doc.text(matricula.padrenacionalidad,85,146,"center")
                this.doc.text(matricula.padrenpasaporte,185,146,"center")

                this.doc.text(matricula.padredomicilio,85,151,"center")
                this.doc.text(matricula.padreestudios,185,151,"center")

                this.doc.text(matricula.padrecomuna,85,156,"center")
                this.doc.text(matricula.padreocupacion,185,156,"center")

                this.doc.text(matricula.padretelefono1,85,161,"center")
                this.doc.text(matricula.padreapoderado,185,161,"center")

                this.doc.text(matricula.padretelefono2,85,166,"center")
                this.doc.text(matricula.padreemail,185,166,"center")




                this.doc.text(matricula.madreapellidos,85,182,"center")
                this.doc.text(matricula.madrerun,185,182,"center")

                this.doc.text(matricula.madrenombres,85,187,"center")
                this.doc.text(matricula.madreipa,185,187,"center")

                this.doc.text(matricula.madrenacionalidad,85,192,"center")
                this.doc.text(matricula.madrenpasaporte,185,192,"center")

                this.doc.text(matricula.madredomicilio,85,197,"center")
                this.doc.text(matricula.madreestudios,185,197,"center")

                this.doc.text(matricula.madrecomuna,85,202,"center")
                this.doc.text(matricula.madreocupacion,185,202,"center")

                this.doc.text(matricula.madretelefono1,85,207,"center")
                this.doc.text(matricula.madreapoderado,185,207,"center")

                this.doc.text(matricula.madretelefono2,85,212,"center")
                this.doc.text(matricula.madreemail,185,212,"center")



                this.doc.text(matricula.establecimientoprocedencia,160,223,"center")

                this.doc.text(matricula.ultimoyearcursado,160,228,"center")

                this.doc.text(matricula.cursosqueharepetido,160,233,"center")

                this.doc.text(matricula.perteneceaproyectodeintegracionescolar,160,238,"center")

                this.doc.text(matricula.optaporreligion,100,243,"center")

                this.doc.text(matricula.optaporuncredo,190,243,"center")
            


                this.doc.text(matricula.perteneceprogramasocial,200,254,"center")

                this.doc.text(matricula.tienejunaeb,85,259,"center")
                this.doc.text(matricula.prioritario,185,259,"center")

                this.doc.text(matricula.becaindigena,85,264,"center")
                this.doc.text(matricula.preferente,185,264,"center")

                this.doc.text(matricula.otrabeca,85,269,"center")
                this.doc.text(matricula.registrosocialdehogares,185,269,"center")


                this.doc.text(matricula.sistemadesalud,160,280,"center")

                this.doc.text(matricula.consultorioocesfam,160,285,"center")

                this.doc.text(matricula.hijoconimpedimentofisico,203,290,"center")

                this.doc.text(matricula.enfermedadcronica,160,295,"center")

                this.doc.text(matricula.alergico,160,300,"center")

                this.doc.text(matricula.tomamedicamento,160,305,"center")

                this.doc.text(matricula.encasodeemergenciacomunicarsecon,160,310,"center")

                    
                    this.crearplantilla()
                    
                    
                

                this.doc.text(this.ticket(matricula.conoceyaceptareglamentointernodelestablecimiento),200,25,"center")

                this.doc.text(this.ticket(matricula.conoceyaceptareglamentodeevaluaciondelestablecimiento),200,32,"center")

                this.doc.text(this.ticket(matricula.aceptoelusoderegistrodehuellaconfinesderegistrodehorario),200,39,"center")

                this.doc.text(this.ticket(matricula.encuestaparalaasistenciadereligion),200,46,"center")

                this.doc.text(this.ticket(matricula.aceptolosprotocoloscontraelcovid19),200,53,"center")


                this.doc.text(this.ticket(matricula.asistiratodaslasreunionescitacionesollamadas),200,70,"center")

                this.doc.text(this.ticket(matricula.cumplirhorariodeentradaysalida),200,77,"center")

                this.doc.text(this.ticket(matricula.justificarinasistenciascondocumentospertinentes),200,84,"center")

                this.doc.text(this.ticket(matricula.revisaryresponderinformacionmediantemediosdecomunicacion),200,91,"center")

                this.doc.text(this.ticket(matricula.particaendiferentesactividadesprogramadasporelestablecimiento),200,98,"center")

                let espacio=100;
                this.personalizadas.forEach(seccion=>{
                    espacio+=8;
                    seccion.matriculasopcionpersonalizadaSet.forEach(opcion=>{
                        espacio+=5
                        matricula.matriculasdatosopcionSet.forEach(val=>{
                                if(val.idopcion.id==opcion.id){
                                    if(opcion.tipodeopcion==4){
                                        this.doc.text(this.ticket(val.valor),160,espacio-1,"center")
                                    }else{
                                        this.doc.text(val.valor,160,espacio-1,"center")
                                    }
                                    
                                }

                        })
                        
                    })
                    

                })
                
                
                this.doc.addImage(imagen,'PNG',10,250,200,100);   
                //this.doc.addImage(matricula.firmaapoderados,'PNG',10,250,200,100);
                
                
        })
        
        this.doc.save("testtodos.pdf")
        this.doc = new jsPDF({
                        unit: "mm",
                        format: [220,340]
                        
            })
        this.cursostarget=[];
        $("#Cargando").hide()
    }
    descargarindividual(x){

        var pag=1;
        const matricula=this.matriculas[x]
    
        this.doc.setPage(1)
        this.doc.setFontSize(10)
        this.doc.setFontStyle("normal")
        this.doc.text(matricula.apellidopaterno,85,74,"center")
        this.doc.text(matricula.runalumno,185,74,"center")

        this.doc.text(matricula.apellidomaterno,85,79,"center")
        this.doc.text(matricula.ipe,185,79,"center")

        this.doc.text(matricula.nombres,85,84,"center")
        this.doc.text(matricula.nacionalidad,185,84,"center")

        this.doc.text(matricula.fechanacimiento,85,89,"center")
        this.doc.text(matricula.etnia,185,89,"center")

        this.doc.text(matricula.domicilio,85,94,"center")
        this.doc.text(matricula.religion,185,94,"center")

        this.doc.text(matricula.comuna,85,99,"center")
        this.doc.text(matricula.sexo,185,99,"center")

        this.doc.text(matricula.telefono,85,104,"center")
        this.doc.text(matricula.edad.toString(),185,104,"center")

        this.doc.text(matricula.vivecon,85,109,"center")
        this.doc.text(matricula.cursodematricula.nombre,185,109,"center")

        this.doc.text(matricula.quienmatricula,85,114,"center")
        this.doc.text(matricula.estudiantenuevo,185,114,"center")

        this.doc.text(matricula.sistemadematricula,85,119,"center")
        this.doc.text(matricula.correoinstitucional,185,119,"center")

        this.doc.text(matricula.padreapellidos,85,136,"center")
        this.doc.text(matricula.padrerun,185,136,"center")

        this.doc.text(matricula.padrenombres,85,141,"center")
        this.doc.text(matricula.padreipa,185,141,"center")

        this.doc.text(matricula.padrenacionalidad,85,146,"center")
        this.doc.text(matricula.padrenpasaporte,185,146,"center")

        this.doc.text(matricula.padredomicilio,85,151,"center")
        this.doc.text(matricula.padreestudios,185,151,"center")

        this.doc.text(matricula.padrecomuna,85,156,"center")
        this.doc.text(matricula.padreocupacion,185,156,"center")

        this.doc.text(matricula.padretelefono1,85,161,"center")
        this.doc.text(matricula.padreapoderado,185,161,"center")

        this.doc.text(matricula.padretelefono2,85,166,"center")
        this.doc.text(matricula.padreemail,185,166,"center")




        this.doc.text(matricula.madreapellidos,85,182,"center")
        this.doc.text(matricula.madrerun,185,182,"center")

        this.doc.text(matricula.madrenombres,85,187,"center")
        this.doc.text(matricula.madreipa,185,187,"center")

        this.doc.text(matricula.madrenacionalidad,85,192,"center")
        this.doc.text(matricula.madrenpasaporte,185,192,"center")

        this.doc.text(matricula.madredomicilio,85,197,"center")
        this.doc.text(matricula.madreestudios,185,197,"center")

        this.doc.text(matricula.madrecomuna,85,202,"center")
        this.doc.text(matricula.madreocupacion,185,202,"center")

        this.doc.text(matricula.madretelefono1,85,207,"center")
        this.doc.text(matricula.madreapoderado,185,207,"center")

        this.doc.text(matricula.madretelefono2,85,212,"center")
        this.doc.text(matricula.madreemail,185,212,"center")



        this.doc.text(matricula.establecimientoprocedencia,160,223,"center")

        this.doc.text(matricula.ultimoyearcursado,160,228,"center")

        this.doc.text(matricula.cursosqueharepetido,160,233,"center")

        this.doc.text(matricula.perteneceaproyectodeintegracionescolar,160,238,"center")

        this.doc.text(matricula.optaporreligion,100,243,"center")

        this.doc.text(matricula.optaporuncredo,190,243,"center")
       


        this.doc.text(matricula.perteneceprogramasocial,200,254,"center")

        this.doc.text(matricula.tienejunaeb,85,259,"center")
        this.doc.text(matricula.prioritario,185,259,"center")

        this.doc.text(matricula.becaindigena,85,264,"center")
        this.doc.text(matricula.preferente,185,264,"center")

        this.doc.text(matricula.otrabeca,85,269,"center")
        this.doc.text(matricula.registrosocialdehogares,185,269,"center")


        this.doc.text(matricula.sistemadesalud,160,280,"center")

        this.doc.text(matricula.consultorioocesfam,160,285,"center")

        this.doc.text(matricula.hijoconimpedimentofisico,203,290,"center")

        this.doc.text(matricula.enfermedadcronica,160,295,"center")

        this.doc.text(matricula.alergico,160,300,"center")

        this.doc.text(matricula.tomamedicamento,160,305,"center")

        this.doc.text(matricula.encasodeemergenciacomunicarsecon,160,310,"center")


        this.crearplantilla()


        this.doc.text(this.ticket(matricula.conoceyaceptareglamentointernodelestablecimiento),200,25,"center")

        this.doc.text(this.ticket(matricula.conoceyaceptareglamentodeevaluaciondelestablecimiento),200,32,"center")

        this.doc.text(this.ticket(matricula.aceptoelusoderegistrodehuellaconfinesderegistrodehorario),200,39,"center")

        this.doc.text(this.ticket(matricula.encuestaparalaasistenciadereligion),200,46,"center")

        this.doc.text(this.ticket(matricula.aceptolosprotocoloscontraelcovid19),200,53,"center")


        this.doc.text(this.ticket(matricula.asistiratodaslasreunionescitacionesollamadas),200,70,"center")

        this.doc.text(this.ticket(matricula.cumplirhorariodeentradaysalida),200,77,"center")

        this.doc.text(this.ticket(matricula.justificarinasistenciascondocumentospertinentes),200,84,"center")

        this.doc.text(this.ticket(matricula.revisaryresponderinformacionmediantemediosdecomunicacion),200,91,"center")

        this.doc.text(this.ticket(matricula.particaendiferentesactividadesprogramadasporelestablecimiento),200,98,"center")

        let espacio=100;
        this.personalizadas.forEach(seccion=>{
            espacio+=8;
            seccion.matriculasopcionpersonalizadaSet.forEach(opcion=>{
                espacio+=5
                matricula.matriculasdatosopcionSet.forEach(val=>{
                        if(val.idopcion.id==opcion.id){
                            if(opcion.tipodeopcion==4){
                                this.doc.text(this.ticket(val.valor),160,espacio-1,"center")
                            }else{
                                this.doc.text(val.valor,160,espacio-1,"center")
                            }
                        }

                })
                
            })
            

        })

        let imagen=$("#ultratest2").attr('src');
        
        this.doc.addImage(imagen,'PNG',10,250,200,100);
        
        this.doc.save("ultratest.pdf")
        this.doc = new jsPDF({
            unit: "mm",
            format: [220,340]
            
        })
        
        
    }
    eliminarmatricula(x){
        let query=`
                
                    mutation {
                        matriculadelete(idmatricula: ${x}) {
                          success
                          error
                        }
                      }
                
            `
            axios.post("/graphql/",{
                query:query
            }).then(response=>{ 
                this.cargardatos()
            }).catch(error=>{
                
                console.log(error)
                
                $("#Cargando").hide()
            })
    }

    cerrarventana(){
        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
        
    }

    ticket(x){
        if(x==false || x=="false"){
            return "No"
        }else{
            return "Si"
        }
        
    }
}