'use strict'

const express= require('express');
const router= express.Router();
const bitacoraApi= require('./bitacora.api');

router.route('/visualizar_bitacora')
    .get(function(req, res){
        bitacoraApi.listar_bitacora(req, res);
    })
module.exports=router;