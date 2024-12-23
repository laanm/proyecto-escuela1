class MasterMain{
    constructor(){

        this.ventanas = [
            {
                nombre: 'ventana1',
                estado: false,
                z : 120,
            },
            {
                nombre: 'ventana2',
                estado: false,
                z : 130,
            },
            {
                nombre: 'ventana3',
                estado: false,
                z : 140,
            },
            {
                nombre: 'ventana4',
                estado: false,
                z : 150,
            },
            {
                nombre: 'ventana5',
                estado: false,
                z : 160,
            },
            {
                nombre: 'ventana6',
                estado: false,
                z : 170,
            },
        ]

        this.onLoad()
    }


    onLoad(){
        this.createLoadingDIV()
    }

    createLoadingDIV(){
        let css = `
            <style>
                .loadingScreenOpen{
                    width : 100vw;
                    height : 100vh;
                    display : flex;
                    position : fixed;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 99999999999999992;
                    top: 0;
                    left: 0;
                }
                
                .loadingScreenOpen img{
                    width : 100px;
                    height : auto;
                    filter: drop-shadow(5px 5px 5px #222);
                    
                    
                }

                .loadingScreenClose{
                    display:none;
                }

                .loadingScreenClose img{
                    display:none;
                }

                @keyframes loading{
                    from {transform: rotate(0deg); scaleX(-1);}
                    from {transform: rotate(360deg); scaleX(-1);}
                }
            </style>
            `;
        let html = `<div id="loadingScreen" class="loadingScreenClose"><img src="/static/vabledd-template/img/loading.svg"></div>`;

        $('body').append(css + html)
    }

    /**
     * Guarda informacion en el LocalStorage
     * @param key - Nombre de la variable
     * @param value - Valor de la variable
     */
    setLocalStorage(key, value){
        localStorage.setItem(key, value)
        //this.console(`saved in LocalStorage a ${key}: ${value}`)

        switch(key){
            case 'loading': this.loadingLogo(); break;
        }

    }
    /**
     * Devuelve el valor de la variable del LocalStorage
     * @param key - Variable en el LocalStorage
     * @returns The value of the key in localStorage.
     */
    getLocalStorage(key){
        return localStorage.getItem(key)
    }
    /**
     * Elimina una variable del LocalStorage
     * @param key - Nombre de la variable a eliminar
     */
    removeLocalStorage(key){
        localStorage.removeItem(key)
    }

    /**
     * Limpia el LocalStorage
     */
    clearLocalStorage(){
        localStorage.clear()
    }

    loadingLogo(){

        let loading = this.getLocalStorage('loading')

        //console.log('loading status',loading)
        if(loading=='true'){
            //console.log("true")
            $("#loadingScreen").removeClass('loadingScreenClose').addClass('loadingScreenOpen')
        }else{
            //console.log("false")
            if($("#loadingScreen").hasClass('loadingScreenOpen')){
                $("#loadingScreen").removeClass('loadingScreenOpen').addClass('loadingScreenClose')
            }
        }
        
    }

    /**
     * Alerta general al medio de la pantalla
     * @param icon -  Icono a mostrar ('success','error','warning','info','question').
     * @param title - Titulo de la alerta
     * @param text - Descripcion de la alerta
     */
    alerta(icon,title,text){
        Swal.fire({
            icon,
            title,
            text,
        })
    }

    
    /**
     * Esta funcion muestra una alerta en la parte superior derecha de la pantalla
     * @param icon - Icono a mostrar ('success','error','warning','info','question').
     * @param title - Titulo de la alerta
     */
    alertaTop(icon,title){
        Swal.fire({
            position: 'top-end',
            icon,
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }

    /**
     * It returns a promise that resolves to a boolean value.
     * @param title - Titulo de la pregunta
     * @returns A promise.
     */
    alertaPregunta(title){
        return Swal.fire({
            title,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: ``,
        })
    }


    

    showVentana(ventana){
        let css = `

        <style>
            #${ventana.nombre}{
                width : 100vw;
                height : 100vh;
                display : flex;
                position : fixed;
                justify-content: center;
                align-items: center;
                background-color: rgba(0,0,0,0.5);
                z-index: ${ventana.z};
                top:0;
                left:0;
            }
            
            #${ventana.nombre} div{
                width: 60vw;
                height: 60vh;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
            }

        

        </style>

        `
        
        let html = `
        <div id="${ventana.nombre}" >
            <div>
                <h1>${ventana.nombre}</h1>
                <button type="button" >Cerrar Ventana</button>
            </div>
        

        </div>
        `

        $('body').append(css + html)

        $('#'+ventana.nombre+' button').click(()=>{
            ventana.estado = false;
            $('#'+ventana.nombre).remove()
        })
    }

    abrirVentana(){

        let ventana = this.ventanas.find(v => v.estado == false);
        //this.console(ventana)

        if(ventana){
            ventana.estado = true;
            this.showVentana(ventana)
        }else{
            this.alerta('error','No hay ventanas disponibles','No hay ventanas disponibles')
        }
        
    }

    loading(){
        let estatus = this.getLocalStorage('loading')

        if(estatus=='true' || estatus == null){
            this.setLocalStorage('loading','false')
        }else{
            this.setLocalStorage('loading','true')
        }

    }

    bloquearAcciones(){
        $('.accion').attr('disabled',true)
    }
    desbloquearAcciones(){
        $('.accion').attr('disabled',false)
    }

}