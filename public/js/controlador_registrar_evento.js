[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input'),
        tags = [];

    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.classList.add('type', 'text');
    mainInput.classList.add('main-input');
    mainInput.addEventListener('input', function () {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    addTag(filteredTag);
            });
            mainInput.value = '';
        }
    });
    mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode == 8 && mainInput.value.length == 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    addTag('Macao');

    const botonRegistrar = document.querySelector('#btnRegistrarActividad');
    const inputNombre = document.querySelector('#txtNombre');
    const inputFecha = document.querySelector('#txtFecha');
    const inputHoraInicio = document.querySelector('#txtHora_Inicio');
    const inputMinutoInicio = document.querySelector('#txtMinutos_Inicio');
    const inputHoraFin = document.querySelector('#txtHora_Fin');
    const inputMinutoFin = document.querySelector('#txtMinutos_Fin');
    const inputCantEspacios = document.querySelector('#txtcant_espacios');
    const inputDescripcion = document.querySelector('#txtDescripcion');
    const inputMoneda = document.querySelector('#txtMoneda');
    const inputPrecio = document.querySelector('#txtPrecio');
    const inputUbicación = document.querySelector('#txtUbicacion');
    const tablaCategorias = document.querySelector('#tblCategorias');
    const tablaPatrocinadores = document.querySelector('#tblPatrocinadores');
    const imgEvento = document.querySelector('#image_previewEvento');
    const inputLatitud = document.querySelector('#inputLat');
    const inputLongitud = document.querySelector('#inputLng');

    let id_Usuario = sessionStorage.getItem('_id');
    let id_lugar = localStorage.getItem('lugar');
    let lugar = id_lugar;

    mostrarListaPatrocinadores();
    mostrarListaCategorias();

    botonRegistrar.addEventListener('click', obtenerDatos);

    function obtenerDatos() {
        let nombre = inputNombre.value;
        let fecha = new Date(inputFecha.value);
        let hora_Inicio = inputHoraInicio.value;
        let minutos_Inicio = Number(inputMinutoInicio.value);
        let hora_Fin = Number(inputHoraFin.value);
        let minutos_Fin = Number(inputMinutoFin.value);
        let cant_Espacios = inputCantEspacios.value;
        let descripcion = inputDescripcion.value;
        let moneda = inputMoneda.value;
        let precio = inputPrecio.value;
        let ubicacion = inputUbicación.value;
        let inputCategorias = document.querySelectorAll('#checkCategorias input[type=checkbox]:checked');
        let categoriasArreglo = [];

        for (let i = 0; i < inputCategorias.length; i++) {
            categoriasArreglo.push(inputCategorias[i].value);
        };
        let etiqueta = hiddenInput.value;
        let imagen = imgEvento.src;
        let latitud = inputLatitud.value;
        let longitud = inputLongitud.value;
        let inputPatrocinadores = document.querySelectorAll('#checkPatrocinadores input[type=checkbox]:checked');
        let patrocinadoresArreglo = []
        for (let i = 0; i < inputPatrocinadores.length; i++) {
            patrocinadoresArreglo.push(inputPatrocinadores[i].value);
        };

        let estadoError = validar(nombre, fecha, hora_Inicio, minutos_Inicio, hora_Fin, minutos_Fin, cant_Espacios, descripcion, moneda, precio, ubicacion, categoriasArreglo, etiqueta, patrocinadoresArreglo);


        if (estadoError == true) {
            swal.fire({
                title: 'Registro incorrecto',
                text: 'No se pudo registrar el evento, revise los campos en rojo',
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        } else {
            let fechaFormateada = moment(fecha).format('YYYY-MM-DD');
            let respuesta = registrarEvento(nombre, fechaFormateada, hora_Inicio, minutos_Inicio, hora_Fin, minutos_Fin, cant_Espacios, descripcion, moneda, precio, ubicacion, categoriasArreglo, etiqueta, patrocinadoresArreglo, imagen, latitud, longitud, id_Usuario, lugar);
            if (respuesta.success == true) {
                swal.fire({
                    type: 'success',
                    title: 'Registro realizado correctamente',
                    text: 'El registro se realizó correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(function redirection() { window.location.href = 'visualizar_evento.html'; }, 2100);
            } else {
                swal.fire({
                    title: 'Registro incorrecto',
                    text: respuesta.msg,
                    type: 'error',
                    confirmButtonText: 'Entendido'
                });
            }
        }
    };

    function validar(pnombre, pfecha, phoraInicio, pminutosInicio, phoraFin, pminutosFin, pcantEspacios, pdescripcion, pmoneda, pprecio, pubicacion, pcategorias, petiquetas, ppatrocinadores) {

        let error = false;
        let expNum = /^[0-9]{1,5}$/;

        if (pnombre == '' || pnombre.length == 0) {
            inputNombre.classList.add('errorInput');
            error = true;
        } else {
            inputNombre.classList.remove('errorInput');
        }

        if (pfecha < new Date() || pfecha == 'Invalid Date') {
            inputFecha.classList.add('errorInput');
            error = true;
        } else {
            inputFecha.classList.remove('errorInput');
        }

        if (phoraInicio.length == 0 || phoraInicio > inputHoraInicio.max) {
            inputHoraInicio.classList.add('errorInput');
            error = true;
        } else if (phoraInicio === '0') {
            inputHoraInicio.classList.remove('errorInput');
        } else {
            inputHoraInicio.classList.remove('errorInput');
        }

        if (pminutosInicio.length == 0 || pminutosInicio > inputMinutoInicio.max) {
            inputMinutoInicio.classList.add('errorInput');
            error = true;
        } else if (pminutosInicio === '0') {
            inputMinutoInicio.classList.remove('errorInput')
        } else {
            inputMinutoInicio.classList.remove('errorInput');
        }

        if (pminutosFin.length == 0 || pminutosFin > inputMinutoFin.max) {
            inputMinutoFin.classList.add('errorInput');
            error = true;
        } else if (pminutosFin == '0') {
            inputMinutoFin.classList.remove('errorInput');
        } else {
            inputMinutoFin.classList.remove('errorInput');
        }

        if (phoraFin == '' || phoraFin.length == 0 || phoraFin > inputHoraFin.max || phoraInicio > phoraFin) {
            inputHoraFin.classList.add('errorInput');
            error = true;
        } else {
            inputHoraFin.classList.remove('errorInput');
        }

        if (pcantEspacios == '' || expNum.test(pcantEspacios) == false) {
            inputCantEspacios.classList.add('errorInput');
            error = true;
        } else {
            inputCantEspacios.classList.remove('errorInput');
        }

        if (pdescripcion == '' || pdescripcion.length == 0) {
            inputDescripcion.classList.add('errorInput');
            error = true;
        } else {
            inputDescripcion.classList.remove('errorInput');
        }

        if (expNum.test(pprecio) == false) {
            inputPrecio.classList.add('errorInput');
            error = true;
        } else {
            inputPrecio.classList.remove('errorInput');
        }

        if (pubicacion == '' || pubicacion.length == 0) {
            inputUbicación.classList.add('errorInput');
            error = true;
        } else {
            inputUbicación.classList.remove('errorInput');
        }

        if (pcategorias[0] == '' || pcategorias.length == 0) {
            tablaCategorias.classList.add('errorInput');
            error = true;
        } else {
            tablaCategorias.classList.remove('errorInput');
        }

        if (petiquetas == '') {
            hiddenInput.classList.add('errorInput');
            error = true;
        } else {
            hiddenInput.classList.remove('errorInput');
        }

        if (ppatrocinadores[0] == '' || ppatrocinadores.length == 0) {
            tablaPatrocinadores.classList.add('errorInput');
            error = true;
        } else {
            tablaPatrocinadores.classList.remove('errorInput');
        }

        if (pmoneda == '-' && pprecio != '0') {
            inputMoneda.classList.add('errorInput');
            error = true;
        } else {
            inputMoneda.classList.remove('errorInput');
        }

        if (pmoneda != '-' && pprecio == '0') {
            inputPrecio.classList.add('errorInput');
            error = true;
        } else {
            inputPrecio.classList.remove('errorInput');
        }

        return error;
    };


    function addTag(text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };

        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
        })
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        el.insertBefore(tag.element, mainInput);
        refreshTags();

    }

    function removeTag(index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTags();
    }

    function refreshTags() {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(', ');
    }

    function filterTag(tag) {
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }
});

