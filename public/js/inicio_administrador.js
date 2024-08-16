'use strict';

const botonIrRegistroUsuarios=document.querySelector('#btnIrRegistroUsuarios');
const botonIrVisualizarUsuarios=document.querySelector('#btnIrVisualizarUsuarios');
const botonIrVisualizarExpulsados=document.querySelector('#btnIrVisualizarExpulsados');
const botonIrVisualizarBitacora=document.querySelector('#btnIrVisualizarBitacora');
const botonIrRegistroIndustrias=document.querySelector('#btnIrRegistroIndustrias');
const botonIrVisualizarIndustrias=document.querySelector('#btnIrVisualizarIndustrias');
const botonIrRegistroCategorias=document.querySelector('#btnIrRegistroCategorias');
const botonIrVisualizarCategorias=document.querySelector('#btnIrVisualizarCategorias');
const botonIrRegistroPatrocinadores=document.querySelector('#btnIrRegistroPatrocinadores');
const botonIrVisualizarPatrocinadores=document.querySelector('#btnIrVisualizarPatrocinadores');
const botonIrReporteActividades=document.querySelector('#btnIrReporteActividades');
const botonIrReporteParticipantes=document.querySelector('#btnIrReporteParticipantes');
const botonIrReporteFecha=document.querySelector('#btnIrReporteFecha');
const botonIrAprobarLugar=document.querySelector('#btnIrAprobarLugar');

botonIrRegistroUsuarios.addEventListener('click', irRegistroUsuarios);
botonIrVisualizarUsuarios.addEventListener('click', irVisualizarUsuarios);
botonIrVisualizarExpulsados.addEventListener('click', irVisualizarExpulsados);
botonIrVisualizarBitacora.addEventListener('click', irVisualizarBitacora);
botonIrRegistroIndustrias.addEventListener('click', irRegistroIndustrias);
botonIrVisualizarIndustrias.addEventListener('click', irVisualizarIndustrias);
botonIrRegistroCategorias.addEventListener('click', irRegistroCategorias);
botonIrVisualizarCategorias.addEventListener('click', irVisualizarCategorias);
botonIrRegistroPatrocinadores.addEventListener('click', irRegistroPatrocinadores);
botonIrVisualizarPatrocinadores.addEventListener('click', irVisualizarPatrocinadores);
botonIrReporteActividades.addEventListener('click',irReportesRanking);
botonIrReporteParticipantes.addEventListener('click', irReportes);
botonIrReporteFecha.addEventListener('click', irReporteFecha);
botonIrAprobarLugar.addEventListener('click', irAprobar);


function irRegistroUsuarios(){
    window.location.href = 'registro_usuarios.html'
}
function irVisualizarUsuarios(){
    window.location.href = 'visualizar_usuarios.html'
}
function irVisualizarExpulsados(){
    window.location.href = 'visualizar_expulsados.html'
}
function irVisualizarBitacora(){
    window.location.href = 'visualizar_bitacora.html'
}
function irRegistroIndustrias(){
    window.location.href = 'registro_industrias.html'
}
function irVisualizarIndustrias(){
    window.location.href = 'visualizar_industrias.html'
}
function irRegistroCategorias(){
    window.location.href = 'registrar_categorias.html'
}
function irVisualizarCategorias(){
    window.location.href = 'visualizar_categorias.html'
}
function irRegistroPatrocinadores(){
    window.location.href = 'registrar_patrocinadores.html'
}
function irVisualizarPatrocinadores(){
    window.location.href = 'visualizar_patrocinadores.html'
}

function irReporteFecha(){
    window.location.href = 'reporte_lugar_fecha.html'
}
function irReportesRanking(){
    window.location.href = 'reporte_ranking_lugar.html'
}
function irReportes(){
    window.location.href = 'inicio_administrador.html'
}

function irAprobar(){
    window.location.href = 'aprobar_lugar.html'
}