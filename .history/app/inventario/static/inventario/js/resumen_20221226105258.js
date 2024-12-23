class Resumen{
    constructor(){
        console.log("resumen instanciado")
    }

    async init(){

    }

    get_resumen(){
        let $this = this;
        return new Promise(function(resolve, reject){
            $.ajax({
                url: "/inventario/resumen/get_resumen",
                type: "GET",
                success: function(data){
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    }

}