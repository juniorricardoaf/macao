'use strict'
const inputTp = document.querySelector('#txttp');
const inputFiltrar = document.querySelector('#txtFiltrar');

function ocultar() {
    if (this.value == "Lugar") {
        document.querySelector('#tblLugar').style.display = 'table';
        document.querySelector('#tblEvento').style.display = 'none';
        mostrarReporteRankingL();
    } else if (this.value == "Evento") {
        mostrarReporteRankingE();
        document.querySelector('#tblEvento').style.display = 'table';
        document.querySelector('#tblLugar').style.display = 'none';
    }
};

inputTp.addEventListener('change', ocultar);


function mostrarReporteRankingL() {
    
    inputFiltrar.addEventListener('keyup', mostrarReporteRankingL);
    let filtro = inputFiltrar.value;
    let listaLugares = obtenerLugares();
    let tbody2 = document.querySelector('#tblLugar tbody');
    tbody2.innerHTML = '';

    //lista de lugares
    for (let i = 0; i < listaLugares.length; i++) {
        let idLugar = listaLugares[i]['_id'];
        let lugar = buscar_lugar(idLugar);
        let promedio;
        let numeroVotos = 0;
        let valorVotos = 0;
        for (let i = 0; i < lugar['calificaciones'].length; i++) {
            if (lugar.calificaciones[i]["voto"] == "0") {
            } else {
                valorVotos = valorVotos + parseInt(lugar.calificaciones[i]["voto"]);
                numeroVotos++;
            }
        }
        promedio = (parseFloat(valorVotos / numeroVotos)).toPrecision(2);
        if (promedio == "NaN") {
            if (listaLugares[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                promedio.includes(filtro.toLowerCase())
            ) {
                let fila2 = tbody2.insertRow();

                let celdaNombre2 = fila2.insertCell();
                let celdaCalificacion2 = fila2.insertCell();

                celdaNombre2.innerHTML = listaLugares[i]['nombre'];
                celdaCalificacion2.innerHTML = "Sin Calificaciones";
            }
        } else {
            if (listaLugares[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                promedio.includes(filtro.toLowerCase())) {

                if (listaLugares[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                    promedio.includes(filtro.toLowerCase())
                ) {
                    let fila2 = tbody2.insertRow();
                    let celdaNombre2 = fila2.insertCell();
                    let celdaCalificacion2 = fila2.insertCell();

                    celdaNombre2.innerHTML = listaLugares[i]['nombre'];
                    let lapa1 = document.createElement('spam');
                    celdaCalificacion2.appendChild(lapa1);
                    lapa1.classList.add('lapa');
                    if (promedio >= 2 && promedio < 3) {
                        let lapa2 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa2);
                        lapa2.classList.add('lapa');

                    } else if (promedio >= 3 && promedio < 4) {
                        let lapa2 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa2);
                        lapa2.classList.add('lapa');
                        let lapa3 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa3);
                        lapa3.classList.add('lapa');

                    } else if (promedio >= 4 && promedio < 5) {
                        let lapa2 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa2);
                        lapa2.classList.add('lapa');
                        let lapa3 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa3);
                        lapa3.classList.add('lapa');
                        let lapa4 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa4);
                        lapa4.classList.add('lapa');

                    } else if (promedio == 5) {
                        let lapa2 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa2);
                        lapa2.classList.add('lapa');
                        let lapa3 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa3);
                        lapa3.classList.add('lapa');
                        let lapa4 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa4);
                        lapa4.classList.add('lapa');
                        let lapa5 = document.createElement('spam');
                        celdaCalificacion2.appendChild(lapa5);
                        lapa5.classList.add('lapa');
                    }
                    let puntos = document.createElement('div');
                    celdaCalificacion2.appendChild(puntos);
                    puntos.innerText = promedio + "/5";


                }
            }
        }
    }
}
function mostrarReporteRankingE() {
    inputFiltrar.addEventListener('keyup', mostrarReporteRankingE);
    let filtro = inputFiltrar.value;
    let listaEventos = obtenerEventos();
    let tbody = document.querySelector('#tblEvento tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < listaEventos.length; i++) {
        let idEvento = listaEventos[i]['_id'];
        let evento = buscar_evento(idEvento);
        let promedio;
        let numeroVotos = 0;
        let valorVotos = 0;
        for (let i = 0; i < evento['calificaciones'].length; i++) {
            if (evento.calificaciones[i]["voto"] == "0") {
            } else {
                valorVotos = valorVotos + parseInt(evento.calificaciones[i]["voto"]);
                numeroVotos++;
            }
        }
        promedio = (parseFloat(valorVotos / numeroVotos)).toPrecision(2);
        if (promedio == "NaN") {
            if (listaEventos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                promedio.includes(filtro.toLowerCase())) {
                let fila = tbody.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaCalificacion = fila.insertCell();

                celdaNombre.innerHTML = listaEventos[i]['nombre'];
                celdaCalificacion.innerHTML = "Sin Calificaciones";
            }

        } else {

            if (listaEventos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                promedio.includes(filtro.toLowerCase())
            ) {
                let fila = tbody.insertRow();
                let celdaNombre = fila.insertCell();
                let celdaCalificacion = fila.insertCell();

                celdaNombre.innerHTML = listaEventos[i]['nombre'];
                let lapa1 = document.createElement('spam');
                celdaCalificacion.appendChild(lapa1);
                lapa1.classList.add('lapa');
                if (promedio >= 2 && promedio < 3) {
                    let lapa2 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa2);
                    lapa2.classList.add('lapa');
                } else if (promedio >= 3 && promedio < 4) {
                    let lapa2 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa2);
                    lapa2.classList.add('lapa');
                    let lapa3 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa3);
                    lapa3.classList.add('lapa');

                } else if (promedio >= 4 && promedio < 5) {
                    let lapa2 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa2);
                    lapa2.classList.add('lapa');
                    let lapa3 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa3);
                    lapa3.classList.add('lapa');
                    let lapa4 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa4);
                    lapa4.classList.add('lapa');

                } else if (promedio == 5) {
                    let lapa2 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa2);
                    lapa2.classList.add('lapa');
                    let lapa3 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa3);
                    lapa3.classList.add('lapa');
                    let lapa4 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa4);
                    lapa4.classList.add('lapa');
                    let lapa5 = document.createElement('spam');
                    celdaCalificacion.appendChild(lapa5);
                    lapa5.classList.add('lapa');
                }
                let puntos = document.createElement('div');
                celdaCalificacion.appendChild(puntos);
                puntos.innerText = promedio + "/5";


            }
        }
    }
}