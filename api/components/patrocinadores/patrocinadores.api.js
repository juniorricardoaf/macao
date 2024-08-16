'use strict'

const patrocinadorModel=require('./patrocinadores.model');
const bitacoraApi = require('../bitacora/bitacora.api');

module.exports.registrar=function(req, res){
    let nuevoPatrocinador= new patrocinadorModel({
        nombre: req.body.nombre,
        tipoIndustria: req.body.tipoIndustria,
        imagen:req.body.imagen, 
        estado:'Habilitado'  
    }); 
    nuevoPatrocinador.save(function(error){
  

        if(error){
                res.json({succes:false, msg:'El registro del patrocinador porque ocurrió el siguiente error'+error});           
        }else{
            let fecha=new Date();
            let fechas = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
            let hora= fecha.getHours() + ':' +fecha.getMinutes() + ':' + fecha.getSeconds(); 
            bitacoraApi.registrar_bitacora( fechas, hora, 'Administrador', 'Patrocinador agregado' );
            res.json({succes:true, msg:'El patrocinador se registró con éxito'});
           
        }
    });

};

module.exports.listar_todos=function(req, res){
  patrocinadorModel.find().sort({nombre:'asc'}).then(
      function(patrocinadores){


          res.send(patrocinadores);
      }
  );
};


module.exports.buscar_patrocinador = function(req, res){
    patrocinadorModel.findOne({_id : req.body.id}).then(
        function(patrocinador){
            if(patrocinador){
                res.send(patrocinador);
            }else{
                res.send('No se encontró el patrocinador');
            }
            
        }
    )
};


module.exports.modificar_patrocinador = function(req, res){
    patrocinadorModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo modificar el patrocinador'});
            }else{
                res.json({success: true ,msg: 'El patrocinador se modificó con éxito'}); 
            }
        }
    )
};


module.exports.borrar = function(req, res){
    patrocinadorModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar el patrocinador'});
            }else{
                res.json({success: true ,msg: 'El patrocinador se eliminó con éxito'}); 
            }
        }
    )
};


module.exports.deshabilitar = function(req, res){
    patrocinadorModel.findByIdAndUpdate(req.body.id, {$set : {estado:'Deshabilitado'
}},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo deshabilitar el patrocinador'});
            }else{
                res.json({success: true ,msg: 'El patrocinador se deshabilitó con éxito'}); 
            }
        }
    )
};



module.exports.habilitar = function(req, res){
    patrocinadorModel.findByIdAndUpdate(req.body.id, {$set : {estado:'Habilitado'
}},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo deshabilitar el patrocinador'});
            }else{
                res.json({success: true ,msg: 'El patrocinador se deshabilitó con éxito'}); 
            }
        }
    )
};