class javahistorialprofesor{


    constructor(x){
        this.idusuario=x;
        this.cargardatos()
       
        $("#VerTodo").hide()
      }

    cargardatos(){
        $("#Cargando").show()
        console.log(this.idusuario)
        let query2=`query _peticionesimpresion495 {
            peticionesimpresion(id: ${this.idusuario}, tipo: 0) {
              numeroConsulta
              datosProfesor {
                id
                user
                email
              }
              cursoDestinado {
                id
                nombre
              }
              asignatura {
                id
                nombre
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
            }
            
          }
          `

          axios.post("/graphql/",{

            query:query2
          })
          .then(response=>{
            
            this.impresiones=response.data.data.peticionesimpresion;
            this.mostrardatos(false)
            $("#Cargando").hide()
          })
          .catch(error=>{
            console.log(error)
            $("#Cargando").hide()
          })
    }

    mostrardatos(x){

        let html=""

        if(x==true){
          $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="historialprofesor.mostrardatos(false)">Ver Menos</button>`)
      }else{
          $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="historialprofesor.mostrardatos(true)">Ver Mas</button>`)
      }
      $("#VerTodo").hide()
        if($(window).width()<700 && x==false){
          $("#VerTodo").show()
          html=`
            <tr>
                <th>Estado</th>
                <th>Coordinador</th>
                <th>Curso</th>
                <th>Asignatura</th>
                <th>Archivo</th>
                <th>Cantidad de copias</th>
                <th>Accion</th>
            </tr>

            ${this.impresiones.map(dat=>{
                let estado;
                let tamanohoja;
                let doblecara;
                let cordinador;
                let archivo;

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
                }else if(dat.estado==0){
                    estado=`<td class="Rechazado"><p>Eliminado</p></td>`
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
                
                
                console.log(dat.archivo)
                return `<tr>
                                ${estado}
                                ${cordinador}
                                <td>${dat.cursoDestinado.nombre}</td>
                                <td>${dat.asignatura.nombre}</td>
                                <td><a href="/mediafiles/${dat.archivo}" download="/mediafiles/${dat.archivo}">${archivo}</a></td>
                                <td>${dat.cantidadImpresion}</td>
                                <td>X</td>
                
                </tr>
                `
            })}
        `
        }else{
          html=`
          <tr>
              <th>Estado</th>
              <th>Coordinador</th>
              <th>Curso</th>
              <th>Asignatura</th>
              <th>Archivo</th>
              <th>Fecha Solicitud</th>
              <th>Fecha Revisado</th>
              <th>Fecha Entregada</th>
              <th>Tamaño Hoja</th>
              <th>Doble cara</th>
              <th>Cantidad de copias</th>
              <th>Accion</th>
          </tr>

          ${this.impresiones.map(dat=>{
              let estado;
              let tamanohoja;
              let doblecara;
              let cordinador;
              let archivo;

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
              }else if(dat.estado==0){
                  estado=`<td class="Rechazado"><p>Eliminado</p></td>`
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
              
              
              console.log(dat.archivo)
              return `<tr>
                              ${estado}
                              ${cordinador}
                              <td>${dat.cursoDestinado.nombre}</td>
                              <td>${dat.asignatura.nombre}</td>
                              <td><a href="/mediafiles/${dat.archivo}" download="/mediafiles/${dat.archivo}">${archivo}</a></td>
                              <td>${this.formatohora(dat.fechaPeticion)}</td>
                              <td>${this.formatohora(dat.fechaEstimadaImpresion)}</td>
                              <td>${this.formatohora(dat.fechaImpresionEntregada)}</td>
                              <td>${tamanohoja}</td>
                              <td>${doblecara}</td>
                              <td>${dat.cantidadImpresion}</td>
                              <td>X</td>
              
              </tr>
              `
          })}
      `
        }
        $("#Listado").html(html);
        

    }
    formatohora(string){

        if(string){
            var x= string.replace("T", " ");
             return x 
         }else{
             return "X"
         }
    }

}