function mostrarMensaje() {
    Swal.fire({
        title: '¿Estas ahi?',
        text: 'Vemos que hace 5 segundos no mueves el mouse',
        icon: 'question',
        showCancelButton: false,
        showConfirmButton: false
    })
}

let myTimeout = setTimeout(mostrarMensaje, 5000);

function cerrarMensaje() {
    Swal.close()
}

function reiniciarContador() {
    cerrarMensaje()
    clearTimeout(myTimeout);
    myTimeout = setTimeout(mostrarMensaje, 5000);
}
