class javanotas{

    constructor(x,n){
        this.iduser=x
        this.nivelperfil=n
        this.asignatura=1
        this.notas=[]
        this.asignaturas=[]
        this.alumnos=[]
        this.cursos=[]
        this.alumnoscambios=[]
        this.indicadores=[]

        this.ultimosplit=1;
        
       
        this.cargarconfiguracion()
        this.configuraciones
        this.cargardatos()

        this.sc1=10 //max15
        this.sc2=10

        this.tc1=7 //max10
        this.tc2=7
        this.tc3=7

        this.cc1=5 //max7
        this.cc2=5
        this.cc3=5
        this.cc4=5

        this.hoy=new Date()
        this.inputanterior=""
        this.asistencias=[]
        
    }

    cargarconfiguracion(){
        $.ajax({
            url: '/ConfiguracionSistema',
            type: 'GET',
            data: {
                
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                notas.configuraciones=data
                
                
            },
            error: function (data) {
               
            }
        });
    }
    cargardatos(){
        $("#Cargando").show()
        let query=`   
                {
                    

                      allCursos {
                        id
                        nombre
                        cantidadestudiantes
                        orden
                        tipodecurso
                        
                      }
                      asignaturasasignadas(id: ${this.iduser}) {
                        id
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

            
            this.cursos=response.data.data.allCursos
            this.asignaturas=response.data.data.asignaturasasignadas
            this.cargarcursos()
            this.cargarasignaturas()
            $("#Cargando").hide()
        }).catch(error=>{
            console.log(error)
            $("#Cargando").hide()
        })

    }
    cargardatosasignaturas(){
        if($("#Cursos").val()==0 || $("#Asignaturas").val()==0){
            return
        }
        $("#Cargando").show()
        
        $.ajax({
                url: '/datosalumnosasignatura',
                type: 'POST',
                data: {
                    
                    idasignatura : $("#Asignaturas").val(),
                    idcurso : $("#Cursos").val(),
                },
                headers: {
                    'X-CSRFToken': TOKEN
                },
                success: function (data) {
                    console.log(data)
                    notas.notas=data
                    notas.mostrardatos(notas.ultimosplit)
                    $("#Cargando").hide()
                    
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
            });
    }
    cargaralumnosporcurso(){
        $("#Cargando").show()
        
        $.ajax({
                url: '/alumnosporcurso',
                type: 'POST',
                data: {
                    
                    idcurso : $("#Cursos").val(),
                    
                },
                headers: {
                    'X-CSRFToken': TOKEN
                },
                success: function (data) {
                    console.log(data)
                    notas.alumnos=data
                    
                    $("#Cargando").hide()
                    
                },
                error: function (data) {
                    $("#Cargando").hide()
                }
            });
    }

    cargarcursos(){
        let html=`
            <option value="0">Seleccione</option>
            ${this.cursos.map(dat=>{
                if(dat.id==22){
                    return
                }
                return`
                <option value="${dat.id}">${dat.nombre}</option>
                `
            })} 
        `
        $("#Cursos").html(html)
    }
    cargarasignaturas(){
        let html=`
                <option value="0">Seleccione</option>
            ${this.asignaturas.map(dat=>{
                return`
                <option value="${dat.idasignatura.id}">${dat.idasignatura.nombre}</option>
                `
            })} 
        `
        $("#Asignaturas").html(html)
    }
    cambiarsplit(x){
        if(x==2){
            this.ultimosplit=2
            this.mostrardatos(this.ultimosplit)
        }else if(x==3){
            this.ultimosplit=3
            this.mostrardatos(this.ultimosplit)
        }else{
            this.ultimosplit=1
            this.mostrardatos(this.ultimosplit)
        }
    }
    mostrardatos(x){
        
        console.log(this.notas)
        this.indicadores=[]
        this.alumnoscambios=[]
        
        let letras=`
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        `
        let porcentajes=`
        <option value="100">100%</option>
        <option value="90">90%</option>
        <option value="80">80%</option>
        <option value="70">70%</option>
        <option value="60">60%</option>
        <option value="50">50%</option>
        <option value="40">40%</option>
        <option value="30">30%</option>
        <option value="20">20%</option>
        <option value="10">10%</option>
        <option value="0">0%</option>
        
        `

        let temp=false
        for(let x=0; x<0;x++){
                    
        }
        let cabezera=""


        if(this.configuraciones.divisionyear==2){
            cabezera=`
                <tr>
                    <th colspan="2"></th>
                    <th colspan="13" class="S1">S1</th>
                    <th colspan="13" class="S2">S2</th>
                </tr>

                <tr>
                <th>Nombre</th>

                
                <th class="S1">N1</th>
                <th class="S1">N2</th>
                <th class="S1">N3</th>
                <th class="S1">N4</th>
                <th class="S1">N5</th>
                <th class="S1">N6</th>
                <th class="S1">N7</th>
                <th class="S1">N8</th>
                <th class="S1">N9</th>
                <th class="S1">N10</th>
                
                
                <th class="S1">P</th>
                <th class="S1">%</th>
                <th class="S1">Letra</th>

                <th class="S2">N1</th>
                <th class="S2">N2</th>
                <th class="S2">N3</th>
                <th class="S2">N4</th>
                <th class="S2">N5</th>
                <th class="S2">N6</th>
                <th class="S2">N7</th>
                <th class="S2">N8</th>
                <th class="S2">N9</th>
                <th class="S2">N10</th>
                

                <th class="S2">P</th>
                <th class="S2">%</th>
                <th class="S2">Letra</th>
                
            </tr>
            `
        }else if(this.configuraciones.divisionyear==3){
            let temp1=""
            let temp2=""
            if(x==1){
                temp2=`
                <th colspan="1"></th>
                <th colspan="13" id="T1" class="S1" onclick="notas.cambiarsplit(1)">T1</th>
                <th colspan="2" id="T2" class="S2" onclick="notas.cambiarsplit(2)">T2</th>
                <th colspan="2" id="T3" class="S3" onclick="notas.cambiarsplit(3)">T3</th>
                <th  id="T4" class="S4" >Promedio</th>
                `

                temp1=`
                    <th class="S1">N1</th>
                    <th class="S1">N2</th>
                    <th class="S1">N3</th>
                    <th class="S1">N4</th>
                    <th class="S1">N5</th>
                    <th class="S1">N6</th>
                    <th class="S1">N7</th>
                    <th class="S1">N8</th>
                    <th class="S1">N9</th>
                    <th class="S1">N10</th>
                    <th class="S1">P</th>
                    <th class="S1">%</th>
                    <th class="S1">Letra</th>

                    <th class="S2">P</th>
                    <th class="S2">%</th>

                    <th class="S3">P</th>
                    <th class="S3">%</th>

                    <th class="S4">Anual</th>
                `
            }else if(x==2){
                temp2=`
                <th colspan="1"></th>
                <th colspan="2" id="T1" class="S1" onclick="notas.cambiarsplit(1)">T1</th>
                <th colspan="13" id="T2" class="S2" onclick="notas.cambiarsplit(2)">T2</th>
                <th colspan="2" id="T3" class="S3" onclick="notas.cambiarsplit(3)">T3</th>
                <th  id="T4" class="S4" >Promedio</th>
                `
                temp1=`
                    

                    <th class="S1">P</th>
                    <th class="S1">%</th>

                    <th class="S2">N1</th>
                    <th class="S2">N2</th>
                    <th class="S2">N3</th>
                    <th class="S2">N4</th>
                    <th class="S2">N5</th>
                    <th class="S2">N6</th>
                    <th class="S2">N7</th>
                    <th class="S2">N8</th>
                    <th class="S2">N9</th>
                    <th class="S2">N10</th>
                    <th class="S2">P</th>
                    <th class="S2">%</th>
                    <th class="S2">Letra</th>

                    <th class="S3">P</th>
                    <th class="S3">%</th>

                    <th class="S4">Anual</th>
                `
            }else if(x==3){
                temp2=`
                <th colspan="1"></th>
                <th colspan="2" id="T1" class="S1" onclick="notas.cambiarsplit(1)">T1</th>
                <th colspan="2" id="T2" class="S2" onclick="notas.cambiarsplit(2)">T2</th>
                <th colspan="13" id="T3" class="S3" onclick="notas.cambiarsplit(3)">T3</th>
                <th  id="T4" class="S4" >Promedio</th>
                `
                temp1=`
                    

                    <th class="S1">P</th>
                    <th class="S1">%</th>

                    <th class="S2">P</th>
                    <th class="S2">%</th>

                    <th class="S3">N1</th>
                    <th class="S3">N2</th>
                    <th class="S3">N3</th>
                    <th class="S3">N4</th>
                    <th class="S3">N5</th>
                    <th class="S3">N6</th>
                    <th class="S3">N7</th>
                    <th class="S3">N8</th>
                    <th class="S3">N9</th>
                    <th class="S3">N10</th>
                    <th class="S3">P</th>
                    <th class="S3">%</th>
                    <th class="S3">Letra</th>

                    <th class="S4">Anual</th>
                `
            }
            cabezera=`
                <tr>
                    ${temp2}
                    
                </tr>

                <tr>
                <th>Nombre</th>

                ${temp1}


                
            </tr>
            `
        }



        let div=0
        let divfinal=0
        let sum=0
        let sumfinal=0
        let prom1=""
        let prom2=""
        let prom3=""
        let prom4=""

        let temp1=""
        let temp2=""
        let temp3=""
        let temp4=""

        let encontrado=false
        let html3=`
            
                ${cabezera}
            
            

            ${this.alumnos.map(dat=>{
                encontrado=false
                if(this.configuraciones.divisionyear==3){

                    if(this.notas.length==0){ //SI NO HAY NINGUNA NOTA, SE MUESTRAN TODAS VACIAS
                        if(x==1){
                            return `
                                    <tr>
                                        <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                       
    
                                        <td><input id="${dat.id}-1" type="number" max="70"  onchange="notas.cambios(${dat.id},1,0)"></td>
                                        <td><input id="${dat.id}-2" type="number" max="70" onchange="notas.cambios(${dat.id},2,0)"></td>
                                        <td><input id="${dat.id}-3" type="number" max="70"  onchange="notas.cambios(${dat.id},3,0)"></td>
                                        <td><input id="${dat.id}-4" type="number" max="70"  onchange="notas.cambios(${dat.id},4,0)"></td>
                                        <td><input id="${dat.id}-5" type="number" max="70" onchange="notas.cambios(${dat.id},5,0)"></td>
                                        <td><input id="${dat.id}-6" type="number" max="70"  onchange="notas.cambios(${dat.id},6,0)"></td>
                                        <td><input id="${dat.id}-7" type="number" max="70" onchange="notas.cambios(${dat.id},7,0)"></td>
                                        <td><input id="${dat.id}-8" type="number"max="70"  onchange="notas.cambios(${dat.id},8,0)"></td>
                                        <td><input id="${dat.id}-9" type="number" max="70"  onchange="notas.cambios(${dat.id},9,0)"></td>
                                        <td><input id="${dat.id}-10" type="number"max="70"  onchange="notas.cambios(${dat.id},10,0)"></td>
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p1">
                                        <option value="100">100%</option>
                                        </select></td>
                                        <td>A</td>
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p2">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p3">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
                                        <td>-</td>
                                    </tr>
                            `
                        }else if(x==2){
                            return `
                                    <tr>
                                        <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                        
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p1">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
    
                                        <td><input id="${dat.id}-11" type="number" max="70"  onchange="notas.cambios(${dat.id},11)"></td>
                                        <td><input id="${dat.id}-12" type="number" max="70" onchange="notas.cambios(${dat.id},12)"></td>
                                        <td><input id="${dat.id}-13" type="number" max="70"  onchange="notas.cambios(${dat.id},13)"></td>
                                        <td><input id="${dat.id}-14" type="number" max="70"  onchange="notas.cambios(${dat.id},14)"></td>
                                        <td><input id="${dat.id}-15" type="number"max="70"  onchange="notas.cambios(${dat.id},15)"></td>
                                        <td><input id="${dat.id}-16" type="number" max="70"  onchange="notas.cambios(${dat.id},16)"></td>
                                        <td><input id="${dat.id}-17" type="number" max="70" onchange="notas.cambios(${dat.id},17)"></td>
                                        <td><input id="${dat.id}-18" type="number" max="70" onchange="notas.cambios(${dat.id},18)"></td>
                                        <td><input id="${dat.id}-19" type="number" max="70"  onchange="notas.cambios(${dat.id},19)"></td>
                                        <td><input id="${dat.id}-20" type="number"max="70"  onchange="notas.cambios(${dat.id},20)"></td>
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p2">
                                        <option value="100">100%</option>
                                        </select></td>
                                        <td>A</td>
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p3">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
                                        <td>-</td>
                                    </tr>
                            
                            `
                        }else if(x==3){
                            return `
                                    <tr>
                                        <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                        
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p1">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
                                        <td>-</td>
                                        <td><select id="${dat.id}-p2">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
                                        <td><input id="${dat.id}-21" type="number" max="70"  onchange="notas.cambios(${dat.id},21)"></td>
                                        <td><input id="${dat.id}-22" type="number" max="70" onchange="notas.cambios(${dat.id},22)"></td>
                                        <td><input id="${dat.id}-23" type="number" max="70"  onchange="notas.cambios(${dat.id},23)"></td>
                                        <td><input id="${dat.id}-24" type="number" max="70"  onchange="notas.cambios(${dat.id},24)"></td>
                                        <td><input id="${dat.id}-25" type="number" max="70" onchange="notas.cambios(${dat.id},25)"></td>
                                        <td><input id="${dat.id}-26" type="number" max="70"  onchange="notas.cambios(${dat.id},26)"></td>
                                        <td><input id="${dat.id}-27" type="number" max="70" onchange="notas.cambios(${dat.id},27)"></td>
                                        <td><input id="${dat.id}-28" type="number" max="70" onchange="notas.cambios(${dat.id},28)"></td>
                                        <td><input id="${dat.id}-29" type="number" max="70"  onchange="notas.cambios(${dat.id},29)"></td>
                                        <td><input id="${dat.id}-30" type="number" max="70" onchange="notas.cambios(${dat.id},30)"></td>
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p3">
                                        <option value="100">100%</option>
                                        </select></td>
                                        <td>A</td>
    
                                        <td>-</td>
    
                                    </tr>
                            
                            `
                        }

                    }
                    
                    return `${this.notas.map((notas,index)=>{

                        if(notas.idalumno==dat.id){ //ENCUENTRA LAS NOTAS DEL ALUMNO Y LAS MUESTRA
                            encontrado=true
                            if(x==1){
                                return `
                                <tr>
                                    <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                    

                                    <td><input id="${dat.id}-1" type="number"max="70"   onchange="notas.cambios(${dat.id},1,${notas.id})" ${this.comprobarrojo(notas.n1)}></td>
                                    <td><input id="${dat.id}-2" type="number"max="70"  onchange="notas.cambios(${dat.id},2,${notas.id})" ${this.comprobarrojo(notas.n2)}></td>
                                    <td><input id="${dat.id}-3" type="number"max="70"   onchange="notas.cambios(${dat.id},3,${notas.id})" ${this.comprobarrojo(notas.n3)}></td>
                                    <td><input id="${dat.id}-4" type="number"max="70"   onchange="notas.cambios(${dat.id},4,${notas.id})" ${this.comprobarrojo(notas.n4)}></td>
                                    <td><input id="${dat.id}-5" type="number"max="70"  onchange="notas.cambios(${dat.id},5,${notas.id})" ${this.comprobarrojo(notas.n5)}></td>
                                    <td><input id="${dat.id}-6" type="number"max="70"   onchange="notas.cambios(${dat.id},6,${notas.id})" ${this.comprobarrojo(notas.n6)}></td>
                                    <td><input id="${dat.id}-7" type="number" max="70" onchange="notas.cambios(${dat.id},7,${notas.id})" ${this.comprobarrojo(notas.n7)}></td>
                                    <td><input id="${dat.id}-8" type="number" max="70"  onchange="notas.cambios(${dat.id},8,${notas.id})" ${this.comprobarrojo(notas.n8)}></td>
                                    <td><input id="${dat.id}-9" type="number"max="70"  onchange="notas.cambios(${dat.id},9,${notas.id})" ${this.comprobarrojo(notas.n9)}></td>
                                    <td><input id="${dat.id}-10" type="number" max="70"  onchange="notas.cambios(${dat.id},10,${notas.id})" ${this.comprobarrojo(notas.n10)}></td>

                                    <td>${this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)}</td>

                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>
                                    <td>A</td>

                                    <td>${this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)}</td>

                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>

                                    <td>${this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30)}</td>

                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},'p3',${notas.id})">
                                    <option value="${notas.porcentaje3}">${notas.porcentaje3}%</option>
                                    ${porcentajes}</select></td>
                                    
