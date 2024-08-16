'use strict'

let mongoose = require('mongoose');

let lugarSchema= new mongoose.Schema(
    {
        nombre : {type:String, required:true },
        descripcion : {type:String, required:true },
        categorias: [
            { nombre: { type: String } }
        ],
        direccion: {type:String, required:true },
        provincia:{type:String,required:true},
        canton:{type:String,required:true},
        distrito:{type:String,required:true},
        etiquetas : {type:String, required:false},
        facebook:{type:String, required:false },
        instagram:{type:String, required:false },
        twitter :{type:String, required:false },
        imagen:{type:String, required:true },
        latitud:{type:Number,required:true},
        longitud:{type:Number,required:true},
        estado : {type : String, required : true},
        id_usuario: {type : String, required : true},
        aprobado:{type:String,required:true},
        calificaciones: [
            {
                voto: {type: String},
                comentario: { type: String},
                idUsuarioC: {type: String},
                estado: {type: String}
            }
        ]
    }
);

module.exports= mongoose.model('Lugar', lugarSchema); 
