'use strict';
let id_lugar = localStorage.getItem('lugar');

let listaEventos = obtenerEventos();

let lugar = buscar_lugar(id_lugar);
let id_usuario = sessionStorage.getItem('_id');
let usuario = buscar_usuarios(id_usuario);
let tipodeUsuario = usuario['tipoUsuario'];

let loSigo = usuario.lugares_que_sigo && usuario.lugares_que_sigo.includes(id_lugar);

let sectionLugares = document.querySelector('#lugares');
sectionLugares.innerHTML = '';

let sectionInformacion = document.querySelector('.secciones');

let divCardLugar = document.createElement('div');
divCardLugar.classList.add('cardLugar');

let divContenedorImagen = document.createElement('div');
divContenedorImagen.classList.add('contenedorImagen');

let imagenLugar = document.createElement('img');

if (lugar['imagen']) {
    imagenLugar.src = lugar['imagen'];
} else {
    imagenLugar.src = 'imgs/default-placeholder-300x300.png';
}

divContenedorImagen.appendChild(imagenLugar);
divCardLugar.appendChild(divContenedorImagen);

let divInfoLugar = document.createElement('div');
divInfoLugar.classList.add('divInfo');


let tituloLugar = document.createElement('h2');
tituloLugar.innerText = lugar['nombre'];
divInfoLugar.appendChild(tituloLugar);

let iconoUbicacion = document.createElement('a');
iconoUbicacion.classList.add('far');
iconoUbicacion.classList.add('fa-compass');
divInfoLugar.appendChild(iconoUbicacion);

let parrafoProvincia = document.createElement('p');
divInfoLugar.appendChild(parrafoProvincia);

if (lugar['provincia'] == '1') {

    let nombreProvincia = document.createTextNode('San José')

    parrafoProvincia.appendChild(nombreProvincia)

}
if (lugar['provincia'] == '2') {
    let nombreProvincia = document.createTextNode('Alajuela')

    parrafoProvincia.appendChild(nombreProvincia)
}
if (lugar['provincia'] == '3') {
    let nombreProvincia = document.createTextNode('Heredia')

    parrafoProvincia.appendChild(nombreProvincia)
}
if (lugar['provincia'] == '4') {
    let nombreProvincia = document.createTextNode('Cartago')

    parrafoProvincia.appendChild(nombreProvincia)
}

if (lugar['provincia'] == '5') {
    let nombreProvincia = document.createTextNode('Guanacaste')

    parrafoProvincia.appendChild(nombreProvincia)
}
if (lugar['provincia'] == '6') {
    let nombreProvincia = document.createTextNode('Puntarenas')

    parrafoProvincia.appendChild(nombreProvincia)
}
if (lugar['provincia'] == '7') {
    let nombreProvincia = document.createTextNode('Limón')

    parrafoProvincia.appendChild(nombreProvincia)
}

//puntuación de los votos_______________________________________________
let divVotos = document.createElement('div');
divVotos.classList.add('puntuacion');

