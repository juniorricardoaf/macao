'use strict';

const express = require('express');
const router = express.Router();
const eventosApi = require('./eventos.api');

router.route('/registrar_evento')
    .post(function (req, res) {
        eventosApi.registrar(req, res);
    });

router.route('/listar_eventos')
    .get(function (req, res) {
        eventosApi.listar_todos(req, res);
    });

router.route('/perfil_evento/:id')
    .get(function (req, res) {
        eventosApi.obtener_evento(req, res);
    });

router.route('/buscar_evento')
    .post(function (req, res) {
        eventosApi.buscar_evento(req, res);
    });

router.route('/modificar_evento')
    .post(function (req, res) {
        eventosApi.actualizar_evento(req, res);
    });

router.route('/borrar_evento')
    .post(function (req, res) {
        eventosApi.borrar(req, res);
    });

router.route('/deshabilitar_evento')
    .post(function (req, res) {
        eventosApi.deshabilitar(req, res);
    });

router.route('/habilitar_evento')
    .post(function (req, res) {
        eventosApi.habilitar(req, res);
    });

router.route('/buscar_usuarios')
    .post(function (req, res) {
        eventosApi.buscar_usuarios(req, res);
    });

router.route('/calificar_evento')
    .post(function (req, res) {
        eventosApi.calificar(req, res);
    });

router.route('/reservar_evento')
    .post(function (req, res) {
        eventosApi.reservar(req, res);
    });

router.route('/eliminar_reserva')
    .post(function (req, res) {
        eventosApi.desreservar(req, res)
    });

router.route('/cupos')
    .post(function (req, res) {
        eventosApi.numCupos(req, res)
    })

router.route('/reservas_usuarios')
    .post(function (req, res) {
        eventosApi.usuarioReserva(req, res)
    })

router.route('/eliminar_reservas_usuarios')
    .post(function (req, res) {
        eventosApi.eliminarUsuarioReserva(req, res)
    })
module.exports = router;
