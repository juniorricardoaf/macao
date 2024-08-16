'use strict';
const express = require('express');
const router = express.Router();

const userApi = require('./usuarios.api');

router.route('/registro_usuarios')

    .post(function (req, res) {
        userApi.registrar(req, res);
    });

router.route('/visualizar_usuarios')
    .get(function (req, res) {
        userApi.listar_todos(req, res);
    });

router.route('/inicio_sesion')
    .post(function (req, res) {
        userApi.ingresar(req, res);

    });
router.route('/olvidar_contrasena')
    .post(function (req, res) {
        userApi.olvidar(req, res);

    });
router.route('/buscar_usuarios')
    .post(function (req, res) {
        userApi.buscar_usuarios(req, res);
    });

router.route('/deshabilitar_usuario')
    .post(function (req, res) {
        userApi.deshabilitar_usuario(req, res);
    });

router.route('/habilitar_usuario')
    .post(function (req, res) {
        userApi.habilitar_usuario(req, res);
    });


router.route('/modificar_perfil')
    .post(function (req, res) {
        userApi.modificar_perfil(req, res);
    });
router.route('/modificar_contrasena')
    .post(function (req, res) {
        userApi.modificar_perfil(req, res);
    });
router.route('/expulsar_usuario')
    .post(function (req, res) {
        userApi.expulsar_usuario(req, res);
    });

router.route('/borrar_usuario')
    .post(function (req, res) {
        userApi.borrar(req, res);
    });


module.exports = router;