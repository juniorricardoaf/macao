'use strict';
const id_eventoE = localStorage.getItem('perfilEvento');

let evento = buscar_evento(id_eventoE);
let nombreEvento = evento['nombre'];

let sectionEventos = document.querySelector('#eventos');
sectionEventos.innerHTML = '';

let sectionInformacion = document.querySelector('.secciones');

let divCardEvento = document.createElement('div');
divCardEvento.classList.add('cardEvento');

let divContenedorImagen = document.createElement('div');
divContenedorImagen.classList.add('contenedorImagen');

let imagenEvento = document.createElement('img');

if (evento['imagen']) {
    imagenEvento.src = evento['imagen'];
} else {
    imagenEvento.src = 'imgs/imgs/default-placeholder-300x300.png';
}

divContenedorImagen.appendChild(imagenEvento);
divCardEvento.appendChild(divContenedorImagen);

let divInfoEvento = document.createElement('div');
divInfoEvento.classList.add('divInfo');


let tituloEvento = document.createElement('h2');
tituloEvento.innerText = evento['nombre'];
divInfoEvento.appendChild(tituloEvento);

let iconofecha = document.createElement('a');
iconofecha.classList.add('far');
iconofecha.classList.add('fa-calendar-alt');
divInfoEvento.appendChild(iconofecha);

let parrafoFecha = document.createElement('p');
let fecha = evento['fecha'];
let p = moment(fecha).format('LL');
parrafoFecha.innerText = 'Fecha: ' + p;
divInfoEvento.appendChild(parrafoFecha);

let iconoHora = document.createElement('a');
iconoHora.classList.add('far');
iconoHora.classList.add('fa-clock');
divInfoEvento.appendChild(iconoHora);

let horaInicio = document.createElement('p');
horaInicio.innerHTML = evento['hora_Inicio'];
let minutosInicio = document.createElement('p');
minutosInicio.innerHTML = evento['minutos_Inicio']; 
if (horaInicio.innerHTML === '0') {
    if (minutosInicio.innerHTML === '0') {
        horaInicio.innerText = 'Hora de inicio: ' + '0' + evento['hora_Inicio'] + ':' + minutosInicio.innerText + '0' + evento['minutos_Inicio'];
    } else {
        horaInicio.innerText = 'Hora de inicio: ' + '0' + evento['hora_Inicio'] + ':' + minutosInicio.innerText + evento['minutos_Inicio'];
    }
} else {
    if (minutosInicio.innerHTML === '0') {
        minutosInicio.innerHTML = '';
        horaInicio.innerText = 'Hora de inicio: ' + evento['hora_Inicio'] + ':' + minutosInicio.innerText + '0' + evento['minutos_Inicio'];
    } else {
        minutosInicio.innerHTML = '';
        horaInicio.innerText = 'Hora de inicio: ' + evento['hora_Inicio'] + ':' + minutosInicio.innerText + evento['minutos_Inicio'];
    }
}

divInfoEvento.appendChild(horaInicio);

let iconoUbicacion = document.createElement('a');
iconoUbicacion.classList.add('far');
iconoUbicacion.classList.add('fa-compass');
divInfoEvento.appendChild(iconoUbicacion);

let ubicacion = document.createElement('p');
ubicacion.innerText = 'Ubicación: ' + evento['ubicacion'];
divInfoEvento.appendChild(ubicacion);
//puntuación de los votos_______________________________________________
let divVotos = document.createElement('div');
divVotos.classList.add('puntuacion');

let promedio;
let numeroVotos = 0;
let valorVotos = 0;
if (evento['calificaciones']) {
    for (let i = 0; i < evento['calificaciones'].length; i++) {
    if (evento.calificaciones[i]["voto"] == "0") {
    } else {
        valorVotos = valorVotos + parseInt(evento.calificaciones[i]["voto"]);
        numeroVotos++;
    }
}
}

promedio = (parseFloat(valorVotos / numeroVotos)).toPrecision(2);

let lapa1 = document.createElement('spam');
divVotos.appendChild(lapa1);
lapa1.classList.add('lapa');
if (promedio >= 2 && promedio < 3) {
    let lapa2 = document.createElement('spam');
    divVotos.appendChild(lapa2);
    lapa2.classList.add('lapa');
} else if (promedio >= 3 && promedio < 4) {
    let lapa2 = document.createElement('spam');
    divVotos.appendChild(lapa2);
    lapa2.classList.add('lapa');
    let lapa3 = document.createElement('spam');
    divVotos.appendChild(lapa3);
    lapa3.classList.add('lapa');

} else if (promedio >= 4 && promedio < 5) {
    let lapa2 = document.createElement('spam');
    divVotos.appendChild(lapa2);
    lapa2.classList.add('lapa');
    let lapa3 = document.createElement('spam');
    divVotos.appendChild(lapa3);
    lapa3.classList.add('lapa');
    let lapa4 = document.createElement('spam');
    divVotos.appendChild(lapa4);
    lapa4.classList.add('lapa');

} else if (promedio == 5) {
    let lapa2 = document.createElement('spam');
    divVotos.appendChild(lapa2);
    lapa2.classList.add('lapa');
    let lapa3 = document.createElement('spam');
    divVotos.appendChild(lapa3);
    lapa3.classList.add('lapa');
    let lapa4 = document.createElement('spam');
    divVotos.appendChild(lapa4);
    lapa4.classList.add('lapa');
    let lapa5 = document.createElement('spam');
    divVotos.appendChild(lapa5);
    lapa5.classList.add('lapa');
}

