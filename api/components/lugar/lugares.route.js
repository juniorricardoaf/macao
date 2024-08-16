'use strict'

const express = require('express');
const router = express.Router();
const lugarApi = require('./lugares.api');

router.route('/registrar_lugar')
    .post(function (req, res) {
        lugarApi.registrar(req, res)
    });

router.route('/visualizar_lugar')
    .get(function (req, res) {
        lugarApi.listar_todos(req, res);
    });

router.route('/borrar_lugar')
    .post(function (req, res) {
        lugarApi.borrar(req, res);
    });

router.route('/deshabilitar_lugar')
    .post(function (req, res) {
        lugarApi.deshabilitar(req, res);
    });

router.route('/habilitar_lugar')
    .post(function (req, res) {
        lugarApi.habilitar(req, res);
    });

router.route('/buscar_usuarios')
    .post(function (req, res) {
        lugarApi.buscar_usuarios(req, res);

    });

router.route('/buscar_lugar')

    .post(function (req, res) {
        lugarApi.buscar_lugar(req, res);

    });

router.route('/seguir_lugar')
    .post(function (req, res) {
        lugarApi.seguir(req, res);
    });

router.route('/dejar_seguir_lugar')
    .post(function (req, res) {
        lugarApi.dejarSeguir(req, res);
    });
router.route('/aprobar_lugar')
    .post(function (req, res) {
        lugarApi.aprobar_lugar(req, res);
    });

router.route('/calificar_lugar')
    .post(function (req, res) {
        lugarApi.calificar(req, res);
    });
module.exports = router;