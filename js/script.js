const cuerpoTabla = document.getElementById("cuerpoTabla");
const mensajeDeError = document.getElementById("mensajeError");
const msjError = "No se pudo calcular porque falta alguno de los valores."
const mtsRectangulo = document.getElementById("metrosRectangulo");
const mtsCirculo = document.getElementById("metrosCirculo");
const mtsLargo = document.getElementById("largo");
const mtsAncho = document.getElementById("ancho");
const mtsRadio = document.getElementById("radio");
const precioMetro = document.getElementById("valorMetro");
const precioTotalRectangulo = document.getElementById("valorRectangulo");
const precioTotalCirculo = document.getElementById("valorCirculo");

const load = document.getElementById("loader");
const rutaBarrios = "./js/barrios.json";

load.style.display="none";

function mostrarLista(lista){
    borrarTabla();
    cuerpoTabla.innerHTML = "";
    load.style.display="";
    lista.forEach(e => {
        setTimeout( () => {
            load.style.display="none";
            cuerpoTabla.innerHTML += `<tr> <td> ${e.nombre} </td><td> ${e.zona} </td><td> ${e.comuna} </td><td> ${e.precio} </td> </tr>`;
        }, 500)
    });
    return lista;
}

function borrarTabla(){
    cuerpoTabla.innerHTML = "";
}

function ordenAlfabeticamente(tipoOrden){
    fetch(rutaBarrios)
        .then( (res) => res.json() )
        .then( (lista) => {
            if(tipoOrden === "todo az")
            {
                lista.sort( (a,b)=>{
                    if(a.nombre < b.nombre) return  -1;
                    if(a.nombre > b.nombre) return  1;
                    return 0;
                } );
            }
            else{
                lista.sort( (a,b)=>{
                    if(b.nombre < a.nombre) return  -1;
                    if(b.nombre > a.nombre) return  1;
                    return 0;
                } );
            }
        guardarTablaLocalStorage(lista);
        mostrarLista(lista);
    })
    return lista;
}

function ordenPrecio(tipoOrden){
    fetch(rutaBarrios)
        .then( (res)=> res.json() )
        .then( (lista) => {
            tipoOrden === "mayor precio" ? lista.sort((a,b) => b.precio - a.precio) : lista.sort((a,b) => a.precio - b.precio)
            guardarTablaLocalStorage(lista);
            mostrarLista(lista);
        })
}

function filtroComuna(comuna){
    let resultado;
    fetch(rutaBarrios)
        .then( (res) => res.json() )
        .then( (lista) => {
            resultado = lista.filter(comunas => comunas.comuna === comuna);
            guardarTablaLocalStorage(resultado);
            mostrarLista(resultado);
        })
    return resultado;
}

function filtroZona(tipoOrden){
    let resultado;
    fetch(rutaBarrios)
        .then( (res) => res.json() )
        .then( (lista) => {
            if(tipoOrden === "Este") resultado = lista.filter((barrio) => barrio.zona.includes(tipoOrden));
            else if(tipoOrden === "Oeste") resultado = lista.filter((barrio) => barrio.zona.includes(tipoOrden));
            else if(tipoOrden === "Norte") resultado = lista.filter((barrio) => barrio.zona.includes(tipoOrden));
            else resultado = lista.filter((barrio) => barrio.zona.includes(tipoOrden)); //Sur
            
            mostrarLista(resultado);
            guardarTablaLocalStorage(resultado);
        })
    return resultado;
}

function mostrarMts2(){
    let medida1 = parseFloat(mtsLargo.value);
    let medida2 = parseFloat(mtsAncho.value);

    let radio = medida1 != medida2 ? (medida1 /2) * (medida2 /2) : medida1 /2;
    let areaCirculo = Math.PI * radio;

    let areaRectangulo = medida1*medida2;
    areaRectangulo <= 0 || areaRectangulo == null || isNaN(areaRectangulo) ? mensajeDeError.innerHTML = msjError : mensajeDeError.innerHTML = "";
    
    mtsRadio.value = radio.toFixed(2);
    mtsRectangulo.value = areaRectangulo.toFixed(2);
    mtsCirculo.value = areaCirculo.toFixed(2);
}

function mostrarValorTotal(){
    let circulo = parseFloat(mtsCirculo.value) * parseFloat(precioMetro.value);
    let rectangulo = parseFloat(mtsRectangulo.value) * parseFloat(precioMetro.value);

    circulo < 0 || circulo == null || isNaN(circulo) ? mensajeDeError.innerHTML = msjError: mensajeDeError.innerHTML = "";
    rectangulo < 0 || rectangulo == null || isNaN(rectangulo) ? mensajeDeError.innerHTML = msjError: mensajeDeError.innerHTML = "";
    
    precioTotalCirculo.value = circulo.toFixed(2);
    precioTotalRectangulo.value = rectangulo.toFixed(2);
}

function precioBarrio(){
    fetch(rutaBarrios)
    .then( (res) => res.json() )
    .then( (lista) => {
        lista.sort( (a,b)=>{
            if(a.nombre < b.nombre) return  -1;
            if(a.nombre > b.nombre) return  1;
            return 0;
        } );
        let seleccion = document.getElementById("barrio");
        valorMetro = lista[seleccion.selectedIndex].precio;
        document.getElementById("valorMetro").value = valorMetro;
    })
}

function borrar(){
    mtsLargo.value = "";
    mtsAncho.value = "";
    mtsRadio.value = "";
    mtsRectangulo.value = "";
    mtsCirculo.value = "";
    document.getElementById("valorMetro").value = "";
    document.getElementById("valorRectangulo").value = "";
    document.getElementById("valorCirculo").value = "";
    document.getElementById("mensajeError").innerHTML = "";
}

// Solo probando algo de la ultima clase------------------------------------------------------------------------
/* const btn = document.getElementById("dark")

btn.addEventListener('click', () => {
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,

        }).then((result) => {
        // Read more about isConfirmed, isDenied below 
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
        })
}) */
