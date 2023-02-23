// favoritos
const contenedorFavoritos = document.getElementById("contenedor-favoritos");
const btnOpcionZonaFavorito = document.getElementById("btnZonaFavorito");
const loadFavorito = document.getElementById("loader-favorito");

btnOpcionZonaFavorito.innerHTML += `<label>Buscar Barrio</label>`;
btnOpcionZonaFavorito.innerHTML += `<input id="buscadorFav"></input>`;
btnOpcionZonaFavorito.innerHTML += `<button class="calcular" id="buscarInmueble" type="button" onclick="buscarFavorito(this.id)">Buscar</button>`;

btnOpcionZonaFavorito.innerHTML += `<button class="ordenZona" id="Todos" type="button" onclick="cargarTodosFavoritos(this.id)">Todos</button>`;
btnOpcionZonaFavorito.innerHTML += `<button class="ordenZona" id="Centro" type="button" onclick="filtroZonaFavoritos(this.id)">Zona Centro</button>`;
btnOpcionZonaFavorito.innerHTML += `<button class="ordenZona" id="Este" type="button" onclick="filtroZonaFavoritos(this.id)">Zona Este</button>`;
btnOpcionZonaFavorito.innerHTML += `<button class="ordenZona" id="Oeste" type="button" onclick="filtroZonaFavoritos(this.id)">Zona Oeste</button>`;
btnOpcionZonaFavorito.innerHTML += `<button class="ordenZona" id="Norte" type="button" onclick="filtroZonaFavoritos(this.id)">Zona Norte</button>`;
btnOpcionZonaFavorito.innerHTML += `<button class="ordenZona" id="Sur" type="button" onclick="filtroZonaFavoritos(this.id)">Zona Sur</button>`;
btnOpcionZonaFavorito.innerHTML += `<a class="nav-link active" href="#inicio-page"><button class="calcular">Volver a inicio</button></a>`;

let listaFavoritos = obtenerFavoritosLocalStorage();

function mostrarInmueblesFavoritos(lista){
    contenedorFavoritos.innerHTML = "";
    loadFavorito.style.display = "";
    setTimeout( () => {
        lista.forEach(inmueble => {
            loadFavorito.style.display = "none";
            const div = document.createElement("div");
            div.classList.add("inmueble-producto");
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
                    <button id="${inmueble.id}" class="borrar" onclick="eliminarDeFavoritos(this.id)">Eliminar</button>
                </div>
            `;
            contenedorFavoritos.append(div);
    })
    }, 500) 
}

function filtroZonaFavoritos(tipoOrden){
    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    resultado = listaFavoritos.filter((barrio) => barrio.zona.includes(tipoOrden));
    mostrarInmueblesFavoritos(resultado);
    guardarTablaLocalStorage(resultado);
}

function buscarFavorito(){
    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    let barrioFav = document.getElementById("buscadorFav").value;
    let resultado = listaFavoritos.filter((inmueble) => inmueble.barrio.includes(barrioFav));
    mostrarInmueblesFavoritos(resultado);
    guardarTablaLocalStorage(resultado);
}

function cargarTodosFavoritos(){
    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    mostrarInmueblesFavoritos(listaFavoritos);
}

function eliminarDeFavoritos(id){
    let indexEliminar;
    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos"));

    indexEliminar = listaFavoritos.findIndex((inmueble) => inmueble.id === id);
    listaFavoritos.splice(indexEliminar,1);
    guardarFavoritosLocalStorage(listaFavoritos);
    obtenerFavoritosLocalStorage()
    Swal.fire({
        color: '#FFC900',
        title: "Eliminado de Favoritos",
        icon: "success",
        showConfirmButton: false,
        timer: 500
    })
}