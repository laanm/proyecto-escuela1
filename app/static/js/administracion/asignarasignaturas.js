class javaasignarasignaturas{


    constructor(){

        this.profesores=[];
        this.asignaturas=[];
        this.asignaturasprofesor=[];
        this.asignaturasprofesorpure=[];
        this.cargarprofesores();
    }


    agregarasignaturas(){
      let mut=`mutation {
        asignarasignaturascreate(idasignatura: ${$("#Asignaturas").val()}, idprofe: ${$("#Profesores").val()}) {
          success
          error
        }
      }
      `
      console.log($("#Asignaturas").val()+"-"+$("#Profesores").val())
      axios.post("/graphql/",{
        query:mut
      
      }).then(response=>{
          this.asignaturasprofesorpure=[];
          this.cargarprofesor();
          this.listarasignaturas();
      }).catch(error=>{
        console.log(error)
      })
    }
    quitarasignaturas(id){
      let mut=`mutation {
        asignarasignaturasdelete(id: ${id}) {
          success
          error
        }
      }
      `

      axios.post("/graphql/",{
        query:mut
      }).then(response=>{
        this.asignaturasprofesorpure=[];
        this.cargarprofesor();
        this.listarasignaturas();
      })
      .catch(error=>{
        console.log(error)
      })
    }
    listarasignaturas(){
        let html=`
            <div id="SeleccionarAsignatura">
                        
                    <label>Selecciona Asignatura</label>
                    <select name="asignatura" id="Asignaturas" required>
                        <option value="Asignatura">Seleccionar</option>
                        ${this.asignaturas.map(dat=>{
                            console.log(dat.id)
                            if (this.asignaturasprofesorpure.indexOf(dat.id)!==-1){
                               
                            }else{
                               return `<option value="${dat.id}">${dat.nombre}</option>`
                            }
                            
                        }).join("")}
                    </select>
                    <button type="sumbit" id="CrearPeticion" onclick="asignarasignaturas.agregarasignaturas()">Agregar Asignatura</button> 

                </form>
                
            </div>


            <h2>Asignaturas Profesor</h2>

            <table>
                <tr>
                    <th>Nombre Asignatura</th>
                    <th>Accion</th>
                </tr>
                
                ${this.asignaturasprofesor.map(dat=>{

                    
                    return `<tr>
                                <td>${dat.idasignatura.nombre}</td>
                                <td><button id="Eliminar" onclick="asignarasignaturas.quitarasignaturas(${dat.id})">Eliminar</button></td>
                            </tr>
                    `
                }).join("")}
                
                


            </table>
        `

        $("#divAsignaturas").html(html);
    }

    cargarprofesor(){

        let query2=`  
        query _asignaturasasignada785 {
            asignaturasasignadas(id: ${$("#Profesores").val()}) {
              id
              idprofe {
                id
                user
              }
              idasignatura {
                id
                nombre
              }
            }
          }`

        axios.post("/graphql/",{
            query:query2
        })
        .then(response=>{
            this.asignaturasprofesorpure=[];
            this.asignaturasprofesor=response.data.data.asignaturasasignadas;
            this.asignaturasprofesor.forEach(element => {
              this.asignaturasprofesorpure.push(element.idasignatura.id)
            });
            console.log(this.asignaturasprofesor)
            console.log(this.asignaturasprofesorpure)
            this.listarasignaturas();
        })
        .catch(error=>{
          console.log(error)
        })

    }

    cargarprofesores(){

        let query2=`{
            allUsuarios {
              id
              perfil {
                id
              }
              user
              email
              password
              active
            }

            allAsignaturas {
                id
                nombre
              }
          }
          `

          axios.post("/graphql/",{

            query:query2
          })
          .then(response=>{
            this.profesores=response.data.data.allUsuarios;
            this.asignaturas=response.data.data.allAsignaturas;
            console.log(this.profesores)

            let html=`
            <option value="">Seleccionar</option>
            ${this.profesores.map(dat=>{
                return `<option value="${dat.id}">${dat.user}</option> `
            }).join("")}
            `
            $("#Profesores").html(html);

          })
          .catch(error=>{

          })
    }
}