/* MÉTODO PARA DETECTAR SI EL DOM ESTÁ LISTO PARA USARSE */
$(document).ready(function(){

/* VARIABLES GLOBALES */
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
//const semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
//const horarios = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
const guardarConsulta = [];
const guardarReserva = [];
const URLJSON = '../js/backend/datos.json';
const APIURL = '../js/backend/reservycons.json';



/* MÉTODOS PARA TRAER LA FECHA ACTUAL */
const hoy = new Date();                    /* Objeto con la fecha completa del día de hoy */
const diaSemHoy = hoy.getDay();            /* Día de la semana actual */
const numDiaHoy = hoy.getDate();           /* Día actual */
const numMesHoy = hoy.getMonth();          /* Mes actual */
const añoHoy = hoy.getFullYear();          /* Año actual */



/* LLAMADA A LAS FUNCIONES PARA INICIAR EL CALENDARIO */
escribirCalen();                           /* Función para colocar el mes, los dias de la semana y los horarios */
escribirServi();                           /* Función para escribir los servicios en el desplegable del formulario */
escribirObraSoc();                         /* Función para escribir las obras sociales */
//detalles();                                /* Función para escribir los detalles de la reserva */


/* FUNCIONES */
function escribirCalen() {
    $("#tituloMes").append(`${meses[numMesHoy].toUpperCase()}`);
    $("#diasCalend").append(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            //for (const dato of misDatos) {
            for (i = 0; i<3; i++) {
                $(`#fila${i}`).append(`<span>${misDatos[i].día}</span><br>`);
                $(`#fila${i}`).append(`<span>${numDiaHoy+i}/`+`${numMesHoy+1}</span>`);
                for(j = 0; j < 14; j++) {
                    $(`#hr${i}`).append(`<a href="./DatosReserva.html">${misDatos[i].horarios[j]}</a>`);
                }
            }
            //}
        }
    });
    });
}



/* Función para volver atras en los dias en los calendarios */
$("#anterior").click(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            //for (const dato of misDatos) {
            for (i = 0; i<3; i++) {
                $(`#fila${i}`).empty();
                $(`#hr${i}`).empty();
            }
            for (i = 0; i<3; i++) {
                //$(`#fila${i}`).append(`<span>${semana[diaSemHoy+i-2]}</span><br>`);
                $(`#fila${i}`).append(`<span>${misDatos[i].día}</span><br>`);
                $(`#fila${i}`).append(`<span>${numDiaHoy+i-1}/`+`${numMesHoy+1}</span>`);
                for(j = 0; j < 14; j++) {
                    //$(`#hr${i}`).append(`<a href="./DatosReserva.html">${hora}</a>`);
                    $(`#hr${i}`).append(`<a id="btnhora" href="./DatosReserva.html">${misDatos[i].horarios[j]}</a>`);
                }
            }
            //}
        }
    });
});



/* Función para adelantar los dias en el calendario */
$("#posterior").click(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            //for (const dato of misDatos) {
            for (i = 0; i<3; i++) {
                $(`#fila${i}`).empty();
                $(`#hr${i}`).empty();
            }
            for (i = 0; i<3; i++) {
                //$(`#fila${i}`).append(`<span>${semana[diaSemHoy+i-2]}</span><br>`);
                $(`#fila${i}`).append(`<span>${misDatos[i+1].día}</span><br>`);
                $(`#fila${i}`).append(`<span>${numDiaHoy+i+1}/`+`${numMesHoy+1}</span>`);
                for(j = 0; j < 14; j++) {
                    //$(`#hr${i}`).append(`<a href="./DatosReserva.html">${hora}</a>`);
                    $(`#hr${i}`).append(`<a href="./DatosReserva.html">${misDatos[i].horarios[j]}</a>`);
                }
            }
            //}
        }
    });
});



function escribirServi() {
    $("select").append(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (i = 0; i < misDatos[8].servicios.length; i++) {
                $("#selectServi").append(`<option>${misDatos[8].servicios[i]}</option>`);
                //console.log(misDatos[8].servicios[i]);
            }
        }
    });
    });
}



function escribirObraSoc() {
    $("select").append(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (i = 0; i < misDatos[7].obrasocial.length; i++) {
                $("#selectObraSoc").append(`<option>${misDatos[7].obrasocial[i]}</option>`);
                    //console.log(misDatos[7].obrasocial[i]);
                }
            }
        });
        });
}


/* FUNCIÓN PARA ENVIAR Y VALIDAR EL FORMULARIO */
$("#btnConsul").click((event) => {
    event.preventDefault();
    var nom = $("#nomb").val();
    var ape = $("#apell").val();
    var correo = $("#correo").val();
    var servi = $("#selectServi").val();
    var texto = $("#text").val();
    guardarConsulta.push({nombre: nom, apellido: ape, email: correo, servicio: servi, mensaje: texto});
    $.ajax({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(guardarConsulta),
    })
        .done(function(msg) {
            alert("Consulta enviada");
        })
        .fail(function() {
            alert("Error");
        })
    console.log(guardarConsulta);
    $("#formulario").trigger("reset");
});
    

/* FUNCIÓN PARA ENVIAR Y VALIDAR EL FORMULARIO DE LA RESERVA*/
$("#btnReserva").click((event) => {
    event.preventDefault();
    var nomApe = $("#nombApell").val();
    var numCel = $("#numCel").val();
    var correo = $("#correo").val();
    var motivo = $("#motivo").val();
    var obraSoc = $("#selectObraSoc").val();
    var texto = $("#text").val();
    guardarReserva.push({nombre: nomApe, celular: numCel, email: correo, motivo: motivo, obraSocial: obraSoc, mensaje: texto});
    $.ajax({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(guardarReserva),
    })
        .done(function(msg) {
            alert("Reserva confirmada");
        })
        .fail(function() {
            alert("Error");
        })
    console.log(guardarReserva);
    $("#formulario").trigger("reset");
});
    


$("#btnhora").click(function() {
    console.log("asdasd")
    var fecha = $("#fila0").val();
    var hora = $("#hr0").val();
    $("#detalleReserv").append(`<div>
                                    <h6><u>Profesional</u></h6>
                                    <span>Esteban Quiroga</span><br>
                                    <h6><u>Forma de pago</u></h6>
                                    <span>Efectivo o Débito</span><br>
                                    <h6><u>Fecha de la reserva</u></h6>
                                    <span>${fecha}</span><br>
                                    <h6><u>Hora de la reservar</u></h6>
                                    <span>${hora}</span><br>
                                    <h6><u>Dirección</u></h6>
                                    <span>Pueyrredon 1320</span>`);
});



});