'use strict';
mostrarFiltroCategorias();
const inputFiltrar = document.querySelector('#txtFiltrar');
let inputCategoria = document.querySelector('#txtCategorias');
let inputMinimo = document.querySelector('#numMin');
let inputMaximo = document.querySelector('#numMax');
let id_usuario = sessionStorage.getItem('_id');

let listaEventos = obtenerEventos();


if (id_usuario) {
    let usuarioEvento = buscar_usuarios(id_usuario);
    let tipodeUsuarioEvento = usuarioEvento['tipoUsuario'];

    if (tipodeUsuarioEvento == 'Empresario') {

        mostrarCardsEventoss();

        inputFiltrar.addEventListener('keyup', mostrarCardsEventos);
        inputCategoria.addEventListener('click', mostrarCardsEventoss);
        inputMinimo.addEventListener('keyup', mostrarCardsEventos);
        inputMaximo.addEventListener('keyup', mostrarCardsEventos);
        inputMinimo.addEventListener('change', mostrarCardsEventos);
        inputMaximo.addEventListener('change', mostrarCardsEventos);

        function mostrarCardsEventos() {
            let filtro = inputFiltrar.value;
            let listaEventos = obtenerEventos();
            let sectionEventos = document.querySelector('#eventos');
            sectionEventos.innerHTML = '';
            const precioMinimo = inputMinimo.value;
            const precioMaximo = inputMaximo.value;

            for (let i = 0; i < listaEventos.length; i++) {

                if (listaEventos[i]['id_Usuario'] === id_usuario) {

                    if (
                        listaEventos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                        listaEventos[i]['fecha'].toLowerCase().includes(filtro.toLowerCase()) ||
                        listaEventos[i]['hora_Inicio'].toLowerCase().includes(filtro.toLowerCase()) ||
                        listaEventos[i]['ubicacion'].toLowerCase().includes(filtro.toLowerCase()) && // text filter
                        (!precioMinimo || listaEventos[i]['precio'] >= Number(precioMinimo)) && // min filter
                        (!precioMaximo || listaEventos[i]['precio'] <= Number(precioMaximo)) // max filter
                    ) {

                        let divCardEvento = document.createElement('div');
                        divCardEvento.classList.add('cardEvento');

                        let divContenedorImagen = document.createElement('div');
                        divContenedorImagen.classList.add('contenedorImagen');

                        let divStars = document.createElement('div');
                        divStars.setAttribute('data-rating', 0);
                        divStars.classList.add('stars');

                        let imagenEvento = document.createElement('img');

                        if (listaEventos[i]['imagen']) {
                            imagenEvento.src = listaEventos[i]['imagen'];
                        } else {
                            imagenEvento.src = 'imgs/imgs/default-placeholder-300x300.png';
                        }

                        divContenedorImagen.appendChild(imagenEvento);
                        divCardEvento.appendChild(divContenedorImagen);

                        let divInfoEvento = document.createElement('div');
                        divInfoEvento.classList.add('divInfo');


                        let tituloEvento = document.createElement('h5');
                        tituloEvento.innerText = listaEventos[i]['nombre'];
                        divInfoEvento.appendChild(tituloEvento);

                        let iconofecha = document.createElement('a');
                        iconofecha.classList.add('far');
                        iconofecha.classList.add('fa-calendar-alt');
                        divInfoEvento.appendChild(iconofecha);

                        let parrafoFecha = document.createElement('p');
                        let fecha = listaEventos[i]['fecha'];
                        let p = moment(fecha).format('LL');
                        parrafoFecha.innerText = p;
                        divInfoEvento.appendChild(parrafoFecha);

                        let iconoHora = document.createElement('a');
                        iconoHora.classList.add('far');
                        iconoHora.classList.add('fa-clock');
                        divInfoEvento.appendChild(iconoHora);

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

                        let iconoUbicacion = document.createElement('a');
                        iconoUbicacion.classList.add('far');
                        iconoUbicacion.classList.add('fa-compass');
                        divInfoEvento.appendChild(iconoUbicacion);

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

                        let botonModificar = document.createElement('a');
                        botonModificar.href = '#';
                        botonModificar.classList.add('botonEstado');
                        botonModificar.classList.add('btnModificar');
                        botonModificar.innerHTML = 'Modificar';
                        divInfoEvento.appendChild(botonModificar);
                        botonModificar.dataset.id_evento = listaEventos[i]['_id'];

                        let botonEliminar = document.createElement('a');
                        botonEliminar.href = '#';
                        botonEliminar.classList.add('botonEstado');
                        botonEliminar.classList.add('btnEliminar');
                        botonEliminar.innerHTML = 'Eliminar';
                        divInfoEvento.appendChild(botonEliminar);
                        botonEliminar.dataset.id_evento = listaEventos[i]['_id'];


                        if (listaEventos[i]['estado'] == 'Habilitado') {
                            let botonDeshabilitar = document.createElement('a');
                            botonDeshabilitar.href = '#';
                            botonDeshabilitar.textContent = 'Habilitado';
                            botonDeshabilitar.classList.add('botonEstado');
                            botonDeshabilitar.classList.add('btnDeshabilitar');
                            botonDeshabilitar.setAttribute('title', 'Mostrar evento');
                            botonDeshabilitar.dataset.id_evento = listaEventos[i]['_id'];
                            divInfoEvento.appendChild(botonDeshabilitar);

                            botonModificar.addEventListener('click', mostrarDatosModificacion);

                            botonEliminar.addEventListener('click', confirmarBorrado);

                            botonDeshabilitar.addEventListener('click', deshabilitar, confirmarDeshabilitado);
                        } else {
                            let botonHabilitar = document.createElement('a');
                            botonHabilitar.textContent = 'Deshabilitado';
                            botonHabilitar.classList.add('botonEstado');
                            botonHabilitar.classList.add('btnHabilitar');
                            botonHabilitar.setAttribute('title', 'Mostrar Evento');
                            botonHabilitar.href = '#';
                            botonHabilitar.dataset.id_evento = listaEventos[i]['_id'];
                            divInfoEvento.appendChild(botonHabilitar);

                            botonModificar.addEventListener('click', mostrarDatosModificacion);

                            botonEliminar.addEventListener('click', confirmarBorrado);

                            botonHabilitar.addEventListener('click', habilitar);
                        }

                        let botonMostrarPerfil = document.createElement('a');
                        botonMostrarPerfil.href = '#';
                        botonMostrarPerfil.classList.add('verMas2');
                        botonMostrarPerfil.innerHTML = 'Ver perfi';
                        divCardEvento.appendChild(botonMostrarPerfil);
                        botonMostrarPerfil.dataset.id_evento = listaEventos[i]['_id'];


                        botonMostrarPerfil.addEventListener('click', mostrarPerfilEvento);
                        imagenEvento.dataset.id_evento = listaEventos[i]['_id'];
                        imagenEvento.addEventListener('click', mostrarPerfilEvento);

                        function mostrarPerfilEvento() {
                            let id_evento = this.dataset.id_evento;
                            localStorage.setItem('perfilEvento', id_evento);
                            window.location.href = 'perfil_evento.html';
                        }




                        function habilitar() {
                            swal.fire({
                                title: 'Esta seguro que desea deshabilitar el evento?',
                                text: "Este proceso se puede revertir",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Acepto',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    let id_evento = this.dataset.id_evento;
                                    habilitar_evento(id_evento);
                                    listaEventos = obtenerEventos();
                                    mostrarCardsEventoss();
                                    swal.fire(
                                        'Evento deshabilitado   !',
                                        'Su evento ha sido deshabilitado con éxito.',
                                        'success'
                                    )
                                }
                            })

                        }


                        function deshabilitar() {
                            swal.fire({
                                title: 'Esta seguro que desea habilitar el evento?',
                                text: "Este proceso se puede revertir",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Acepto',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    let id_evento = this.dataset.id_evento;
                                    deshabilitar_evento(id_evento);
                                    listaEventos = obtenerEventos();
                                    mostrarCardsEventoss();
                                    swal.fire(
                                        'Evento habilitado!',
                                        'Su evento ha sido habilitado con éxito.',
                                        'success'
                                    )
                                }
                            })

                        }

                        function mostrarDatosModificacion() {
                            let id_evento = this.dataset.id_evento;
                            localStorage.setItem('evento', id_evento);
                            window.location.href = 'modificar_evento.html';
                        }

                        function confirmarBorrado() {
                            let id_evento = this.dataset.id_evento;
                            swal.fire({
                                title: 'Esta seguro que desea elminar el evento?',
                                text: "Este proceso no se puede revertir",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, estoy seguro',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    borrar_Evento(id_evento);
                                    swal.fire(
                                        'Evento eliminado!',
                                        'Su evento ha sido eliminado con éxito.',
                                        'success'
                                    )
                                    mostrarCardsEventoss();
                                }
                            })
                        }

                        function confirmarDeshabilitado() {

                            let id_evento = this.dataset.id_evento;
                            swal.fire({
                                title: 'Esta seguro que desea deshabilitar el evento?',
                                text: "Este proceso se puede revertir",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, estoy seguro',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.value) {
                                    borrar_Evento(id_evento);
                                    mostrarCardsEventoss();
                                    swal.fire(
                                        'Evento deshabilitado!',
                                        'Su evento ha sido eliminado con éxito.',
                                        'success'
                                    )
                                }
                            })
                        }

                        divCardEvento.appendChild(divStars);
                        divCardEvento.appendChild(divInfoEvento)
                        sectionEventos.appendChild(divCardEvento);
                    }
                }
            }
        }
        function mostrarCardsEventoss() {
            let listaEventos = obtenerEventos();
            let categoria = inputCategoria.value;
            let sectionEventos = document.querySelector('#eventos');
            sectionEventos.innerHTML = '';




            for (let i = 0; i < listaEventos.length; i++) {
                let categorias = "";

                if (listaEventos[i]['estado'] == 'Habilitado') {

                    for (let j = 0; j < listaEventos[i]['categorias'].length; j++) {
                        categorias = categorias + listaEventos[i].categorias[j]['nombreCategoria'] + ", ";

                    }
                    if (categorias.toLowerCase().includes(categoria.toLowerCase())) {

                        let divCardEvento = document.createElement('div');
                        divCardEvento.classList.add('cardEvento');

                        let divContenedorImagen = document.createElement('div');
                        divContenedorImagen.classList.add('contenedorImagen');

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
                        divInfoEvento.classList.add('divInfo');


                        let tituloEvento = document.createElement('h5');
                        tituloEvento.innerText = listaEventos[i]['nombre'];
                        divInfoEvento.appendChild(tituloEvento);

                        let iconofecha = document.createElement('a');
                        iconofecha.classList.add('far');
                        iconofecha.classList.add('fa-calendar-alt');
                        divInfoEvento.appendChild(iconofecha);

                        let parrafoFecha = document.createElement('p');
                        let fecha = listaEventos[i]['fecha'];
                        let p = moment(fecha).format('LL');
                        parrafoFecha.innerText = p;
                        divInfoEvento.appendChild(parrafoFecha);

                        let iconoHora = document.createElement('a');
                        iconoHora.classList.add('far');
                        iconoHora.classList.add('fa-clock');
                        divInfoEvento.appendChild(iconoHora);

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

                        let iconoUbicacion = document.createElement('a');
                        iconoUbicacion.classList.add('far');
                        iconoUbicacion.classList.add('fa-compass');
                        divInfoEvento.appendChild(iconoUbicacion);

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
                        sectionEventos.appendChild(divCardEvento);
                    }
                }
            }
        }

    } else {
        mostrarCardsEventoss();

        inputFiltrar.addEventListener('keyup', mostrarCardsEventos);
        inputCategoria.addEventListener('click', mostrarCardsEventoss);
        inputMinimo.addEventListener('keyup', mostrarCardsEventos);
        inputMaximo.addEventListener('keyup', mostrarCardsEventos);
        inputMinimo.addEventListener('change', mostrarCardsEventos);
        inputMaximo.addEventListener('change', mostrarCardsEventos);

        function mostrarCardsEventos() {
            let filtro = inputFiltrar.value;
            let listaEventos = obtenerEventos();
            let sectionEventos = document.querySelector('#eventos');
            sectionEventos.innerHTML = '';
            const precioMinimo = inputMinimo.value;
            const precioMaximo = inputMaximo.value;

            for (let i = 0; i < listaEventos.length; i++) {
                if (listaEventos[i]['estado'] == 'Habilitado') {
                    if (
                        listaEventos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                        listaEventos[i]['fecha'].toLowerCase().includes(filtro.toLowerCase()) ||
                        listaEventos[i]['hora_Inicio'].toLowerCase().includes(filtro.toLowerCase()) ||
                        listaEventos[i]['ubicacion'].toLowerCase().includes(filtro.toLowerCase()) && // text filter
                        (!precioMinimo || listaEventos[i]['precio'] >= Number(precioMinimo)) && // min filter
                        (!precioMaximo || listaEventos[i]['precio'] <= Number(precioMaximo)) // max filter
                    ) {

                        let divCardEvento = document.createElement('div');
                        divCardEvento.classList.add('cardEvento');

                        let divContenedorImagen = document.createElement('div');
                        divContenedorImagen.classList.add('contenedorImagen');

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
                        divInfoEvento.classList.add('divInfo');


                        let tituloEvento = document.createElement('h5');
                        tituloEvento.innerText = listaEventos[i]['nombre'];
                        divInfoEvento.appendChild(tituloEvento);

                        let iconofecha = document.createElement('a');
                        iconofecha.classList.add('far');
                        iconofecha.classList.add('fa-calendar-alt');
                        divInfoEvento.appendChild(iconofecha);

                        let parrafoFecha = document.createElement('p');
                        let fecha = listaEventos[i]['fecha'];
                        let p = moment(fecha).format('LL');
                        parrafoFecha.innerText = p;
                        divInfoEvento.appendChild(parrafoFecha);

                        let iconoHora = document.createElement('a');
                        iconoHora.classList.add('far');
                        iconoHora.classList.add('fa-clock');
                        divInfoEvento.appendChild(iconoHora);

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

                        let iconoUbicacion = document.createElement('a');
                        iconoUbicacion.classList.add('far');
                        iconoUbicacion.classList.add('fa-compass');
                        divInfoEvento.appendChild(iconoUbicacion);

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
                        sectionEventos.appendChild(divCardEvento);
                    }
                }
            }
        }

        function mostrarCardsEventoss() {
            let listaEventos = obtenerEventos();
            let categoria = inputCategoria.value;
            let sectionEventos = document.querySelector('#eventos');
            sectionEventos.innerHTML = '';




            for (let i = 0; i < listaEventos.length; i++) {
                let categorias = "";

                if (listaEventos[i]['estado'] == 'Habilitado') {

                    for (let j = 0; j < listaEventos[i]['categorias'].length; j++) {
                        categorias = categorias + listaEventos[i].categorias[j]['nombreCategoria'] + ", ";

                    }
                    if (categorias.toLowerCase().includes(categoria.toLowerCase())) {

                        let divCardEvento = document.createElement('div');
                        divCardEvento.classList.add('cardEvento');

                        let divContenedorImagen = document.createElement('div');
                        divContenedorImagen.classList.add('contenedorImagen');

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
                        divInfoEvento.classList.add('divInfo');


                        let tituloEvento = document.createElement('h5');
                        tituloEvento.innerText = listaEventos[i]['nombre'];
                        divInfoEvento.appendChild(tituloEvento);

                        let iconofecha = document.createElement('a');
                        iconofecha.classList.add('far');
                        iconofecha.classList.add('fa-calendar-alt');
                        divInfoEvento.appendChild(iconofecha);

                        let parrafoFecha = document.createElement('p');
                        let fecha = listaEventos[i]['fecha'];
                        let p = moment(fecha).format('LL');
                        parrafoFecha.innerText = p;
                        divInfoEvento.appendChild(parrafoFecha);

                        let iconoHora = document.createElement('a');
                        iconoHora.classList.add('far');
                        iconoHora.classList.add('fa-clock');
                        divInfoEvento.appendChild(iconoHora);

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

                        let iconoUbicacion = document.createElement('a');
                        iconoUbicacion.classList.add('far');
                        iconoUbicacion.classList.add('fa-compass');
                        divInfoEvento.appendChild(iconoUbicacion);

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
                        sectionEventos.appendChild(divCardEvento);
                    }
                }
            }
        }
    }

} else {
    mostrarCardsEventoss();

    inputFiltrar.addEventListener('keyup', mostrarCardsEventos);
    inputCategoria.addEventListener('click', mostrarCardsEventoss);
    inputMinimo.addEventListener('keyup', mostrarCardsEventos);
    inputMaximo.addEventListener('keyup', mostrarCardsEventos);
    inputMinimo.addEventListener('change', mostrarCardsEventos);
    inputMaximo.addEventListener('change', mostrarCardsEventos);

    function mostrarCardsEventos() {
        let filtro = inputFiltrar.value;
        let listaEventos = obtenerEventos();
        let sectionEventos = document.querySelector('#eventos');
        sectionEventos.innerHTML = '';
        const precioMinimo = inputMinimo.value;
        const precioMaximo = inputMaximo.value;

        for (let i = 0; i < listaEventos.length; i++) {
            if (listaEventos[i]['estado'] == 'Habilitado') {
                if (
                    listaEventos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                    listaEventos[i]['fecha'].toLowerCase().includes(filtro.toLowerCase()) ||
                    listaEventos[i]['hora_Inicio'].toLowerCase().includes(filtro.toLowerCase()) ||
                    listaEventos[i]['ubicacion'].toLowerCase().includes(filtro.toLowerCase()) && // text filter
                    (!precioMinimo || listaEventos[i]['precio'] >= Number(precioMinimo)) && // min filter
                    (!precioMaximo || listaEventos[i]['precio'] <= Number(precioMaximo)) // max filter
                ) {

                    let divCardEvento = document.createElement('div');
                    divCardEvento.classList.add('cardEvento');

                    let divContenedorImagen = document.createElement('div');
                    divContenedorImagen.classList.add('contenedorImagen');

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
                    divInfoEvento.classList.add('divInfo');


                    let tituloEvento = document.createElement('h5');
                    tituloEvento.innerText = listaEventos[i]['nombre'];
                    divInfoEvento.appendChild(tituloEvento);

                    let iconofecha = document.createElement('a');
                    iconofecha.classList.add('far');
                    iconofecha.classList.add('fa-calendar-alt');
                    divInfoEvento.appendChild(iconofecha);

                    let parrafoFecha = document.createElement('p');
                    let fecha = listaEventos[i]['fecha'];
                    let p = moment(fecha).format('LL');
                    parrafoFecha.innerText = p;
                    divInfoEvento.appendChild(parrafoFecha);

                    let iconoHora = document.createElement('a');
                    iconoHora.classList.add('far');
                    iconoHora.classList.add('fa-clock');
                    divInfoEvento.appendChild(iconoHora);

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

                    let iconoUbicacion = document.createElement('a');
                    iconoUbicacion.classList.add('far');
                    iconoUbicacion.classList.add('fa-compass');
                    divInfoEvento.appendChild(iconoUbicacion);

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
                    botonMostrarPerfil.addEventListener('click', irEvento);
                    imagenEvento.addEventListener('click', irEvento);


                    divCardEvento.appendChild(divInfoEvento)
                    sectionEventos.appendChild(divCardEvento);
                }
            }
        }
    }

    function mostrarCardsEventoss() {
        let listaEventos = obtenerEventos();
        let categoria = inputCategoria.value;
        let sectionEventos = document.querySelector('#eventos');
        sectionEventos.innerHTML = '';

        for (let i = 0; i < listaEventos.length; i++) {
            let categorias = "";

            if (listaEventos[i]['estado'] == 'Habilitado') {

                for (let j = 0; j < listaEventos[i]['categorias'].length; j++) {
                    categorias = categorias + listaEventos[i].categorias[j]['nombreCategoria'] + ", ";

                }
                if (categorias.toLowerCase().includes(categoria.toLowerCase())) {



                    let divCardEvento = document.createElement('div');
                    divCardEvento.classList.add('cardEvento');

                    let divContenedorImagen = document.createElement('div');
                    divContenedorImagen.classList.add('contenedorImagen');

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
                    divInfoEvento.classList.add('divInfo');


                    let tituloEvento = document.createElement('h5');
                    tituloEvento.innerText = listaEventos[i]['nombre'];
                    divInfoEvento.appendChild(tituloEvento);

                    let iconofecha = document.createElement('a');
                    iconofecha.classList.add('far');
                    iconofecha.classList.add('fa-calendar-alt');
                    divInfoEvento.appendChild(iconofecha);

                    let parrafoFecha = document.createElement('p');
                    let fecha = listaEventos[i]['fecha'];
                    let p = moment(fecha).format('LL');
                    parrafoFecha.innerText = p;
                    divInfoEvento.appendChild(parrafoFecha);

                    let iconoHora = document.createElement('a');
                    iconoHora.classList.add('far');
                    iconoHora.classList.add('fa-clock');
                    divInfoEvento.appendChild(iconoHora);

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

                    let iconoUbicacion = document.createElement('a');
                    iconoUbicacion.classList.add('far');
                    iconoUbicacion.classList.add('fa-compass');
                    divInfoEvento.appendChild(iconoUbicacion);

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


                    botonMostrarPerfil.addEventListener('click', irEvento);
                    imagenEvento.addEventListener('click', irEvento);



                    divCardEvento.appendChild(divInfoEvento)
                    sectionEventos.appendChild(divCardEvento);
                }
            }
        }
    }
}

function irEvento() {

    if (id_usuario) {
        mostrarPerfilEvento();
    } else {
        swal.fire({
            title: 'No podés ingresar',
            text: "Iniciá sesión para poder ingresar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Inicio sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                window.location.href = 'inicio_sesion.html';
            }
        })
    }




}

function mostrarPerfilEvento() {
    let id_evento = this.dataset.id_evento;
    localStorage.setItem('perfilEvento', id_evento);
    window.location.href = 'perfil_evento.html';
}
function mostrarFiltroCategorias() {
    let listaCategorias = obtenerCategorias();
    let selectCategorias = document.querySelector('#txtCategorias');
    for (let i = 0; i < listaCategorias.length; i++) {
        let nuevaOpcion = new Option(listaCategorias[i]['nombre']);
        nuevaOpcion.value = listaCategorias[i]['nombre'];
        selectCategorias.appendChild(nuevaOpcion);
    }
};