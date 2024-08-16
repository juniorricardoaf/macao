'use strict'

let mongoose = require('mongoose');

let categoriasSchema= new mongoose.Schema(
    {
        nombre : {type:String, required:true, unique:true },
        descripcion : {type:String, required:true },
        estado: {type: String, required : true} 
    }
);

module.exports= mongoose.model('Categoría', categoriasSchema); 