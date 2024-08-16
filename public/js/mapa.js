function initMap() {

        var myLatLng = {lat: Number(latitud.textContent), lng: Number(longitud.textContent)};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });

        google.maps.event.addListener(marker,'click',function() {
          map.setZoom(18);
          map.setCenter(marker.getPosition());
          });

      }
