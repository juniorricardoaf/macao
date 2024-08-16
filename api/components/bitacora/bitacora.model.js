'use strict'

let mongoose=require('mongoose');

let bitacoraSchema=new mongoose.Schema(
    {
        fecha:{type:String, unique:false, required:true},
        hora:{type:String, unique:false, required:true},
        tipo_usuario:{type:String, unique:false, required:false},
        descripcion:{type:String, unique:false, required:false}

}
);
module.exports=mongoose.model('Bitacora', bitacoraSchema);