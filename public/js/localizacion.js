class Localizacion{

    constructor(callback){
        if (navigator.geolocation) {
            //Se obtiene la ubicacion
           navigator.geolocation.getCurrentPosition ((position)=>{
               this.latitude = position.coords.latitude;
               this.longitude = position.coords.longitude;
               callback();
           });
        }else{
            alert("Su navegador no soporta geolocalizacion")

        }

    }


}
