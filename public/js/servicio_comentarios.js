'use strict';

function registrarEvaluacion( pvoto, pcomentario, pusuario, pid_perfil, pestado) {
  let respuesta = '';
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/registro_comentario',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
      voto : pvoto,
      comentario: pcomentario,
      usuario: pusuario,
      id_perfil: pid_perfil,
      estado: pestado

    }
  });

  peticion.done(function (response) {
    respuesta = response;
  });

  peticion.fail(function (response) {
    respuesta = response;
  });

  return respuesta;
};
