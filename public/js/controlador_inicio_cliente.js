'use strict';

const id_usuario = sessionStorage.getItem('_id');

const usuarioConectado = buscar_usuarios(id_usuario, true);

const eventosDeLugaresQueSigo = document.getElementById('lugares_que_sigo');
const eventosReservados = document.getElementById('eventos_reservados');

eventosDeLugaresQueSigo.innerHTML = usuarioConectado.eventos &&
  usuarioConectado.eventos.map(e => `<div class="card"><span class="nombreE">${e.nombre}</span>  <img src="${e.imagen}"/>  <a class="verMas" href="#" onclick="abrirPerfil('${e._id}');">Ver evento</a> </div>`).join('');

const abrirPerfil = id_eventoE => {
  console.log('abriendo evento', id_eventoE);
  localStorage.setItem('perfilEvento', id_eventoE);
  window.location = '/public/perfil_evento.html';
}
eventosReservados.innerHTML = usuarioConectado.reservados &&
  usuarioConectado.reservados.map(e => `<div class="card"> <img src="${e.imagen}"/> <span class="nombreE">${e.nombre}</span> </div>`).join('');

console.log(usuarioConectado);