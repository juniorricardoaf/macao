'use strict';
let mongoose = require('mongoose');

let eventoSchema = new mongoose.Schema(
    {
        nombre: {type: String, required : true},
        fecha: {type: String, required : true },
        hora_Inicio: {type: String, required : true},
        minutos_Inicio: {type: String, required : true},
        hora_Fin: {type: String, required : true},
        minutos_Fin: {type: String, required : true},
        cant_Espacios: {type: String, required : true},
        descripcion: {type: String, required : true},
        moneda: {type: String},
        precio: {type: Number},
        ubicacion: {type: String, required : true},
        etiqueta: {type: String},
        imagen: {type: String, required : true},
        latitud: {type: Number, required: true},
        longitud: {type: Number, required: true},
        estado: {type: String, required : false},
        id_Usuario: {type: String, required : false},
        lugar: {type: String, ref : 'Lugar', required : false},
        categorias: [
            { nombreCategoria: { type: String } }
        ],
        patrocinadores: [
            { nombrePatrocinador: { type: String } }
        ],
        calificaciones: [
            {
                voto: {type: String},
                comentario: { type: String},
                idUsuarioC: {type: String},
                estado: {type: String},
            }
        ],
        cupos_Disponibles: {type: Number, required : false},
        reservas: { type: Array, required: false}
    }
);

module.exports = mongoose.model('Evento', eventoSchema);
