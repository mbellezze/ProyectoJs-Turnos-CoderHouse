/* VARIABLES GLOBALES */
var personas = ["Juan Gonzalez", "Rodolfo Perez", "Maria Vazques", "Gimena Ferreira", "Nelson Barraza"];
var reservas = ["12032021", "20042021", "10052021"];


/* FUNCION PARA OBTENER EL NOMBRE Y EL APELLIDO */
function datosPersonales() {
    var nombre = prompt("Ingrese su nombre:");
    var apellido = prompt("Ingrese su apellido:");
    while ((nombre !== " " || apellido !== " ") || (!isNaN(nombre) || !isNaN(apellido))) {
        if ((nombre !== " " && apellido !== " ") && (isNaN(nombre) && isNaN(apellido))) {
            var completo = nombre + " " + apellido;
            personas.push(completo);
            console.log(personas);
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
            reservas.push(fecha);
            console.log(reservas);
            return fecha;
        } else {
            alert("Ingrese una fecha correcta");
        }
        var fecha = prompt("Ingrese la fecha que desea reservar (formato ddmmaaaa):");
    }
}

/* CLASE PARA ASIGNAR PACIENTES NUEVOS */
class Paciente {
    constructor(datos, fecha) {
        this.datos = datos;
        this.fecha = fecha;
    }
    confirmacion() {
        /* alert(this.datos + " confirmamos su turno para la fecha " + this.fecha); */
        var traerNodo = document.getElementById("agregar");
        var confirmar = document.createElement("p");
        confirmar.innerHTML = this.datos + " confirmamos su turno para la fecha " + this.fecha;
        traerNodo.appendChild(confirmar);
    }
}


/* LLAMADA A LAS VARIABLES */
var persona = new Paciente(datosPersonales(), reservaTurno());
persona.confirmacion();

/*var datos = datosPersonales();*/
/*var fecha2 = reservaTurno();*/
/*alert(datos + " confirmamos su turno para la fecha " + fecha2);*/