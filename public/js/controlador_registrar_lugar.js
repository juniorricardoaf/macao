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

    addTag('Macao');




const inputNombre = document.querySelector('#txtNombre');
const inputDescripcion = document.querySelector('#txtDescripcion');
const tablaCategorias = document.querySelector('#tblCategorias');
const inputDireccion = document.querySelector('#txtDireccion');
const inputFacebook = document.querySelector('#txtFacebook');
const inputInstagram = document.querySelector('#txtInstegram') ;
const inputTwitter = document.querySelector('#txtTwitter');
const inputProvincia = document.querySelector('#sltProvincias');
const inputCanton = document.querySelector('#sltCantones');
const inputDistrito = document.querySelector('#sltDistritos');
const imgLugar=document.querySelector('#image_preview6');
const inputLatitud = document.querySelector('#inputLat');
const inputLongitud = document.querySelector('#inputLng');
const botonRegistrar= document.querySelector('#btnRegistrarLugar');
let id_Usuario = sessionStorage.getItem('_id');

mostrarListaCategorias();
botonRegistrar.addEventListener('click',obtenerDatos);

obtenerLugares();


function obtenerDatos(){

    
    let nombre = inputNombre.value;
    let descripcion= inputDescripcion.value;

    let inputCategorias = document.querySelectorAll('#checkCategorias input[type=checkbox]:checked');
    let categoriasArreglo = [];

    for (let i = 0; i < inputCategorias.length; i++) {
        categoriasArreglo.push(inputCategorias[i].value);
    };

    let direccion = inputDireccion.value;
    let etiquetas = hiddenInput.value;
    let facebook=inputFacebook. value;
    let instagram=inputInstagram.value;
    let twitter=inputTwitter.value;
    let provincia=inputProvincia.value;
    let canton=inputCanton.value;
    let distrito=inputDistrito.value;
    let imagen= imgLugar.src;
    let latitud=inputLatitud.value;
    let longitud= inputLongitud.value;

    let estadoError=validar(nombre,descripcion,categoriasArreglo,direccion,provincia,canton,distrito,etiquetas)


    if(estadoError == true){
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el usuario, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
           
        });
    }else{
        let respuesta= registrarLugar(nombre,descripcion,categoriasArreglo,direccion,provincia,canton,distrito,etiquetas,facebook,instagram,twitter,imagen, latitud, longitud, id_Usuario )
        
        if(respuesta.success==true){
            swal.fire({
                title: 'Registro correcto',
                text: respuesta.msg,
                type: 'success',
                confirmButtonText: 'Entendido'
            });
        } else{
            swal.fire({
                title: 'Registro incorrecto',
                text: respuesta.msg,
                type: 'error',
                confirmButtonText: 'Entendido'
            });
        }
        setTimeout(function redirection(){ window.location.href = 'visualizar_lugar.html'; }, 2100);
    }
}; 


function validar(pNombre,pDescripcion,pcategorias,pDireccion,pProvincia,pCanton,pDistrito,pEtiquetas,){
    let error=false;
    let expletras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
    let expNumeros = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ .,0-9]+$/;
    

    if(pNombre == '' || pNombre.length == 0 ||expNumeros.test(pNombre)==false){
        inputNombre.classList.add('errorInput');
        error = true;
    }else{
        inputNombre.classList.remove('errorInput');
    }

    if(pDescripcion == '' || pDescripcion.length == 0 || expNumeros.test(pDescripcion)==false){
        inputDescripcion.classList.add('errorInput');
        error = true;
    }else{
        inputDescripcion.classList.remove('errorInput');
    }

    if (pcategorias[0] == '' || pcategorias.length == 0) {
        tablaCategorias.classList.add('errorInput');
        error = true;
    } else {
        tablaCategorias.classList.remove('errorInput');
    }

    if(pDireccion == '' || pDireccion.length == 0||expNumeros.test(pDireccion)==false){
        inputDireccion.classList.add('errorInput');
        error = true;
    }else{
        inputDireccion.classList.remove('errorInput');
    }

    if(pProvincia == '' || pProvincia.length == 0){
        inputProvincia.classList.add('errorInput');
        error = true;
    }else{
        inputProvincia.classList.remove('errorInput');
    }

    if(pCanton == '' || pCanton.length == 0){
        inputCanton.classList.add('errorInput');
        error = true;
    }else{
        inputCanton.classList.remove('errorInput');
    }
    
    if(pDistrito == '' || pDistrito.length == 0){
        inputDistrito.classList.add('errorInput');
        error = true;
    }else{
        inputDistrito.classList.remove('errorInput');
    }


    if(pEtiquetas == '' || pEtiquetas.length == 0){
        hiddenInput.classList.add('tags-input');
        error = true;
    }else{
        hiddenInput.classList.remove('tags-input');
    }

    return error;
}; 


function mostrarCategorias(){
    let listaCategorias = obtenerCategorias();
   let selectCategoria = document.querySelector('#categorias');
   for(let i=0; i < listaCategorias.length; i++){
        let nuevaOpcion = new Option(listaCategorias[i]['nombre']);
        nuevaOpcion.value = listaCategorias[i]['nombre'];
      selectCategoria.appendChild(nuevaOpcion);
    }
};

function mostrarSegundaCategorias(){
    let listaCategorias = obtenerCategorias();
   let selectCategoria = document.querySelector('#segundaCategoria');
   for(let i=0; i < listaCategorias.length; i++){
        let nuevaOpcion = new Option(listaCategorias[i]['nombre']);
        nuevaOpcion.value = listaCategorias[i]['nombre'];
      selectCategoria.appendChild(nuevaOpcion);
    }
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
    hiddenInput.value=tagsList.join(',');
}

function filterTag(tag){
    return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
}
});


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