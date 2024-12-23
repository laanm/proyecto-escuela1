class MVentanas{

    constructor(){


    }

    CrearVentana(incohtml,deselement){
        let html=incohtml;

        $("#"+deselement).append(html);
        
    }

}