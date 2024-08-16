'use strict'
let mongoose= require('mongoose');

let patrocinadoresSchema= new mongoose.Schema(
    {
       nombre:{type:String, unique:false, required:false},
       tipoIndustria:{type:String, unique:false, required:false},
       imagen:{type:String, unique:false, required:true},
       estado:{type:String, required:true},
       }
);
module.exports=mongoose.model('Patrocinador', patrocinadoresSchema);