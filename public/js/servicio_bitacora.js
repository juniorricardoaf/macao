function obtenerBitacora(){
    let listaBitacora = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/visualizar_bitacora',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
      });
    
      peticion.done(function(response){
        listaBitacora = response;
      });
    
      peticion.fail(function(){
       
      });

    return listaBitacora;
};