let cajaCalificacion = document.createElement('div');

cajaCalificacion.classList.add('cajaCalificacion');

let cantidad = document.createElement('label');
cajaCalificacion.appendChild(cantidad);
cantidad.innerText = "Cantidad de votaciones: " + numeroVotos;
let media = document.createElement('label');
cajaCalificacion.appendChild(media);
media.innerText = "Puntaje: " + promedio + "/5";


cajaCalificacion.appendChild(divVotos);

divInfoEvento.appendChild(cajaCalificacion);



//fin___________________________________________
let moneda = document.createElement('p');
moneda.innerText = evento['moneda'];


if (moneda.innerHTML === '-') {
    let precio = document.createElement('p');
    precio.innerText = 'Gratis';
    divCardEvento.appendChild(precio);
    precio.setAttribute("class", "moneda");
}

if (moneda.innerHTML === 'Colón') {
    let precio = document.createElement('p');
    precio.innerText = 'Precio: ₡' + evento['precio'];
    divCardEvento.appendChild(precio);
    precio.setAttribute("class", "moneda");
}

if (moneda.innerHTML == 'Dólar') {
    let precio = document.createElement('p');
    precio.innerText = 'Precio: $' + evento['precio'];
    divCardEvento.appendChild(precio);
    precio.setAttribute("class", "moneda");
}

const id_usuarioZ = sessionStorage.getItem('_id');
let usuario = buscar_usuarios(id_usuarioZ);
let reservacion = usuario['eventosReservados'];
let nombreUsuario = usuario['nombreUsuario'];
let correoUsuario = usuario['correo_1'];
let tipoUsuarioD = usuario['tipoUsuario'];
let reservado = 0;

let cuposAcumulados =  evento['cupos_Disponibles'];

if(cuposAcumulados == undefined){
    cuposAcumulados = 0;    
}


let cuposEvento = evento['cant_Espacios'];

if (tipoUsuarioD == 'Cliente') {
    for (let i = 0; i < reservacion.length; i++) {
        if (id_eventoE == reservacion[i]) {
            reservado = 1;
        }
    }
    if (reservado == 1) {

        if((Number(cuposEvento) == cuposAcumulados)){
            let divBtnReservar = document.createElement('div');
            divBtnReservar.classList.add('boton');
            divBtnReservar.classList.add('bntReservar');
            let botonReservar = document.createElement('a');
            botonReservar.classList.add('button');
            botonReservar.classList.add('reservar');
            botonReservar.innerText = 'Agotado';
            divBtnReservar.appendChild(botonReservar);
            divCardEvento.appendChild(divBtnReservar);
        }else{
            let divBtnReservar = document.createElement('div');
            divBtnReservar.classList.add('boton');
            divBtnReservar.classList.add('bntReservar');
            let botonReservar = document.createElement('a');
            botonReservar.classList.add('button');
            botonReservar.classList.add('reservar');
            botonReservar.innerText = 'Reservado';
            divBtnReservar.appendChild(botonReservar);
            divCardEvento.appendChild(divBtnReservar);
            botonReservar.id_evento = evento['_id'];
            botonReservar.addEventListener('click', eliminarReserva);
        }    

    } else {
        let divBtnReservar = document.createElement('div');
        divBtnReservar.classList.add('boton');
        divBtnReservar.classList.add('bntReservar');
        let botonReservar = document.createElement('a');
        botonReservar.classList.add('button');
        botonReservar.classList.add('reservar');
        botonReservar.innerText = 'Reservar';
        divBtnReservar.appendChild(botonReservar);
        divCardEvento.appendChild(divBtnReservar);
        botonReservar.id_evento = evento['_id'];
        botonReservar.addEventListener('click', reservarEvento);
    }

}

let cuposTotales = document.createElement('label');
cuposTotales.innerText = 'Cupos Disponibles: ' + (Number(cuposEvento) - cuposAcumulados);
cuposTotales.classList.add('cupos_Disponibles');
divCardEvento.appendChild(cuposTotales);

let divDescripcion = document.querySelector('#tabDescripcion');

