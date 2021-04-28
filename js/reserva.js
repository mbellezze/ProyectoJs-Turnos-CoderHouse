/* VARIABLES GLOBALES */
var guardarReserva = [];


/* FUNCIÓN PARA TRAER LOS VALORES DE LA RESERVA */
function traerDatos() {
    var completo = document.getElementById("nomApe").value;
    var numCel = document.getElementById("cel").value;
    var casillaEmail = document.getElementById("mail").value;
    guardarReserva.push({nombre: completo, celular: numCel, correo: casillaEmail});
    console.log(guardarReserva);
}


/* FUNCION PARA VALIDAR LA RESERVA */
function validarReserva(event) {
    event.preventDefault();
    traerDatos();
    alert("Turno reservado");
    document.getElementById("reserva").reset();
}


/* ENVIAR RESERVA */
var miReserva = document.getElementById("reserva");
miReserva.addEventListener("submit", validarReserva);


/* FUNCION PARA VALIDAR EL FORMULARIO */
function validarFormulario(event) {
    event.preventDefault();
    alert("Formulario enviado!");
    document.getElementById("formulario").reset();
}


/* ENVIAR FORMULARIO */
var miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);