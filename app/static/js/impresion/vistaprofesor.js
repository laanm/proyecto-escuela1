class javavistaprofesor{


    constructor(x){
        this.idusuario=x;
        this.impresiones=[];
        this.cursos=[];
        this.asignaturas=[];
        this.fecha=new Date();
        this.fechareal;
        console.log(this.fecha.getDate())
        this.recalcularfecha();
        console.log(this.fechareal)
        
        console.log(this.idusuario)
        this.cargardatos();
        $("#VerTodo").hide()
        
    }

    recalcularfecha(){
        var fecha=new Date();
        this.fechareal=`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    }

    cargardatos(){
        console.log(this.idusuario)
        $("#Cargando").show();
        let query2=`query _peticionesimpresion495 {
            peticionesimpresion(id: ${this.idusuario}, tipo: 1) {
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
              tamanohoja
              doblecara
              razon
            }

            asignaturasasignadas(id: ${this.idusuario}) {
                id
                idasignatura{
                    id
                    nombre
                }
            }
            allCursos {
                id
                nombre
            }
          }
          `

          axios.post("/graphql/",{

            query:query2
          })
          .then(response=>{
            
            this.impresiones=response.data.data.peticionesimpresion;
            this.cursos=response.data.data.allCursos;
            this.asignaturas=response.data.data.asignaturasasignadas;
            
            this.mostrardatos(false)
            $("#Cargando").hide();
          })
          .catch(error=>{
            console.log(error)
            $("#Cargando").hide();
          })
    }

    mostrardatos(x){
        let html=""
        if(x==true){
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="vistaprofesor.mostrardatos(false)">Ver Menos</button>`)
        }else{
            $("#VerTodo").replaceWith(`<button id="VerTodo" onclick="vistaprofesor.mostrardatos(true)">Ver Mas</button>`)
        }
        $("#VerTodo").hide()
        console.log(window.innerWidth)
        console.log($(window).width())
        if($(window).width()<700 && x==false){
            $("#VerTodo").show()
            html=`
            <tr>
                <th>Estado</th>
                <th>Curso</th>
                <th>Asignatura</th>
                <th>Archivo</th>
                <th>Tamaño Hoja</th>
                <th>Cantidad de copias</th>
                <th>Accion</th>
            </tr>

            ${this.impresiones.map(dat=>{
                let estado;
                let accion=`<td>X</td>`;
                let tamanohoja;
                let doblecara;
                let cordinador;
                let archivo;

                if(dat.estado==1){
                    estado=`<td class="EnEspera"><p>En Espera</p></td>}`
                    accion=`<td><button class="BotonEliminar" onclick="vistaprofesor.eliminarpeticion(${dat.numeroConsulta})">Eliminar</button></td>`
                }else if(dat.estado==2){
                    estado=`<td class="Pendiente"><p>Pendiente</p></td>}`
                    accion=`<td><button class="BotonEliminar" onclick="vistaprofesor.eliminarpeticion(${dat.numeroConsulta})">Eliminar</button></td>`
                }else if(dat.estado==3){
                    estado=`<td class="Aprobado"><p>Aprobado</p></td>}`
                }else if(dat.estado==4){
                    estado=`<td class="Rechazado"><p>Rechazado</p></td>}`
                }else if(dat.estado==5){
                    estado=`<td class="Impreso"><p>Impreso</p></td>}`
                }else if(dat.estado==6){
                    estado=`<td class="Entregado"><p>Entregado</p></td>}`
                }else if(dat.estado==0){
                    estado=`<td>No existe</td>`
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
                                <td>${dat.cursoDestinado.nombre}</td>
                                <td>${dat.asignatura.nombre}</td>
                                <td><a href="/mediafiles/${dat.archivo}" download="/mediafiles/${dat.archivo}">${archivo}</a></td>
                                <td>${tamanohoja}</td>
                                <td>${dat.cantidadImpresion}</td>
                                ${accion}
                
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
                        <th>Fecha Entregado</th>
                        <th>Tamaño Hoja</th>
                        <th>Doble cara</th>
                        <th>Cantidad de copias</th>
                        <th>Accion</th>
                    </tr>

                    ${this.impresiones.map(dat=>{
                        let estado;
                        let accion=`<td>X</td>`;
                        let tamanohoja;
                        let doblecara;
                        let cordinador;
                        let archivo;

                        if(dat.estado==1){
                            estado=`<td class="EnEspera"><p>En Espera</p></td>}`
                            accion=`<td><button class="BotonEliminar" onclick="vistaprofesor.eliminarpeticion(${dat.numeroConsulta})">Eliminar</button></td>`
                        }else if(dat.estado==2){
                            estado=`<td class="Pendiente"><p>Pendiente</p></td>}`
                            accion=`<td><button class="BotonEliminar" onclick="vistaprofesor.eliminarpeticion(${dat.numeroConsulta})">Eliminar</button></td>`
                        }else if(dat.estado==3){
                            estado=`<td class="Aprobado"><p>Aprobado</p></td>}`
                        }else if(dat.estado==4){
                            estado=`<td class="Rechazado"><p>Rechazado</p></td>}`
                        }else if(dat.estado==5){
                            estado=`<td class="Impreso"><p>Impreso</p></td>}`
                        }else if(dat.estado==6){
                            estado=`<td class="Entregado"><p>Entregado</p></td>}`
                        }else if(dat.estado==0){
                            estado=`<td>No existe</td>`
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
                                        ${accion}
                        
                        </tr>
                        `
                    })}
                `
        }
        $("#Listado").html(html);
        $("#CrearPeticion").show();

    }

    crearventana(){
        let html;


            html=`
            <h1>Creando Solicitud</h1>

            <label for="">Curso</label>
            <select id="Cursos" required>
                <option value="">Seleccione</option>
                ${this.cursos.map(dat=>{
                    return `<option value="${dat.id}">${dat.nombre}</option>`
                })}
                
            </select>

            <label for="">Asignatura</label>
            <select id="Asignaturas" required>
                <option value="">Seleccione</option>
                ${this.asignaturas.map(dat=>{
                    return `<option value="${dat.idasignatura.id}">${dat.idasignatura.nombre}</option>`
                })}
            </select>

            <label>Archivo</label>
            <input type="file" id="Archivo" accept="application/pdf" required>
            <label>Tamaño hoja</label>
            <select id="TamanoHoja" required>
                <option value="0">Carta</option>
                <option value="1">Oficio</option>
            </select>
            
            <label><input type="checkbox" id="CheckDobleCara">Impresion en doble cara</label>
            <label>Copias</label>
            <input type="number" id="Copias" min="1" value="1" max="1000" required>

            <button class="CrearPeticion2" id="BotonCrear" onclick="vistaprofesor.subir()">Crear Solicitud</button>`

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


    async subir(){
        
        if($("#Cursos").val()=="" || $("#Asignaturas").val()=="" || $("#Archivo").val()=="" || $("#TamanoHoja").val()=="" || $("#Copias").val()==""){
            Swal.fire({
                        icon: 'error',
                        title: 'Campos Faltantes',
                        text: 'Debes ingresar los datos faltantes',
                    })
        }else{
            $("#BotonCrear").prop( "disabled", true );
            $("#Ventana").removeClass("AbrirVentana").addClass("CerrarVentana");
            $("#Cargando").show();
            let files=$("#Archivo")[0].files

            let archivos= Array.from(files)
            console.log(archivos)
            for(const img of archivos.entries()){
                try{
                    const imagensubida= await this.uploadimg(img);

                }catch (error){
                    console.log(error)
                }
            }
        }
        

    }

    uploadimg(file){

        return new Promise(function(resolve,reject){

            
            console.log($("#CheckDobleCara").is(":checked"))
            vistaprofesor.recalcularfecha();
            const form= new FormData()
            console.log(vistaprofesor.fechareal)

            
            form.append('operations', `{"query": "mutation ($archivo: Upload , $asignatura: Int! , $cantidadimpresion: Int! , $cordinador: Int , $cursodestinado: Int! , $estado: Int! , $fechapeticion: String! , $idprofe: Int! , $tamanohoja: Int!, $doblecara: Boolean! , $razon: String) {impresioncreate(archivo: $archivo, asignatura: $asignatura , cantidadimpresion: $cantidadimpresion , cordinador: $cordinador , cursodestinado: $cursodestinado , estado: $estado  , fechapeticion: $fechapeticion , idprofe: $idprofe , tamanohoja: $tamanohoja , doblecara: $doblecara , razon: $razon) {success error}}", "variables": { "archivo": null , "asignatura": ${$("#Asignaturas").val()} , "cantidadimpresion": ${$("#Copias").val()} , "cordinador": 0 , "cursodestinado": ${$("#Cursos").val()} , "estado": 2  , "fechapeticion": "${vistaprofesor.fechareal}" , "idprofe": ${vistaprofesor.idusuario} , "tamanohoja": ${$("#TamanoHoja").val()} , "doblecara": ${$("#CheckDobleCara").is(":checked")} , "razon": "" }}`);
            
            
            form.append('map', '{ "0": ["variables.archivo"]}');
            form.append('0', file[1]);
            
            

            /*
            console.log(file)
            const form= new FormData()
            form.append('operations', '{"query": "mutation ($imagen: Upload! ,  $nombre: String!) {imagencreate(imagen: $imagen , nombre: $nombre) {success error}}", "variables": { "imagen": null , "nombre": "uwu" }}');
            form.append('map', '{ "0": ["variables.imagen"]}');
            form.append('0', file[1]);
            */

            const headers = {
                'Content-Type': 'multipart/form-data',
            }

            axios({
                method: 'post',
                url: '/graphql/',
                data: form,
                headers: headers,

            }).then(response => {
                console.log("funciono")
                
                vistaprofesor.cargardatos() 
                $("#BotonCrear").prop( "disabled", false );
                $("#Cargando").hide();
                
                resolve(response.data)
            }).catch(error => {
                reject(error)
                $("#BotonCrear").prop( "disabled", false );
                $("#Cargando").hide();
            });

        })
        
    }

    eliminarpeticion(id){
        console.log(id)
        $("#Cargando").show();
        let mut=`
        mutation {
            impresiondelete(id: ${id}) {
              success
              error
            }
          }
        `

        axios.post("/graphql/",{
            query:mut
        }).then(response=>{
            this.cargardatos();
            $("#Cargando").hide();
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

}