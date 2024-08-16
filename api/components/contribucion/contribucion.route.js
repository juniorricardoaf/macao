'use strict'

const express= require('express');
const router= express.Router();
const contribucionApi= require('./contribucion.api');

router.route('/registrar_contribucion')
    .post(function(req, res){
        contribucionApi.registrar(req, res);
    });

router.route('/visualizar_contribucion')
    .get (function(req, res){
         contribucionApi.listar_todos(req, res);
    });


module.exports=router;