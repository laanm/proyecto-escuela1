class javalistaespera{

    constructor(){
        this.cursos=[]
        this.xde=0
        $("#MalditoCanvas").hide()
        this.cargarcursos()
        
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
            listaespera.cursos=data
            $("#Cargando").hide()
            listaespera.comprobacion()
        },
        error: function (data) {
           
        }
        });
    }
    
    vincular(){
        let html=`
        
        ${this.cursos.map(dat=>{
            if(dat.nombre=="Funcionario"){
                return
            }
            return `<option value="${dat.nombre}">${dat.nombre}</option>`
        })}
        
        `
        $("#UltimoYearCursado").html(html)
        $("#CursosRepetidos").html("<option>Ninguno</option>"+html)
        $("#CursoNuevo").html(html)
    }
    
    comprobacion(){
       
                
                
                $("#Planilla").html(`

        <div id="DivPrincipal">
            
            <h1>REGISTRO PUBLICO</h1>
            
            
            <h2>Estudiante</h2>
        <table id="TablaEstudiante">
            
            <tr>
                <th>Apellido Paterno <label style="color: red;">*</label></th>
                <td><input id="ApellidoPaterno" type="text"></td>
            </tr>

            <tr>
                <th>Run Nacional <label style="color: red;">*</label></th>
                <td><input id="RunNacional" type="text"  placeholder="(Si no posee, utilize I.P.A)"></td>
            </tr>

            <tr>
                <th>Apellido Materno <label style="color: red;">*</label></th>
                <td><input id="ApellidoMaterno" type="text"></td>
            </tr>

            <tr>
                <th>I.P.E(identificador Provisorio)</th>
                <td><input id="IPE" type="text" placeholder="(Solo si no tiene Run Nacional)"></td>
            </tr>
            
             <tr>
                <th>Nombres <label style="color: red;">*</label></th>
                <td><input id="Nombres" type="text"></td>
                
            </tr>
            
            <tr>
                <th>Nacionalidad <label style="color: red;">*</label></th>
                <td><select id="Nacionalidad">
                    <option>Chilena</option>
                    <option>Argentina</option>
                    <option>Boliviana</option>
                    <option>Brasileña</option>
                    <option>China</option>
                    <option>Colombiana</option>
                    <option>Cubana</option>
                    <option>Dominicana</option>
                    <option>Ecuatoriana</option>
                    <option>Española</option>
                    <option>Haitiana</option>
                    <option>Mexicana</option>
                    <option>Panameña</option>
                    <option>Paraguaya</option>
                    <option>Peruana</option>
                    <option>Uruguaya</option>
                    <option>Venezolana</option>
                    <option>Otra</option>
                </select></td>
            </tr>
            
            <tr>
                <th>Fecha Nacimiento <label style="color: red;">*</label></th>
                <td><input id="FechaNacimiento" type="date"></td>
                
            </tr>

            <tr>
                <th>Etnia</th>
                <td><select id="Etnia">
                        <option>No Pertenece</option>
                        <option>Atacameño</option>
                        <option>Aymara</option>
                        <option>Coyas</option>
                        <option>Diaguita</option>
                        <option>Huilliche</option>
                        <option>Kawesqar</option>
                        <option>Mapuche</option>
                        <option>Quechua</option>
                        <option>Rapa-Nui</option>
                        <option>Yagan</option>
                        <option>Otro</option>
                    </select>
                </td>
            </tr>
            
             <tr>
                <th>Domicilio <label style="color: red;">*</label></th>
                <td><input id="Domicilio" type="text"></td>
                
            </tr>

            <tr>
                <th>Religion</th>
                <td><input id="Religion" type="text"></td>
            </tr>

            <tr>
                <th>Comuna <label style="color: red;">*</label></th>
                <td><select id="Comuna">
                        <option>Cerrillos</option>
                        <option>Cerro Navia</option>
                        <option>Conchalí</option>
                        <option>El Bosque</option>
                        <option>Estacion Central</option>
                        <option>Huechuraba</option>
                        <option>Independencia</option>
                        <option>La Cisterna</option>
                        <option>La Florida</option>
                        <option>La Granja</option>
                        <option>La Pintana</option>
                        <option>La Reina</option>
                        <option>Las Condes</option>
                        <option>Lo Barnechea</option>
                        <option>Lo Espejo</option>
                        <option>Lo Prado</option>
                        <option>Macul</option>
                        <option>Maipú</option>
                        <option>Ñuñoa</option>
                        <option>Pedro Aguirre Cerda</option>
                        <option>Peñalolen</option>
                        <option>Providencia</option>
                        <option>Pudahuel</option>
                        <option>Puente Alto</option>
                        <option>Quilicura</option>
                        <option>Quinta Normal</option>
                        <option>Recoleta</option>
                        <option>Renca</option>
                        <option>San Miguel</option>
                        <option>San Joaquín</option>
                        <option>San Ramón</option>
                        <option>Santiago</option>
                        <option>Vitacura</option>
                    </select>
                </td>
                
            </tr>

            <tr>
                <th>Sexo <label style="color: red;">*</label></th>
                <td><select id="Sexo">
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otros</option>
                    </select>
                </td>
            </tr>
            
             <tr>
                <th>Telefono estudiante</th>
                <td><input id="Telefono" type="number"></td>
                
            </tr>

            <tr>
                <th>Edad <label style="color: red;">*</label></th>
                <td><input id="Edad" type="Number"></td>
            </tr>

            <tr>
                <th>Vive Con <label style="color: red;">*</label></th>
                <td><select id="ViveCon">
                        <option>Madre</option>
                        <option>Padre</option>
                        <option>Ambos Padres</option>
                        <option>Tio/a</option>
                        <option>Abuelo/a Paterno</option>
                        <option>Abuelo/a Materno</option>
                        <option>Hermano/a</option>
                        <option>Tutor Legal</option>
                        <option>Casa de acogida</option>
                        <option>Hogar de menores</option>
                        <option>Otro</option>
                    </select>
                </td>
                
            </tr>
            
            <tr>
                <th>Curso de Matriculacion <label style="color: red;">*</label></th>
                <td><select id="CursoNuevo">
                        <option value="Pre-Kinder">Pre-Kinder</option>
                        <option value="Kinder">Kinder</option>
                        <option value="1° Básico">1° Básico</option>
                        <option value="2° Básico">2° Básico</option>
                        <option value="3° Básico">3° Básico</option>
                        <option value="4° Básico">4° Básico</option>
                        <option value="5° Básico">5° Básico</option>
                        <option value="6° Básico">6° Básico</option>
                        <option value="7° Básico">7° Básico</option>
                        <option value="8° Básico">8° Básico</option>
                        <option value="1° Medio">1° Medio</option>
                        <option value="2° Medio">2° Medio</option>
                        <option value="3° Medio">3° Medio</option>
                        <option value="4° Medio">4° Medio</option>

                        
               
                </select></td>
            </tr>
            
            <tr>
                <th>Quien Matricula <label style="color: red;">*</label></th>
                <td><select id="QuienMatricula">
                        <option value="Madre">Madre</option>
                        <option value="Padre">Padre</option>
                        <option value="Tio/a">Tio/a</option>
                        <option value="Abuelo/a Materno">Abuelo/a Materno</option>
                        <option value="Abuelo/a Paterno">Abuelo/a Paterno</option>
                        <option value="Hermano/a">Hermano/a (Mayor de edad)</option>
                        <option value="Tutor Legal">Tutor Legal</option>
                    </select>
                </td>
                
            </tr>

        </table>

        <h2>Antecedentes Familiares</h2>
        <h3>Padre</h3>
        
        <table id="TablaPadre">
            
            
            <tr>
                <th>Apellidos <label style="color: red;">*</label></th>
                <td><input id="PadreApellidos" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>

            <tr>
                <th>Nombres <label style="color: red;">*</label></th>
                <td><input id="PadreNombres" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>

            <tr> <label style="color: red;">*</label>
                <th>R.U.N</th>
                <td><input id="PadreRun" type="text" placeholder="(Si no posee, utilize I.P.A)"></td>
            </tr>

            

            <tr>
                <th>I.P.A</th>
                <td><input id="PadreIpa" type="text" placeholder="(Si no posee, utilize Pasaporte)"></td>
            </tr>
            
            <tr>
                <th>Nacionalidad <label style="color: red;">*</label></th>
                <td><select id="PadreNacionalidad">
                        <option>Chilena</option>
                        <option>Argentina</option>
                        <option>Boliviana</option>
                        <option>Brasileña</option>
                        <option>China</option>
                        <option>Colombiana</option>
                        <option>Cubana</option>
                        <option>Dominicana</option>
                        <option>Ecuatoriana</option>
                        <option>Española</option>
                        <option>Haitiana</option>
                        <option>Mexicana</option>
                        <option>Panameña</option>
                        <option>Paraguaya</option>
                        <option>Peruana</option>
                        <option>Uruguaya</option>
                        <option>Venezolana</option>
                        <option>Otra</option>
                    </select>
                </td>
                
            </tr>

            <tr>
                <th>N° Pasaporte</th>
                <td><input id="PadrePasaporte" type="text"></td>
            </tr>

            <tr>
                <th>Domicilio <label style="color: red;">*</label></th>
                <td><input id="PadreDomicilio" type="text"></td>
                
            </tr>

            <tr>
                <th>Estudios</th>
                <td><select id="PadreEstudios">
                        <option>ED. Básico Incompleto</option>
                        <option>ED. Básico Completo</option>
                        <option>ED. Media Incompleto</option>
                        <option>ED. Media Completo</option>
                        <option>ED. Técnico Profesional Incompleta</option>
                        <option>ED. Técnico Profesional Completa</option>
                        <option>ED. Universitaria Incompleta</option>
                        <option>ED. Universitaria Completa</option>
                        <option>Bachillerato</option>
                    </select>
                </td>
            </tr>
            
            <tr>
                <th>Comuna <label style="color: red;">*</label></th>
                <td><select id="PadreComuna">
                        <option>Cerrillos</option>
                        <option>Cerro Navia</option>
                        <option>Conchalí</option>
                        <option>El Bosque</option>
                        <option>Estacion Central</option>
                        <option>Huechuraba</option>
                        <option>Independencia</option>
                        <option>La Cisterna</option>
                        <option>La Florida</option>
                        <option>La Granja</option>
                        <option>La Pintana</option>
                        <option>La Reina</option>
                        <option>Las Condes</option>
                        <option>Lo Barnechea</option>
                        <option>Lo Espejo</option>
                        <option>Lo Prado</option>
                        <option>Macul</option>
                        <option>Maipú</option>
                        <option>Ñuñoa</option>
                        <option>Pedro Aguirre Cerda</option>
                        <option>Peñalolen</option>
                        <option>Providencia</option>
                        <option>Pudahuel</option>
                        <option>Puente Alto</option>
                        <option>Quilicura</option>
                        <option>Quinta Normal</option>
                        <option>Recoleta</option>
                        <option>Renca</option>
                        <option>San Miguel</option>
                        <option>San Joaquín</option>
                        <option>San Ramón</option>
                        <option>Santiago</option>
                        <option>Vitacura</option>
                    </select>
                </td>
                
            </tr>

            <tr>
                <th>Ocupacion</th>
                <td><input id="PadreOcupacion" type="text"></td>
            </tr>

            <tr>
                <th>Telefono 1 <label style="color: red;">*</label></th>
                <td><input id="PadreTelefono1" type="number"></td>
                
            </tr>

            <tr>
                <th>Apoderado <label style="color: red;">*</label></th>
                <td><select id="PadreApoderado">
                        <option>Titular</option>
                        <option>Suplente</option>
                    </select>
                </td>
            </tr>
            
            <tr>
                <th>Telefono 2</th>
                <td><input id="PadreTelefono2" type="number"></td>
                
            </tr>

            <tr>
                <th>E-Mail <label style="color: red;">*</label></th>
                <td><input id="PadreEmail" type="text"></td>
            </tr>

        </table>
        <h3>Madre</h3>
        <table id="TablaMadre">
            
            <tr>
                <th>Apellidos <label style="color: red;">*</label></th>
                <td><input id="MadreApellidos" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>

            <tr>
            <th>Nombres <label style="color: red;">*</label></th>
            <td><input id="MadreNombres" type="text" onchange="matriculas.Limpiar()"></td>
            
            </tr>

            <tr>
                <th>R.U.N <label style="color: red;">*</label></th>
                <td><input id="MadreRun" type="text" placeholder="(Si no posee, utilize I.P.A)"></td>
            </tr>

           

            <tr>
                <th>I.P.A</th>
                <td><input id="MadreIpa" type="text" placeholder="(Si no posee, utilize pasaporte)"></td>
            </tr>
            
            <tr>
                <th>Nacionalidad <label style="color: red;">*</label></th>
                <td><select id="MadreNacionalidad">
                    <option>Chilena</option>
                    <option>Argentina</option>
                    <option>Boliviana</option>
                    <option>Brasileña</option>
                    <option>China</option>
                    <option>Colombiana</option>
                    <option>Cubana</option>
                    <option>Dominicana</option>
                    <option>Ecuatoriana</option>
                    <option>Española</option>
                    <option>Haitiana</option>
                    <option>Mexicana</option>
                    <option>Panameña</option>
                    <option>Paraguaya</option>
                    <option>Peruana</option>
                    <option>Uruguaya</option>
                    <option>Venezolana</option>
                    <option>Otra</option>
                </select></td>
                
            </tr>

            <tr>
                <th>N° Pasaporte</th>
                <td><input id="MadrePasaporte" type="text"></td>
            </tr>

            <tr>
                <th>Domicilio <label style="color: red;">*</label></th>
                <td><input id="MadreDomicilio" type="text"></td>
                
            </tr>

            <tr>
                <th>Estudios</th>
                <td><select id="MadreEstudios">
                    <option>ED. Básico Incompleto</option>
                    <option>ED. Básico Completo</option>
                    <option>ED. Media Incompleto</option>
                    <option>ED. Media Completo</option>
                    <option>ED. Técnico Profesional Incompleta</option>
                    <option>ED. Técnico Profesional Completa</option>
                    <option>ED. Universitaria Incompleta</option>
                    <option>ED. Universitaria Completa</option>
                    <option>Bachillerato</option>
                </select></td>
            </tr>
            
            <tr>
                <th>Comuna <label style="color: red;">*</label></th>
                <td><select id="MadreComuna">
                    <option>Cerrillos</option>
                    <option>Cerro Navia</option>
                    <option>Conchalí</option>
                    <option>El Bosque</option>
                    <option>Estacion Central</option>
                    <option>Huechuraba</option>
                    <option>Independencia</option>
                    <option>La Cisterna</option>
                    <option>La Florida</option>
                    <option>La Granja</option>
                    <option>La Pintana</option>
                    <option>La Reina</option>
                    <option>Las Condes</option>
                    <option>Lo Barnechea</option>
                    <option>Lo Espejo</option>
                    <option>Lo Prado</option>
                    <option>Macul</option>
                    <option>Maipú</option>
                    <option>Ñuñoa</option>
                    <option>Pedro Aguirre Cerda</option>
                    <option>Peñalolen</option>
                    <option>Providencia</option>
                    <option>Pudahuel</option>
                    <option>Puente Alto</option>
                    <option>Quilicura</option>
                    <option>Quinta Normal</option>
                    <option>Recoleta</option>
                    <option>Renca</option>
                    <option>San Miguel</option>
                    <option>San Joaquín</option>
                    <option>San Ramón</option>
                    <option>Santiago</option>
                    <option>Vitacura</option>
                </select>
                </td>
                
            </tr>

            <tr>
                <th>Ocupacion</th>
                <td><input id="MadreOcupacion" type="text"></td>
            </tr>

            <tr>
                <th>Telefono 1 <label style="color: red;">*</label></th>
                <td><input id="MadreTelefono1" type="number"></td>
            </tr>

            <tr>
                <th>Apoderado <label style="color: red;">*</label></th>
                <td><select id="MadreApoderado">
                    <option>Titular</option>
                    <option>Suplente</option>
                </select></td>
            </tr>
            
            <tr>
                <th>Telefono 2</th>
                <td><input id="MadreTelefono2" type="number"></td>
                
            </tr>
            
            <tr>
                <th>E-Mail <label style="color: red;">*</label></th>
                <td><input id="MadreEmail" type="text"></td>
            </tr>
        </table>

        <h2>Antecedentes Academicos</h2>
        <h3></h3>
        <table id="TablaAntecedentesAcademicos">
            <tr>
                <th>Establecimiento de procedencia</th>
                <td><input id="EstablecimientoProcedencia" type="text" placeholder="Si Estudiante es extranjero se registra solo el pais de procedencia"></td>
            </tr>
            <tr>
                <th>Ultimo Año cursado</th>
                <td><select id="UltimoYearCursado">
                ${this.cursos.map(dat=>{
                    return `<option value="${dat.nombre}">${dat.nombre}</option>`
                })}
                </select></td>
            </tr>
            <tr>
                <th>Ultimo Curso repetido</th>
                <td><select id="CursosRepetidos">
                ${this.cursos.map(dat=>{
                    return `<option value="${dat.nombre}">${dat.nombre}</option>`
                })}
                    </select>
                </td>
            </tr>
            <tr>
                <th>Opta por religion</th>
                <td><select id="OptaReligion">
                        <option>Si</option>
                        <option>No</option>
                    </select>
                </td>
                
            </tr>
            <tr>
                <th>Opta por un credo</th>
                <td><select id="OptaCredo">
                        <option>Católica</option>
                        <option>Evangélica</option>
                        <option>Mormón</option>
                        <option>Testigo de jehova</option>
                        <option>Ninguna</option>
                    </select>
                </td>
            </tr>
        </table>

        <h2>Antecedentes de salud</h2>

        <table id="AntecendesDeSalud">
            
            <tr>
                <th>Sistema de salud</th>
                <td><select id="SistemaSalud">
                        <option>Fonasa Letra A</option>
                        <option>Fonasa Letra B</option>
                        <option>Fonasa Letra C</option>
                        <option>Fonasa Letra D</option>
                        <option>Isapre</option>
                        <option>No tiene</option>
                        <option>No sabe</option>
                        <option>Otra</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Consultorio o cesfam</th>
                <td><select id="ConsultorioCesfam">
                        <option>No esta Inscrito en CESFAM</option>
                        <option>CESFAM N°5</option>
                        <option>CESFAM Las Mercedes</option>
                        <option>CESFAM Padre Vicente Irarrázabal(Ex-Nogales)</option>
                        <option>CESFAM San José De Chuchunco</option>
                        <option>Otro CESFAM</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Su hija tiene algun diasgnostico medico o impedimiento</th>
                <td><select id="DiagnosticoMedico">
                        <option>No</option>
                        <option>Si</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Tiene alguna enfermedad cronica</th>
                <td><input id="EnfermedadCronica" type="text" placeholder="En caso de tener, escribirla aqui. De lo contrario escribir 'No'"></td>
            </tr>
            <tr>
                <th>Alergico</th>
                <td><input id="Alergico" type="text" placeholder="En caso de tener, escribirla aqui. De lo contrario escribir 'No'"></td>
            </tr>
            <tr>
                <th>Toma algun medicamento</th>
                <td><input id="Medicamento" type="text" placeholder="En caso de tener, escribirla aqui. De lo contrario escribir 'No'"></td>
            </tr>
            <tr>
                <th>En caso de emergencia comunicarse con</th>
                <td><input id="CasoEmergencia" type="text"></td>
            </tr>
        </table>
        <h2>Documentacion</h2>

        <table id="TableDocumentacion">
            
            <tr>
                <th>Conozco y acepto el reglamento interno del establecimiento</th>
                <td><input id="AceptoReglamentoInterno" type="checkbox"></td>
            </tr>
            <tr>
                <th>Conozco y acepto el reglamento de evaluacion del establecimiento</th>
                <td><input id="AceptoReglamentoEvaluacion" type="checkbox"></td>
            </tr>
            <tr>
                <th>Tomo conocimiento de registro de huella para fines de registro de horario de llegada al establecimiento</th>
                <td><input id="AceptoHuella" type="checkbox"></td>
            </tr>
            <tr>
                <th>Encuesta para la asistencia de su pupilo/a a la asignatura de religion</th>
                <td><input id="AceptoReligion" type="checkbox"></td>
            </tr>
            <tr>
                <th>Tomo conocimiento de los protocolos contra el covid-19</th>
                <td><input id="AceptoProtocolo19" type="checkbox"></td>
            </tr>

            </table>

            <h2>Deberes y compromisos</h2>
            <table id="TablaDeberes">
        
            <tr>
                <th>Asistir a todas las reuniones, citaciones o llamadas que realice los profesores y/o directivos
                    en relacion a mi pupilo/a
                </th>
                <td><input id="AsistirReuniones" type="checkbox"></td>
            </tr>
            <tr>
                <th>Cumplir los horarios de entrada y salida establecidos por el liceo</th>
                <td><input id="CumplirHorarios" type="checkbox"></td>
            </tr>
            <tr>
                <th>justificar las inasistencias de mi pupilo/a con documentos pertinentes</th>
                <td><input id="JustificarInasistencias" type="checkbox"></td>
            </tr>
            <tr>
                <th>Revisar y responder la informacion que envie el establecimiento en los diferentes medios de comunicacion establecida</th>
                <td><input id="RevisarInfo" type="checkbox"></td>
            </tr>
            <tr>
                <th>Participa activamente en als diferentes actividades programadas por el establecimiento</th>
                <td><input if="ParticiparActivamente" type="checkbox"></td>
            </tr>
        </table>
        <div id="TablasPersonalizadas">

        </div>
        <div id="Personalizado">

        </div>
        
        
            
        <div>
                <button class="CrearPeticion" onclick="listaespera.crearmatricula()">Crear Solicitud</button>
        </div>

        </div>

        
        
        <div id="Cargando" style="display: none;"><div class="preloader"></div></div>
                `)
                $("#RunNacional").keyup(function(e){
                    console.log(e.keyCode,e.which)
                    if((e.keyCode || e.which) == 8 || (e.keyCode || e.which) == 37 || (e.keyCode || e.which) == 39){

                        return
                    }else{
                        console.log(e.keyCode)
                        listaespera.agregarpuntos()
                        $("#IPE").val("")
                    }
                })
                $("#IPE").keyup(function(e){
                    console.log(e.keyCode,e.which)
                    if((e.keyCode || e.which) == 8 || (e.keyCode || e.which) == 37 || (e.keyCode || e.which) == 39){

                        return
                    }else{
                        console.log(e.keyCode)
                        listaespera.agregarpuntos()
                        $("#RunNacional").val("")
                    }
                })
    }
    agregarpuntos(){
        let temp=""
        let ncar=0
        
        
        
        if(parseInt($("#RunNacional").val().replaceAll(".","").replaceAll("-",""))>=1000){
            
            
            
            temp=$("#RunNacional").val().replaceAll(".","").replaceAll("-","")
            ncar=temp.length
            console.log(ncar)
            console.log(temp)
            switch(ncar){
                case 4: $("#RunNacional").val(temp.slice(0,1)+"."+temp.slice(1,5))
                break;
                case 5: $("#RunNacional").val(temp.slice(0,2)+"."+temp.slice(2,6))
                break;
                case 6: $("#RunNacional").val(temp.slice(0,3)+"."+temp.slice(3,7))
                break;
                case 7: $("#RunNacional").val(temp.slice(0,1)+"."+temp.slice(1,4)+"."+temp.slice(4,8))
                break;
                case 8: $("#RunNacional").val(temp.slice(0,2)+"."+temp.slice(2,5)+"."+temp.slice(5,8)+"-")
                break;
                case 9: $("#RunNacional").val(temp.slice(0,2)+"."+temp.slice(2,5)+"."+temp.slice(5,8)+"-"+temp.slice(8,9))
                break;
            }
            if(ncar>=10){
                $("#RunNacional").val(temp.slice(0,2)+"."+temp.slice(2,5)+"."+temp.slice(5,8)+"-"+temp.slice(8,9))
            }
        }

        if($("#IPE").val()!=""){
            

            
            temp=$("#IPE").val().replaceAll(".","").replaceAll("-","")
            ncar=temp.length
            console.log(ncar)
            console.log(temp)
            switch(ncar){
                case 1: $("#IPE").val("100."+temp.slice(0,1))
                break;
                case 4: $("#IPE").val("100."+temp.slice(3,4))
                break;
                case 5: $("#IPE").val("100."+temp.slice(3,5))
                break;
                case 6: $("#IPE").val(temp.slice(0,3)+"."+temp.slice(3,7))
                break;
                case 7: $("#IPE").val(temp.slice(0,3)+"."+temp.slice(3,6)+"."+temp.slice(6,7))
                break;
                case 8: $("#IPE").val(temp.slice(0,3)+"."+temp.slice(3,6)+"."+temp.slice(6,8))
                break;
                case 9: $("#IPE").val(temp.slice(0,3)+"."+temp.slice(3,6)+"."+temp.slice(6,9)+"-")
                break;
                
                
            }
            if(ncar>=11){
                $("#IPE").val(temp.slice(0,3)+"."+temp.slice(3,6)+"."+temp.slice(6,9)+"-"+temp.slice(9,10))
            }
        }


    }
    crearmatricula(){
        
        if($("#RunNacional").val().length <= 11 && $("#IPE").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'Run invalido',
                text: 'Verifique el run o ingrese ipe',
            })
            return
        }else if($("#IPE").val().length <= 12 && $("#RunNacional").val()==""){
            Swal.fire({
                icon: 'error',
                title: 'IPE invalido',
                text: 'Verifique el Ipe o ingrese Run',
            })
            return
        }
        $("#Cargando").show()
        $.ajax({
            url: '/MatriculacionIndividual',
            type: 'POST',
            data: {
                "Entramite":1,
                "Year":2023,
                "Ipa":$("#IPE").val(),
                "Run":$("#RunNacional").val(),
                "apellidopaterno":$("#ApellidoPaterno").val(),
                "apellidomaterno":$("#ApellidoMaterno").val(),
                "nombres":$("#Nombres").val(),
                "nacionalidad":$("#Nacionalidad").val(),
                "fechanacimiento":$("#FechaNacimiento").val(),
                "etnia":$("#Etnia").val(),
                "domicilio":$("#Domicilio").val(),
                "religion":$("#Religion").val(),
                "comuna":$("#Comuna").val(),
                "sexo":$("#Sexo").val(),
                "telefono":$("#Telefono").val(),
                "edad":$("#Edad").val(),
                "vivecon":$("#ViveCon").val(),
                "quienmatricula":$("#QuienMatricula").val(),
                "estudiante":"Nuevo",
                "Tipodematricula":"Registro Publico",
                "correoinstitucional":"-",
                "apellidospadre":$("#PadreApellidos").val(),
                "runpadre":$("#PadreRun").val(),
                "nombrespadre":$("#PadreNombres").val(),
                "ipapadre":$("#PadreIpa").val(),
                "nacionalidadpadre":$("#PadreNacionalidad").val(),
                "pasaportepadre":$("#PadrePasaporte").val(),
                "domiciliopadre":$("#PadreDomicilio").val(),
                "estudiospadre":$("#PadreEstudios").val(),
                "comunapadre":$("#PadreComuna").val(),
                "ocupacionpadre":$("#PadreOcupacion").val(),
                "apoderadopadre":$("#PadreApoderado").val(),
                "telefono1padre":$("#PadreTelefono1").val(),
                "telefono2padre":$("#PadreTelefono2").val(),
                "emailpadre":$("#PadreEmail").val(),

                "apellidosmadre":$("#MadreApellidos").val(),
                "runmadre":$("#MadreRun").val(),
                "nombresmadre":$("#MadreNombres").val(),
                "ipamadre":$("#MadreIpa").val(),
                "nacionalidadmadre":$("#MadreNacionalidad").val(),
                "pasaportemadre":$("#MadrePasaporte").val(),
                "domiciliomadre":$("#MadreDomicilio").val(),
                "estudiosmadre":$("#MadreEstudios").val(),
                "comunamadre":$("#MadreComuna").val(),
                "ocupacionmadre":$("#MadreOcupacion").val(),
                "apoderadomadre":$("#MadreApoderado").val(),
                "telefono1madre":$("#MadreTelefono1").val(),
                "telefono2madre":$("#MadreTelefono2").val(),
                "emailmadre":$("#MadreEmail").val(),

                "establecimientoprocedencia":$("#EstablecimientoProcedencia").val(),
                "ultimoyearcursado":$("#UltimoYearCursado").val(),
                "ultimocursocursado":$("#CursosRepetidos").val(),
                "optaporreligion":$("#OptaReligion").val(),
                "optaporcredo":$("#OptaCredo").val(),
                "sistemadesalud":$("#SistemaSalud").val(),
                "ceonsultoriocesfam":$("#ConsultorioCesfam").val(),
                "diagnosticomedico":$("#DiagnosticoMedico").val(),
                "enfermedadcronica":$("#EnfermedadCronica").val(),
                "alergico":$("#Alergico").val(),
                "Medicamento":$("#Medicamento").val(),
                "CasoEmergencia":$("#CasoEmergencia").val(),

                "AceptoReglamentoInterno":$("#AceptoReglamentoInterno").is(":checked"),
                "AceptoReglamentoEvaluacion":$("#AceptoReglamentoEvaluacion").is(":checked"),
                "AceptoHuella":$("#AceptoHuella").is(":checked"),
                "AceptoReligion":$("#AceptoReligion").is(":checked"),
                "AceptoProtocolo19":$("#AceptoProtocolo19").is(":checked"),

                "AsistirReuniones":$("#AsistirReuniones").is(":checked"),
                "CumplirHorarios":$("#CumplirHorarios").is(":checked"),
                "JustificarInasistencias":$("#JustificarInasistencias").is(":checked"),
                "RevisarInfo":$("#RevisarInfo").is(":checked"),
                "ParticiparActivamente":$("#ParticiparActivamente").is(":checked"),

                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                if(data!=0){
                    listaespera.crearsolicitud(data)
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Solicitud ya creada',
                        text: '',
                    })
                    $("#Cargando").hide()
                }
                
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
        
        
    }
    
    crearsolicitud(x){
        console.log($("#CursoNuevo").val())

        $.ajax({
            url: '/DatosListaEspera',
            type: 'POST',
            data: {
                
                "Year":2023,
                "idmatricula":x,
                "curso":$("#CursoNuevo").val(),
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {

                $("#Cargando").hide()
                Swal.fire({
                    icon: 'success',
                    title: 'Solicitud Creada',
                    text: '',
                })
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    
    
}