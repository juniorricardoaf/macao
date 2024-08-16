let id_usuarioContra = sessionStorage.getItem('_id');
let userContra = buscar_usuarios(id_usuarioContra);

let btnModificar = document.querySelector('#btnModificar');
let inputContrasena = document.querySelector('#txtContrasena');
let inputNueva = document.querySelector('#txtNueva');
let inputConfirmar = document.querySelector('#txtConfirmar');


btnModificar.addEventListener('click', obtenerDatosUsuario);

function obtenerDatosUsuario() {
    let contraVieja = inputContrasena.value;
    let contrasena = inputNueva.value;
    let confirmar = inputConfirmar.value;
    let primerInicio = "Falso";
    let estadoError = validar(contraVieja, contrasena, confirmar);


    if (estadoError == false) {
        modificarContrasena(id_usuarioContra, contrasena, primerInicio);
        swal.fire({
            type: 'success',
            title: 'Modificación  realizada correctamente',
            text: 'La modificación se realizó correctamente',
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(function () { window.location.href = 'perfil_usuario.html'; }, 2100);
        localStorage.clear();

    } else {
        swal.fire({
            title: 'Modificacion incorrecta',
            text: 'No se pudo modificar el perfil, revisá los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
}

function validar(pContraVieja, pContrasena, pConfirmar) {

    let pContraCoincide = userContra['contrasenna'];
    let error = false;
    let expContrasenna = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){7,50}[^'\s]/;

    //Validación de la contraseña vieja
    if (pContraVieja == pContraCoincide) {
        inputContrasena.classList.remove('errorInput');
    } else {
        inputContrasena.classList.add('errorInput');
        error = true;
    }

    //Validación de la contrasena
    if (pContrasena == '' || pContrasena.length == 0 || pContrasena.length < 8 || expContrasenna.test(pContrasena) == false) {
        inputNueva.classList.add('errorInput');
        error = true;
    } else {
        inputNueva.classList.remove('errorInput');
    }
    if (pConfirmar == pContrasena) {

        inputConfirmar.classList.remove('errorInput');
    } else {
        inputConfirmar.classList.add('errorInput');
        error = true;
    }
    return error;

}