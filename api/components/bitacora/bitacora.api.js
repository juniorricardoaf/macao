'use strict'

const bitacoraModel=require('./bitacora.model');

module.exports.registrar_bitacora=function( pFecha, pHora, pUsuario, pDescripcion){
    let nuevoRegistro= new bitacoraModel({
        fecha:pFecha,
        hora:pHora,
        tipo_usuario:pUsuario,   
        descripcion: pDescripcion
    });

nuevoRegistro.save(function(error){ 
    if(error==false){ 
        res.json({succes:true, msg:'La bitacora se registró con éxito'});
    }
});

};

module.exports.listar_bitacora=function(req, res){
    bitacoraModel.find().sort({fecha:'desc'}).then(
        function(bitacora){
            res.send(bitacora);
        }
    );
};
    