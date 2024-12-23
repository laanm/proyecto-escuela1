class Resumen{
    constructor(){
        console.log("resumen instanciado")
        this.data = {}
    }

    async init(){
        loading_show();
        await this.get_resumen();
        this.grafico1();
        this.grafico2();
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

    grafico1(){

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

    grafico2(){
        let $this = this;
        let resultados = this.data.centro_costo;

        let clabels = [];
        let clabels_value = [];

        resultados.forEach(r=>{
            clabels.push(r.nombre)
            clabels_value.push(r.valor_total)
        })

        new Chart(document.getElementById("grafico2"), {
            type: 'doughnut',
            data: {
                labels: clabels,
                datasets: [
                    {
                    label: "Compras Totales",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e95cd", "#8e5ea2"],
                    data: clabels_value
                    }
                ],
                

            },
            options: {
                title: {
                    display: true,
                    text: 'Compras por Centro de Costo'
                },
                responsive: true,
                maintainAspectRatio: true,
            }
        });
    }

}