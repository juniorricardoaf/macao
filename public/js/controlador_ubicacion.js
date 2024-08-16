'use strict';
const selectProvincias = document.querySelector('#sltProvincias');
const selectCantones = document.querySelector('#sltCantones');
const selectDistritos = document.querySelector('#sltDistritos');

let provincias = obtener_provincias();
let cantones = obtener_cantones();
let distritos = obtener_distritos();
 
 
function llenarProvincias() {
    for (let i = 0; i < provincias.length; i++) {
        let opcion = new Option(provincias[i].nombre);
        opcion.value = provincias[i].idProvincia;
        selectProvincias.appendChild(opcion);
       // selectProvincias.SelectedOptions[0].textContent
    }

    
};
   
   
function llenarCantones(pidProvincia) {
    selectCantones.innerHTML = '';
    selectCantones.appendChild(new Option('--Seleccione un cantón--'));

    for (let i = 0; i < cantones.length; i++) {
        if (pidProvincia == cantones[i].Provincia_idProvincia) {
            let opcion = new Option(cantones[i].nombre);
            opcion.value = cantones[i].idCanton;
            selectCantones.appendChild(opcion);
        }
    }
};

function llenarDistritos(pidCanton) {
    selectDistritos.innerHTML = '';
    selectDistritos.appendChild(new Option('--Seleccione un distrito--'));

    for (let i = 0; i < distritos.length; i++) {
        if (pidCanton == distritos[i].Canton_idCanton){
            let opcion = new Option(distritos[i].nombre);
            opcion.value = distritos[i].idDistrito;
            selectDistritos.appendChild(opcion);
        }    
    }

};


llenarProvincias();

selectProvincias.addEventListener('change', function(){
    llenarCantones(this.value); //this.value es el valor de la opción de provincia seleccionada
});

selectCantones.addEventListener('change', function(){
    llenarDistritos(this.value); //this.value es el valor de la opción de cantones seleccionada
});