let descripcion = document.createElement('p');
descripcion.innerText = 'Descripción: ' + evento['descripcion'];
divDescripcion.appendChild(descripcion);

let categoria =  document.createElement('p');
let categorias="";

for(let i=0 ; i < evento['categorias'].length ; i++){
    categorias=categorias+ evento.categorias[i]['nombreCategoria']+", ";
}

categoria.innerText = 'Categorías: ' + categorias;
divDescripcion.appendChild(categoria);

let minutos_Inicio = document.createElement('p');
if (evento.minutos_Inicio === '0') {
    minutos_Inicio.innerHTML = 'Hora de Inicio: ' + evento['hora_Inicio'] + ":" + evento['minutos_Inicio'] + "0";
} else {
    minutos_Inicio.innerHTML = 'Hora de Inicio: ' + evento['hora_Inicio'] + ":" + evento['minutos_Inicio'];
}

let minutos_Fin = document.createElement('p');
if (evento.minutos_Fin === '0') {
    minutos_Fin.innerHTML = 'Hora de Finalización: ' + evento['hora_Fin'] + ":" + evento['minutos_Fin'] + "0";
} else {
    minutos_Fin.innerHTML = 'Hora de Finalización: ' + evento['hora_Fin'] + ":" + evento['minutos_Fin'];
}

let cantEspacios = document.createElement('p');
cantEspacios.innerText = 'Cantidad de Espacios: ' + evento['cant_Espacios'];

let moneda2 = document.createElement('p');
moneda2.innerText = evento['moneda'];
let precio = '';

if (moneda2.innerHTML === '-') {
    precio = document.createElement('p');
    precio.innerText = 'Gratis';
    divCardEvento.appendChild(precio);
    precio.setAttribute("class", "precio");
}

if (moneda2.innerHTML === 'Colón') {
    precio = document.createElement('p');
    precio.innerText = 'Precio: ₡' + evento['precio'];
    precio.setAttribute("class", "precio");
}

if (moneda2.innerHTML == 'Dólar') {
    precio = document.createElement('p');
    precio.innerText = 'Precio: $' + evento['precio'];
    precio.setAttribute("class", "precio");
}

let patrocinador =  document.createElement('p');
let patrocinadores="";

for(let i=0 ; i < evento['patrocinadores'].length ; i++){
    patrocinadores=patrocinadores+ evento.patrocinadores[i]['nombrePatrocinador']+", ";
}

patrocinador.innerText = 'Patrocinadores: ' + patrocinadores;
divDescripcion.appendChild(patrocinador);


let etiquetas = document.createElement('label');
etiquetas.innerText = evento['etiqueta'];
etiquetas.classList.add('etiquetas');


const divMapa = document.querySelector('#tabMapa');

const mapa = document.createElement('div');
mapa.id = 'map';
divMapa.appendChild(mapa);

const latitud = document.createElement('span');
latitud.id = 'latitud';
latitud.innerHTML = evento['latitud'];
divMapa.appendChild(latitud);

const longitud = document.querySelector('span');
longitud.id = 'longitud';
longitud.innerHTML = evento['longitud'];
divMapa.appendChild(longitud);

const divOpiniones = document.querySelector('#tabOpiniones');

let tituloCalificacion = document.createElement('h2');
tituloCalificacion.innerHTML = 'Dejanos tu opinión';
divOpiniones.appendChild(tituloCalificacion);

let divStars = document.createElement('div');
divStars.setAttribute('data-rating', 0);
divStars.classList.add('stars');

let calificacion1 = document.createElement('span');
divStars.appendChild(calificacion1);
calificacion1.classList.add('star');

let calificacion2 = document.createElement('span');
divStars.appendChild(calificacion2);
calificacion2.classList.add('star');

let calificacion3 = document.createElement('span');
divStars.appendChild(calificacion3);
calificacion3.classList.add('star');

let calificacion4 = document.createElement('span');
divStars.appendChild(calificacion4);
calificacion4.classList.add('star');

let calificacion5 = document.createElement('span');
divStars.appendChild(calificacion5);
calificacion5.classList.add('star');

divOpiniones.appendChild(divStars);

const inputComentar = document.createElement('textarea');
inputComentar.classList.add('inputComentar');
inputComentar.setAttribute("maxlength", 150);
divOpiniones.appendChild(inputComentar);
/*_____________________________________________________________________________________________*/
let tablaC = document.createElement('table');
tablaC.setAttribute("id", "tblComentarios");
tablaC.classList.add('tabla');
let theadC = document.createElement('thead');
tablaC.appendChild(theadC);
let theadtrC = document.createElement('tr');
theadC.appendChild(theadtrC);
let theadthC = document.createElement('th');
theadtrC.appendChild(theadthC);
theadthC.textContent = "Opiniones";
let tbodyC = document.createElement('tbody');
tablaC.appendChild(tbodyC);
tbodyC.classList.add('bodyComentarios');

