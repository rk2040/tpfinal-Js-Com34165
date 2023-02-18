let cuerpoTabla = document.getElementById("cuerpoTabla");
let mensajeDeError = document.getElementById("mensajeError");
const rutaBarrios ="/js/barrios.json";


function mostrarLista(lista){
    borrarTabla();
    lista.forEach(element => {
        cuerpoTabla.innerHTML += `<tr> <td> ${element.nombre} </td><td> ${element.zona} </td><td> ${element.comuna} </td><td> ${element.precio} </td> </tr>`;
    });
    return lista;
}

function borrarTabla(){
    cuerpoTabla.innerHTML = "";
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
    return lista;
}

function ordenZona(tipoOrden){
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

function calcularSuperficie(medida1, medida2) {
    let areaRectangulo = medida1*medida2;
    
    if( areaRectangulo <= 0 || areaRectangulo == null || isNaN(areaRectangulo)){
        document.getElementById("mensajeError").innerHTML = "No se pudo calcular porque falta alguno de los valores.";
        return 0;
    }
    else {
        document.getElementById("mensajeError").innerHTML = "";
        return areaRectangulo;
    }
}

function calcularSuperficieCirculo(medida1, medida2) {
    let radio;
    let areaCirculo;

    if(medida1 != medida2){
        radio = ( (medida1 /2) * (medida2 /2) ); // Radio de un area ovalada
        areaCirculo = Math.PI * radio;
    }
    else{
        radio = medida1 /2; // Radio de un area circular
        areaCirculo = Math.PI * (radio * radio);
    }
    document.getElementById("radio").value = radio;

    if( areaCirculo <= 0 || areaCirculo == null || isNaN(areaCirculo) ){
        document.getElementById("mensajeError").innerHTML = "No se pudo calcular porque falta alguno de los valores.";
        return 0;
    }
    else{
        document.getElementById("mensajeError").innerHTML = "";
        return areaCirculo; 
    }
}

function mostrarMts2(){
    let medida1 = parseFloat (document.getElementById("largo").value);
    let medida2 = parseFloat (document.getElementById("ancho").value);
    
    document.getElementById("metrosRectangulo").value = calcularSuperficie(medida1, medida2).toFixed(2);
    document.getElementById("metrosCirculo").value = calcularSuperficieCirculo(medida1, medida2).toFixed(2);
}

function calcularValorTotal(num1, num2) {
    let resultado = num1*num2;

    if( resultado < 0 || resultado == null || isNaN(resultado)){
        document.getElementById("mensajeError").innerHTML = "No se pudo calcular porque falta alguno de los valores.";
        return 0;
    }
    else{
        document.getElementById("mensajeError").innerHTML = "";
        return resultado.toFixed(2);
    } 
}

function mostrarValorTotal(){
    let metroCirculo = parseFloat (document.getElementById("metrosCirculo").value);
    let metroRectangulo = parseFloat (document.getElementById("metrosRectangulo").value);
    let precio = parseFloat (document.getElementById("valorMetro").value);
    
    document.getElementById("valorRectangulo").value = calcularValorTotal(metroRectangulo, precio);
    document.getElementById("valorCirculo").value = calcularValorTotal(metroCirculo, precio);
}

function precioBarrio(){
    listaAux = listaBarrios;

    listaAux.sort( (a,b)=>{
        if(a.nombre < b.nombre) return  -1;
        if(a.nombre > b.nombre) return  1;
        return 0;
    } );
    let seleccion = document.getElementById("barrio");
    valorMetro = listaAux[seleccion.selectedIndex].precio;

    document.getElementById("valorMetro").value = valorMetro;
}

function borrar(){
    document.getElementById("largo").value = "";
    document.getElementById("ancho").value = "";
    document.getElementById("radio").value = "";
    document.getElementById("metrosRectangulo").value = "";
    document.getElementById("metrosCirculo").value = "";
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
