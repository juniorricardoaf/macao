'use strict';

let mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    tipoUsuario: { type: String, required: true },
    nombreUsuario: { type: String, required: true, unique: true},
    identificacion: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    empresa: { type: String, required: false },
    correo_1: { type: String, required: true },
    correo_2: { type: String, required: false },
    fechaNacimiento: { type: String, required: false },
    edad: { type: String, required: false },
    sexo: { type: String, required: false },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false },
    contrasenna: { type: String, required: true },
    imagen: { type: String, required: false},
    idJuridica: { type: String, required: false},
    estado: { type: String, required: true},
    expulsado: { type: String, required: true},
    primerInicio: { type: String, required: false},
    eventosReservados: { type: Array, required: false, ref: 'Evento'},
    lugares_que_sigo: { type: Array, required: false, ref: 'Lugar' }
});

module.exports = mongoose.model('Usuario', usuarioSchema);