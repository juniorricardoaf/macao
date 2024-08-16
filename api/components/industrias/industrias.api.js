'use strict';
const industriaModel = require ('./industrias.model');
const bitacoraApi = require('../bitacora/bitacora.api');

module.exports.registrar = function(req, res){
    let nuevaIndustria = new industriaModel({
        industria :  req.body.industria,
        estado : 'Habilitado'

    });

    nuevaIndustria.save(function(error){
        if(error){
            res.json({
                success : false, 
                msj: 'La empresa no pudo ser registrada : ' + error
            })

        }else{
            let fecha=new Date();
            let fechas = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
            let hora= fecha.getHours() + ':' +fecha.getMinutes() + ':' + fecha.getSeconds(); 
            bitacoraApi.registrar_bitacora( fechas, hora, 'Administrador', 'Industria agregada' );
            res.json({success : true, msg: 'La empresa se registró de forma exitosa.'
             }); 
        }
    });
}; 

module.exports.listar_todos = function(req , res){
    industriaModel.find().sort({nombre: 'asc'}).then(
        function(industrias){
            res.send(industrias)
        }
    );
    
};

module.exports.buscar_industria = function(req, res){
    industriaModel.findOne({_id : req.body.id}).then(
        function(industria){
            if(industria){
                res.send(industria);
            }else{
                res.send('No se encontró la industria');
            }
            
        }
    )
};

module.exports.actualizar_industria = function(req, res){
  industriaModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success:false ,msg:'No se pudo actualizar la industria'});
            
            }else{
                res.json({success:true ,msg:'La industria se actualizó con éxito'});
            }
        }
    )
};

module.exports.deshabilitar_industria = function(req, res){
    industriaModel.findByIdAndUpdate(req.body.id, {$set: {
        estado: 'Deshabilitado'
    }},
          function(error){
              if(error){
                  res.json({success:false ,msg:'No se pudo deshabilitar la industria'});
              
              }else{
                  res.json({success:true ,msg:'La industria se deshabilitó con éxito'});
              }
          }
      )
  };
  
  module.exports.habilitar_industria = function(req, res){
    industriaModel.findByIdAndUpdate(req.body.id, {$set: {
        estado: 'Habilitado'
    }},
          function(error){
              if(error){
                  res.json({success:false ,msg:'No se pudo habilitar la industria'});
              
              }else{
                  res.json({success:true ,msg:'La industria se habilitó con éxito'});
              }
          }
      )
  };

  module.exports.borrar = function(req, res){
    industriaModel.findByIdAndDelete(req.body.id,
          function(error){
              if(error){
                  res.json({success:false ,msg:'No se pudo actualizar la industria'});
              
              }else{
                  res.json({success:true ,msg:'La industria se actualizó con éxito'});
              }
          }
      )
  };
  
    
    
