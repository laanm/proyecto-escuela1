class javamiscursos{


    constructor(x){
        this.asignaturas=[]
        this.cargardatos(x)
    }


    cargardatos(x){
        let query=`{
            asignaturasasignadas(id: ${x}) {
              id
              idprofe {
                id
                user
                email
                password
                active
                imagen
              }
              idasignatura {
                id
                nombre
                orden
              }
            }
          }
          `
          axios.post("/graphql/",{
            query:query
        }).then(response=>{

            
            this.asignaturas=response.data.data.asignaturasasignadas
            this.mostrardatos()
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })
    }
    mostrardatos(){

        let html=`
            <h1>Mis Cursos</h1>
        ${this.asignaturas.map(dat=>{
            return `
            <a href="{% url 'RenderPagNotas' %}"><div class="Curso">${dat.idasignatura.nombre}</div></a>
            
            `
        })}
        
        `
        $("#DivGeneral").html(html)

    }
}