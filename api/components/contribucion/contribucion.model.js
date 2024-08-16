'use strict'

let mongoose=require('mongoose');

let contribucionSchema=new mongoose.Schema(
    {
        nombrePatrocinador:{ type:String, unique:false, required:false},
        cantidad:{type: String, unique:false, required:false},
        detalle:{type:String, unique:true, required:false},
}
);
module.exports=mongoose.model('Contribucion', contribucionSchema);

