class Master{
    constructor(){
        this.init();
    }
    init(){
        console.log('Master');
    }

    agregar_inventario(){
        console.log('agregar_inventario');
        let html = `aaa`

        Swal.fire({
            title: 'Agregar Inventario',
            html: html,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.value) {
                    console.log('guardar');
                }
            })
            
    }
}