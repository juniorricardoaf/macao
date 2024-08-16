'use strict'

const inputFiltrar=document.querySelector('#txtFiltrar');
mostrarListaCategorias();
inputFiltrar.addEventListener('keyup',mostrarListaCategorias);
let listaCategorias = obtenerCategorias();

 
function mostrarListaCategorias(){
    let listaCategorias = obtenerCategorias();
    let filtro = inputFiltrar.value;

    let tbody = document.querySelector('#tblCategorias tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaCategorias.length; i++){
       
        if(listaCategorias[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())){ 

            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaDescripcion = fila.insertCell();
            let celdaOpciones = fila.insertCell();
            
            celdaNombre.innerHTML = listaCategorias [i]['nombre'];
            celdaDescripcion.innerHTML = listaCategorias [i]['descripcion'];
           
            let botonModificar=document.createElement('a');
            botonModificar.href='#';
            botonModificar.classList.add('far');
            botonModificar.classList.add('fa-edit');
            botonModificar.dataset.id_categoria=listaCategorias[i]['_id'];
            botonModificar.addEventListener('click', modificarDatosCategoria);
            celdaOpciones.appendChild(botonModificar);


            let botonEliminar=document.createElement('a');
            botonEliminar.href='#';
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash');
            botonEliminar.dataset.id_categoria=listaCategorias[i]['_id'];
            botonEliminar.addEventListener('click', confirmarBorrado);
            celdaOpciones.appendChild(botonEliminar);
                

            if (listaCategorias[i]['estado'] == 'Habilitado') {
                let botonDeshabilitar = document.createElement('a');
                botonDeshabilitar.classList.add('fas');
                botonDeshabilitar.classList.add('fa-eye-slash');
                botonDeshabilitar.href = '#';   
                botonDeshabilitar.dataset.id_categoria = listaCategorias[i]['_id'];
                botonDeshabilitar.addEventListener('click', deshabilitar);
                celdaOpciones.appendChild(botonDeshabilitar);
            }else{
                let botonHabilitar = document.createElement('a');
                botonHabilitar.classList.add('fas');
                botonHabilitar.classList.add('fa-eye');
                botonHabilitar.href = '#';
                botonHabilitar.dataset.id_categoria = listaCategorias[i]['_id'];
                botonHabilitar.addEventListener('click', habilitar);
                celdaOpciones.appendChild(botonHabilitar);
            }
        }
    }
};
 
function habilitar() {
    swal.fire({
        title: '¿Está seguro que desea habilitar la categoría?',
        text: "Este proceso se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
      }).then((result) => {
        if (result.value) {
            let id_categoria= this.dataset.id_categoria;
            habilitar_categoria(id_categoria);
            listaCategorias = obtenerCategorias();
            mostrarListaCategorias();
          swal.fire(
            'Categoría habilitada',
            'La categoría se habilitó con éxito',
            'success'
          )
        }
      })
    
}


function deshabilitar() {
    swal.fire({
        title: '¿Está seguro que desea deshabilitar la categoría?',
        text: "Este proceso se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
      }).then((result) => {
        if (result.value) {
            let id_categoria = this.dataset.id_categoria;
            deshabilitar_categoria(id_categoria);
            listaCategorias = obtenerCategorias();
            mostrarListaCategorias();
          swal.fire(
            'Categoría deshabilitada',
            'La categoría se deshabilitó con éxito',
            'success'
          )
        }
      })
}

function modificarDatosCategoria(){
    let id_categoria= this.dataset.id_categoria;
    localStorage.setItem('categoria',id_categoria);
    window.location.href='modificar_categoria.html';
};

function confirmarBorrado(){
    let id_categoria =  this.dataset.id_categoria;
    swal.fire({
        title: '¿Está seguro que desea eliminar la categoría?',
        text: "Este proceso no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar' 
      }).then((result) => {
        if (result.value) {
            borrar_categoria(id_categoria);
            listaCategorias = obtenerCategorias()
            mostrarListaCategorias();
          swal.fire(
            'categoría eliminada!',
            'La categoría fue borrada con éxito',
            'success'
          )
        }
      })
};