                                    <td>${((this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)+this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)+this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30))/3).toFixed(1)}</td>
                                    

                                </tr>`
                            }else if(x==2){
                                return `
                                <tr>
                                    <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                    


                                    <td>${this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)}</td>

                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>

                                    <td><input id="${dat.id}-11" type="number"max="70"   onchange="notas.cambios(${dat.id},11,${notas.id})" ${this.comprobarrojo(notas.n11)}></td>
                                    <td><input id="${dat.id}-12" type="number"max="70"  onchange="notas.cambios(${dat.id},12,${notas.id})" ${this.comprobarrojo(notas.n12)}></td>
                                    <td><input id="${dat.id}-13" type="number" max="70"  onchange="notas.cambios(${dat.id},13,${notas.id})" ${this.comprobarrojo(notas.n13)}></td>
                                    <td><input id="${dat.id}-14" type="number" max="70"  onchange="notas.cambios(${dat.id},14,${notas.id})" ${this.comprobarrojo(notas.n14)}></td>
                                    <td><input id="${dat.id}-15" type="number"max="70"  onchange="notas.cambios(${dat.id},15,${notas.id})" ${this.comprobarrojo(notas.n15)}></td>
                                    <td><input id="${dat.id}-16" type="number" max="70"  onchange="notas.cambios(${dat.id},16,${notas.id})" ${this.comprobarrojo(notas.n16)}></td>
                                    <td><input id="${dat.id}-17" type="number" max="70" onchange="notas.cambios(${dat.id},17,${notas.id})" ${this.comprobarrojo(notas.n17)}></td>
                                    <td><input id="${dat.id}-18" type="number" max="70"  onchange="notas.cambios(${dat.id},18,${notas.id})" ${this.comprobarrojo(notas.n18)}></td>
                                    <td><input id="${dat.id}-19" type="number"max="70"  onchange="notas.cambios(${dat.id},19,${notas.id})" ${this.comprobarrojo(notas.n19)}></td>
                                    <td><input id="${dat.id}-20" type="number" max="70"  onchange="notas.cambios(${dat.id},20,${notas.id})" ${this.comprobarrojo(notas.n20)}></td>
                                    <td>${this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)}</td>

                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>
                                    <td>A</td>

                                    <td>${this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30)}</td>

                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},'p3',${notas.id})">
                                    <option value="${notas.porcentaje3}">${notas.porcentaje3}%</option>
                                    ${porcentajes}</select></td>
                                    
                                    <td>${((this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)+this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)+this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30))/3).toFixed(1)}</td>
                                </tr>`
                            }else if(x==3){
                                return `
                                <tr>
                                    <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                    


                                    <td>${this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)}</td>
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>

                                    <td>${this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)}</td>
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>

                                    <td><input id="${dat.id}-21" type="number" max="70"  onchange="notas.cambios(${dat.id},21,${notas.id})" ${this.comprobarrojo(notas.n21)}></td>
                                    <td><input id="${dat.id}-22" type="number"max="70"  onchange="notas.cambios(${dat.id},22,${notas.id})" ${this.comprobarrojo(notas.n22)}></td>
                                    <td><input id="${dat.id}-23" type="number" max="70"  onchange="notas.cambios(${dat.id},23,${notas.id})" ${this.comprobarrojo(notas.n23)}></td>
                                    <td><input id="${dat.id}-24" type="number" max="70"  onchange="notas.cambios(${dat.id},24,${notas.id})" ${this.comprobarrojo(notas.n24)}></td>
                                    <td><input id="${dat.id}-25" type="number" max="70" onchange="notas.cambios(${dat.id},25,${notas.id})" ${this.comprobarrojo(notas.n25)}></td>
                                    <td><input id="${dat.id}-26" type="number"max="70"   onchange="notas.cambios(${dat.id},26,${notas.id})" ${this.comprobarrojo(notas.n26)}></td>
                                    <td><input id="${dat.id}-27" type="number"max="70"  onchange="notas.cambios(${dat.id},27,${notas.id})" ${this.comprobarrojo(notas.n27)}></td>
                                    <td><input id="${dat.id}-28" type="number" max="70"  onchange="notas.cambios(${dat.id},28,${notas.id})" ${this.comprobarrojo(notas.n28)}></td>
                                    <td><input id="${dat.id}-29" type="number"max="70"  onchange="notas.cambios(${dat.id},29,${notas.id})" ${this.comprobarrojo(notas.n29)}></td>
                                    <td><input id="${dat.id}-30" type="number" max="70"  onchange="notas.cambios(${dat.id},30,${notas.id})" ${this.comprobarrojo(notas.n30)}></td>

                                    <td>${this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30)}</td>

                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},'p3',${notas.id})">
                                    <option value="${notas.porcentaje3}">${notas.porcentaje3}%</option>
                                    ${porcentajes}</select></td>
                                    <td>A</td>
                                    
                                    <td>${((this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)+this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)+this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30))/3).toFixed(1)}</td>
                                </tr>`
                            }
                            
                        }
                        if(index==this.notas.length-1 && encontrado==false){//SI NO ENCUENTRA NINGUNA COINCIDENCIA EN EL MAP DE LAS NOTAS, POR DEFECTO MOSTRARA ESTAS NOTAS VACIAS
                            if(x==1){
                                return `
                                        <tr>
                                            <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                            
        
                                            <td><input id="${dat.id}-1" type="number" max="70"  onchange="notas.cambios(${dat.id},1,0)"></td>
                                            <td><input id="${dat.id}-2" type="number" max="70" onchange="notas.cambios(${dat.id},2,0)"></td>
                                            <td><input id="${dat.id}-3" type="number" max="70"  onchange="notas.cambios(${dat.id},3,0)"></td>
                                            <td><input id="${dat.id}-4" type="number" max="70"  onchange="notas.cambios(${dat.id},4,0)"></td>
                                            <td><input id="${dat.id}-5" type="number" max="70" onchange="notas.cambios(${dat.id},5,0)"></td>
                                            <td><input id="${dat.id}-6" type="number" max="70"  onchange="notas.cambios(${dat.id},6,0)"></td>
                                            <td><input id="${dat.id}-7" type="number" max="70" onchange="notas.cambios(${dat.id},7,0)"></td>
                                            <td><input id="${dat.id}-8" type="number"max="70"  onchange="notas.cambios(${dat.id},8,0)"></td>
                                            <td><input id="${dat.id}-9" type="number" max="70"  onchange="notas.cambios(${dat.id},9,0)"></td>
                                            <td><input id="${dat.id}-10" type="number"max="70"  onchange="notas.cambios(${dat.id},10,0)"></td>
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p1">
                                            <option value="100">100%</option>
                                            </select></td>
                                            <td>A</td>
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p2">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p3">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
                                            <td>-</td>
                                        </tr>
                                `
                            }else if(x==2){
                                return `
                                        <tr>
                                            <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                            
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p1">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
        
                                            <td><input id="${dat.id}-11" type="number" max="70"  onchange="notas.cambios(${dat.id},11)"></td>
                                            <td><input id="${dat.id}-12" type="number" max="70" onchange="notas.cambios(${dat.id},12)"></td>
                                            <td><input id="${dat.id}-13" type="number" max="70"  onchange="notas.cambios(${dat.id},13)"></td>
                                            <td><input id="${dat.id}-14" type="number" max="70"  onchange="notas.cambios(${dat.id},14)"></td>
                                            <td><input id="${dat.id}-15" type="number"max="70"  onchange="notas.cambios(${dat.id},15)"></td>
                                            <td><input id="${dat.id}-16" type="number" max="70"  onchange="notas.cambios(${dat.id},16)"></td>
                                            <td><input id="${dat.id}-17" type="number" max="70" onchange="notas.cambios(${dat.id},17)"></td>
                                            <td><input id="${dat.id}-18" type="number" max="70" onchange="notas.cambios(${dat.id},18)"></td>
                                            <td><input id="${dat.id}-19" type="number" max="70"  onchange="notas.cambios(${dat.id},19)"></td>
                                            <td><input id="${dat.id}-20" type="number"max="70"  onchange="notas.cambios(${dat.id},20)"></td>
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p2">
                                            <option value="100">100%</option>
                                            </select></td>
                                            <td>A</td>
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p3">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
                                            <td>-</td>
                                        </tr>
                                
                                `
                            }else if(x==3){
                                return `
                                        <tr>
                                            <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                            
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p1">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
                                            <td>-</td>
                                            <td><select id="${dat.id}-p2">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
                                            <td><input id="${dat.id}-21" type="number" max="70"  onchange="notas.cambios(${dat.id},21)"></td>
                                            <td><input id="${dat.id}-22" type="number" max="70" onchange="notas.cambios(${dat.id},22)"></td>
                                            <td><input id="${dat.id}-23" type="number" max="70"  onchange="notas.cambios(${dat.id},23)"></td>
                                            <td><input id="${dat.id}-24" type="number" max="70"  onchange="notas.cambios(${dat.id},24)"></td>
                                            <td><input id="${dat.id}-25" type="number" max="70" onchange="notas.cambios(${dat.id},25)"></td>
                                            <td><input id="${dat.id}-26" type="number" max="70"  onchange="notas.cambios(${dat.id},26)"></td>
                                            <td><input id="${dat.id}-27" type="number" max="70" onchange="notas.cambios(${dat.id},27)"></td>
                                            <td><input id="${dat.id}-28" type="number" max="70" onchange="notas.cambios(${dat.id},28)"></td>
                                            <td><input id="${dat.id}-29" type="number" max="70"  onchange="notas.cambios(${dat.id},29)"></td>
                                            <td><input id="${dat.id}-30" type="number" max="70" onchange="notas.cambios(${dat.id},30)"></td>
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p3">
                                            <option value="100">100%</option>
                                            </select></td>
                                            <td>A</td>
        
                                            <td>-</td>
        
                                        </tr>
                                
                                `
                            }
                        }

                    })}`

                }else if(this.configuraciones.divisionyear==2){

                    if(this.notas.length==0){ //SI NO HAY NINGUNA NOTA, SE MUESTRAN TODAS VACIAS
                        if(x==1){
                            return `
                                    <tr>
                                        <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                       
    
                                        <td><input id="${dat.id}-1" type="number" max="70"  onchange="notas.cambios(${dat.id},1,0)"></td>
                                        <td><input id="${dat.id}-2" type="number" max="70" onchange="notas.cambios(${dat.id},2,0)"></td>
                                        <td><input id="${dat.id}-3" type="number" max="70"  onchange="notas.cambios(${dat.id},3,0)"></td>
                                        <td><input id="${dat.id}-4" type="number" max="70"  onchange="notas.cambios(${dat.id},4,0)"></td>
                                        <td><input id="${dat.id}-5" type="number" max="70" onchange="notas.cambios(${dat.id},5,0)"></td>
                                        <td><input id="${dat.id}-6" type="number" max="70"  onchange="notas.cambios(${dat.id},6,0)"></td>
                                        <td><input id="${dat.id}-7" type="number" max="70" onchange="notas.cambios(${dat.id},7,0)"></td>
                                        <td><input id="${dat.id}-8" type="number"max="70"  onchange="notas.cambios(${dat.id},8,0)"></td>
                                        <td><input id="${dat.id}-9" type="number" max="70"  onchange="notas.cambios(${dat.id},9,0)"></td>
                                        <td><input id="${dat.id}-10" type="number"max="70"  onchange="notas.cambios(${dat.id},10,0)"></td>
                                        <td><input id="${dat.id}-11" type="number" max="70"  onchange="notas.cambios(${dat.id},11)"></td>
                                        <td><input id="${dat.id}-12" type="number" max="70" onchange="notas.cambios(${dat.id},12)"></td>
                                        <td><input id="${dat.id}-13" type="number" max="70"  onchange="notas.cambios(${dat.id},13)"></td>
                                        <td><input id="${dat.id}-14" type="number" max="70"  onchange="notas.cambios(${dat.id},14)"></td>
                                        <td><input id="${dat.id}-15" type="number"max="70"  onchange="notas.cambios(${dat.id},15)"></td>

                                        <td>-</td>
                                        <td><select id="${dat.id}-p1">
                                        <option value="100">100%</option>
                                        </select></td>
                                        <td>A</td>
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p2">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
                                        <td>-</td>
                                    </tr>
                            `
                        }else if(x==2){
                            return `
                                    <tr>
                                        <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                        
    
                                        <td>-</td>
                                        <td><select id="${dat.id}-p1">
                                        <option value="100">100%</option>
                                        </select></td>
                                        
    

                                        <td><input id="${dat.id}-16" type="number" max="70"  onchange="notas.cambios(${dat.id},16)"></td>
                                        <td><input id="${dat.id}-17" type="number" max="70" onchange="notas.cambios(${dat.id},17)"></td>
                                        <td><input id="${dat.id}-18" type="number" max="70" onchange="notas.cambios(${dat.id},18)"></td>
                                        <td><input id="${dat.id}-19" type="number" max="70"  onchange="notas.cambios(${dat.id},19)"></td>
                                        <td><input id="${dat.id}-20" type="number"max="70"  onchange="notas.cambios(${dat.id},20)"></td>
                                        <td><input id="${dat.id}-21" type="number" max="70"  onchange="notas.cambios(${dat.id},21)"></td>
                                        <td><input id="${dat.id}-22" type="number" max="70" onchange="notas.cambios(${dat.id},22)"></td>
                                        <td><input id="${dat.id}-23" type="number" max="70"  onchange="notas.cambios(${dat.id},23)"></td>
                                        <td><input id="${dat.id}-24" type="number" max="70"  onchange="notas.cambios(${dat.id},24)"></td>
                                        <td><input id="${dat.id}-25" type="number" max="70" onchange="notas.cambios(${dat.id},25)"></td>
                                        <td><input id="${dat.id}-26" type="number" max="70"  onchange="notas.cambios(${dat.id},26)"></td>
                                        <td><input id="${dat.id}-27" type="number" max="70" onchange="notas.cambios(${dat.id},27)"></td>
                                        <td><input id="${dat.id}-28" type="number" max="70" onchange="notas.cambios(${dat.id},28)"></td>
                                        <td><input id="${dat.id}-29" type="number" max="70"  onchange="notas.cambios(${dat.id},29)"></td>
                                        <td><input id="${dat.id}-30" type="number" max="70" onchange="notas.cambios(${dat.id},30)"></td>

                                        <td>-</td>
                                        <td><select id="${dat.id}-p2">
                                        <option value="100">100%</option>
                                        </select></td>
                                        <td>A</td>
    
                                        <td>-</td>
                                    </tr>
                            
                            `
                        }

                    }
                    
                    return `${this.notas.map((notas,index)=>{

                        if(notas.idalumno==dat.id){ //ENCUENTRA LAS NOTAS DEL ALUMNO Y LAS MUESTRA
                            encontrado=true
                            if(x==1){
                                return `
                                <tr>
                                    <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                    

                                    <td><input id="${dat.id}-1" type="number"max="70"   onchange="notas.cambios(${dat.id},1,${notas.id})" ${this.comprobarrojo(notas.n1)}></td>
                                    <td><input id="${dat.id}-2" type="number"max="70"  onchange="notas.cambios(${dat.id},2,${notas.id})" ${this.comprobarrojo(notas.n2)}></td>
                                    <td><input id="${dat.id}-3" type="number"max="70"   onchange="notas.cambios(${dat.id},3,${notas.id})" ${this.comprobarrojo(notas.n3)}></td>
                                    <td><input id="${dat.id}-4" type="number"max="70"   onchange="notas.cambios(${dat.id},4,${notas.id})" ${this.comprobarrojo(notas.n4)}></td>
                                    <td><input id="${dat.id}-5" type="number"max="70"  onchange="notas.cambios(${dat.id},5,${notas.id})" ${this.comprobarrojo(notas.n5)}></td>
                                    <td><input id="${dat.id}-6" type="number"max="70"   onchange="notas.cambios(${dat.id},6,${notas.id})" ${this.comprobarrojo(notas.n6)}></td>
                                    <td><input id="${dat.id}-7" type="number" max="70" onchange="notas.cambios(${dat.id},7,${notas.id})" ${this.comprobarrojo(notas.n7)}></td>
                                    <td><input id="${dat.id}-8" type="number" max="70"  onchange="notas.cambios(${dat.id},8,${notas.id})" ${this.comprobarrojo(notas.n8)}></td>
                                    <td><input id="${dat.id}-9" type="number"max="70"  onchange="notas.cambios(${dat.id},9,${notas.id})" ${this.comprobarrojo(notas.n9)}></td>
                                    <td><input id="${dat.id}-10" type="number" max="70"  onchange="notas.cambios(${dat.id},10,${notas.id})" ${this.comprobarrojo(notas.n10)}></td>
                                    <td><input id="${dat.id}-11" type="number"max="70"   onchange="notas.cambios(${dat.id},11,${notas.id})" ${this.comprobarrojo(notas.n11)}></td>
                                    <td><input id="${dat.id}-12" type="number"max="70"  onchange="notas.cambios(${dat.id},12,${notas.id})" ${this.comprobarrojo(notas.n12)}></td>
                                    <td><input id="${dat.id}-13" type="number" max="70"  onchange="notas.cambios(${dat.id},13,${notas.id})" ${this.comprobarrojo(notas.n13)}></td>
                                    <td><input id="${dat.id}-14" type="number" max="70"  onchange="notas.cambios(${dat.id},14,${notas.id})" ${this.comprobarrojo(notas.n14)}></td>
                                    <td><input id="${dat.id}-15" type="number"max="70"  onchange="notas.cambios(${dat.id},15,${notas.id})" ${this.comprobarrojo(notas.n15)}></td>

                                    <td>${this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)}</td>

                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>
                                    <td>A</td>

                                    <td>${this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)}</td>

                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>
                                    
                                    <td>${((this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)+this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)+this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30))/3).toFixed(1)}</td>
                                    

                                </tr>`
                            }else if(x==2){
                                return `
                                <tr>
                                    <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                    


                                    <td>${this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)}</td>

                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>


                                    <td><input id="${dat.id}-16" type="number" max="70"  onchange="notas.cambios(${dat.id},16,${notas.id})" ${this.comprobarrojo(notas.n16)}></td>
                                    <td><input id="${dat.id}-17" type="number" max="70" onchange="notas.cambios(${dat.id},17,${notas.id})" ${this.comprobarrojo(notas.n17)}></td>
                                    <td><input id="${dat.id}-18" type="number" max="70"  onchange="notas.cambios(${dat.id},18,${notas.id})" ${this.comprobarrojo(notas.n18)}></td>
                                    <td><input id="${dat.id}-19" type="number"max="70"  onchange="notas.cambios(${dat.id},19,${notas.id})" ${this.comprobarrojo(notas.n19)}></td>
                                    <td><input id="${dat.id}-20" type="number" max="70"  onchange="notas.cambios(${dat.id},20,${notas.id})" ${this.comprobarrojo(notas.n20)}></td>
                                    <td><input id="${dat.id}-21" type="number" max="70"  onchange="notas.cambios(${dat.id},21,${notas.id})" ${this.comprobarrojo(notas.n21)}></td>
                                    <td><input id="${dat.id}-22" type="number"max="70"  onchange="notas.cambios(${dat.id},22,${notas.id})" ${this.comprobarrojo(notas.n22)}></td>
                                    <td><input id="${dat.id}-23" type="number" max="70"  onchange="notas.cambios(${dat.id},23,${notas.id})" ${this.comprobarrojo(notas.n23)}></td>
                                    <td><input id="${dat.id}-24" type="number" max="70"  onchange="notas.cambios(${dat.id},24,${notas.id})" ${this.comprobarrojo(notas.n24)}></td>
                                    <td><input id="${dat.id}-25" type="number" max="70" onchange="notas.cambios(${dat.id},25,${notas.id})" ${this.comprobarrojo(notas.n25)}></td>
                                    <td><input id="${dat.id}-26" type="number"max="70"   onchange="notas.cambios(${dat.id},26,${notas.id})" ${this.comprobarrojo(notas.n26)}></td>
                                    <td><input id="${dat.id}-27" type="number"max="70"  onchange="notas.cambios(${dat.id},27,${notas.id})" ${this.comprobarrojo(notas.n27)}></td>
                                    <td><input id="${dat.id}-28" type="number" max="70"  onchange="notas.cambios(${dat.id},28,${notas.id})" ${this.comprobarrojo(notas.n28)}></td>
                                    <td><input id="${dat.id}-29" type="number"max="70"  onchange="notas.cambios(${dat.id},29,${notas.id})" ${this.comprobarrojo(notas.n29)}></td>
                                    <td><input id="${dat.id}-30" type="number" max="70"  onchange="notas.cambios(${dat.id},30,${notas.id})" ${this.comprobarrojo(notas.n30)}></td>
                                    
                                    <td>${this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)}</td>

                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>
                                    <td>A</td>
                                    
                                    <td>${((this.calcularpromediotrimestre(notas.n1,notas.n2,notas.n3,notas.n4,notas.n5,notas.n6,notas.n7,notas.n8,notas.n9,notas.n10)+this.calcularpromediotrimestre(notas.n11,notas.n12,notas.n13,notas.n14,notas.n15,notas.n16,notas.n17,notas.n18,notas.n19,notas.n20)+this.calcularpromediotrimestre(notas.n21,notas.n22,notas.n23,notas.n24,notas.n25,notas.n26,notas.n27,notas.n28,notas.n29,notas.n30))/3).toFixed(1)}</td>
                                </tr>`
                            }
                            
                        }
                        if(index==this.notas.length-1 && encontrado==false){//SI NO ENCUENTRA NINGUNA COINCIDENCIA EN EL MAP DE LAS NOTAS, POR DEFECTO MOSTRARA ESTAS NOTAS VACIAS
                            if(x==1){
                                return `
                                        <tr>
                                            <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                            
        
                                            <td><input id="${dat.id}-1" type="number" max="70"  onchange="notas.cambios(${dat.id},1,0)"></td>
                                            <td><input id="${dat.id}-2" type="number" max="70" onchange="notas.cambios(${dat.id},2,0)"></td>
                                            <td><input id="${dat.id}-3" type="number" max="70"  onchange="notas.cambios(${dat.id},3,0)"></td>
                                            <td><input id="${dat.id}-4" type="number" max="70"  onchange="notas.cambios(${dat.id},4,0)"></td>
                                            <td><input id="${dat.id}-5" type="number" max="70" onchange="notas.cambios(${dat.id},5,0)"></td>
                                            <td><input id="${dat.id}-6" type="number" max="70"  onchange="notas.cambios(${dat.id},6,0)"></td>
                                            <td><input id="${dat.id}-7" type="number" max="70" onchange="notas.cambios(${dat.id},7,0)"></td>
                                            <td><input id="${dat.id}-8" type="number"max="70"  onchange="notas.cambios(${dat.id},8,0)"></td>
                                            <td><input id="${dat.id}-9" type="number" max="70"  onchange="notas.cambios(${dat.id},9,0)"></td>
                                            <td><input id="${dat.id}-10" type="number"max="70"  onchange="notas.cambios(${dat.id},10,0)"></td>
                                            <td><input id="${dat.id}-11" type="number" max="70"  onchange="notas.cambios(${dat.id},11)"></td>
                                            <td><input id="${dat.id}-12" type="number" max="70" onchange="notas.cambios(${dat.id},12)"></td>
                                            <td><input id="${dat.id}-13" type="number" max="70"  onchange="notas.cambios(${dat.id},13)"></td>
                                            <td><input id="${dat.id}-14" type="number" max="70"  onchange="notas.cambios(${dat.id},14)"></td>
                                            <td><input id="${dat.id}-15" type="number"max="70"  onchange="notas.cambios(${dat.id},15)"></td>

                                            <td>-</td>
                                            <td><select id="${dat.id}-p1">
                                            <option value="100">100%</option>
                                            </select></td>
                                            <td>A</td>
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p2">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
                                            
                                            <td>-</td>
                                        </tr>
                                `
                            }else if(x==2){
                                return `
                                        <tr>
                                            <td>${dat.nombrealumno.replaceAll("-","")} ${dat.apellidopaterno.replaceAll("-","")}</td>
                                            
        
                                            <td>-</td>
                                            <td><select id="${dat.id}-p1">
                                            <option value="100">100%</option>
                                            </select></td>
                                            
    
                                            <td><input id="${dat.id}-16" type="number" max="70"  onchange="notas.cambios(${dat.id},16)"></td>
                                            <td><input id="${dat.id}-17" type="number" max="70" onchange="notas.cambios(${dat.id},17)"></td>
                                            <td><input id="${dat.id}-18" type="number" max="70" onchange="notas.cambios(${dat.id},18)"></td>
                                            <td><input id="${dat.id}-19" type="number" max="70"  onchange="notas.cambios(${dat.id},19)"></td>
                                            <td><input id="${dat.id}-20" type="number"max="70"  onchange="notas.cambios(${dat.id},20)"></td>
                                            <td><input id="${dat.id}-21" type="number" max="70"  onchange="notas.cambios(${dat.id},21)"></td>
                                            <td><input id="${dat.id}-22" type="number" max="70" onchange="notas.cambios(${dat.id},22)"></td>
                                            <td><input id="${dat.id}-23" type="number" max="70"  onchange="notas.cambios(${dat.id},23)"></td>
                                            <td><input id="${dat.id}-24" type="number" max="70"  onchange="notas.cambios(${dat.id},24)"></td>
                                            <td><input id="${dat.id}-25" type="number" max="70" onchange="notas.cambios(${dat.id},25)"></td>
                                            <td><input id="${dat.id}-26" type="number" max="70"  onchange="notas.cambios(${dat.id},26)"></td>
                                            <td><input id="${dat.id}-27" type="number" max="70" onchange="notas.cambios(${dat.id},27)"></td>
                                            <td><input id="${dat.id}-28" type="number" max="70" onchange="notas.cambios(${dat.id},28)"></td>
                                            <td><input id="${dat.id}-29" type="number" max="70"  onchange="notas.cambios(${dat.id},29)"></td>
                                            <td><input id="${dat.id}-30" type="number" max="70" onchange="notas.cambios(${dat.id},30)"></td>

                                            <td>-</td>
                                            <td><select id="${dat.id}-p2">
                                            <option value="100">100%</option>
                                            </select></td>
                                            <td>A</td>
                                            
                                            <td>-</td>
                                        </tr>
                                
                                `
                            }
                        }

                    })}`

                }
        })}
        
        `

        $("#Tabla").html(html3)
    }

    agregarindicador(x){
        $(`#${x}-indi`).val($(`#${x}-indi`).val().toUpperCase())
        this.indicadores.push({id:x,valor:$(`#${x}-indi`).val().toUpperCase()})
    }
    cambios(x,z,n){
        let p1=-1,p2=-1,p3=-1,p4=-1
        let n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20,n21,n22,n23,n24,n25,n26,n27,n28,n29,n30
        
        console.log($(`#${x}-${z}`).val())
        if(n==undefined){
            n=0
        }
        
        if($(`#${x}-${z}`).val()<=9 && $(`#${x}-${z}`).val()!=0){
            Swal.fire({
                icon: 'error',
                title: 'El valor tiene que ser mayor o igual a 10',
                text: 'Para borrar la nota debe poner un 0 o dejar en blanco',
                })
                $(`#${x}-${z}`).val("")
            return
        }else if($(`#${x}-${z}`).val()>71){
            Swal.fire({
                icon: 'error',
                title: 'El valor tiene que ser menor o igual a 70',
                text: 'Para borrar la nota debe poner un 0 o dejar en blanco',
                })
                $(`#${x}-${z}`).val("")
            return
        }

        if($(`#${x}-p1`).val()==undefined || $(`#${x}-p1`).val()==null){
            
        }else{
            p1=$(`#${x}-p1`).val()
        }
        if($(`#${x}-p2`).val()==undefined || $(`#${x}-p2`).val()==null){
            
        }else{
            p2=$(`#${x}-p2`).val()
        }
        if($(`#${x}-p3`).val()==undefined || $(`#${x}-p3`).val()==null){
            
        }else{
            p3=$(`#${x}-p3`).val()
        }
        if($(`#${x}-p4`).val()==undefined || $(`#${x}-p4`).val()==null){
            
        }else{
            p4=$(`#${x}-p4`).val()
        }


        
        if($(`#${x}-1`).val()==undefined || $(`#${x}-1`).val()==null){
            n1=-1
        }else{
            n1=$(`#${x}-1`).val()
        }

        if($(`#${x}-2`).val()==undefined || $(`#${x}-2`).val()==null){
            n2=-1
        }else{
            n2=$(`#${x}-2`).val()
        }
        if($(`#${x}-3`).val()==undefined || $(`#${x}-3`).val()==null){
            n3=-1
        }else{
            n3=$(`#${x}-3`).val()
        }
        if($(`#${x}-4`).val()==undefined || $(`#${x}-4`).val()==null){
            n4=-1
        }else{
            n4=$(`#${x}-4`).val()
        }
        if($(`#${x}-5`).val()==undefined || $(`#${x}-5`).val()==null){
            n5=-1
        }else{
            n5=$(`#${x}-5`).val()
        }
        if($(`#${x}-6`).val()==undefined || $(`#${x}-6`).val()==null){
            n6=-1
        }else{
            n6=$(`#${x}-6`).val()
        }
        if($(`#${x}-7`).val()==undefined || $(`#${x}-7`).val()==null){
            n7=-1
        }else{
            n7=$(`#${x}-7`).val()
        }
        if($(`#${x}-8`).val()==undefined || $(`#${x}-8`).val()==null){
            n8=-1
        }else{
            n8=$(`#${x}-8`).val()
        }
        if($(`#${x}-9`).val()==undefined || $(`#${x}-9`).val()==null){
            n9=-1
        }else{
            n9=$(`#${x}-9`).val()
        }
        if($(`#${x}-10`).val()==undefined || $(`#${x}-10`).val()==null){
            n10=-1
        }else{
            n10=$(`#${x}-10`).val()
        }
        if($(`#${x}-11`).val()==undefined || $(`#${x}-11`).val()==null){
            n11=-1
        }else{
            n11=$(`#${x}-11`).val()
        }
        if($(`#${x}-12`).val()==undefined || $(`#${x}-12`).val()==null){
            n12=-1
        }else{
            n12=$(`#${x}-12`).val()
        }
        if($(`#${x}-13`).val()==undefined || $(`#${x}-13`).val()==null){
            n13=-1
        }else{
            n13=$(`#${x}-13`).val()
        }
        if($(`#${x}-14`).val()==undefined || $(`#${x}-14`).val()==null){
            n14=-1
        }else{
            n14=$(`#${x}-14`).val()
        }
        if($(`#${x}-15`).val()==undefined || $(`#${x}-15`).val()==null){
            n15=-1
        }else{
            n15=$(`#${x}-15`).val()
        }
        if($(`#${x}-16`).val()==undefined || $(`#${x}-16`).val()==null){
            n16=-1
        }else{
            n16=$(`#${x}-16`).val()
        }
        if($(`#${x}-17`).val()==undefined || $(`#${x}-17`).val()==null){
            n17=-1
        }else{
            n17=$(`#${x}-17`).val()
        }
        if($(`#${x}-18`).val()==undefined || $(`#${x}-18`).val()==null){
            n18=-1
        }else{
            n18=$(`#${x}-18`).val()
        }
        if($(`#${x}-19`).val()==undefined || $(`#${x}-19`).val()==null){
            n19=-1
        }else{
            n19=$(`#${x}-19`).val()
        }
        if($(`#${x}-20`).val()==undefined || $(`#${x}-20`).val()==null){
            n20=-1
        }else{
            n20=$(`#${x}-20`).val()
        }
        if($(`#${x}-21`).val()==undefined || $(`#${x}-21`).val()==null){
            n21=-1
        }else{
            n21=$(`#${x}-21`).val()
        }
        if($(`#${x}-22`).val()==undefined || $(`#${x}-22`).val()==null){
            n22=-1
        }else{
            n22=$(`#${x}-22`).val()
        }
        if($(`#${x}-23`).val()==undefined || $(`#${x}-23`).val()==null){
            n23=-1
        }else{
            n23=$(`#${x}-23`).val()
        }
        if($(`#${x}-24`).val()==undefined || $(`#${x}-24`).val()==null){
            n24=-1
        }else{
            n24=$(`#${x}-24`).val()
        }
        if($(`#${x}-25`).val()==undefined || $(`#${x}-25`).val()==null){
            n25=-1
        }else{
            n25=$(`#${x}-25`).val()
        }
        if($(`#${x}-26`).val()==undefined || $(`#${x}-26`).val()==null){
            n26=-1
        }else{
            n26=$(`#${x}-26`).val()
        }
        if($(`#${x}-27`).val()==undefined || $(`#${x}-27`).val()==null){
            n27=-1
        }else{
            n27=$(`#${x}-27`).val()
        }
        if($(`#${x}-28`).val()==undefined || $(`#${x}-28`).val()==null){
            n28=-1
        }else{
            n28=$(`#${x}-28`).val()
        }
        if($(`#${x}-29`).val()==undefined || $(`#${x}-29`).val()==null){
            n29=-1
        }else{
            n29=$(`#${x}-29`).val()
        }
        if($(`#${x}-30`).val()==undefined || $(`#${x}-30`).val()==null){
            n30=-1
        }else{
            n30=$(`#${x}-30`).val()
        }
        
        
        
            this.alumnoscambios[x]=({
                idalumno:x,
                idnota:n,
                p1:p1,
                p2:p2,
                p3:p3,
                p4:p4,

                

                n1:n1,
                n2:n2,
                n3:n3,
                n4:n4,
                n5:n5,
                n6:n6,
                n7:n7,
                n8:n8,
                n9:n9,
                n10:n10,
                n11:n11,
                n12:n12,
                n13:n13,
                n14:n14,
                n15:n15,
                n16:n16,
                n17:n17,
                n18:n18,
                n19:n19,
                n20:n20,
                n21:n21,
                n22:n22,
                n23:n23,
                n24:n24,
                n25:n25,
                n26:n26,
                n27:n27,
                n28:n28,
                n29:n29,
                n30:n30
            
            })
        
        
        
            $(`#${x}-${z}`).addClass("Cambiado")
            if($(`#${x}-${z}`).val()==""){
                $(`#${x}-${z}`).removeClass("Cambiado") 
            }
        
        
        console.log(this.alumnoscambios)
    }
    
    crearnotasdefinitivas(){
        
            $("#Cargando").show()
            console.log(notas.alumnoscambios)
            $.ajax({
                    url: '/crearnotasalumno',
                    type: 'POST',
                    data: {
                        
                        idasignatura : $("#Asignaturas").val(),
                        test: JSON.stringify(notas.alumnoscambios)
                    },
                    headers: {
                        'X-CSRFToken': TOKEN
                    },
                    success: function (datinis) {
                        console.log(datinis)
                        notas.cargardatosasignaturas()
                        
                       
                    },
                    error: function (data) {
                       
                    }
                });
        
    }

    comprobarrojo(x){

        if(x<=39 && x>=1){
            return `value="${x}" class="rojo"`
        }else{
            return `value="${x}"`
        }
    }
    calcularpromediotrimestre(n1,n2,n3,n4,n5,n6,n7,n8,n9,n10){
        let div=0
        let sum=0
        
        if(n1>=1){
            sum+=parseInt(n1)
            div++
        }
        if(n2>=1){
            sum+=parseInt(n2)
            div++
        }
        if(n3>=1){
            sum+=parseInt(n3)
            div++
        }
        if(n4>=1){
            sum+=parseInt(n4)
            div++
        }
        if(n5>=1){
            sum+=parseInt(n5)
            div++
        }
        if(n6>=1){
            sum+=parseInt(n6)
            div++
        }
        if(n7>=1){
            sum+=parseInt(n7)
            div++
        }
        if(n8>=1){
            sum+=parseInt(n8)
            div++
        }
        if(n9>=1){
            sum+=parseInt(n9)
            div++
        }
        if(n10>=1){
            sum+=parseInt(n10)
            div++
        }

        if(sum==0){
            return 0
        }
        return Math.trunc(sum/div)
        
    }

    eliminarasistencia(x,i){
        if(confirm("¿Desea eliminar la asistencia?")){

        }else{
            return
        }
        $("#Cargando").show()
        $.ajax({
            url: '/eliminarasistencia',
            type: 'POST',
            data: {
                id : x,
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                notas.alumnos[i].dias1=data.dias1
                notas.alumnos[i].dias2=data.dias2
                notas.alumnos[i].dias3=data.dias3
                notas.cargarasistencia()
                
                
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    cargarasistencia(){
        $("#Cargando").show()
        let estupidolist=[]
        this.alumnos.forEach(dat=>{
            estupidolist.push(dat.id)
        })
        console.log(estupidolist)

        let dia=new Date($("#Fecha").val())
        dia.setDate(dia.getDate()+1)
        
        $.ajax({
            url: '/asistenciaporcurso',
            type: 'POST',
            data: {
                
                alumnos : JSON.stringify(estupidolist),
                mes: dia.getMonth()+1,
                dia: dia.getDate()
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                if(data=="feriado"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Dia feriado',
                        text: '',
                        })
                    $("#Fecha").val(notas.inputanterior)
                }else{
                    notas.asistencias=data
                    notas.mostrarasistencia()
                    notas.inputanterior=$("#Fecha").val()
                }
                
                
                $("#Cargando").hide()
                
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }

    cambiartextobotones(){
        if (parseInt($("#Hora").val().split(":")[0])>=9){
            $(".botonasistencia").html("Poner Atrasado")
            $(".botonasistencia").addClass("Atrasado")

        }else{
            $(".botonasistencia").html("Poner Presente")
            $(".botonasistencia").removeClass("Atrasado")
        }
    }
    mostrarasistencia(){
        let temp=""
        let cabezera=""
        let atrasado=false
        if (parseInt($("#Hora").val().split(":")[0])>=9){
            atrasado=true
        }
        if($(window).width()>=600){
            cabezera=`
            <tr>
                <th>Nombre</th>
                <th>T1</th>
                <th>T2</th>
                <th>T3</th>
                <th>Asistencia</th>
            </tr>
            `
        }else{
            cabezera=`<tr>
            <th>Nombre</th>
            <th>Asistencia</th>
            </tr>`
        }
        let html=`

            ${cabezera}

            ${this.alumnos.map((dat,index)=>{
                    if (atrasado==true){
                        temp=`<td><button class="BotonSmall botonasistencia Atrasado" onclick='notas.ponerpresente(${dat.id},${index})'>Poner Atrasado</button></td>`

                    }else{
                        temp=`<td><button class="BotonSmall botonasistencia" onclick='notas.ponerpresente(${dat.id},${index})'>Poner Presente</button></td>`

                    }
                    this.asistencias.forEach(asist=>{
                        if(asist.idalumno==dat.id){
                            
                            
                            console.log(asist.fecha.substring(11,13))
                            if(parseInt(asist.fecha.substring(11,13))>=9){
                                temp=`<td class='Atrasado'>Atrasado<div class="Oculto" onclick='notas.eliminarasistencia(${asist.id},${index})'><label>Eliminar Asistencia</label></div></td>`
                            }else{
                                temp=`<td class='Presente'>Presente<div class="Oculto" onclick='notas.eliminarasistencia(${asist.id},${index})'><label>Eliminar Asistencia</label></div></td>`
                            }
                            return
                        }

                    })
                    
                    if($(window).width()>=600){
                        return `
                        <tr>
                            
                            <td>${dat.apellidopaterno.replaceAll("-","")} ${dat.apellidomaterno.replaceAll("-","")} ${dat.nombrealumno.replaceAll("-","")}</td>
                            <td>${((dat.dias1/this.configuraciones.c1)*100).toFixed(1)}%</td>
                            <td>${((dat.dias2/this.configuraciones.c2)*100).toFixed(1)}%</td>
                            <td>${((dat.dias3/this.configuraciones.c3)*100).toFixed(1)}%</td>
                            ${temp}
                    </tr>`
                    }
                    return `<tr>
                        <td>${dat.apellidopaterno.replaceAll("-","")} ${dat.apellidomaterno.replaceAll("-","")} ${dat.nombrealumno.replaceAll("-","")}</td>
                        ${temp}
                    </tr>`

                
            })}
        `
        $("#Tabla").html(html)

    }
    ponerpresente(x,i){
        $("#Cargando").show()
        let dia=new Date($("#Fecha").val())
        dia.setDate(dia.getDate()+1)
        $.ajax({
            url: '/ponerpresente',
            type: 'POST',
            data: {
                
                idalumno : x,
                dia:dia.getDate(),
                mes:dia.getMonth()+1,
                year:dia.getFullYear(),
                horas: $("#Hora").val().split(":")[0],
                minutos: $("#Hora").val().split(":")[1]
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                $("#Cargando").hide()
                notas.alumnos[i].dias1=data.dias1
                notas.alumnos[i].dias2=data.dias2
                notas.alumnos[i].dias3=data.dias3
                notas.cargarasistencia()
            },
            error: function (data) {
                $("#Cargando").hide()
            }
        });
    }
    mostrarmenus(x){
        if($("#Cursos").val()==0){
            Swal.fire({
                icon: 'error',
                title: 'Debe seleccionar un curso',
                text: '',
                })
            return
        }
        $("#MenuSuperior").css("display","flex")
        $("#Asist").removeClass("MenuSeleccionado")
        $("#Notas").removeClass("MenuSeleccionado")
        if(x==1){
            $("#MenuSuperior").html(`
                <label>Fecha: </label>
                <input id="Fecha" type="date" onchange="notas.cargarasistencia()" value="${this.hoy.getFullYear()}-${this.agregar0xd(this.hoy.getMonth()+1)}-${this.agregar0xd(this.hoy.getDate())}">
                <label>Hora</label>
                <input id="Hora" type="time" value="07:59" onchange="notas.cambiartextobotones()">
                
            `)
            this.inputanterior=$("#Fecha").val()
            this.cargarasistencia()
            $("#Asist").addClass("MenuSeleccionado")
        }else{
            $("#MenuSuperior").html(`
            <h4>Asignatura</h4>
            <select id="Asignaturas" onchange="notas.cargardatosasignaturas()">
            <option value="0">Seleccione asignatura</option>
            ${this.asignaturas.map(dat=>{
                return`<option value="${dat.idasignatura.id}">${dat.idasignatura.nombre}</option>`
            })}
            </select>
            <button class="BotonSmall" onclick="notas.crearnotasdefinitivas()">Aplicar Notas</button>
            `)
            $("#Notas").addClass("MenuSeleccionado")
            $("#Tabla").html("")
        }
        


    }

    agregar0xd(x){
        if(x<=9){
            return "0"+x
        }else{
            return x
        }
    }

}