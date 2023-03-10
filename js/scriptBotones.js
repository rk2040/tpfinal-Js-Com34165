// index
const btnLogin = document.getElementById("login");
const btnBusqueda = document.getElementById("btnSuperficie");
const btnOperaciones = document.getElementById("btnCalculos");
const btnTabla = document.getElementById("btnTabla");

// index
btnLogin.innerHTML += `<input type="text" id="usuario" required placeholder="Ingrese su nombre">`;
btnLogin.innerHTML += `<button class="calcular" type="button" onclick="ingresarNombreLS(this.id)">Ingresar</button>`;
btnLogin.innerHTML += `<button class="borrar" id="salir" type="button" onclick="borrarTodoLocalStorage(this.id)">Salir</button>`;
// Botones Orden alfabetico y Orden por mayor - menor Precio
btnBusqueda.innerHTML += `<button class="ordenAlfa" id="todo az" type="button" onclick="ordenAlfabeticamente(this.id)">Todos A-Z</button>`;
btnBusqueda.innerHTML += `<button class="ordenAlfa" id="todo za" type="button" onclick="ordenAlfabeticamente(this.id)">Todos Z-A</button>`;
btnBusqueda.innerHTML += `<button class="ordenPrecio" id="mayor precio" type="button" onclick="ordenPrecio(this.id)">Mayor precio</button>`;
btnBusqueda.innerHTML += `<button class="ordenPrecio" id="menor precio" type="button" onclick="ordenPrecio(this.id)">Menor precio</button>`;
// Botones Filtro por Comuna
for(let i=1; i<=15; i++){
    btnBusqueda.innerHTML += `<button class="ordenComuna" id="Comuna ${i}" type="button" onclick="filtroComuna(this.id)">Comuna ${i}</button>`;
}
// Botones Filtro por Zona
btnBusqueda.innerHTML += `<button class="ordenZona" id="Centro" type="button" onclick="filtroZona(this.id)">Zona Centro</button>`;
btnBusqueda.innerHTML += `<button class="ordenZona" id="Este" type="button" onclick="filtroZona(this.id)">Zona Este</button>`;
btnBusqueda.innerHTML += `<button class="ordenZona" id="Oeste" type="button" onclick="filtroZona(this.id)">Zona Oeste</button>`;
btnBusqueda.innerHTML += `<button class="ordenZona" id="Norte" type="button" onclick="filtroZona(this.id)">Zona Norte</button>`;
btnBusqueda.innerHTML += `<button class="ordenZona" id="Sur" type="button" onclick="filtroZona(this.id)">Zona Sur</button>`;
// Botones Operaciones
btnOperaciones.innerHTML += `<button class="boton calcular" type="button" id="mts2" onclick="mostrarMts2(this.id)">Calcular Mts2</button>`;
btnOperaciones.innerHTML += `<button class="boton calcular" type="button"  id="valorTotal" onclick="mostrarValorTotal(this.id)">Calcular total en US$</button>`;
btnOperaciones.innerHTML += `<button class="boton borrar" type="button" id="reset" onclick="borrar()">Reset</button>`;
// Botones Tabla
btnTabla.innerHTML += `<button class="borrar" type="button" id="reset" onclick="borrarTabla()">Reset</button>`;
btnTabla.innerHTML += `<button class="borrar" type="button" id="reset" onclick="eliminarTablaLocalStorage()">Eliminar busqueda</button>`;
