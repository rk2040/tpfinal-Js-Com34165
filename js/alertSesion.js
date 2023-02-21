function mostrarMensaje() {
    Swal.fire({
        title: '¿Estas ahi?',
        text: 'Vemos que hace 1 minuto no mueves el mouse',
        icon: 'question',
        showCancelButton: false,
        showConfirmButton: false
    })
}

let myTimeout = setTimeout(mostrarMensaje, 60000);

function cerrarMensaje() {
    Swal.close()
}

function reiniciarContador() {
    cerrarMensaje()
    clearTimeout(myTimeout);
    myTimeout = setTimeout(mostrarMensaje, 60000);
}

document.addEventListener("mousemove", reiniciarContador);