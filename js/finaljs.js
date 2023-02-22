const carritoDOM = document.getElementById('carrito');
const productosDOM = document.getElementById('productos');
const formAgregarProducto = document.getElementById('agregar-productos');

let productos = [
    new Producto( "Juan Matin Antonio", 19, "Delantero", 1500000 , "Rosario Central"),
    new Producto("Roman Riquelkeu", 33, "Arquero", 500000, "Boca"),
    new Producto("Julio Luque", 31, "Delantero", 0, "Libre"),
    new Producto("Martin Cautelo", 33, "Arquero", 0, "Libre"),
    new Producto("Facundo Crack", 27, "Delantero", 2650000, "Rosario Central"),
    new Producto("Mariano Julio Lopez", 22, "Defensor", 1650000, "San Lorenzo"),
    ( "Luca Mio", 22, "Defensor", 1600000, "Velez"),
    new Producto("Diego Antonio", 31, "Mediocampista", 600000, "San Martin de Tucuman"),
    new Producto("Mario Mune", 17, "Delantero", 3600000, "Belgrano"),
    new Producto("Luca Liop", 28, "Delantero", 400000, "Talleres"),
    new Producto("Facundo Miro", 35, "Delantero", 0, "Libre"),
    new Producto("Tadeo Poliz", 19, "Mediocampista", 900000, "Rosario Central"),
    new Producto('Tirador de cervezas', 1000),
    new Producto('Dispenser de agua', 500)
  ];
  
  let carrito = [];
  
  let idContadora = 0;
  
  function Producto(nombre, edad, posicion, precio, equipoactual) {
    this.nombre = nombre;
    this.edad = edad;
    this.posicion = posicion;
    this.precio = precio;
    this.equipoactual = equipoactual;
  }

  function renderProductos() {
    productosDOM.innerHTML = '';
    productos.forEach(producto => {
      let divProducto = document.createElement('div');
      let btnAgregarAlCarrito = document.createElement('button');
  
      btnAgregarAlCarrito.innerText = 'Agregar producto al carrito';
      btnAgregarAlCarrito.onclick = () => agregarProductoAlCarrito(producto);
      divProducto.innerText = producto.descripcion;
      divProducto.appendChild(btnAgregarAlCarrito);
  
      productosDOM.appendChild(divProducto);
    })
  }

  