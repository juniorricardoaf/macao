'use strict'
const contribucionModel=require('./contribucion.model');
const bitacoraApi = require('../bitacora/bitacora.api');

module.exports.registrar=function(req, res){
    let nuevaContribucion= new contribucionModel({
        nombrePatrocinador:req.body.nombrePatrocinador,
        cantidad:req.body.cantidad,
        detalle:req.body.detalle,   
    }); 
    nuevaContribucion.save(function(error){ 
        if(error){
            res.json({succes:false, msg:'El registro de la contribución no se pudo realizar porque ocurrió el siguiente error'+error}); 
        }else{
            let fecha=new Date();
            let fechas = f
            echa.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
            let hora= fecha.getHours() + ':' +fecha.getMinutes() + ':' + fecha.getSeconds(); 
            bitacoraApi.registrar_bitacora( fechas, hora, 'Empresario', 'Contribución agregada' );
            res.json({succes:true, msg:'La contribución se registró con éxito'});
        }
       
    });

};

module.exports.listar_todos=function(req, res){
  contribucionModel.find().sort({nombrePatrocinador:'asc'}).then(
      function(contribuciones){
          res.send(contribuciones);
      }
  );
};
