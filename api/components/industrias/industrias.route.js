'use strict';
const express = require('express');
const router = express.Router();
const industriaApi = require('./industrias.api');

router.route('/registro_industrias')
    .post(function (req, res) {
        industriaApi.registrar(req, res);
    });

router.route('/visualizar_industrias')
    .get(function (req, res) {
        industriaApi.listar_todos(req, res);
    });


router.route('/buscar_industria')
    .post(function (req, res) {
        industriaApi.buscar_industria(req, res);
    });


router.route('/modificar_industria')
    .post(function (req, res) {
        industriaApi.modificar_industria(req, res);
    });

router.route('/actualizar_industria')
    .post(function (req, res) {
        industriaApi.actualizar_industria(req, res);
    });

router.route('/deshabilitar_industria')
    .post(function (req, res) {
        industriaApi.deshabilitar_industria(req, res);
    });

router.route('/habilitar_industria')
    .post(function (req, res) {
        industriaApi.habilitar_industria(req, res);
    });
router.route('/borrar_industria')
.post(function (req, res) {
    industriaApi.borrar(req, res);
});
   
module.exports = router;