divOpiniones.appendChild(tablaC);
mostrarComentarios(tbodyC);

/*_____________________________________________________________________________________________*/




let divBtnCalificar = document.createElement('div');
divBtnCalificar.classList.add('boton');
divBtnCalificar.classList.add('calificar');

const botonCalificar = document.createElement('button');
botonCalificar.innerHTML = 'Calificar';
botonCalificar.classList.add('button');
botonCalificar.classList.add('btnCalificar');
divBtnCalificar.appendChild(botonCalificar);
divOpiniones.appendChild(divBtnCalificar);

divDescripcion.appendChild(minutos_Inicio);
divDescripcion.appendChild(minutos_Fin);
divDescripcion.appendChild(cantEspacios);
divDescripcion.appendChild(precio);
divDescripcion.appendChild(etiquetas);

divCardEvento.appendChild(divInfoEvento);
sectionEventos.appendChild(divCardEvento);
sectionInformacion.appendChild(divDescripcion);
sectionInformacion.appendChild(divMapa)
sectionInformacion.appendChild(divOpiniones);

$(document).ready(function () {
    $('ul.tabs li a:first').addClass('active');
    $('.secciones article').hide();
    $('.secciones article:first').show();

    $('ul.tabs li a').click(function () {
        $('ul.tabs li a').removeClass('active');
        $(this).addClass('active');
        $('.secciones article').hide();

        var activeTab = $(this).attr('href');
        $(activeTab).show();
        return false;
    });
});


function reservarEvento() {
    swal.fire({
        title: '¿Seguro que desea reservar el evento?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, reservar'
    }).then((result) => {
        if (result.value) {
            swal.fire(
                'Listo',
                'Evento reservado.',
                'success'
            )
        }
    })
}

function mostrarComentarios(ptbodyC) {

    let evento = buscar_evento(id_eventoE);
    let tbody = ptbodyC;

    tbody.innerText = '';

    let comentarios = evento['calificaciones'];
    console.log(comentarios)



    if (evento['calificaciones'].length > 0) {
        for (let i = 0; i < evento['calificaciones'].length; i++) {

            if (evento.calificaciones[i]["estado"] == "Habilitado") {
                let fila = tbody.insertRow();
                let celdaComentarios = fila.insertCell();

                let usuarioC = buscar_usuarios(evento.calificaciones[i]["idUsuarioC"]);
        
                let fotoUsuario = document.createElement('img');
                fotoUsuario.setAttribute('class', "image_preview"+i);
                celdaComentarios.appendChild(fotoUsuario);
                document.querySelector(".image_preview"+i).src = usuarioC['imagen'];

                let labelNombre = document.createElement('label');
                labelNombre.innerText = usuarioC["nombreUsuario"];
                celdaComentarios.appendChild(labelNombre);

                if (evento.calificaciones[i]["voto"] == "0") {

                } else {
                    let voto = parseInt(evento.calificaciones[i]["voto"]);
                    let labelVoto = document.createElement('label');
                    labelVoto.innerText = voto + "/5";
                    celdaComentarios.appendChild(labelVoto);
                }

                let comentario = document.createElement('p');
                comentario.innerText = evento.calificaciones[i]["comentario"];
                celdaComentarios.appendChild(comentario);

            } else {

            }
        }
    }
}
function reservarEvento() {
    cuposAcumulados++;
    swal.fire({
        title: '¿Seguro que desea reservar el evento?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, reservar'
    }).then((result) => {
        if (result.value) {
            const id_usuario = sessionStorage.getItem('_id');
            reservarEventoServicio(this.id_evento, id_usuario, correoUsuario, nombreEvento, nombreUsuario)
            cuposAcumuladosServicio(this.id_evento, cuposAcumulados)
            usuarioReservasServicio(this.id_evento, id_usuario);
            swal.fire(
                'Listo',
                'Evento reservado.',
                'success'
            )
            setTimeout(function redirection() { window.location.href = 'perfil_evento.html'; }, 1200);
        };
    });
};

function eliminarReserva() {
    cuposAcumulados = cuposAcumulados - 1;
    swal.fire({
        title: '¿Seguro que desea eliminar la reserva?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar'
    }).then((result) => {
        if (result.value) {
            const id_usuario = sessionStorage.getItem('_id');
            eliminarReservaServicio(this.id_evento, id_usuario, correoUsuario, nombreEvento, nombreUsuario);
            cuposAcumuladosServicio(this.id_evento, cuposAcumulados);
            usuarioEliminarReservasServicio(this.id_evento, id_usuario);
            swal.fire(
                'Listo',
                'Reservación eliminada.',
                'success'
            )
            setTimeout(function redirection() { window.location.href = 'perfil_evento.html'; }, 1200);
        };
    });
};
