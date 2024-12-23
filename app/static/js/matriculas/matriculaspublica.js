class javamatriculaspublica{

    constructor(){

        $("#MalditoCanvas").hide()
       
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
        $("#TablasPersonalizadas").html(html)
    }
    comprobacion(){
        let query=`mutation {
            matriculacomprobacion(ipe: "${$("#Comprobacion").val()}", rut: "${$("#Comprobacion").val()}") {
              success
              msg
              error
            }
          }`

        axios.post("/graphql/",{
            query:query
        }).then(response=>{
            if(response.data.data.matriculacomprobacion.msg=="Alumno Existente"){
                
                
                $("Body").html(`<div id="MalditoCanvas" >
            
            
            <div id="FondoBlanco">
                <canvas id="c" width="800px" height="600px"></canvas>
            </div>
            
        </div>

        <div id="DivPrincipal">
            

            
            <h2>Estudiante</h2>
        <table id="TablaEstudiante">
            
            <tr>
                <th>Apellido Paterno</th>
                <td><input id="ApellidoPaterno" type="text"></td>
            </tr>

            <tr>
                <th>Run Nacional</th>
                <td><input id="RunNacional" type="text" placeholder="(Si no posee, utilize I.P.A)"></td>
            </tr>

            <tr>
                <th>Apellido Materno</th>
                <td><input id="ApellidoMaterno" type="text"></td>
            </tr>

            <tr>
                <th>I.P.A(identificador Provisorio)</th>
                <td><input id="IPE" type="text" placeholder="(Solo si no tiene Run Nacional)"></td>
            </tr>
            
             <tr>
                <th>Nombres</th>
                <td><input id="Nombres" type="text"></td>
                
            </tr>
            
            <tr>
                <th>Nacionalidad</th>
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
                <th>Fecha Nacimiento</th>
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
                <th>Domicilio</th>
                <td><input id="Domicilio" type="text"></td>
                
            </tr>

            <tr>
                <th>Religion</th>
                <td><input id="Religion" type="text"></td>
            </tr>

            <tr>
                <th>Comuna</th>
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
                <th>Sexo</th>
                <td><select id="Sexo">
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otros</option>
                    </select>
                </td>
            </tr>
            
             <tr>
                <th>Telefono</th>
                <td><input id="Telefono" type="number"></td>
                
            </tr>

            <tr>
                <th>Edad</th>
                <td><input id="Edad" type="Number"></td>
            </tr>

            <tr>
                <th>Vive Con</th>
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
                <th>Curso de Matriculacion</th>
                <td><select id="CursoNuevo"><option>vincular a cursos</option></select></td>
            </tr>
            
            <tr>
                <th>Quien Matricula</th>
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

            <tr>
                <th>Estudiante</th>
                <td>
                    <select id="EstudianteNuevo">
                        <option value="Nuevo">Nuevo</option>
                        <option value="Viejo">Viejo</option>
                    </select>
                </td>
            </tr>

            <tr>
                <th>Sistema de matricula</th>
                <td><input id="SistemaDeMatricula" type="text"></td>
                
            </tr>

            <tr>
                <th>Correo Institucional</th>
                <td><input id="CorreoInstitucional" type="text"></td>

            </tr>
            
        </table>

        <h2>Antecedentes Familiares</h2>
        <h3>Padre</h3>
        <table id="TablaPadre">
            
            
            <tr>
                <th>Apellidos</th>
                <td><input id="PadreApellidos" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>
            <tr>
                <th>R.U.N</th>
                <td><input id="PadreRun" type="text" placeholder="(Si no posee, utilize I.P.A)"></td>
            </tr>

            <tr>
                <th>Nombres</th>
                <td><input id="PadreNombres" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>

            <tr>
                <th>I.P.A</th>
                <td><input id="PadreIpa" type="text" placeholder="(Si no posee, utilize Pasaporte)"></td>
            </tr>
            
            <tr>
                <th>Nacionalidad</th>
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
                <th>Domicilio</th>
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
                <th>Comuna</th>
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
                <th>Telefono 1</th>
                <td><input id="PadreTelefono1" type="number"></td>
                
            </tr>

            <tr>
                <th>Apoderado</th>
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
                <th>E-Mail</th>
                <td><input id="PadreEmail" type="text"></td>
            </tr>

        </table>
        <h3>Madre</h3>
        <table id="TablaMadre">
            
            <tr>
                <th>Apellidos</th>
                <td><input id="MadreApellidos" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>

            <tr>
                <th>R.U.N</th>
                <td><input id="MadreRun" type="text" placeholder="(Si no posee, utilize I.P.A)"></td>
            </tr>

            <tr>
                <th>Nombres</th>
                <td><input id="MadreNombres" type="text" onchange="matriculas.Limpiar()"></td>
                
            </tr>

            <tr>
                <th>I.P.A</th>
                <td><input id="MadreIpa" type="text" placeholder="(Si no posee, utilize pasaporte)"></td>
            </tr>
            
            <tr>
                <th>Nacionalidad</th>
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
                <th>Domicilio</th>
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
                <th>Comuna</th>
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
                <th>Telefono 1</th>
                <td><input id="MadreTelefono1" type="number"></td>
            </tr>

            <tr>
                <th>Apoderado</th>
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
                <th>E-Mail</th>
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
                    <option>cursos</option>
                </select></td>
            </tr>
            <tr>
                <th>Ultimo Curso repetido</th>
                <td><select id="CursosRepetidos">
                        <option>vincular los cursos</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Pertenece al proyecto de integracion escolar(PIE)</th>
                <td><select id="PerteneceIntegracionEscolar">
                    
                    <option>No</option>
                    <option>Si</option>
                </select></td>
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

        <h2>Antecedentes Sociales</h3>

        <table id="AntecedentesSociales">
            
            <tr>
                <th>Es Benefiriacio de alguna beca</th>
                <th></th>
    
            </tr>
            <tr>
                <th>JUNAEB</th>
                <td><select id="Junaeb">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
            </tr>
            <tr>
                <th>Beca indigena</th>
                <td><select id="BecaIndigena">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
            </tr>
            <tr>
                <th>Otra Beca</th>
                <td><select id="OtraBeca">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
                
            </tr>
            <tr>
                <th>Pertenece a algun programa social</th>
                <td><select id="PerteneceProgramaSocial">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
            </tr>
            <tr>
                <th>Prioritario</th>
                <td><select id="Prioritario">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
            </tr>

            <tr>
                <th>Preferente</th>
                <td><select id="Preferente">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
            </tr>
            <tr>
                <th>Registro social de hogares</th>
                <td><select id="RegistroSocial">
                    <option>No</option>
                    <option>Si</option>
                </select></td>
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
                <button class="CrearPeticion" onclick="matriculaspublicas.crearmatricula()">Crear Matricula</button>
        </div>

        </div>

        
        <div id="Ventana">
            <label>Ingrese Rut o IPE</label>
            <input type="text" id="Comprobacion">
            <button onclick="matriculaspublicas.comprobacion()">Comprobar</button>
        </div>
        <div id="Menu">
            <h2>Menu de planilla</h2>
            <button onclick="matriculas.crearseccion()">Aplicar Cambios</button>
            
        </div>
        <div id="Cargando" style="display: none;"><div class="preloader"></div></div>
                `)
                $("#Ventana").hide()
                $("#MalditoCanvas").hide()
                Swal.fire({
                    icon: 'success',
                    title: 'Alumno Existente',
                    text: 'Puede matricular',
                    })
                this.cargardatos()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Alumno no existente',
                    text: '',
                    })
            }
            
        }).catch(error=>{
            console.log(error)
        })
    }

    crearmatricula(){

        
        $("#Cargando").show()
        let mut=`
        mutation {
          matriculacreate(
            aceptaregistrohuella: ${$("#AceptoHuella").is(":checked")}
            aceptoprotocoloscovid: ${$("#AceptoProtocolo19").is(":checked")}
            alergico: "${$("#Alergico").val()}"
            alumnoapellidomaterno: "${$("#ApellidoMaterno").val()}"
            alumnoapellidopaterno: "${$("#ApellidoPaterno").val()}"
            alumnocomuna: "${$("#Comuna").val()}"
            alumnocorreoinstitucional: "${$("#CorreoInstitucional").val()}"
            alumnocursodematricula: "${$("#CursoNuevo").val()}"
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
            firmas: ""
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
            this.creardatospersomatricula(response.data.data.matriculacreate.id)   
            console.log(response.data.data.matriculacreate.id)
            
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
                query=`
                    mutation {
                        matriculaopcionvalorcreate(idmatricula: ${x}, idopcion: ${opciones.id}, valor: "${$(`#Value-${opciones.id}`).val()}") {
                        success
                        error
                        }
                    }
                `
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
}