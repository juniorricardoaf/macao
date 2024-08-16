[].forEach.call(document.getElementsByClassName('tags-input'),function(el){
    let hiddenInput=document.createElement('input'),
        mainInput=document.createElement('input'),
        tags=[];

    hiddenInput.setAttribute('type','hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.classList.add('type','text');
    mainInput.classList.add('main-input');
    mainInput.addEventListener('input', function(){
        let enteredTags=mainInput.value.split(',');
        if(enteredTags.length > 1 ){
            enteredTags.forEach(function(t){
                let filteredTag=filterTag(t);
                if(filteredTag.length>0 )
                 addTag(filteredTag);
            });
            mainInput.value='';
        }
    });

    mainInput.addEventListener('keydown',function(e){
        let keyCode= e.which || e.keyCode;
        if(keyCode==8 && mainInput.value.length==0 && tags.length > 0){
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

let id_evento = localStorage.getItem('evento');

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
const latitud = document.querySelector('#latitud');
const longitud = document.querySelector('#longitud');

botonRegistrar.addEventListener('click', obtenerDatosModificarEvento);

if(id_evento){
    mostrarDatos();
}else{
  alert('Debe seleccionar un evento para modificar');
  setTimeout(function(){window.location.href = 'visualizar_evento.html#';}, 100);
}

function mostrarDatos(){
  let evento = buscar_evento(id_evento);

  inputNombre.value = evento['nombre'];
  inputFecha.value = evento['fecha'];
  inputHoraInicio.value = evento['hora_Inicio'];
  inputMinutoInicio.value = evento['minutos_Inicio'];
  inputMinutoFin.value = evento['minutos_Fin'];
  inputHoraFin.value = evento['hora_Fin'];
  inputMinutoFin.value = evento['minutos_Fin'];
  inputCantEspacios.value = evento['cant_Espacios'];
  inputDescripcion.value = evento['descripcion'];
  inputUbicación.value = evento['ubicacion'];
  inputMoneda.value = evento['moneda'];
  inputPrecio.value = evento['precio'];
  let patrocinadoresCheck = evento['patrocinadores'];
  addTag(evento['etiqueta']);
  imgEvento.src = evento['imagen'];
  latitud.value = evento['latitud'];
  longitud.value = evento['longitud'];
  let categoriasCheck = evento['categorias'];
  mostrarListaPatrocinadores(patrocinadoresCheck);
  mostrarListaCategorias(categoriasCheck);
};

function obtenerDatosModificarEvento(){

  let nombre = inputNombre.value;
  let fecha = inputFecha.value;
  let hora_Inicio = inputHoraInicio.value;
  let minutos_Inicio = inputMinutoInicio.value;
  let hora_Fin = inputHoraFin.value;
  let minutos_Fin = inputMinutoFin.value;
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
  let inputPatrocinadores = document.querySelectorAll('#checkPatrocinadores input[type=checkbox]:checked');
  let patrocinadoresArreglo = [];
  for (let i = 0; i < inputPatrocinadores.length; i++) {
          patrocinadoresArreglo.push(inputPatrocinadores[i].value);
      };


  let estadoError = validar(nombre, fecha, hora_Inicio, minutos_Inicio, hora_Fin, minutos_Fin,  cant_Espacios, descripcion, moneda, precio, ubicacion);

        let fechaFormateada = moment(fecha).format('YYYY-MM-DD');
        actualizarEvento(id_evento, nombre, fechaFormateada, hora_Inicio, minutos_Inicio, hora_Fin, minutos_Fin, cant_Espacios, descripcion, moneda, precio, ubicacion, categoriasArreglo.value, etiqueta, patrocinadoresArreglo.value, imagen, inputLatitud.value, inputLongitud.value);
        if(estadoError== true){
            swal.fire({
                title: 'Registro incorrecto',
                text: 'No se pudo modificar el evento, revisá los campos en rojo',
                type: 'warning',
                confirmButtonText: 'Entendido'
              });
        }else{
            swal.fire({
                    type: 'success',
                    title: 'Modificación  realizada correctamente',
                    text: 'La modificación se realizó correctamente',
                    showConfirmButton:false,
                    timer:2000
                  });
                  setTimeout(function redirection(){ window.location.href = 'visualizar_evento.html'; }, 2100);
        }

};

function validar(pnombre, pfecha, phoraInicio, pminutosInicio,  phoraFin, pminutosFin, pcantEspacios, pdescripcion, pmoneda, pprecio, pubicacion){

    let error = false;
    let expNum = /^[0-9]{1,5}$/;

    if(pnombre == '' || pnombre.length == 0){
        inputNombre.classList.add('errorInput');
        error = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }

    if (pfecha < new Date() || pfecha == 'Invalid Date'){
        inputFecha.classList.add('errorInput');
        error = true;
    }else{
        inputFecha.classList.remove('errorInput');
    }

    if (phoraInicio.length == 0 || phoraInicio > inputHoraInicio.max){
        inputHoraInicio.classList.add('errorInput');
        error = true;
      }else if (phoraInicio === '0') {
          inputHoraInicio.classList.remove('errorInput');
    }else{
        inputHoraInicio.classList.remove('errorInput');
    }

    if(pminutosInicio.length == 0 || pminutosInicio > inputMinutoInicio.max){
        inputMinutoInicio.classList.add('errorInput');
        error = true;
      }else if (pminutosInicio === '0') {
        inputMinutoInicio.classList.remove('errorInput')
      }else{
        inputMinutoInicio.classList.remove('errorInput');
    }

    if(pminutosFin.length == 0 || pminutosFin > inputMinutoFin.max){
        inputMinutoFin.classList.add('errorInput');
        error = true;
      }else if (pminutosFin == '0') {
        inputMinutoFin.classList.remove('errorInput');
      }else{
        inputMinutoFin.classList.remove('errorInput');
    }

    if (phoraFin == '' || phoraFin.length == 0 || phoraFin > inputHoraFin.max || phoraInicio > phoraFin){
        inputHoraFin.classList.add('errorInput');
        error = true;
    }else{
        inputHoraFin.classList.remove('errorInput');
    }

    if (pcantEspacios == '' || expNum.test(pcantEspacios) == false){
        inputCantEspacios.classList.add('errorInput');
        error = true;
    }else{
        inputCantEspacios.classList.remove('errorInput');
    }

    if (pdescripcion == '' || pdescripcion.length == 0){
        inputDescripcion.classList.add('errorInput');
        error = true;
    }else{
        inputDescripcion.classList.remove('errorInput');
    }

    if(expNum.test(pprecio) == false){
        inputPrecio.classList.add('errorInput');
        error = true;
    }else{
        inputPrecio.classList.remove('errorInput');
    }

    if (pubicacion == '' || pubicacion.length == 0){
        inputUbicación.classList.add('errorInput');
        error = true;
    }else{
        inputUbicación.classList.remove('errorInput');
    }
    if(pmoneda == '-' && pprecio != '0'){
        inputMoneda.classList.add('errorInput');
        error = true;
    }else{
        inputMoneda.classList.remove('errorInput');
    }

    if(pmoneda != '-' && pprecio == '0'){
        inputPrecio.classList.add('errorInput');
        error = true;
    }else{
        inputPrecio.classList.remove('errorInput');
    }

    return error;
};

function addTag(text){
    let tag={
        text:text,
        element:document.createElement('span'),
    };

    tag.element.classList.add('tag');
    tag.element.textContent=tag.text;

    let closeBtn=document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', function(){
         removeTag(tags.indexOf(tag));
    })
    tag.element.appendChild(closeBtn);

    tags.push(tag);

    el.insertBefore(tag.element, mainInput);
    refreshTags();

}

function removeTag(index) {
    let tag= tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    refreshTags();
}

function refreshTags(){
    let tagsList= [];
    tags.forEach(function(t){
        tagsList.push(t.text);
    });
    hiddenInput.value=tagsList.join(', ');
}

function filterTag(tag){
    return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
}
});

function mostrarListaPatrocinadores(ppatrocinadores) {
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
        check.value = listaPatrocinadores[i]['_id'];
        celdaCheckBox.appendChild(check);
        celdaCheckBox.appendChild(nombre);
        for (let i = 0; i < ppatrocinadores.length; i++){
          if(ppatrocinadores[i]['nombrePatrocinador'] == check.value){
            check.checked = true;
          }
        }
    }
};

function mostrarListaCategorias(pcategorias) {
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
        check.value = listaCategorias[i]['_id'];
        celdaCheckBox.appendChild(check);
        celdaCheckBox.appendChild(nombre);
        for(let i = 0; i < pcategorias.length; i++){
          if(pcategorias[i]['nombreCategoria'] == check.value){
            check.checked = true;
          }
        }

    }
};
