//google.maps.event.addDomListener(window, "load", function(){
    const ubicacion = new Localizacion(()=>{
        const myLatLng = {lat: Number(latitud.value), lng: Number(longitud.value)};

        const options = {
            center: myLatLng,
            zoom: 14

        }

        var map = document.getElementById('map');
        const mapa = new google.maps.Map(map, options);

        const marcador = new google.maps.Marker({
            position: myLatLng,
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: mapa

        });

        var informacion = new google.maps.InfoWindow();

        marcador.addListener( 'dragend', function (event)
      {
        //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords
        document.getElementById("inputLat").value = this.getPosition().lat();
        document.getElementById("inputLng").value = this.getPosition().lng();
      });

        marcador.addListener('click', function(){
            informacion.open(mapa, marcador);
        });

        var autocomplete = document.getElementById('autocomplete');

        const search = new google.maps.places.Autocomplete(autocomplete);
        search.bindTo("bounds",mapa);

        search.addListener('place_changed',function(){

            informacion.close();
            marcador.setVisible(false);
            var place = search.getPlace();
            if (!place.geometry.viewport) {
                window.alert("Error al mostrar el lugar");
                return;
            }

            if (place.geometry.viewport) {
                mapa.fitBounds(place.geometry.viewport);

            }else{
                map.setCenter(place.geometry.location);
                mapa.setZoom(18);
            }

            marcador.setPosition(place.geometry.location);
            marcador.setVisible(true);

            var address = "";
            if (place.address_components) {
                address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || ''),
                ];
            }

            informacion.setContent('<div><strong>'+ place.name + '</strong><br>'+ address);
            informacion.open(map,marcador);

        });

    });

//});
