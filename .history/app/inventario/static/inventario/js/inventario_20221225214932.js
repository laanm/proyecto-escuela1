class Inventario{
    constructor(){
        console.log("Inventario instanciado")
        this.all_data = []
    }

    async init(){
        await this.get_all_data()
    }

    all_data(){
        let $this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/inventario/all_data",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $this.all_data = data;
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            })
        })
    }

}