function mostrarListaPatrocinadores() {
    let listaPatrocinadores = obtenerPatrocinadores();
    let tbody = document.querySelector('#tblPatrocinadores tbody');

    tbody.innerHTML = '';

    for (let i = 0; i < listaPatrocinadores.length; i++) {

        let fila = tbody.insertRow();

        let celdaCheckBox = fila.insertCell();
        celdaCheckBox.setAttribute("id", "checkPatrocinadores");
        let nombre = document.createElement("label");
        nombre.innerHTML = listaPatrocinadores[i]['nombre'];
        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.value = listaPatrocinadores[i]['nombre'];
        celdaCheckBox.appendChild(check);
        celdaCheckBox.appendChild(nombre);

    }
};

function mostrarListaCategorias() {
    let listaCategorias = obtenerCategorias();
    let tbody = document.querySelector('#tblCategorias tbody');

    tbody.innerHTML = '';

    for (let i = 0; i < listaCategorias.length; i++) {

        let fila = tbody.insertRow();

        let celdaCheckBox = fila.insertCell();
        celdaCheckBox.setAttribute("id", "checkCategorias");
        let nombre = document.createElement("label");
        nombre.innerHTML = listaCategorias[i]['nombre'];
        let check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.value = listaCategorias[i]['nombre'];
        celdaCheckBox.appendChild(check);
        celdaCheckBox.appendChild(nombre);

    }
};
