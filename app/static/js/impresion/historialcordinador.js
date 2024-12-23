class javahistorialcordinador{


    constructor(x){
        this.idusuario=x;
        this.fechareal;
        this.profesores;
        this.enfiltro=false;
        this.cargardatos()
        
        $("#VerTodo").hide()
    }

    cargardatos(){
        $("#Cargando").show()
        let query2=`{
            peticionesimpresiontipo(tipo: 4) {
              numeroConsulta
              datosProfesor {
                id
                user
                email
              }
              cursoDestinado {
                id
                nombre
                cantidadestudiantes
                orden
              }
              asignatura {
                id
                nombre
                orden
              }
              archivo
              fechaPeticion
              fechaEstimadaImpresion
              fechaImpresionEntregada
              cantidadImpresion
              estado
              cordinador {
                id
                user
                email
              }
              tamanohoja
              doblecara
              razon
            }
            allUsuarios{
              id
              user
            }
          }          
          `

          axios.post("/graphql/",{

            query:query2
          })
          .then(response=>{
            
            this.impresiones=response.data.data.peticionesimpresiontipo;
            this.profesores=response.data.data.allUsuarios;
            this.mostrardatos(false)
            this.cargarprofesores()
            $("#Cargando").hide();
          })
          .catch(error=>{
            console.log(error)
            $("#Cargando").hide();
          })
    }

    cargarprofesores(){

      let html=`<label>Filtrar por profesor: </label>
                
                <select id="Buscador2" onchange="historialcordinador.buscador()">
                <option value="0">Seleccionar profesor</option>
                ${this.profesores.map(dat=>{
                  return `<option value="${dat.id}">${dat.user}</option>`
                })}

                </select>

                <button id="CrearPeticion2" onclick="historialcordinador.resetearbusqueda()">Borrar Filtro</button>

                <label>Descargar: <input type="checkbox" id="Descargar" onchange="historialcordinador.mostrardatos(false)"></label>
      `
      $("#Buscador").html(html)
      

  }
    mostrardatos(x){
      let html=""
      if(x==true){
        $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="historialcordinador.mostrardatos(false)">Ver Menos</button>`)
    }else{
        $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="historialcordinador.mostrardatos(true)">Ver Mas</button>`)
    }
    $("#VerTodo").hide()
      if(window.innerWidth<570 && x==false){
        $("#VerTodo").show()
        html=`
        <tr>
            <th>Estado</th>
            <th>Profesor</th>
            <th>Curso</th>
            <th>Archivo</th>
            <th>Accion</th>
        </tr>

        ${this.impresiones.map(dat=>{
            let estado;
            let accion;
            let cordinador;
            let tamanohoja;
            let doblecara;
            let archivo;
            let descargar;
            if(dat.estado==1){
                estado=`<td class="EnEspera"><p>En Espera</p></td>}`
            }else if(dat.estado==2){
                estado=`<td class="Pendiente"><p>Pendiente</p></td>}`
            }else if(dat.estado==3){
                estado=`<td class="Aprobado"><p>Aprobado</p></td>}`
            }else if(dat.estado==4){
                estado=`<td class="Rechazado"><p>Rechazado</p></td>}`
            }else if(dat.estado==5){
                estado=`<td class="Impreso"><p>Impreso</p></td>}`
            }else if(dat.estado==6){
                estado=`<td class="Entregado"><p>Entregado</p></td>}`
            }

            if(dat.cordinador){
                cordinador=`<td>${dat.cordinador.user}</td>`
            }else{
                cordinador=`<td>X</td>`
            }
            
            if(dat.archivo.length>30  || window.innerWidth<1700){
                archivo="Archivo"
            }else{
                archivo=dat.archivo
            }

            if(dat.tamanohoja==0){
              tamanohoja="Carta"
            }else{
              tamanohoja="Oficio"
            }
          if(dat.doblecara){
              doblecara="Si"
            }else{
              doblecara="No"
            }
            if($("#Descargar").is(":checked")){
              descargar=`<td><a href="/mediafiles/${dat.archivo}" download="/mediafiles/${dat.archivo}">${archivo}</a></td>`
            }else{
              descargar=`<td><a style="text-decoration-line: underline; color: blue; cursor: pointer;" onclick="historialcordinador.abrirarchivo('${dat.archivo}')">${archivo}</a></td>`
            }
            
            console.log(dat.archivo)
            return `<tr>
                            ${estado}
                            <td>${dat.datosProfesor.user}</td>
                            <td>${dat.cursoDestinado.nombre}</td>
                            ${descargar}
                            <td><button id="Aprobar" onclick=vistacordinador.aprobar(${dat.numeroConsulta})>Aprobar</button><span><button id="Rechazar" onclick=vistacordinador.crearventana(${dat.numeroConsulta})>Rechazar</span></button></td>
            
            </tr>
            `
        })}
    `
    }else if(window.innerWidth<1100 && x==false){
      $("#VerTodo").show()
      html=`
          <tr>
              <th>Estado</th>
              <th>Profesor</th>
              <th>Curso</th>
              <th>Asignatura</th>
              <th>Archivo</th>
              <th>Fecha Solicitud</th>
              <th>Cantidad de copias</th>
              <th>Accion</th>
          </tr>

          ${this.impresiones.map(dat=>{
              let estado;
              let accion;
              let cordinador;
              let tamanohoja;
              let doblecara;
              let archivo;
              let descargar;

              if(dat.estado==1){
                  estado=`<td class="EnEspera"><p>En Espera</p></td>}`
              }else if(dat.estado==2){
                  estado=`<td class="Pendiente"><p>Pendiente</p></td>}`
              }else if(dat.estado==3){
                  estado=`<td class="Aprobado"><p>Aprobado</p></td>}`
              }else if(dat.estado==4){
                  estado=`<td class="Rechazado"><p>Rechazado</p></td>}`
              }else if(dat.estado==5){
                  estado=`<td class="Impreso"><p>Impreso</p></td>}`
              }else if(dat.estado==6){
                  estado=`<td class="Entregado"><p>Entregado</p></td>}`
              }

              if(dat.cordinador){
                  cordinador=`<td>${dat.cordinador.user}</td>`
              }else{
                  cordinador=`<td>X</td>`
              }
              
              if(dat.archivo.length>30  || window.innerWidth<1700){
                  archivo="Archivo"
              }else{
                  archivo=dat.archivo
              }

              if(dat.tamanohoja==0){
                tamanohoja="Carta"
              }else{
                tamanohoja="Oficio"
              }
            if(dat.doblecara){
                doblecara="Si"
              }else{
                doblecara="No"
              }
              if($("#Descargar").is(":checked")){
                descargar=`<td><a href="/mediafiles/${dat.archivo}" download="/mediafiles/${dat.archivo}">${archivo}</a></td>`
              }else{
                descargar=`<td><a style="text-decoration-line: underline; color: blue; cursor: pointer;" onclick="historialcordinador.abrirarchivo('${dat.archivo}')">${archivo}</a></td>`
              }
              
              console.log(dat.archivo)
              return `<tr>
                              ${estado}
                              <td>${dat.datosProfesor.user}</td>
                              <td>${dat.cursoDestinado.nombre}</td>
                              <td>${dat.asignatura.nombre}</td>
                              ${descargar}
                              <td>${this.formatohora(dat.fechaPeticion)}</td>
                              <td>${dat.cantidadImpresion}</td>
                              <td><button id="Aprobar" onclick=vistacordinador.aprobar(${dat.numeroConsulta})>Aprobar</button><span><button id="Rechazar" onclick=vistacordinador.crearventana(${dat.numeroConsulta})>Rechazar</span></button></td>
              
              </tr>
              `
          })}
      `
      }else{
            html=`
            <tr>
                <th>Estado</th>
                <th>Coordinador</th>
                <th>Profesor</th>
                <th>Curso</th>
                <th>Asignatura</th>
                <th>Archivo</th>
                <th>Fecha Solicitud</th>
                <th>Fecha Revisado</th>
                <th>Fecha Entregada</th>
                <th>Tamaño Hoja</th>
                <th>Doble cara</th>
                <th>Cantidad de copias</th>
                <th>Razón</th>
                <th>Accion</th>
            </tr>

            ${this.impresiones.map(dat=>{
                let estado;
                let accion=`<td>X</td>`;
                let cordinador;
                let tamanohoja;
                let doblecara;
                let archivo;
                let razon;

                let descargar;

                if(dat.estado==1){
                    estado=`<td class="EnEspera"><p>En Espera</p></td>`
                }else if(dat.estado==2){
                    estado=`<td class="Pendiente"><p>Pendiente</p></td>`
                }else if(dat.estado==3){
                    estado=`<td class="Aprobado"><p>Aprobado</p></td>`
                    accion=`<td><button id="Rechazar" onclick=historialcordinador.rechazar(${dat.numeroConsulta})>Rechazar</button></td>`
                }else if(dat.estado==4){
                    estado=`<td class="Rechazado"><p>Rechazado</p></td>`
                    accion=`<td><button id="Aprobar" onclick=historialcordinador.aprobar(${dat.numeroConsulta})>Aprobar</button></td>`
                
                }else if(dat.estado==5){
                    estado=`<td class="Impreso"><p>Impreso</p></td>`
                }else if(dat.estado==6){
                    estado=`<td class="Entregado"><p>Entregado</p></td>`
                }else if(dat.estado==0){
                    estado=`<td class="Rechazado"><p>Eliminado</p></td>`
                    accion=`<td>X</td>`
                }

                if(dat.cordinador){
                    cordinador=`<td>${dat.cordinador.user}</td>`
                }else{
                    cordinador=`<td>X</td>`
                }
                
                if(dat.archivo.length>30){
                    archivo="Archivo"
                }else{
                    archivo=dat.archivo
                }

                if(dat.tamanohoja==0){
                    tamanohoja="Carta"
                  }else{
                    tamanohoja="Oficio"
                  }
                if(dat.doblecara){
                    doblecara="Si"
                  }else{
                    doblecara="No"
                  }
                
                if(dat.razon){
                    razon=`<td class="Razon"><button onclick="historialcordinador.crearventana('${dat.razon}')">Razon</button></td>`
                }else{
                    razon=`<td>X</td>`
                }
                if($("#Descargar").is(":checked")){
                  descargar=`<td><a href="/mediafiles/${dat.archivo}" download="/mediafiles/${dat.archivo}">${archivo}</a></td>`
                }else{
                  descargar=`<td><a style="text-decoration-line: underline; color: blue; cursor: pointer;" onclick="historialcordinador.abrirarchivo('${dat.archivo}')">${archivo}</a></td>`
                }
                console.log(dat.archivo)
                console.log(dat.fechaEstimadaImpresion)
                console.log(dat.fechaImpresionEntregada)
                console.log(accion)
                return `<tr>
                                ${estado}
                                ${cordinador}
                                <td>${dat.datosProfesor.user}</td>
                                <td>${dat.cursoDestinado.nombre}</td>
                                <td>${dat.asignatura.nombre}</td>
                                ${descargar}
                                <td>${this.formatohora(dat.fechaPeticion)}</td>
                                <td>${this.formatohora(dat.fechaEstimadaImpresion)}</td>
                                <td>${this.formatohora(dat.fechaImpresionEntregada)}</td>
                                <td>${tamanohoja}</td>
                                <td>${doblecara}</td>
                                <td>${dat.cantidadImpresion}</td>
                                ${razon}
                                ${accion}
                
                </tr>
                `
            })}
        `
      }
        
        
        $("#Listado").html(html);
        

    }
    abrirarchivo(url){
      window.open("/mediafiles/"+url)
    }
    aprobar(id){
        $("#Cargando").show();
        this.recalcularfecha();
        console.log(this.idusuario)
        console.log(this.fechareal)
        console.log(id)
        let mut=`mutation {
            impresionedit(
              cordinador: ${this.idusuario}
              estado: 3
              fechaaceptada: "${this.fechareal}"
              fechaentregada: ""
              numeroConsulta: ${id}
              razon: ""
            ) {
              success
              error
            }
          }
          `

        axios.post("/graphql/",{
            query:mut
        }).then(response=>{
          if(this.enfiltro==true){
            this.buscador()
          }else{
            this.cargardatos();
          }
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide();
        })
    }

    rechazar(id){
      $("#Cargando").show();
        this.recalcularfecha();
        console.log(this.idusuario)
        console.log(this.fechareal)
        console.log(id)
        let mut=`mutation {
            impresionedit(
              cordinador: ${this.idusuario}
              estado: 4
              fechaaceptada: "${this.fechareal}"
              fechaentregada: ""
              numeroConsulta: ${id}
              razon: ""
            ) {
              success
              error
            }
          }
          `

        axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            if(this.enfiltro==true){
              this.buscador()
            }else{
              this.cargardatos();
            }
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
            console.log("god")
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide();
        })
    }
    formatohora(string){

        if(string){
           var x= string.replace("T", " ");
            return x 
        }else{
            return "X"
        }
        
    }
    recalcularfecha(){

        var fecha=new Date();
        this.fechareal=`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    }

    crearventana(razon){
        let html;
  
  
            html=`
            <h1>Razon de RECHAZO</h1>
  
            
            <textarea id="Razon" readonly>${razon}</textarea>
  
            
            `
  
            setTimeout(()=>{
                $("#Ventana").html(html).addClass("AbrirVentana").removeClass("CerrarVentana");
            },100)
            
            
            setTimeout(()=>{
                window.addEventListener('click',function(e){
                    if(document.getElementById('Ventana').contains(e.target)){
  
                    }else{
                        $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
                    }
  
                })
            })
        
    }

    buscador(){
      $("#Cargando").show();
      console.log($("#Buscador2").val())
      let query2=`{
        peticionesimpresiontipoid(id: ${$("#Buscador2").val()}, tipo: 4) {
          numeroConsulta
          datosProfesor {
            id
            user
            email
          }
          cursoDestinado {
            id
            nombre
            cantidadestudiantes
            orden
          }
          asignatura {
            id
            nombre
            orden
          }
          archivo
          fechaPeticion
          fechaEstimadaImpresion
          cantidadImpresion
          estado
          cordinador {
            id
            user
            email
          }
          tamanohoja
          doblecara
          razon
        }
      }          
      `
  
      axios.post("/graphql/",{
  
        query:query2
      })
      .then(response=>{
        
        this.impresiones=response.data.data.peticionesimpresiontipoid;
        this.enfiltro=true;
        $("#Cargando").hide();
        this.mostrardatos()
      })
      .catch(error=>{
        console.log(error)
      })
    }
    resetearbusqueda(){
      this.enfiltro=false;
      $("#Cargando").show();
      this.cargardatos()
      this.cargarprofesores()
  
    }

}