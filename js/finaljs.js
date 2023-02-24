const carritoDOM = document.getElementById('carrito');
const productosDOM = document.getElementById('productos');
const rechazadosDOM = document.getElementById('rechazados');
const formAgregarProducto = document.getElementById('agregar-productos');

let productos = [
  new Producto('Juan Matin Antonio', 19, 'Delantero', 1500000 , 'Rosario Central'),
  new Producto('Roman Riquelkeu', 33, 'Arquero', 500000, 'Boca'),
  new Producto('Julio Luque', 31, 'Delantero', 0, 'Libre'),
  new Producto('Martin Cautelo', 33, 'Arquero', 0, 'Libre'),
  new Producto('Facundo Crack', 27, 'Delantero', 2650000, 'Rosario Central'),
  new Producto('Mariano Julio Lopez', 22, 'Defensor', 1650000, 'San Lorenzo'),
  new Producto( 'Luca Mio', 22, 'Defensor', 1600000, 'Velez'),
  new Producto('Diego Antonio', 31, 'Mediocampista', 600000, 'San Martin de Tucuman'),
  new Producto('Mario Mune', 17, 'Delantero', 3600000, 'Belgrano'),
  new Producto('Luca Liop', 28, 'Delantero', 400000, 'Talleres'),
  new Producto('Facundo Miro', 35, 'Delantero', 0, 'Libre'),
  new Producto('Tadeo Poliz', 19, 'Mediocampista', 900000, 'Rosario Central')
];

let carrito = [];
let rechazar = [];

let idContadora = 0;

function Producto(descripcion, edad, posicion, valor, clubactual) {
  this.descripcion = descripcion;
  this.edad = edad;
  this.posicion = posicion;
  this.valor = valor;
  this.clubactual = clubactual;
}

function renderProductos() {
  productosDOM.innerHTML = '';
  productos.forEach(producto => {
    let divProducto = document.createElement('div');
    let btnAgregarAlCarrito = document.createElement('button');
    let btnRechazarJugador = document.createElement('button');

    btnAgregarAlCarrito.innerText = 'Aceptar';
    btnRechazarJugador.innerText = 'Rechazar';
    btnAgregarAlCarrito.onclick = () => agregarProductoAlCarrito(producto);
    divProducto.innerText = producto.descripcion + " - " +  producto.posicion + " - " + producto.edad + " - " + " $" + producto.valor + " - " +  producto.clubactual + "  -  ";
    btnRechazarJugador.onclick = () => rechazarJugadorAccion(producto);
    divProducto.innerText = producto.descripcion + " - " +  producto.posicion + " - " + producto.edad + " - " + " $" + producto.valor + " - " +  producto.clubactual + "  -  ";
    divProducto.appendChild(btnAgregarAlCarrito);
    divProducto.appendChild(btnRechazarJugador);

    productosDOM.appendChild(divProducto);
  })
}

function renderCarrito() {
  carritoDOM.innerHTML = '';
  carrito.forEach(producto => {
    let divProducto = document.createElement('div');
    let btnQuitarDelCarrito = document.createElement('button');

    btnQuitarDelCarrito.innerText = 'Quitar';
    btnQuitarDelCarrito.onclick = () => quitarProductoAlCarrito(producto);
    divProducto.innerText = producto.descripcion + " - " +  producto.posicion + " - " + producto.edad + " - " + " $" + producto.valor + " - " + producto.clubactual + "  -  ";
    divProducto.appendChild(btnQuitarDelCarrito);

    carritoDOM.appendChild(divProducto);
  })
}

function agregarProductoAlCarrito(producto) {
  Swal.fire({
    title: `¿Desea aceptar a ${producto.descripcion}?`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    denyButtonText: `No aceptar`,
    confirmButtonColor: '#040A2C ',
    denyButtonColor: '#B4B4B2',
    cancelButtonColor: '#B4B4B2',
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Jugador agregado",
        duration: 2500,
        gravity: "bottom",
        style: {
          background: "linear-gradient(to right, #5B9759 , #069601)",
        }
      }).showToast();
      let productoCarrito = {
        ...producto,
        id: idContadora++
      }
      carrito.push(productoCarrito);
      renderCarrito();
    } else if (result.isDenied) {
      Swal.fire('No se agregó el jugador', '', 'info')
    }
  })
}

function renderRechazados() {
  rechazadosDOM.innerHTML = '';
  rechazar.forEach(producto => {
    let divRechazo = document.createElement('div');
    let btnQuitarDelCarritoRechazados = document.createElement('button');

    btnQuitarDelCarritoRechazados.innerText = 'Quitar';
    btnQuitarDelCarritoRechazados.onclick = () => quitarRechazo(producto);
    divRechazo.innerText = producto.descripcion + " - " +  producto.posicion + " - " + producto.edad + " - " + " $" + producto.valor + " - " + producto.clubactual + "  -  ";
    divRechazo.appendChild(btnQuitarDelCarritoRechazados);

    rechazadosDOM.appendChild(divRechazo);
  })
}


function rechazarJugadorAccion(producto) {
  Swal.fire({
    title: `¿Desea rechazar a ${producto.descripcion}?`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
    confirmButtonColor: '#A2280D ',
    denyButtonColor: '#B4B4B2',
    cancelButtonColor: '#B4B4B2',
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Jugador rechazado",
        duration: 2500,
        gravity: "bottom",
        style: {
          background: "linear-gradient(to right, #EEA4B1 , #F0062D)",
        }
      }).showToast();
      let jugadorRechazado = {
        ...producto,
        id: idContadora++
      }
      rechazar.push(jugadorRechazado);
      renderRechazados();
    } else if (result.isDenied) {
      Swal.fire('No se rechazo el jugador', '', 'info')
    }
  })
}

function quitarProductoAlCarrito(producto) {
  carrito = carrito.filter(productoCarrito => producto.id !== productoCarrito.id);
  renderCarrito();
}

function quitarRechazo(producto) {
  rechazar = rechazar.filter(jugadorRechazado => producto.id !== jugadorRechazado.id);
  renderRechazados();
}

formAgregarProducto.addEventListener('submit', function(event) {
  event.preventDefault();

  const inputDescripcion = document.getElementById('descripcion');
  const inputPosicion = document.getElementById('posicion');
  const inputEdad = document.getElementById('edad');
  const inputValor = document.getElementById('valor');
  const inputEquipo = document.getElementById('clubactual');

  const descripcion = inputDescripcion.value;
  const posicion = inputPosicion.value;
  const edad = Number(inputEdad.value);
  const valor = Number(inputValor.value);
  const clubactual = inputEquipo.value;

  const producto = new Producto(descripcion, posicion, edad, valor, clubactual);
  productos.push(producto);
  renderProductos();

  inputDescripcion.value = '';
  inputPosicion.value = '';
  inputEdad.value = '';
  inputValor.value = '';
  inputEquipo.value = '';
})

renderProductos();
renderCarrito();
renderRechazados();