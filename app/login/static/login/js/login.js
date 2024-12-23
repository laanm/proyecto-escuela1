const vueAPP = {
    delimiters: ['[[', ']]'],
    components: {},
    data() {
        return {
            email : "",
            emailShow : false,
            pass : "",
        }
    },
    methods: {
        login: function() {

            if(!this.email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Authorization',
                    text: 'Debes ingresar los datos de correo electronico',
                })
            }else if(!this.pass){
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Authorization',
                    text: 'Debes ingresar tu contraseña de sesión',
                })
            }

            const data = { 
                email: this.email,
                pass: this.pass,
            };
            const headers = { 
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken':token
            };
            
            axios.post("/login/autenticar",  data , { headers })
                .then(response => {
                    if(response.data.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Bienvenido',
                            text: 'Has ingresado correctamente',
                        }).then(response => {
                            window.location.href = "/PedirSalas/";
                        })
                    }else if(response.data.status == 401){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error de Authorization',
                            text: response.data.mensaje,
                        })
                    }
                    
                });
        },

        showPass: function() {
            this.emailShow = !this.emailShow;
        },

    },
    mounted(){

        this.onload()
    },
}

Vue.createApp(vueAPP).mount('#login')