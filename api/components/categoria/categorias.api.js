'use strict'

const categoriaModel=require('./categorias.model');

module.exports.registrar=function(req,res){
    let nuevaCategoria=new categoriaModel({

        nombre : req.body.nombre ,
        descripcion : req.body.descripcion,
        estado : "Habilitado"

    });

    nuevaCategoria.save(function(error){
        if(error){
            res.json({success : false, msg:'No se pudo registrar la categoria, ocurrio el siguente error ' + error});
        }else{
            res.json({success:true, msg:'la categoria se registró con éxito'});
        }
    });
};


module.exports.listar_todos = function(req , res){
    categoriaModel.find().sort({nombre: 'asc'}).then(
        function(categorias){
            res.send(categorias);
        }
    );
};

module.exports.buscar_categoria = function(req, res){
    categoriaModel.findOne({_id : req.body.id}).then(
        function(categoria){
            if(categoria){
                res.send(categoria);
            }else{
                res.send('No se encontró la categoría');
            }
            
        }
    )
};

module.exports.modificar_categoria = function(req, res){
    categoriaModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo modificar la categoría'});
            }else{
                res.json({success: true ,msg: 'La categoría se modificó con éxito'}); 
            }
        }
    )
};

module.exports.borrar = function(req, res){
    categoriaModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar la categoría'});
            }else{
                res.json({success: true ,msg: 'La categoría se eliminó con éxito'}); 
            }
        }
    )
};

module.exports.deshabilitar = function(req, res){
    categoriaModel.findByIdAndUpdate(req.body.id, {$set : {
        estado: 'Deshabilitado'
    }}, 
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo actualizar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se actualizó con éxito'});
            }
        }
    )
};

module.exports.habilitar = function(req, res){
    categoriaModel.findByIdAndUpdate(req.body.id, {$set : {
        estado: 'Habilitado'
    }}, 
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo actualizar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se actualizó con éxito'});
            }
        }
    )
};
