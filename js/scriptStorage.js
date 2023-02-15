/* function activarDarkMode(activado){
    body.classList.add("dark-mode");
    activado? localStorage.setItem("dark-mode" , "activado"): localStorage.setItem("dark-mode", "desactivado"); // key  valor
}
activarDarkMode(darkMode == "activado");
 */
/* function activarDarkMode(activado){
    activado ? body.className =+ 'dark-mode': (body.className = body.className.replace("dark-mode",''));
    activado? localStorage.setItem("dark-mode" , "activado"): localStorage.setItem("dark-mode", "desactivado"); // key  valor
}
activarDarkMode(darkMode == "activado"); */

// MODO OSCURO------------------------------------------------------------------------
const btnDarkMode = document.querySelector("#dark");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

/* function activarDarkMode(){
    darkMode === "activado"  ? localStorage.setItem("dark-mode" , "activado") : localStorage.setItem("dark-mode", "desactivado");
    darkMode === "activado" ? body.classList.add("dark-mode") : body.classList.remove("dark-mode");
    //activado ? body.className += 'dark-mode': (body.className = body.className.replace("dark-mode",''));
}
if(darkMode === "activado") activarDarkMode();
else desactivarDarkMode();
btnDarkMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    activarDarkMode(darkMode);
}) */



function activarDarkMode(){
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode" , "activado"); // key  valor
}

function desactivarDarkMode(){
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado"); // key  valor
}

if(darkMode === "activado") activarDarkMode();
else desactivarDarkMode();

btnDarkMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if(darkMode === "activado") desactivarDarkMode();
    else activarDarkMode();
})
// GUARDAR TABLA EN LS------------------------------------------------------------------------
function guardarTablaLocalStorage(lista){
    localStorage.setItem("barrios", JSON.stringify(lista));
}
// ELIMINAR TABLA DE LS------------------------------------------------------------------------
function eliminarTablaLocalStorage(){
    localStorage.removeItem("barrios");
    borrarTabla();
}
// ELIMINAR TODO LS------------------------------------------------------------------------
function borrarTodoLocalStorage(){
    localStorage.clear();
    location.reload();
}
// ------------------------------------------------------------------------
function obtenerLocalStorage(){
    let lista = JSON.parse(localStorage.getItem("barrios"));
    mostrarLista(lista);
    return lista;
}
// Recupero tabla del LS------------------------------------------------------------------------
if(localStorage.getItem("barrios")){
    let lista = JSON.parse(localStorage.getItem("barrios"));
    mostrarLista(lista);
}
// ------------------------------------------------------------------------
function ingresarNombreLS(){
    let nombre = document.getElementById("usuario").value;
    if(nombre != "") localStorage.setItem("nombreUs", JSON.stringify(nombre));
    document.getElementById("usuario").value = "";
    location.reload();
}
// ------------------------------------------------------------------------
if(localStorage.getItem("nombreUs")){
    let nombre = JSON.parse(localStorage.getItem("nombreUs"));
    if(nombre != "") document.getElementById("saludo").innerHTML = `Bienvenido ${nombre}, gracias por visitarnos`;
    /* else document.getElementById("saludo").innerHTML = ""; */
}