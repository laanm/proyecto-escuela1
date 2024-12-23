class Resumen{
    constructor(){
        console.log("resumen instanciado")
        this.data = {}
    }

    async init(){
        loading.show();
        await this.get_resumen();
        loading.hide();
    }

    get_resumen(){
        let $this = this;
        return new Promise(function(resolve, reject){
            $.ajax({
                url: "/inventario/resumen/get_resumen",
                type: "GET",
                success: function(data){
                    $this.data = data
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    }

}