class javahuellaprofesores{


    constructor(x){

        this.usuarios=[]
        this.huellas=[]
        this.cargardatos()

    }

    cargardatos(){

        let query2=`
            {
                allUsuarios {
                  id
                  perfil {
                    id
                    nombre
                  }
                  user
                  email
                  active
                  imagen
                  
              
                }
                cursohuellaalumno(idcurso: 22) {
                    id
                    rut
                    nombre
                    correo
                    correoapoderado
                    telefonoapoderado
                    curso {
                      id
                      nombre
                      cantidadestudiantes
                    }
                    junaeb
                    huella
                    idprofesor{
                      id
                      user
                    }
                  }
                
            
          }
          `


        axios.post("/graphql/",{
            query:query2
        }).then(response=>{
            this.usuarios=response.data.data.allUsuarios
            this.huellas=response.data.data.cursohuellaalumno
            this.mostrardatos()
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })




    }

    mostrardatos(){

        let html=`
                <option value="0">Seleccione profesor</option>
        ${this.usuarios.map(dat=>{

            return`
                <option value="${dat.id}">${dat.user}</option>
            `
        })}
        
        
        `

        let html2=`
            <option value="0">Ninguna</option>
        ${this.huellas.map(dat=>{
            return`
            <option value="${dat.id}">${dat.nombre}(${dat.rut})(${dat.id})</option>
            `
        })}
        
        `
        $("#SelectHuella").html(html2)
        $("#SelectUsuarios").html(html)

    }

    buscar(){
        $("#SelectHuella").val(0)
        this.huellas.forEach(dat=>{
            if(dat.idprofesor==null){
                
                
            }else{
                if($("#SelectUsuarios").val()==dat.idprofesor.id){
                    console.log("Hubo coincidencia")
                        $("#SelectHuella").val(dat.id)
                    return
                }

            }
            

        })
        
    }
    
    asignarhuella(){
        $("#Cargando").show()
        let mut=`mutation {
            asignarhuellaprofesor(idhuella: ${$("#SelectHuella").val()}, idusuario: ${$("#SelectUsuarios").val()}) {
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

    desasignarhuella(){
        $("#Cargando").show()
        let mut=`mutation {
            asignarhuellaprofesor(idhuella: ${$("#SelectHuella").val()}, idusuario: 0) {
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
}