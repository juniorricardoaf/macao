'use strict'

const express= require('express');
const router= express.Router();
const categoriaApi= require('./categorias.api');

router.route('/registrar_categorias')
    .post(function(req, res){
        categoriaApi.registrar(req,res)
    });

router.route('/visualizar_categorias') 
.get(function(req , res){
    categoriaApi.listar_todos(req , res);
});

router.route('/buscar_categoria')
.post(function(req , res){
    categoriaApi.buscar_categoria(req , res);
});


router.route('/modificar_categoria')
.post(function(req , res){
    categoriaApi.modificar_categoria(req , res);
});

router.route('/borrar_categoria')
.post(function(req , res){
    categoriaApi.borrar(req , res);
});

router.route('/deshabilitar_categoria')
.post(function(req, res){
    categoriaApi.deshabilitar (req, res);
  });        

  router.route('/habilitar_categoria')
  .post(function(req, res){
      categoriaApi.habilitar (req, res);
    });        

module.exports=router;
