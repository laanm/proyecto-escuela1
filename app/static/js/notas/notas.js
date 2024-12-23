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

        
       
        this.cargarconfiguracion()
        this.cargarconfiguracion2()
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
        
    }
    cargarconfiguracion2(){
        $.ajax({
            url: '/api_rest/listado_alumnos_year',
            type: 'GET',
            data: {
               
                
            },
            headers: {
                'X-CSRFToken': TOKEN
            },
            success: function (data) {
                console.log(data)
                
                
                
            },
            error: function (data) {
               
            }
        });
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
                    notas.cargaralumnosporcurso()
                    
                    
                },
                error: function (data) {
                   
                }
            });
    }
    cargaralumnosporcurso(){
        
        
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
                    notas.mostrardatos()
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

    mostrardatos(){
        
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
                <th>Rut/IPA</th>
                
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
            cabezera=`
                <tr>
                    <th colspan="2"></th>
                    <th colspan="10" class="S1">T1</th>
                    <th colspan="10" class="S2">T2</th>
                    <th colspan="9" class="S3">T3</th>
                </tr>

                <tr>
                <th>Nombre</th>
                <th>Rut/IPE</th>
                <th class="S1">N1</th>
                <th class="S1">N2</th>
                <th class="S1">N3</th>
                <th class="S1">N4</th>
                <th class="S1">N5</th>
                <th class="S1">N6</th>
                <th class="S1">N7</th>
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
                <th class="S2">P</th>
                <th class="S2">%</th>
                <th class="S2">Letra</th>

                <th class="S3">N1</th>
                <th class="S3">N2</th>
                <th class="S3">N3</th>
                <th class="S3">N4</th>
                <th class="S3">N5</th>
                <th class="S3">N6</th>
                <th class="S3">P</th>
                <th class="S3">%</th>
                <th class="S3">Letra</th>

                
            </tr>
            `
        }else if(this.configuraciones.divisionyear==4){
            cabezera=`
                <tr>
                    <th colspan="2"></th>
                    <th colspan="8" class="S1">Q1</th>
                    <th colspan="8" class="S2">Q2</th>
                    <th colspan="8" class="S3">Q3</th>
                    <th colspan="8" class="S4">Q4</th>
                </tr>

                <tr>
                <th>Nombre</th>
                <th>Rut/IPA</th>

                <th class="S1">N1</th>
                <th class="S1">N2</th>
                <th class="S1">N3</th>
                <th class="S1">N4</th>
                <th class="S1">N5</th>
                <th class="S1">P</th>
                <th class="S1">%</th>
                <th class="S1">Letra</th>

                <th class="S2">N1</th>
                <th class="S2">N2</th>
                <th class="S2">N3</th>
                <th class="S2">N4</th>
                <th class="S2">N5</th>
                <th class="S2">P</th>
                <th class="S2">%</th>
                <th class="S2">Letra</th>

                <th class="S3">N1</th>
                <th class="S3">N2</th>
                <th class="S3">N3</th>
                <th class="S3">N4</th>
                <th class="S3">N5</th>
                <th class="S3">P</th>
                <th class="S3">%</th>
                <th class="S3">Letra</th>

                <th class="S4">N1</th>
                <th class="S4">N2</th>
                <th class="S4">N3</th>
                <th class="S4">N4</th>
                <th class="S4">N5</th>
                <th class="S4">P</th>
                <th class="S4">%</th>
                <th class="S4">Letra</th>
                

                
            </tr>
            `
        }

        let div=0
        let sum=0
        let prom1=""
        let prom2=""
        let prom3=""
        let prom4=""

        let temp1=""
        let temp2=""
        let temp3=""
        let temp4=""

        let html3=`
            
                ${cabezera}
            
            

            ${this.alumnos.map(dat=>{
                if(this.configuraciones.divisionyear==2){
                if(this.notas.length==0){
                    return  `<tr>
                                <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                                <td>${dat.rut}${dat.ipe}</td>
                
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1)"></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2)"></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3)"></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4)"></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5)"></td>
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6)"></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7)"></td>
                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8)"></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9)"></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p1">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>
                                    
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11)"></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12)"></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13)"></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14)"></td>
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15)"></td>
                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16")></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17)"></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18)"></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19)"></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p2">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>

                                    
                            </tr>`
                }
                
                temp=false
                return `${this.notas.map((notas,index)=>{
                    
                    if(dat.id==notas.idalumno){
                        console.log("oMG")
                        temp=true
                        
                        
                        
                             if(notas.n1>=1){
                                div++
                                
                                sum+=parseInt(notas.n1)
                             }
                             if(notas.n2>=1){
                                div++
                                sum+=parseInt(notas.n2)
                             }
                             if(notas.n3>=1){
                                div++
                                sum+=parseInt(notas.n3)
                             }
                             if(notas.n4>=1){
                                div++
                                sum+=parseInt(notas.n4)
                             }
                             if(notas.n5>=1){
                                div++
                                sum+=parseInt(notas.n5)
                             }
                             if(notas.n6>=1){
                                div++
                                sum+=parseInt(notas.n6)
                             }
                             if(notas.n7>=1){
                                div++
                                sum+=parseInt(notas.n7)
                             }
                             if(notas.n8>=1){
                                div++
                                sum+=parseInt(notas.n8)
                             }
                             if(notas.n9>=1){
                                div++
                                sum+=parseInt(notas.n9)
                             }
                             if(notas.n10>=1){
                                div++
                                sum+=parseInt(notas.n10)
                             }
                                prom1=`<td>${Math.trunc(sum/div)}</th>`
                                                            if(div==0){
                                                                prom1=`<td>-</th>`
                                                            }
                                                            sum=0
                                                            div=0

                             if(notas.n11>=1){
                                div++
                               
                                sum+=parseInt(notas.n11)
                             }
                             if(notas.n12>=1){
                                div++
                                
                                sum+=parseInt(notas.n12)
                             }
                             if(notas.n13>=1){
                                div++
                                
                                sum+=parseInt(notas.n13)
                             }
                             if(notas.n14>=1){
                                div++
                                
                                sum+=parseInt(notas.n14)
                             }
                             if(notas.n15>=1){
                                div++
                                
                                sum+=parseInt(notas.n15)
                             }

                            if(notas.n16>=1){
                                div++
                                sum+=parseInt(notas.n16)
                             }
                             if(notas.n17>=1){
                                div++
                                sum+=parseInt(notas.n17)
                             }
                             if(notas.n18>=1){
                                div++
                                sum+=parseInt(notas.n18)
                             }
                             if(notas.n19>=1){
                                div++
                                sum+=parseInt(notas.n19)
                             }
                             if(notas.n20>=1){
                                div++
                                sum+=parseInt(notas.n20)
                             }
                             
                            console.log(sum,div)
                            prom2=`<td>${Math.trunc(sum/div)}</th>`
                            if(div==0){
                                prom2=`<td>-</th>`
                            }
                            sum=0
                            div=0
                            
                            return  `<tr>
                            <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                            <td>${dat.rut}${dat.ipe}</td>
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1,${notas.id})" ${this.comprobarrojo(notas.n1)}></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2,${notas.id})" ${this.comprobarrojo(notas.n2)}></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3,${notas.id})" ${this.comprobarrojo(notas.n3)}></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4,${notas.id})" ${this.comprobarrojo(notas.n4)}></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5,${notas.id})" ${this.comprobarrojo(notas.n5)}></td>
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6,${notas.id})" ${this.comprobarrojo(notas.n6)}></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7,${notas.id})" ${this.comprobarrojo(notas.n7)}></td>
                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8,${notas.id})" ${this.comprobarrojo(notas.n8)}></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9,${notas.id})" ${this.comprobarrojo(notas.n9)}></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10,${notas.id})" ${this.comprobarrojo(notas.n10)}></td>
                                    ${prom1}
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},${this.asignatura},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>
                                    <td>A</td>
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11,${notas.id})" ${this.comprobarrojo(notas.n11)}></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12,${notas.id})" ${this.comprobarrojo(notas.n12)}></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13,${notas.id})" ${this.comprobarrojo(notas.n13)}></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14,${notas.id})" ${this.comprobarrojo(notas.n14)}></td>
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15,${notas.id})" ${this.comprobarrojo(notas.n15)}></td>
                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16,${notas.id}) ${this.comprobarrojo(notas.n16)}></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17,${notas.id})" ${this.comprobarrojo(notas.n17)}></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18,${notas.id})" ${this.comprobarrojo(notas.n18)}></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19,${notas.id})" ${this.comprobarrojo(notas.n19)}></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20,${notas.id})" ${this.comprobarrojo(notas.n20)}></td>
                                    ${prom2}
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},${this.asignatura},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>

                            </tr>`
                        }
                        
                    
                    if(this.notas.length==index+1 && temp==false){
                        return  `<tr>
                            <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                            <td>${dat.rut}${dat.ipe}</td>
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1)"></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2)"></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3)"></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4)"></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5)"></td>
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6)"></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7)"></td>
                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8)"></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9)"></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10)"></td>
                                    <td>-</td>
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},${this.asignatura},'p1')">${porcentajes}</select></td>
                                    <td>A</td>
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11)"></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12)"></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13)"></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14)"></td>
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15)"></td>
                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16")></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17)"></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18)"></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19)"></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20)"></td>
                                    <td>-</td>
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},${this.asignatura},'p2')">${porcentajes}</select></td>
                                    <td>A</td>
                            </tr>`
                    }
                })}`
                
                
                
                
            }else if(this.configuraciones.divisionyear==3){
                if(this.notas.length==0){
                    return  `<tr>
                                <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                                <td>${dat.rut}${dat.ipe}</td>
                
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1)"></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2)"></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3)"></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4)"></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5)"></td>
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6)"></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7)"></td>
                                    <td>-</td>
                                    <td><select id="${dat.id}-p1">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8)"></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9)"></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10)"></td>
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11)"></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12)"></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13)"></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14)"></td>
                                    <td>-</td>
                                    <td><select id="${dat.id}-p2">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15)"></td>
                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16")></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17)"></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18)"></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19)"></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20)"></td>
                                    <td>-</td>
                                    <td><select id="${dat.id}-p3">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>

                            </tr>`
                }
                
                temp=false
                return `${this.notas.map((notas,index)=>{
                    
                    if(dat.id==notas.idalumno){
                        console.log("oMG")
                        temp=true
                        
                        
                        
                             if(notas.n1>=1){
                                div++
                                
                                sum+=parseInt(notas.n1)
                             }
                             if(notas.n2>=1){
                                div++
                                sum+=parseInt(notas.n2)
                             }
                             if(notas.n3>=1){
                                div++
                                sum+=parseInt(notas.n3)
                             }
                             if(notas.n4>=1){
                                div++
                                sum+=parseInt(notas.n4)
                             }
                             if(notas.n5>=1){
                                div++
                                sum+=parseInt(notas.n5)
                             }
                             if(notas.n6>=1){
                                div++
                                sum+=parseInt(notas.n6)
                             }
                             if(notas.n7>=1){
                                div++
                                sum+=parseInt(notas.n7)
                             }
                             prom1=`<td>${Math.trunc(sum/div)}</th>`
                                                            if(div==0){
                                                                prom1=`<td>-</th>`
                                                            }
                                                            sum=0
                                                            div=0
                             if(notas.n8>=1){
                                div++
                                sum+=parseInt(notas.n8)
                             }
                             if(notas.n9>=1){
                                div++
                                sum+=parseInt(notas.n9)
                             }
                             if(notas.n10>=1){
                                div++
                                sum+=parseInt(notas.n10)
                             }
                                
                             if(notas.n11>=1){
                                div++
                               
                                sum+=parseInt(notas.n11)
                             }
                             if(notas.n12>=1){
                                div++
                                
                                sum+=parseInt(notas.n12)
                             }
                             if(notas.n13>=1){
                                div++
                                
                                sum+=parseInt(notas.n13)
                             }
                             if(notas.n14>=1){
                                div++
                                
                                sum+=parseInt(notas.n14)
                             }

                            console.log(sum,div)
                            prom2=`<td>${Math.trunc(sum/div)}</th>`
                            if(div==0){
                                prom2=`<td>-</th>`
                            }
                            sum=0
                            div=0
                             if(notas.n15>=1){
                                div++
                                
                                sum+=parseInt(notas.n15)
                             }

                            if(notas.n16>=1){
                                div++
                                sum+=parseInt(notas.n16)
                             }
                             if(notas.n17>=1){
                                div++
                                sum+=parseInt(notas.n17)
                             }
                             if(notas.n18>=1){
                                div++
                                sum+=parseInt(notas.n18)
                             }
                             if(notas.n19>=1){
                                div++
                                sum+=parseInt(notas.n19)
                             }
                             if(notas.n20>=1){
                                div++
                                sum+=parseInt(notas.n20)
                             }
                             
                             console.log(sum,div)
                             prom3=`<td>${Math.trunc(sum/div)}</th>`
                             if(div==0){
                                 prom3=`<td>-</th>`
                             }
                             sum=0
                             div=0
                            
                            return  `<tr>
                            <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                            <td>${dat.rut}${dat.ipe}</td>
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1,${notas.id})" ${this.comprobarrojo(notas.n1)}></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2,${notas.id})" ${this.comprobarrojo(notas.n2)}></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3,${notas.id})" ${this.comprobarrojo(notas.n3)}></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4,${notas.id})" ${this.comprobarrojo(notas.n4)}></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5,${notas.id})" ${this.comprobarrojo(notas.n5)}></td>
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6,${notas.id})" ${this.comprobarrojo(notas.n6)}></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7,${notas.id})" ${this.comprobarrojo(notas.n7)}></td>
                                    
                                    ${prom1}
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},${this.asignatura},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>

                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8,${notas.id})" ${this.comprobarrojo(notas.n8)}></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9,${notas.id})" ${this.comprobarrojo(notas.n9)}></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10,${notas.id})" ${this.comprobarrojo(notas.n10)}></td>
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11,${notas.id})" ${this.comprobarrojo(notas.n11)}></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12,${notas.id})" ${this.comprobarrojo(notas.n12)}></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13,${notas.id})" ${this.comprobarrojo(notas.n13)}></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14,${notas.id})" ${this.comprobarrojo(notas.n14)}></td>
                                    
                                    ${prom2}
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},${this.asignatura},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>

                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15,${notas.id})" ${this.comprobarrojo(notas.n15)}></td>
                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16,${notas.id})" ${this.comprobarrojo(notas.n16)}></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17,${notas.id})" ${this.comprobarrojo(notas.n17)}></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18,${notas.id})" ${this.comprobarrojo(notas.n18)}></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19,${notas.id})" ${this.comprobarrojo(notas.n19)}></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20,${notas.id})" ${this.comprobarrojo(notas.n20)}></td>
                                    
                                    ${prom3}
                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},${this.asignatura},'p3',${notas.id})">
                                    <option value="${notas.porcentaje3}">${notas.porcentaje3}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>

                            </tr>`
                        }
                        
                    
                    if(this.notas.length==index+1 && temp==false){
                        return  `<tr>
                            <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                            <td>${dat.rut}${dat.ipe}</td>
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1)"></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2)"></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3)"></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4)"></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5)"></td>
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6)"></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7)"></td>

                                    <td>-</td>
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},${this.asignatura},'p1')">${porcentajes}</select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8)"></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9)"></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10)"></td>
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11)"></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12)"></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13)"></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},${this.asignatura},'p2')">${porcentajes}</select></td>
                                    <td>A</td>
                            
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15)"></td>
                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16")></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17)"></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18)"></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19)"></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20)"></td>
                                    

                                    <td>-</td>
                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},${this.asignatura},'p3')">${porcentajes}</select></td>
                                    <td>A</td>
                            
                                    </tr>
                                    `


                    }
                })}`
                
            }else if(this.configuraciones.divisionyear==4){
                if(this.notas.length==0){
                    return  `<tr>
                                <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                                <td>${dat.rut}${dat.ipe}</td>
                
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1)"></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2)"></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3)"></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4)"></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p1">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A/td>

                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6)"></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7)"></td>
                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8)"></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9)"></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p2">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11)"></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12)"></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13)"></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14)"></td>
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p3">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16")></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17)"></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18)"></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19)"></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p4">
                                    <option value="100">100%</option>
                                    </select></td>
                                    <td>A</td>
                                    
                            </tr>`
                }
                
                temp=false
                return `${this.notas.map((notas,index)=>{
                    
                    if(dat.id==notas.idalumno){
                        console.log("oMG")
                        temp=true
                        
                        
                        
                             if(notas.n1>=1){
                                div++
                                
                                sum+=parseInt(notas.n1)
                             }
                             if(notas.n2>=1){
                                div++
                                sum+=parseInt(notas.n2)
                             }
                             if(notas.n3>=1){
                                div++
                                sum+=parseInt(notas.n3)
                             }
                             if(notas.n4>=1){
                                div++
                                sum+=parseInt(notas.n4)
                             }
                             if(notas.n5>=1){
                                div++
                                sum+=parseInt(notas.n5)
                             }
                             prom1=`<td>${Math.trunc(sum/div)}</th>`
                            if(div==0){
                                prom1=`<td>-</th>`
                            }
                                sum=0
                                div=0
                             if(notas.n6>=1){
                                div++
                                sum+=parseInt(notas.n6)
                             }
                             if(notas.n7>=1){
                                div++
                                sum+=parseInt(notas.n7)
                             }
                             if(notas.n8>=1){
                                div++
                                sum+=parseInt(notas.n8)
                             }
                             if(notas.n9>=1){
                                div++
                                sum+=parseInt(notas.n9)
                             }
                             if(notas.n10>=1){
                                div++
                                sum+=parseInt(notas.n10)
                             }
                             prom2=`<td>${Math.trunc(sum/div)}</th>`
                             if(div==0){
                                 prom2=`<td>-</th>`
                             }
                                 sum=0
                                 div=0
                             if(notas.n11>=1){
                                div++
                               
                                sum+=parseInt(notas.n11)
                             }
                             if(notas.n12>=1){
                                div++
                                
                                sum+=parseInt(notas.n12)
                             }
                             if(notas.n13>=1){
                                div++
                                
                                sum+=parseInt(notas.n13)
                             }
                             if(notas.n14>=1){
                                div++
                                
                                sum+=parseInt(notas.n14)
                             }
                             if(notas.n15>=1){
                                div++
                                
                                sum+=parseInt(notas.n15)
                             }
                             prom3=`<td>${Math.trunc(sum/div)}</th>`
                             if(div==0){
                                 prom3=`<td>-</th>`
                             }
                                 sum=0
                                 div=0
                            if(notas.n16>=1){
                                div++
                                sum+=parseInt(notas.n16)
                             }
                             if(notas.n17>=1){
                                div++
                                sum+=parseInt(notas.n17)
                             }
                             if(notas.n18>=1){
                                div++
                                sum+=parseInt(notas.n18)
                             }
                             if(notas.n19>=1){
                                div++
                                sum+=parseInt(notas.n19)
                             }
                             if(notas.n20>=1){
                                div++
                                sum+=parseInt(notas.n20)
                             }
                             
                             prom4=`<td>${Math.trunc(sum/div)}</th>`
                             if(div==0){
                                 prom4=`<td>-</th>`
                             }
                                 sum=0
                                 div=0
                            
                            return  `<tr>
                            <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                            <td>${dat.rut}${dat.ipe}</td>
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1,${notas.id})" ${this.comprobarrojo(notas.n1)}></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2,${notas.id})" ${this.comprobarrojo(notas.n2)}></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3,${notas.id})" ${this.comprobarrojo(notas.n3)}></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4,${notas.id})" ${this.comprobarrojo(notas.n4)}></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5,${notas.id})" ${this.comprobarrojo(notas.n5)}></td>
                                    
                                    ${prom1}
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},${this.asignatura},'p1',${notas.id})">
                                    <option value="${notas.porcentaje1}">${notas.porcentaje1}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>
                                    
                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6,${notas.id})" ${this.comprobarrojo(notas.n6)}></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7,${notas.id})" ${this.comprobarrojo(notas.n7)}></td>
                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8,${notas.id})" ${this.comprobarrojo(notas.n8)}></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9,${notas.id})" ${this.comprobarrojo(notas.n9)}></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10,${notas.id})" ${this.comprobarrojo(notas.n10)}></td>
                                    
                                    ${prom2}
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},${this.asignatura},'p2',${notas.id})">
                                    <option value="${notas.porcentaje2}">${notas.porcentaje2}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>
                                    
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11,${notas.id})" ${this.comprobarrojo(notas.n11)}></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12,${notas.id})" ${this.comprobarrojo(notas.n12)}></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13,${notas.id})" ${this.comprobarrojo(notas.n13)}></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14,${notas.id})" ${this.comprobarrojo(notas.n14)}></td>
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15,${notas.id})" ${this.comprobarrojo(notas.n15)}></td>

                                    ${prom3}
                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},${this.asignatura},'p3',${notas.id})">
                                    <option value="${notas.porcentaje3}">${notas.porcentaje3}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>

                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16,${notas.id}) ${this.comprobarrojo(notas.n16)}></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17,${notas.id})" ${this.comprobarrojo(notas.n17)}></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18,${notas.id})" ${this.comprobarrojo(notas.n18)}></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19,${notas.id})" ${this.comprobarrojo(notas.n19)}></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20,${notas.id})" ${this.comprobarrojo(notas.n20)}></td>
                                    
                                    ${prom4}
                                    <td><select id="${dat.id}-p4" onchange="notas.cambios(${dat.id},${this.asignatura},'p4',${notas.id})">
                                    <option value="${notas.porcentaje4}">${notas.porcentaje4}%</option>
                                    ${porcentajes}</select></td>

                                    <td>A</td>
                                    

                            </tr>`
                        }
                        
                    
                    if(this.notas.length==index+1 && temp==false){
                        return  `<tr>
                            <td>${dat.nombrealumno} ${dat.apellidopaterno}</td>
                            <td>${dat.rut}${dat.ipe}</td>
                                    <td><input id="${dat.id}-1" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},1)"></td>
                                    <td><input id="${dat.id}-2" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},2)"></td>
                                    <td><input id="${dat.id}-3" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},3)"></td>
                                    <td><input id="${dat.id}-4" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},4)"></td>
                                    <td><input id="${dat.id}-5" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},5)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p1" onchange="notas.cambios(${dat.id},${this.asignatura},'p1')">${porcentajes}</select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-6" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},6)"></td>
                                    <td><input id="${dat.id}-7" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},7)"></td>
                                    <td><input id="${dat.id}-8" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},8)"></td>
                                    <td><input id="${dat.id}-9" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},9)"></td>
                                    <td><input id="${dat.id}-10" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},10)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p2" onchange="notas.cambios(${dat.id},${this.asignatura},'p2')">${porcentajes}</select></td>
                                    <td>A</td>
                             
                                    <td><input id="${dat.id}-11" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},11)"></td>
                                    <td><input id="${dat.id}-12" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},12)"></td>
                                    <td><input id="${dat.id}-13" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},13)"></td>
                                    <td><input id="${dat.id}-14" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},14)"></td>
                                    <td><input id="${dat.id}-15" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},15)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p3" onchange="notas.cambios(${dat.id},${this.asignatura},'p3')">${porcentajes}</select></td>
                                    <td>A</td>

                                    <td><input id="${dat.id}-16" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},16")></td>
                                    <td><input id="${dat.id}-17" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},17)"></td>
                                    <td><input id="${dat.id}-18" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},18)"></td>
                                    <td><input id="${dat.id}-19" type="text"  onchange="notas.cambios(${dat.id},${this.asignatura},19)"></td>
                                    <td><input id="${dat.id}-20" type="text" onchange="notas.cambios(${dat.id},${this.asignatura},20)"></td>
                                    
                                    <td>-</td>
                                    <td><select id="${dat.id}-p4" onchange="notas.cambios(${dat.id},${this.asignatura},'p4')">${porcentajes}</select></td>
                                    <td>A</td>

                                    </tr>
                                    `


                    }
                })}`
                
            }
        })}
        
        `

        $("#Tabla").html(html3)
    }
    limitarinput(x){
        let valor=$("#"+x).val()
        if($("#"+x).val()>100){
            $("#"+x).val(100)
        }
        if(valor>90){
            //$("#"+x).css({"background-color":"blue","color":"white"})
        }
    }
    agregarindicador(x){
        $(`#${x}-indi`).val($(`#${x}-indi`).val().toUpperCase())
        this.indicadores.push({id:x,valor:$(`#${x}-indi`).val().toUpperCase()})
    }
    cambios(x,y,z,n){
        let p1=-1,p2=-1,p3=-1,p4=-1
        
        console.log(n)
        if(n==undefined){
            n=0
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
        
        
            this.alumnoscambios[x]=({
                idalumno:x,
                idnota:n,
                p1:p1,
                p2:p2,
                p3:p3,
                p4:p4,

                

                n1:$(`#${x}-1`).val(),
                n2:$(`#${x}-2`).val(),
                n3:$(`#${x}-3`).val(),
                n4:$(`#${x}-4`).val(),
                n5:$(`#${x}-5`).val(),
                n6:$(`#${x}-6`).val(),
                n7:$(`#${x}-7`).val(),
                n8:$(`#${x}-8`).val(),
                n9:$(`#${x}-9`).val(),
                n10:$(`#${x}-10`).val(),
                n11:$(`#${x}-11`).val(),
                n12:$(`#${x}-12`).val(),
                n13:$(`#${x}-13`).val(),
                n14:$(`#${x}-14`).val(),
                n15:$(`#${x}-15`).val(),
                n16:$(`#${x}-16`).val(),
                n17:$(`#${x}-17`).val(),
                n18:$(`#${x}-18`).val(),
                n19:$(`#${x}-19`).val(),
                n20:$(`#${x}-20`).val(),
                n21:"",
                n22:"",
                n23:"",
                n24:"",
                n25:"",
                n26:"",
                n27:"",
                n28:"",
                n29:"",
                n30:""
            
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
    crearnotas(){
        let mut=""

        let alumnoid=0
        let n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15
        n1="",n2="",n3="",n4="",n5="",n6="",n7="",n8="",n9="",n10="",n11="",n12="",n13="",n14="",n15=""
        this.alumnoscambios.map((dat,index)=>{
            if(dat.id!=alumnoid && alumnoid!= 0){
                console.log("entro aqui y no deberia xd")
                let mut2=`
                        mutation {
                        notascreate(
                        alumno: ${alumnoid}
                        asignatura: ${this.asignatura}
                        
                        n1: "${n1}"
                        n10: "${n10}"
                        n11: "${n11}"
                        n12: "${n12}"
                        n13: "${n13}"
                        n14: "${n14}"
                        n15: "${n15}"
                        n2: "${n2}"
                        n3: "${n3}"
                        n4: "${n4}"
                        n5: "${n5}"
                        n6: "${n6}"
                        n7: "${n7}"
                        n8: "${n8}"
                        n9: "${n9}"
                        ) {
                        success
                        id
                        error
                        }
                    }
                    
                    `

                axios.post("/graphql/",{
                    query:mut2
                }).then(response=>{

                    console.log(mut2)
                    
                }).catch(error=>{
                    console.log(error)
                    
                })
                n1="",n2="",n3="",n4="",n5="",n6="",n7="",n8="",n9="",n10="",n11="",n12="",n13="",n14="",n15=""
            
            }
            alumnoid=dat.id
            
            switch(dat.nnota){
                case 1: 
                    n1= dat.valor 
                break;
                case 2:
                    n2= dat.valor
                break;
                case 3:
                    n3= dat.valor
                break;
                case 4:
                    n4= dat.valor
                break;
                case 5:
                    n5= dat.valor
                break;
                case 6:
                    n6= dat.valor
                break;
                case 7:
                    n7= dat.valor
                break;
                case 8:
                    n8= dat.valor
                break;
                case 9:
                    n9= dat.valor
                break;
                case 10:
                    n10=dat.valor
                break;
                case 11:
                    n11= dat.valor
                break;
                case 12:
                    n12= dat.valor
                break;
                case 13:
                    n13= dat.valor
                break;
                case 14:
                    n14= dat.valor
                break;
                case 15:
                    n15= dat.valor
                break;
                
            }
            console.log("paso")
            if(index==this.alumnoscambios.length-1){
                console.log("termino")
                $("#Cargando").show()
                let mut3=`
                        mutation {
                        notascreate(
                        alumno: ${alumnoid}
                        asignatura: ${this.asignatura}
                        
                        n1: "${n1}"
                        n10: "${n10}"
                        n11: "${n11}"
                        n12: "${n12}"
                        n13: "${n13}"
                        n14: "${n14}"
                        n15: "${n15}"
                        n2: "${n2}"
                        n3: "${n3}"
                        n4: "${n4}"
                        n5: "${n5}"
                        n6: "${n6}"
                        n7: "${n7}"
                        n8: "${n8}"
                        n9: "${n9}"
                        ) {
                        success
                        id
                        error
                        }
                    }
                    
                    `

                axios.post("/graphql/",{
                    query:mut3
                }).then(response=>{

                    console.log(mut3)
                    if(this.indicadores.length>=1){

                    }else{
                        this.cargardatosasignaturas()

                    }
                    
                    
                    
                }).catch(error=>{
                    console.log(error)
                    if(this.indicadores.length>=1){
                        
                    }else{
                        this.cargardatosasignaturas()
                    }
                    
                    
                    
                })
            }
            
        })
            
        this.alumnoscambios=[]


        $(".Cambiado").removeClass("Cambiado")

        this.indicadores.forEach((dat,index2)=>{
            $("#Cargando").show()
                let mut4=`
                mutation {
                    notaindicador(id: ${dat.id}, indicador: "${dat.valor}") {
                      success
                      
                      error
                    }
                  }
                    
                    `

                axios.post("/graphql/",{
                    query:mut4
                }).then(response=>{

                    console.log(mut4)
                    console.log(this.indicadores.length)
                    console.log(index2)
                    if(index2==this.indicadores.length-1){
                        this.cargardatosasignaturas()
                        this.indicadores=[]
                    }
                    
                }).catch(error=>{
                    console.log(error)
                    if(index2==this.indicadores.length-1){
                        this.cargardatosasignaturas()
                        this.indicadores=[]
                       
                    }
                })
            })
            
            

    }
    comprobarrojo(x){
        if(x<=39 && x>=1){
            return `value="${x}" class="rojo"`
        }else{
            return `value="${x}"`
        }
    }
    promedio(n1,n2,n3,n4,n5,n6,n7,n8){
        let n=0
        let sum=0
        
        if(!isNaN(n1) && n1!=""){
            
            n++
            sum+=parseInt(n1)
        }
        if(!isNaN(n2) && n2!=""){
            
            n++
            sum+=parseInt(n2)
        }
        if(!isNaN(n3) && n3!=""){
            n++
            sum+=parseInt(n3)
        }
        if(!isNaN(n4) && n4!=""){
            n++
            sum+=parseInt(n4)
        }
        if(!isNaN(n5) && n5!=""){
            n++
            sum+=parseInt(n5)
        }
        if(!isNaN(n6) && n6!=""){
            n++
            sum+=parseInt(n6)
        }
        if(!isNaN(n7) && n7!=""){
            n++
            sum+=parseInt(n7)
        }
        if(!isNaN(n8) && n8!=""){
            n++
            sum+=parseInt(n8)
        }
        
        if(sum==0){
            return "N"
        }
        return (sum/n).toFixed(2)
        
    }

}