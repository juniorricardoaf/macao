'use strict'

const express= require('express');
const router= express.Router();

const patrocinadoresApi= require('./patrocinadores.api');

router.route('/registrar_patrocinadores')
    .post(function(req, res){
        patrocinadoresApi.registrar(req, res);
    });

router.route('/visualizar_patrocinadores')
    .get (function(req, res){
         patrocinadoresApi.listar_todos(req, res);
    });
  

    
router.route('/buscar_patrocinador')
.post(function(req , res){
    patrocinadoresApi.buscar_patrocinador(req , res);
});


router.route('/modificar_patrocinador')
.post(function(req , res){
    patrocinadoresApi.modificar_patrocinador(req , res);
});

router.route('/eliminar_patrocinador')
.post(function(req , res){
    patrocinadoresApi.borrar(req , res);
});

module.exports=router;

router.route('/deshabilitar_patrocinador')
.post(function(req , res){
    patrocinadoresApi.deshabilitar(req , res);
});

router.route('/habilitar_patrocinador')
.post(function(req , res){
    patrocinadoresApi.habilitar(req , res);
});


module.exports=router;