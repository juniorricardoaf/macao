'use strict';

const inputFiltrar = document.querySelector('#txtFiltrar');
let listaLugares = obtenerLugares();

let id_usuario = sessionStorage.getItem('_id');


if (id_usuario) {
    let usuario = buscar_usuarios(id_usuario);
    let tipodeUsuario = usuario['tipoUsuario'];
    if (tipodeUsuario == 'Empresario') {

        mostrarCardsLugares();
        inputFiltrar.addEventListener('keyup', mostrarCardsLugares);

        function mostrarCardsLugares() {

            let listaLugares = obtenerLugares(); //
            let filtro = inputFiltrar.value;
            let sectionLugares = document.querySelector('#lugares');

            sectionLugares.innerHTML = '';

            for (let i = 0; i < listaLugares.length; i++) {
                if (listaLugares[i]['aprobado'] == 'Verdad') {
                    if (listaLugares[i]['id_usuario'] === id_usuario) {
                        if (listaLugares[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) || listaLugares[i]['provincia'].toLowerCase().includes(filtro.toLowerCase())) {

                            let divCardLugar = document.createElement('div');
                            divCardLugar.classList.add('cardLugar');

                            let divContenedorImagen = document.createElement('div');
                            divContenedorImagen.classList.add('contenedorImagen');

                            let imagenLugar = document.createElement('img');

                            if (listaLugares[i]['imagen']) {
                                imagenLugar.src = listaLugares[i]['imagen'];
                            } else {
                                imagenLugar.src = 'imgs/foto_lugar(1).png';//error
                            }

                            divContenedorImagen.appendChild(imagenLugar);
                            divCardLugar.appendChild(divContenedorImagen);

                            let divInfoLugar = document.createElement('div');
                            divInfoLugar.classList.add('divInfo');


                            let tituloLugar = document.createElement('h2');
                            tituloLugar.innerText = listaLugares[i]['nombre'];
                            divInfoLugar.appendChild(tituloLugar);

                            let parrafoProvincia = document.createElement('p');

                            let icono = document.createElement('a');
                            icono.classList.add('fas');
                            icono.classList.add('fa-map-marker-alt')
                            parrafoProvincia.appendChild(icono);


                            if (listaLugares[i]['provincia'] == 1) {

                                let nombreProvincia = document.createTextNode('San José')

                                parrafoProvincia.appendChild(nombreProvincia)

                            }
                            if (listaLugares[i]['provincia'] == 2) {
                                let nombreProvincia = document.createTextNode('Alajuela')

                                parrafoProvincia.appendChild(nombreProvincia)
                            }
                            if (listaLugares[i]['provincia'] == 3) {
                                let nombreProvincia = document.createTextNode('Heredia')

                                parrafoProvincia.appendChild(nombreProvincia)
                            }
                            if (listaLugares[i]['provincia'] == 4) {
                                let nombreProvincia = document.createTextNode('Cartago')

                                parrafoProvincia.appendChild(nombreProvincia)
                            }

                            if (listaLugares[i]['provincia'] == 5) {
                                let nombreProvincia = document.createTextNode('Guanacaste')

                                parrafoProvincia.appendChild(nombreProvincia)
                            }
                            if (listaLugares[i]['provincia'] == 6) {
                                let nombreProvincia = document.createTextNode('Puntarenas')

                                parrafoProvincia.appendChild(nombreProvincia)
                            }
                            if (listaLugares[i]['provincia'] == 7) {
                                let nombreProvincia = document.createTextNode('Limón')

                                parrafoProvincia.appendChild(nombreProvincia)
                            }

                            let botonMostrarPerfil = document.createElement('a');
                            botonMostrarPerfil.href = '#';
                            botonMostrarPerfil.classList.add('verMas');
                            botonMostrarPerfil.innerHTML = "Ver perfil ";
                            divInfoLugar.appendChild(botonMostrarPerfil);
                            botonMostrarPerfil.dataset.id_lugar = listaLugares[i]['_id'];
                            botonMostrarPerfil.addEventListener('click', mostrarPerfilLugar);


                            divInfoLugar.appendChild(parrafoProvincia);

                            let botonModificar = document.createElement('a');
                            botonModificar.href = '#';
                            botonModificar.classList.add('botonEstado');
                            botonModificar.classList.add('btnModificar');
                            botonModificar.innerHTML = 'Modificar';
                            divInfoLugar.appendChild(botonModificar);
                            botonModificar.dataset.id_lugar = listaLugares[i]['_id'];


                            let botonEliminar = document.createElement('a');
                            botonEliminar.href = '#';
                            botonEliminar.classList.add('botonEstado');
                            botonEliminar.classList.add('btnEliminar');
                            botonEliminar.innerHTML = 'Eliminar';
                            botonEliminar.dataset.id_lugar = listaLugares[i]['_id'];
                            botonEliminar.addEventListener('click', confirmarBorrado);
                            divInfoLugar.appendChild(botonEliminar);

                            // let estado=document.createElement('label');
                            //estado.textContent = 'Estado Actual: '; estado
                            // divInfoLugar.appendChild(estado);

                            if (listaLugares[i]['estado'] == 'Habilitado') {
                                let botonDeshabilitar = document.createElement('a');
                                botonDeshabilitar.href = '#';
                                botonDeshabilitar.textContent = 'Habilitado';
                                botonDeshabilitar.classList.add('botonEstado');
                                botonDeshabilitar.classList.add('btnDeshabilitar');
                                botonDeshabilitar.setAttribute('title', 'Ocultar lugar');
                                // imagenLugar.src = listaLugares[i]['imagen'];
                                //  imagenLugar.classList.remove('imagendeshabilitada');
                                botonDeshabilitar.dataset.id_lugar = listaLugares[i]['_id'];
                                botonDeshabilitar.addEventListener('click', deshabilitar, confirmarDeshabilitado);
                                divInfoLugar.appendChild(botonDeshabilitar);

                            } else {
                                let botonHabilitar = document.createElement('a');
                                botonHabilitar.href = '#';
                                botonHabilitar.textContent = 'Deshabilitado';
                                botonHabilitar.classList.add('botonEstado');
                                botonHabilitar.classList.add('btnHabilitar');
                                botonHabilitar.setAttribute('title', 'Mostrar lugar');
                                // imagenLugar.src = listaLugares[i]['imagen'];
                                // imagenLugar.classList.add('imagendeshabilitada');
                                botonHabilitar.dataset.id_lugar = listaLugares[i]['_id'];
                                botonHabilitar.addEventListener('click', habilitar);

                                divInfoLugar.appendChild(botonHabilitar);

                            }

                            divCardLugar.appendChild(divInfoLugar)
                            sectionLugares.appendChild(divCardLugar);
                        }
                    }
                }

            }



        }


        function confirmarBorrado() {
            let id_lugar = this.dataset.id_lugar;
            swal.fire({
                title: '¿Está seguro que desea eliminar el lugar?',
                text: "Este proceso no se puede revertir",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    borrar_lugar(id_lugar);
                    listaLugares = obtenerLugares();
                    mostrarCardsLugares();
                    swal.fire(
                        '¡Lugar eliminado!',
                        'EL lugar fue borrado con éxito',
                        'success'
                    )
                }
            })
        };

        function deshabilitar() {
            swal.fire({
                title: '¿Esta seguro que desea deshabilitar el lugar?',
                text: "¡Este proceso se puede revertir!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Acepto',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    let id_lugar = this.dataset.id_lugar;
                    deshabilitar_lugar(id_lugar);
                    listaLugares = obtenerLugares();
                    mostrarCardsLugares();
                    swal.fire(
                        'Lugar deshabilitado!',
                        'Su Lugar ha sido deshabilitado con éxito.',
                        'success'
                    )
                }
            })

        };

        function habilitar() {
            swal.fire({
                title: '¿Esta seguro que desea habilitar el lugar?',
                text: "¡Este proceso se puede revertir!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, estoy seguro',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    let id_lugar = this.dataset.id_lugar;
                    habilitar_lugar(id_lugar);
                    listaLugares = obtenerLugares();
                    mostrarCardsLugares();
                    swal.fire(
                        '¡Lugar habilitado!',
                        'Su lugar ha sido habilitado con éxito.',
                        'success'
                    )
                }
            })

        };

        function confirmarDeshabilitado() {

            let id_lugar = this.dataset.id_lugar;
            swal.fire({
                title: "Deshabilitar Lugar",
                text: "¿Esta seguro que desea deshabilitar el Lugar?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
                if (result.value) {
                    borrar_lugar(id_lugar);
                    mostrarCardsLugares();
                    swal.fire(
                        '¡Lugar deshabilitado!',
                        'Su lugar ha sido deshabilitado con éxito.',
                        'success'
                    )
                }
            })
        }

        function mostrarPerfilLugar() {
            let id_lugar = this.dataset.id_lugar;
            localStorage.setItem('lugar', id_lugar);
            window.location.href = 'perfil_lugar.html';
        }


    } else {

        mostrarCardsLugares();

        inputFiltrar.addEventListener('keyup', mostrarCardsLugares);

        function mostrarCardsLugares() {
            let listaLugares = obtenerLugares();
            let filtro = inputFiltrar.value;
            let sectionLugares = document.querySelector('#lugares');

            sectionLugares.innerHTML = '';

            for (let i = 0; i < listaLugares.length; i++) {
                if (listaLugares[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                    listaLugares[i]['provincia'].toLowerCase().includes(filtro.toLowerCase())) {

                    let divCardLugar = document.createElement('div');
                    divCardLugar.classList.add('cardLugar');

                    let divContenedorImagen = document.createElement('div');
                    divContenedorImagen.classList.add('contenedorImagen');

                    let imagenLugar = document.createElement('img');

                    if (listaLugares[i]['imagen']) {
                        imagenLugar.src = listaLugares[i]['imagen'];
                    } else {
                        imagenLugar.src = 'imgs/foto_lugar(1).png';//error
                    }

                    divContenedorImagen.appendChild(imagenLugar);
                    divCardLugar.appendChild(divContenedorImagen);

                    let divInfoLugar = document.createElement('div');
                    divInfoLugar.classList.add('divInfo');


                    let tituloLugar = document.createElement('h2');
                    tituloLugar.innerText = listaLugares[i]['nombre'];
                    divInfoLugar.appendChild(tituloLugar);

                    let parrafoProvincia = document.createElement('p');

                    let icono = document.createElement('a');
                    icono.classList.add('fas');
                    icono.classList.add('fa-map-marker-alt')
                    parrafoProvincia.appendChild(icono);


                    if (listaLugares[i]['provincia'] == 1) {

                        let nombreProvincia = document.createTextNode('San José')

                        parrafoProvincia.appendChild(nombreProvincia)

                    }
                    if (listaLugares[i]['provincia'] == 2) {
                        let nombreProvincia = document.createTextNode('Alajuela')

                        parrafoProvincia.appendChild(nombreProvincia)
                    }
                    if (listaLugares[i]['provincia'] == 3) {
                        let nombreProvincia = document.createTextNode('Heredia')

                        parrafoProvincia.appendChild(nombreProvincia)
                    }
                    if (listaLugares[i]['provincia'] == 4) {
                        let nombreProvincia = document.createTextNode('Cartago')

                        parrafoProvincia.appendChild(nombreProvincia)
                    }

                    if (listaLugares[i]['provincia'] == 5) {
                        let nombreProvincia = document.createTextNode('Guanacaste')

                        parrafoProvincia.appendChild(nombreProvincia)
                    }
                    if (listaLugares[i]['provincia'] == 6) {
                        let nombreProvincia = document.createTextNode('Puntarenas')

                        parrafoProvincia.appendChild(nombreProvincia)
                    }
                    if (listaLugares[i]['provincia'] == 7) {
                        let nombreProvincia = document.createTextNode('Limón')

                        parrafoProvincia.appendChild(nombreProvincia)
                    }

                    let botonMostrarPerfil = document.createElement('a');
                    botonMostrarPerfil.href = '#';
                    botonMostrarPerfil.classList.add('verMas');
                    botonMostrarPerfil.innerHTML = "Ver perfil ";
                    divInfoLugar.appendChild(botonMostrarPerfil);
                    botonMostrarPerfil.dataset.id_lugar = listaLugares[i]['_id'];
                    botonMostrarPerfil.addEventListener('click', mostrarPerfilLugar);

                    divInfoLugar.appendChild(parrafoProvincia);
                    divCardLugar.appendChild(divInfoLugar);
                    sectionLugares.appendChild(divCardLugar);
                }
            }
        }


        function mostrarPerfilLugar() {
            let id_lugar = this.dataset.id_lugar;
            localStorage.setItem('lugar', id_lugar);
            window.location.href = 'perfil_lugar.html';
        }
    }
} else {

    mostrarCardsLugares();

    inputFiltrar.addEventListener('keyup', mostrarCardsLugares);

    function mostrarCardsLugares() {
        let listaLugares = obtenerLugares();
        let filtro = inputFiltrar.value;
        let sectionLugares = document.querySelector('#lugares');

        sectionLugares.innerHTML = '';

        for (let i = 0; i < listaLugares.length; i++) {
            if (listaLugares[i]['nombre'].toLowerCase().includes(filtro.toLowerCase()) ||
                listaLugares[i]['provincia'].toLowerCase().includes(filtro.toLowerCase())) {

                let divCardLugar = document.createElement('div');
                divCardLugar.classList.add('cardLugar');

                let divContenedorImagen = document.createElement('div');
                divContenedorImagen.classList.add('contenedorImagen');

                let imagenLugar = document.createElement('img');

                if (listaLugares[i]['imagen']) {
                    imagenLugar.src = listaLugares[i]['imagen'];
                } else {
                    imagenLugar.src = 'imgs/foto_lugar(1).png';//error
                }

                divContenedorImagen.appendChild(imagenLugar);
                divCardLugar.appendChild(divContenedorImagen);

                let divInfoLugar = document.createElement('div');
                divInfoLugar.classList.add('divInfo');


                let tituloLugar = document.createElement('h2');
                tituloLugar.innerText = listaLugares[i]['nombre'];
                divInfoLugar.appendChild(tituloLugar);

                let parrafoProvincia = document.createElement('p');

                let icono = document.createElement('a');
                icono.classList.add('fas');
                icono.classList.add('fa-map-marker-alt')
                parrafoProvincia.appendChild(icono);


                if (listaLugares[i]['provincia'] == 1) {

                    let nombreProvincia = document.createTextNode('San José')

                    parrafoProvincia.appendChild(nombreProvincia)

                }
                if (listaLugares[i]['provincia'] == 2) {
                    let nombreProvincia = document.createTextNode('Alajuela')

                    parrafoProvincia.appendChild(nombreProvincia)
                }
                if (listaLugares[i]['provincia'] == 3) {
                    let nombreProvincia = document.createTextNode('Heredia')

                    parrafoProvincia.appendChild(nombreProvincia)
                }
                if (listaLugares[i]['provincia'] == 4) {
                    let nombreProvincia = document.createTextNode('Cartago')

                    parrafoProvincia.appendChild(nombreProvincia)
                }

                if (listaLugares[i]['provincia'] == 5) {
                    let nombreProvincia = document.createTextNode('Guanacaste')

                    parrafoProvincia.appendChild(nombreProvincia)
                }
                if (listaLugares[i]['provincia'] == 6) {
                    let nombreProvincia = document.createTextNode('Puntarenas')

                    parrafoProvincia.appendChild(nombreProvincia)
                }
                if (listaLugares[i]['provincia'] == 7) {
                    let nombreProvincia = document.createTextNode('Limón')

                    parrafoProvincia.appendChild(nombreProvincia)
                }

                let botonMostrarPerfil = document.createElement('a');
                botonMostrarPerfil.href = '#';
                botonMostrarPerfil.classList.add('verMas');
                botonMostrarPerfil.innerHTML = "ver perfil ";
                divInfoLugar.appendChild(botonMostrarPerfil);

                botonMostrarPerfil.dataset.id_lugar = listaLugares[i]['_id'];
                botonMostrarPerfil.addEventListener('click', irLugar);

                divInfoLugar.appendChild(parrafoProvincia);
                divCardLugar.appendChild(divInfoLugar);
                sectionLugares.appendChild(divCardLugar);
            }
        }
    }


    
}

function irLugar() {

    if (id_usuario) {
        mostrarPerfilLugar();
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

function mostrarPerfilLugar() {
    let id_lugar = this.dataset.id_lugar;
    localStorage.setItem('lugar', id_lugar);
    window.location.href = 'perfil_lugar.html';
}
