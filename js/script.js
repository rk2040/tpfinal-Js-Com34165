let cuerpoTabla = document.getElementById("cuerpoTabla");
let mensajeDeError = document.getElementById("mensajeError");

// ------------------------------------------------------------------------
function mostrarLista(lista){
    let total = lista.length;
    borrarTabla();
    for(let i=0; i<total; i++)
        cuerpoTabla.innerHTML += `<tr> <td> ${lista[i].nombre} </td><td> ${lista[i].zona} </td><td> ${lista[i].comuna} </td><td> ${lista[i].precio} </td> </tr>`;
    //cuerpoTabla.innerHTML = lista.map(el => `<tr> <td> ${el.nombre} </td><td> ${el.zona} </td><td> ${el.comuna} </td><td> ${el.precio} </td></tr>`); // aparece una "," entre td y td
    return lista;
}
// ------------------------------------------------------------------------
function borrarTabla(){
    cuerpoTabla.innerHTML = "";
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
function filtroComuna(comuna){
    let resultado = listaBarrios.filter(comunas => comunas.comuna === comuna);
    guardarTablaLocalStorage(resultado);
    mostrarLista(resultado);
    return resultado;
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
function ordenAlfabeticamente(tipoOrden){
    let listaAux = listaBarrios;
    if(tipoOrden === "todo az")
    {
        listaAux.sort( (a,b)=>{
            if(a.nombre < b.nombre) return  -1;
            if(a.nombre > b.nombre) return  1;
            return 0;
        } );
    }
    else{
        listaAux.sort( (a,b)=>{
            if(b.nombre < a.nombre) return  -1;
            if(b.nombre > a.nombre) return  1;
            return 0;
        } );
    }
    guardarTablaLocalStorage(listaAux);
    mostrarLista(listaAux);
    return listaAux;
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
function ordenPrecio(tipoOrden){
    let listaAux = listaBarrios;
    if(tipoOrden === "mayor precio") listaAux.sort((a,b) => b.precio - a.precio);
    else listaAux.sort((a,b) => a.precio - b.precio);

    guardarTablaLocalStorage(listaAux);
    mostrarLista(listaAux);
    return listaAux;
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
function ordenZona(tipoOrden){
    let listaAux;
    if(tipoOrden === "Este") listaAux = listaBarrios.filter((zona) => zona.zona.includes(tipoOrden));
    else if(tipoOrden === "Oeste") listaAux = listaBarrios.filter((zona) => zona.zona.includes(tipoOrden));
    else if(tipoOrden === "Norte") listaAux = listaBarrios.filter((zona) => zona.zona.includes(tipoOrden));
    else listaAux = listaBarrios.filter((zona) => zona.zona.includes(tipoOrden)); //Sur

    guardarTablaLocalStorage(listaAux);
    mostrarLista(listaAux);
    return listaAux;
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
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
// ------------------------------------------------------------------------
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
// ------------------------------------------------------------------------
function mostrarMts2(){
    let medida1 = parseFloat (document.getElementById("largo").value);
    let medida2 = parseFloat (document.getElementById("ancho").value);
    
    document.getElementById("metrosRectangulo").value = calcularSuperficie(medida1, medida2).toFixed(2);
    document.getElementById("metrosCirculo").value = calcularSuperficieCirculo(medida1, medida2).toFixed(2);
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
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
// ------------------------------------------------------------------------
function mostrarValorTotal(){
    let metroCirculo = parseFloat (document.getElementById("metrosCirculo").value);
    let metroRectangulo = parseFloat (document.getElementById("metrosRectangulo").value);
    let precio = parseFloat (document.getElementById("valorMetro").value);
    
    document.getElementById("valorRectangulo").value = calcularValorTotal(metroRectangulo, precio);
    document.getElementById("valorCirculo").value = calcularValorTotal(metroCirculo, precio);
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
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
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
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
