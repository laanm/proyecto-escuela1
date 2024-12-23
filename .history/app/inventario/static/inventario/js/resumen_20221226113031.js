class Resumen{
    constructor(){
        console.log("resumen instanciado")
        this.data = {}
    }

    async init(){
        loading_show();
        await this.get_resumen();
        this.graficos();
        loading_hide();
    }

    get_resumen(){
        let $this = this;
        return new Promise(function(resolve, reject){
            $.ajax({
                url: "/inventario/resumen/get_resumen",
                type: "GET",
                success: function(data){
                    $this.data = data
                    console.log("datos para los graficos",data)
                    resolve(data);
                },
                error: function(error){
                    reject(error);
                }
            });
        });
    }

    graficos(){

        let resultados = this.data.compras;

        new Chart(document.getElementById("grafico1"), {
            type: 'bar',
            data: {
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: [
                    {
                    label: "Compras Totales",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                    data: [
                            resultados.enero,
                            resultados.febrero,
                            resultados.marzo,
                            resultados.abril,
                            resultados.mayo,
                            resultados.junio,
                            resultados.julio,
                            resultados.agosto,
                            resultados.septiembre,
                            resultados.octubre,
                            resultados.noviembre,
                            resultados.diciembre
                        ]
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Compras Enero - Diciembre'
                },
                responsive: true,
                maintainAspectRatio: true,
            }
        });
    }

}