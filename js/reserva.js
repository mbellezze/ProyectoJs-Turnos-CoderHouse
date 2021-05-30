/* PRELOADER PARA MOSTRAR HASTA QUE CARGA LA PÁGINA */
$(".preloader").fadeOut(2000);

/* MÉTODO PARA DETECTAR SI EL DOM ESTÁ LISTO PARA USARSE */
$(document).ready(function(){
    
/* VARIABLES GLOBALES */
const guardarConsulta = [];
const guardarReserva = [];
const guardarDiaHora = [];
const URLJSON = '../js/backend/datos.json';



/* LLAMADA A LAS FUNCIONES PARA INICIAR EL CALENDARIO */
escribirServi();                           /* Función para escribir los servicios en el desplegable del formulario */
escribirObraSoc();                         /* Función para escribir las obras sociales */
detalles();                                /* Función para escribir los detalles de la reserva */



/* LIBRERÍA PARA ESCRIBIR EL CALENDARIO */
$("#diaHora").flatpickr({
    inline:true,
    enableTime: true,
    minTime: "09:00",
    maxTime: "17:00",
    minDate: "today",
    dateFormat: "j F, Y - H:i",
    "disable": [
        function(date) {
            // return true to disable
            return (date.getDay() === 0 || date.getDay() === 7);

        }
    ],
    locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],         
        }, 
        months: {
          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
          longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
    }
});


/* FUNCIÓN PARA ESCRIBIR LOS SERVICIOS EN EL SELECT */
function escribirServi() {
    $("select").append(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (i = 0; i < misDatos[1].servicios.length; i++) {
                $("#selectServi").append(`<option>${misDatos[1].servicios[i]}</option>`);
            }
        }
    });
    });
}


/* FUNCIÓN PARA ESCRIBIR LAS OBRAS SOCIALES EN EL SELECT */
function escribirObraSoc() {
    $("select").append(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (i = 0; i < misDatos[0].obrasocial.length; i++) {
                $("#selectObraSoc").append(`<option>${misDatos[0].obrasocial[i]}</option>`);
                }
            }
        });
        });
};



/* FUNCIÓN PARA CONFIRMAR LA FECHA Y EL HORARIO DE LA RESERVA */
$("#btnCalend").click((event) => {
    var diaHora = $(".flatpickr").val();
    localStorage.setItem("turno", diaHora);
    guardarDiaHora.push({turno: diaHora});
    $(location).attr('href','/views/DatosReserva.html');
    event.preventDefault();
});


/* FUNCIÓN PARA ESCRIBIR LOS DETALLES DE LA RESERVA */
function detalles() {
    $("#detalleReserv").append(`<div class="containerDet">
                                    <div class="divDetalle">
                                        <h6><u>Profesional</u></h6>
                                        <p>Esteban Quinteros</p>
                                    </div>
                                    <div class="divDetalle">
                                        <h6><u>Forma de pago</u></h6>
                                        <p>Efectivo o Débito</p>
                                    </div>
                                    <div class="divDetalle">
                                        <h6><u>Día y Hora</u></h6>
                                        <p>${localStorage.getItem("turno")}</p>
                                    </div>
                                    <div class="divDetalle">
                                        <h6><u>Ubicación</u></h6>
                                        <p>Pueyrredón 1300</p>
                                    </div>
                                </div>`);
};



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
            Swal.fire({
                icon: 'success',
                title: 'Consulta enviada!',
              })
        })
        .fail(function() {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
              })
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
            Swal.fire({
                icon: 'success',
                title: 'Reserva confirmada!',
              })
        })
        .fail(function() {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
              })
        })
    console.log(guardarReserva);
    $("#formulario").trigger("reset");
});



});