let promedio;
let numeroVotos = 0;
let valorVotos = 0;
if (lugar['calificaciones']) {
    for (let i = 0; i < lugar['calificaciones'].length; i++) {
        if (lugar.calificaciones[i]["voto"] == "0") {
        } else {
            valorVotos = valorVotos + parseInt(lugar.calificaciones[i]["voto"]);
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

divInfoLugar.appendChild(cajaCalificacion);



//fin___________________________________________

    let botonSeguir = document.createElement('a');
    botonSeguir.classList.add('seguir');
    botonSeguir.innerText = loSigo && 'Dejar de seguir' || 'Seguir';
    divCardLugar.appendChild(botonSeguir);
    botonSeguir.id_lugar = lugar['_id'];
    botonSeguir.addEventListener('click', seguirLugar);


let divDescripcion = document.querySelector('#tabDescripcion');

let twitter = document.createElement('a');
twitter.classList.add('fab');
twitter.classList.add('fa-twitter-square');
twitter.href = lugar['twitter'];
divDescripcion.appendChild(twitter);

let instagram = document.createElement('a');
instagram.classList.add('fab');
instagram.classList.add("fa-instagram")
instagram.href = lugar['instagram'];
divDescripcion.appendChild(instagram);

let facebook = document.createElement('a');
facebook.classList.add("fab");
facebook.classList.add('fa-facebook-square');
facebook.href = lugar['facebook'];
divDescripcion.appendChild(facebook);

let descripcion = document.createElement('p');
descripcion.innerText = 'Descripción: ' + lugar['descripcion'];
divDescripcion.appendChild(descripcion);

let categoria = document.createElement('p');
let arregloCategorias = "";
for (let i = 0; i < lugar['categorias'].length; i++) {
    arregloCategorias = arregloCategorias + lugar.categorias[i]["nombre"] + ",";
}
categoria.innerText = 'Categoría: ' + arregloCategorias;
divDescripcion.appendChild(categoria);

let direccion = document.createElement('p');
direccion.innerText = 'Dirección: ' + lugar['direccion'];
divDescripcion.appendChild(direccion);
direccion.classList.add('direccion');

let etiquetas = document.createElement('p');
etiquetas.innerText = lugar['etiquetas'];
divDescripcion.appendChild(etiquetas);
etiquetas.classList.add('etiquetas');


const divMapa = document.querySelector('#tabMapa');

const mapa = document.createElement('div');
mapa.id = 'map';
divMapa.appendChild(mapa);

const latitud = document.createElement('span');
latitud.id = 'latitud';
latitud.innerHTML = lugar['latitud'];
divMapa.appendChild(latitud);

const longitud = document.querySelector('span');
longitud.id = 'longitud';
longitud.innerHTML = lugar['longitud'];
divMapa.appendChild(longitud);

const divOpiniones = document.querySelector('#tabOpiniones');

let tituloCalificacion = document.createElement('h2');
tituloCalificacion.classList.add('calificacionTitulo')
tituloCalificacion.innerHTML = 'Calificación:';
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

const divEventos = document.querySelector('#tabEventos');
if (tipodeUsuario == 'Empresario') {
    let botonRegistrarEvento = document.createElement('a');
    botonRegistrarEvento.classList.add('verMas2');
    botonRegistrarEvento.innerHTML = 'Registrar evento';
    divEventos.appendChild(botonRegistrarEvento);
    botonRegistrarEvento.addEventListener('click', mostrarRegistroEvento);
}

function mostrarRegistroEvento() {
    let id_lugar = this.dataset.lugar;
    localStorage.setItem('lugarRegistro', id_lugar);
    window.location.href = 'registrar_evento.html';
}

for (let i = 0; i < listaEventos.length; i++) {

    if (listaEventos[i]['lugar'] === id_lugar) {

        let divCardEvento = document.createElement('div');
        divCardEvento.classList.add('cardEvento');

        let divContenedorImagen = document.createElement('div');
        divContenedorImagen.classList.add('contenedorImagen2');

        let imagenEvento = document.createElement('img');
        imagenEvento.src = listaEventos[i]['imagen'];
        imagenEvento.dataset.id_evento = listaEventos[i]['_id'];

        if (listaEventos[i]['imagen']) {

        } else {
            imagenEvento.src = 'imgs/imgs/default-placeholder-300x300.png';
        }

        divContenedorImagen.appendChild(imagenEvento);
        divCardEvento.appendChild(divContenedorImagen);

        let divInfoEvento = document.createElement('div');
        divInfoEvento.classList.add('divInfo2');


        let tituloEvento = document.createElement('h5');
        tituloEvento.innerText = listaEventos[i]['nombre'];
        divInfoEvento.appendChild(tituloEvento);

        //let iconofecha = document.createElement('a');
        //iconofecha.classList.add('far');
        //iconofecha.classList.add('fa-calendar-alt');
        //divInfoEvento.appendChild(iconofecha);

        let parrafoFecha = document.createElement('p');
        let fecha = listaEventos[i]['fecha'];
        let p = moment(fecha).format('LL');
        parrafoFecha.innerText = p;
        divInfoEvento.appendChild(parrafoFecha);

        //let iconoHora = document.createElement('a');
        //iconoHora.classList.add('far');
        //iconoHora.classList.add('fa-clock');
        //divInfoEvento.appendChild(iconoHora);

        let horaInicio = document.createElement('p');
        horaInicio.innerHTML = listaEventos[i]['hora_Inicio'];
        let minutosInicio = document.createElement('p');
        minutosInicio.innerHTML = listaEventos[i]['minutos_Inicio'];

        if (horaInicio.innerHTML === '0') {
            if (minutosInicio.innerHTML === '0') {
                horaInicio.innerText = 'Hora de inicio: ' + '0' + listaEventos[i]['hora_Inicio'] + ':' + minutosInicio.innerText + '0' + listaEventos[i]['minutos_Inicio'];
            } else {
                horaInicio.innerText = 'Hora de inicio: ' + '0' + listaEventos[i]['hora_Inicio'] + ':' + minutosInicio.innerText + listaEventos[i]['minutos_Inicio'];
            }
        } else {
            if (minutosInicio.innerHTML === '0') {
                minutosInicio.innerHTML = '';
                horaInicio.innerText = 'Hora de inicio: ' + listaEventos[i]['hora_Inicio'] + ':' + minutosInicio.innerText + '0' + listaEventos[i]['minutos_Inicio'];
            } else {
                minutosInicio.innerHTML = '';
                horaInicio.innerText = 'Hora de inicio: ' + listaEventos[i]['hora_Inicio'] + ':' + minutosInicio.innerText + listaEventos[i]['minutos_Inicio'];
            }
        }


        divInfoEvento.appendChild(horaInicio);

        //let iconoUbicacion = document.createElement('a');
        //iconoUbicacion.classList.add('far');
        //iconoUbicacion.classList.add('fa-compass');
        //divInfoEvento.appendChild(iconoUbicacion);

        let ubicacion = document.createElement('p');
        ubicacion.innerText = listaEventos[i]['ubicacion'];
        divInfoEvento.appendChild(ubicacion);


        let moneda = document.createElement('p');
        moneda.innerText = listaEventos[i]['moneda'];


        if (moneda.innerHTML === '-') {
            let precio = document.createElement('p');
            precio.innerText = 'Gratis';
            divCardEvento.appendChild(precio);
            precio.setAttribute("class", "moneda");
        }

        if (moneda.innerHTML === 'Colón') {
            let precio = document.createElement('p');
            precio.innerText = 'Precio: ₡' + listaEventos[i]['precio'];
            divCardEvento.appendChild(precio);
            precio.setAttribute("class", "moneda");
        }

        if (moneda.innerHTML == 'Dólar') {
            let precio = document.createElement('p');
            precio.innerText = 'Precio: $' + listaEventos[i]['precio'];
            divCardEvento.appendChild(precio);
            precio.setAttribute("class", "moneda");
        }

        let botonMostrarPerfil = document.createElement('a');
        botonMostrarPerfil.href = '#';
        botonMostrarPerfil.classList.add('verMas');
        botonMostrarPerfil.innerHTML = 'Ver perfi';
        divCardEvento.appendChild(botonMostrarPerfil);
        botonMostrarPerfil.dataset.id_evento = listaEventos[i]['_id'];


        botonMostrarPerfil.addEventListener('click', mostrarPerfilEvento);
        imagenEvento.addEventListener('click', mostrarPerfilEvento);

        function mostrarPerfilEvento() {
            let id_evento = this.dataset.id_evento;
            localStorage.setItem('perfilEvento', id_evento);
            window.location.href = 'perfil_evento.html';
        }

        divCardEvento.appendChild(divInfoEvento)
        divEventos.appendChild(divCardEvento);
    }
}



divCardLugar.appendChild(divInfoLugar);
sectionLugares.appendChild(divCardLugar);
sectionInformacion.appendChild(divDescripcion);
sectionInformacion.appendChild(divMapa);
sectionInformacion.appendChild(divOpiniones);
sectionInformacion.appendChild(divEventos);

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

function seguirLugar() {
    swal.fire({
        title: loSigo && '¿Seguro que desea dejar de seguir lugar?' || '¿Seguro que desea seguir lugar?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: loSigo && 'Si, dejar de seguir' || 'Si, seguir'
    }).then((result) => {
        if (result.value) {
            const id_usuario = sessionStorage.getItem('_id');
            seguirLugarServicio(this.id_lugar, id_usuario, loSigo, respuestaLoSigo => {
                loSigo = respuestaLoSigo;
                botonSeguir.innerText = loSigo && 'Dejar de seguir' || 'Seguir';
                swal.fire(
                    'Listo',
                    'Lugar seguido',
                    'success'
                )
            });
        }
    })
}
function mostrarComentarios(ptbodyC) {

    let lugar = buscar_lugar(id_lugar);
    let tbody = ptbodyC;

    tbody.innerText = '';

    let comentarios = lugar['calificaciones'];
    console.log(comentarios)



    if (lugar['calificaciones']) {
        for (let i = 0; i < lugar['calificaciones'].length; i++) {

            if (lugar.calificaciones[i]["estado"] == "Habilitado") {
                let fila = tbody.insertRow();
                let celdaComentarios = fila.insertCell();

                let usuarioC = buscar_usuarios(lugar.calificaciones[i]["idUsuarioC"]);

                let fotoUsuario = document.createElement('img');
                fotoUsuario.setAttribute('class', "image_preview" + i);
                celdaComentarios.appendChild(fotoUsuario);
                document.querySelector(".image_preview" + i).src = usuarioC['imagen'];

                let labelNombre = document.createElement('label');
                labelNombre.innerText = usuarioC["nombreUsuario"];
                celdaComentarios.appendChild(labelNombre);

                if (lugar.calificaciones[i]["voto"] == "0") {

                } else {
                    let voto = parseInt(lugar.calificaciones[i]["voto"]);
                    let labelVoto = document.createElement('label');
                    labelVoto.innerText = voto + "/5";
                    celdaComentarios.appendChild(labelVoto);
                }

                let comentario = document.createElement('p');
                comentario.innerText = lugar.calificaciones[i]["comentario"];
                celdaComentarios.appendChild(comentario);



            } else {

            }
        }
    }
}