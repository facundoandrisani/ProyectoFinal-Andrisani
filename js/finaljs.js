const carritoDOM = document.getElementById('carrito');
const productosDOM = document.getElementById('productos');
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

let idContadora = 0;

function Producto(descripcion, precio, posicion, valor, clubactual) {
  this.descripcion = descripcion;
  this.precio = precio;
  this.posicion = posicion;
  this.valor = valor;
  this.clubactual = clubactual;
}

function renderProductos() {
  productosDOM.innerHTML = '';
  productos.forEach(producto => {
    let divProducto = document.createElement('div');
    let btnAgregarAlCarrito = document.createElement('button');

    btnAgregarAlCarrito.innerText = 'Aceptar';
    btnAgregarAlCarrito.onclick = () => agregarProductoAlCarrito(producto);
    divProducto.innerText = producto.descripcion;
    divProducto.appendChild(btnAgregarAlCarrito);

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
    divProducto.innerText = producto.descripcion;
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
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Jugador agregado",
        duration: 2500,
        gravity: "bottom"
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

function quitarProductoAlCarrito(producto) {
  carrito = carrito.filter(productoCarrito => producto.id !== productoCarrito.id);
  renderCarrito();
}

formAgregarProducto.addEventListener('submit', function(event) {
  event.preventDefault();

  const inputDescripcion = document.getElementById('descripcion');
  const inputPrecio = document.getElementById('precio');

  const descripcion = inputDescripcion.value;
  const precio = Number(inputPrecio.value);

  const producto = new Producto(descripcion, precio);
  productos.push(producto);
  renderProductos();

  inputDescripcion.value = '';
  inputPrecio.value = '';
})

renderProductos();
renderCarrito();