const rutaInmuebles = "../js/inmuebles.json";
const contenedorInmuebles = document.getElementById("contenedor-inmuebles");
const btnAgregarInmueble = document.querySelectorAll(".agregar-favorito");
const loadInmueble = document.getElementById("loader-inmueble");
let listaInmuebles = [];
const btnOpcionZonaInmueble = document.getElementById("btnZonaInm");

btnOpcionZonaInmueble.innerHTML += `<label>Buscar Barrio</label>`;
btnOpcionZonaInmueble.innerHTML += `<input id="buscadorInm" onclick="filtroZona(this.id)"></input>`;
btnOpcionZonaInmueble.innerHTML += `<button class="calcular" id="buscarInmueble" type="button" onclick="buscarInmueble(this.id)">Buscar</button>`;

btnOpcionZonaInmueble.innerHTML += `<button class="ordenZona" id="Todos" type="button" onclick="cargarInmuebles(this.id)">Todos</button>`;
btnOpcionZonaInmueble.innerHTML += `<button class="ordenZona" id="Centro" type="button" onclick="filtroZonaInmueble(this.id)">Zona Centro</button>`;
btnOpcionZonaInmueble.innerHTML += `<button class="ordenZona" id="Este" type="button" onclick="filtroZonaInmueble(this.id)">Zona Este</button>`;
btnOpcionZonaInmueble.innerHTML += `<button class="ordenZona" id="Oeste" type="button" onclick="filtroZonaInmueble(this.id)">Zona Oeste</button>`;
btnOpcionZonaInmueble.innerHTML += `<button class="ordenZona" id="Norte" type="button" onclick="filtroZonaInmueble(this.id)">Zona Norte</button>`;
btnOpcionZonaInmueble.innerHTML += `<button class="ordenZona" id="Sur" type="button" onclick="filtroZonaInmueble(this.id)">Zona Sur</button>`;
btnOpcionZonaInmueble.innerHTML += `<a class="nav-link active" href="#inicio-page"><button class="calcular">Volver a inicio</button></a>`;

function mostrarInmuebles(lista){
    contenedorInmuebles.innerHTML = "";
    loadInmueble.style.display = "";
    setTimeout( () => {
        lista.forEach(inmueble => {
            loadInmueble.style.display = "none";
            const div = document.createElement("div");
            div.classList.add("favorito-producto");
            div.innerHTML = `
                <img class="inmueble-imagen" src="${inmueble.imagen}" alt="${inmueble.titulo}">
                <div class="inmueble-detalle">
                    <small>Titulo</small>
                    <h3 class="inmueble-titulo">Inmueble ${inmueble.titulo}</h3>
                </div>
                <div class="inmueble-descripcion">
                    <div class="descripcion-descripcion">
                        <p class="descripcion-metros dataInmueble">${inmueble.metros} metros</p>
                        <p class="descripcion-ambientes dataInmueble">${inmueble.ambientes} ambientes</p>
                        <p class="descripcion-dormitorios dataInmueble">${inmueble.dormitorios} dormitorios</p>
                        <p class="descripcion-baños dataInmueble">${inmueble.baños} baños</p>
                    </div>
                    <div class="descripcion-barrio">
                        <p class="descripcion-barrio dataInmueble">Barrio ${inmueble.barrio}</p>
                        <p class="descripcion-comuna dataInmueble">Comuna ${inmueble.comuna}</p>
                        <p class="descripcion-zona dataInmueble">Zona ${inmueble.zona}</p>
                        <p class="descripcion-direccion dataInmueble">Direccion ${inmueble.direccion}</p>
                    </div>
                    <p>${inmueble.descripcion}</p>
                </div>
                <div>
                    <p class="inmueble-precio">$${inmueble.precio}</p>
                </div>
                <div>
                    <button id="${inmueble.id}" class="agregar-favorito favorito" onclick="agregarInmuebleFavorito(this.id)">Agregar Favorito</button>
                    <button id="ir-favorito" class="calcular" >Ir a Favorito</button>
                </div>
            `;
            contenedorInmuebles.append(div);
    })
    }, 500) 
}

function cargarInmuebles(){
    fetch(rutaInmuebles)
        .then( (res)=> res.json() )
        .then( (lista) => {
            mostrarInmuebles(lista);
            return lista;
        })
}
cargarInmuebles();

function filtroZonaInmueble(tipoOrden){
    let resultado;
    fetch(rutaInmuebles)
        .then( (res) => res.json() )
        .then( (lista) => {
            resultado = lista.filter((barrio) => barrio.zona.includes(tipoOrden));
            mostrarInmuebles(resultado);
            console.log(resultado)
            guardarTablaLocalStorage(resultado);
        })
    return resultado;
}

function buscarInmueble(){
    let barrioFav = document.getElementById("buscadorInm").value;
    let resultado;
    fetch(rutaInmuebles)
        .then( (res)=> res.json() )
        .then( (lista) => {
            resultado = lista.filter((inmueble) => inmueble.barrio.includes(barrioFav));
            mostrarInmuebles(resultado);
            guardarTablaLocalStorage(resultado);
            return lista;
        })
}

let inmueblesEnFavoritos = [];

function agregarInmuebleFavorito(id){
    let inmuebleAgregado;
    inmueblesEnFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    localStorage.setItem("favoritos", JSON.stringify(inmueblesEnFavoritos));
    fetch(rutaInmuebles)
    .then( (res)=> res.json() )
    .then( (lista) => {
            inmuebleAgregado = lista.find((inmueble) => inmueble.id === id);
            inmueblesEnFavoritos = JSON.parse(localStorage.getItem("favoritos"));
            if( !(inmueblesEnFavoritos.some((inmueble) => inmueble.id === id)) ){
                inmueblesEnFavoritos.push(inmuebleAgregado);
                guardarFavoritosLocalStorage(inmueblesEnFavoritos);
                console.log(inmueblesEnFavoritos);
                Swal.fire({
                    color: '#FFC900',
                    title:"Agregado a Favoritos",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 500
                })
               // modal.style.display = "none";
            }
            else{
                Swal.fire({
                    confirmButtonColor: '#FFC900',
                    title:"Ya esta en Favoritos",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 500
                })
               // modal.style.display = "none";
            }
        })
}
