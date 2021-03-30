/* FUNCION PARA OBTENER EL NOMBRE Y EL APELLIDO */
function datosPersonales() {
    var nombre = prompt("Ingrese su nombre:");
    var apellido = prompt("Ingrese su apellido:");
    while ((nombre !== " " || apellido !== " ") || (!isNaN(nombre) || !isNaN(apellido))) {
        if ((nombre !== " " && apellido !== " ") && (isNaN(nombre) && isNaN(apellido))) {
            var completo = nombre + " " + apellido;
            return completo;
        } else {
            alert("Debe ingresar correctamente sus datos");
        }
        var nombre = prompt("Ingrese su nombre:");
        var apellido = prompt("Ingrese su apellido:");
    }
}

/* FUNCION PARA OBTENER LA FECHA EN LA QUE QUIERE RESERVAR EL TURNO */
function reservaTurno() {
    var fecha = prompt("Ingrese la fecha que desea reservar (formato ddmmaaaa):");
    while ((fecha !== 0) || (!isNaN(fecha))) {
        if ((fecha > 0) && (!isNaN(fecha))) {
            return fecha;
        } else {
            alert("Ingrese una fecha correcta");
        }
        var fecha = prompt("Ingrese la fecha que desea reservar (formato ddmmaaaa):");
    }
}

/* LLAMADA A LAS VARIABLES */
var datos = datosPersonales();
var fecha2 = reservaTurno();
alert(datos + " confirmamos su turno para la fecha " + fecha2);