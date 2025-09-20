// =========================
// VALIDACIÓN LOGIN
// =========================
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.cl)$/;

    if (correo === "" || password === "") {
      mensaje.textContent = "Todos los campos son obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    if (!regexCorreo.test(correo)) {
      mensaje.textContent = "Solo se permiten correos @gmail.cl o @gmail.com.";
      mensaje.style.color = "red";
      return;
    }

    if (password.length < 4 || password.length > 10) {
      mensaje.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent = "Inicio de sesión exitoso.";
    mensaje.style.color = "green";
  });
}

// =========================
// VALIDACIÓN REGISTRO
// =========================
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
  formRegistro.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const mensaje = document.getElementById("mensaje");

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.cl)$/;

    if (nombre === "" || correo === "" || password === "" || confirmar === "") {
      mensaje.textContent = "Todos los campos son obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    if (!regexCorreo.test(correo)) {
      mensaje.textContent = "Solo se permiten correos @gmail.cl o @gmail.com.";
      mensaje.style.color = "red";
      return;
    }

    if (password.length < 4 || password.length > 10) {
      mensaje.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      mensaje.style.color = "red";
      return;
    }

    if (password !== confirmar) {
      mensaje.textContent = "Las contraseñas no coinciden.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent = "Registro exitoso.";
    mensaje.style.color = "green";
  });
}

// =================================
// LÓGICA DEL CARRITO DE COMPRAS
// =================================

// La clave para guardar los productos en el Local Storage
const localStorageKey = 'productos-en-carrito';

document.addEventListener('DOMContentLoaded', () => {
    // Escucha clics en todos los botones con la clase 'add-to-cart-btn'
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });

    // Cargar los productos del carrito al cargar la página del carrito
    if (document.getElementById('lista-carrito')) {
        cargarCarrito();
    }
    
    // Funcionalidad para el botón de finalizar compra
    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', finalizarCompra);
    }

    // Actualizar el contador del carrito en todas las páginas
    actualizarContadorCarrito();
});

// Seleccionamos los elementos del DOM que pueden o no existir en la página actual
const listaCarritoElemento = document.getElementById('lista-carrito');
const totalCarritoElemento = document.getElementById('total-carrito');
const contadorCarritoElemento = document.getElementById('contador-carrito');

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const boton = event.target;
    const id = boton.dataset.id;
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);
    const imagen = boton.dataset.imagen;

    let productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    // Buscamos si el producto ya existe en el carrito
    const productoExistente = productos.find(p => p.id === id);

    if (productoExistente) {
        // Si existe, aumentamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo agregamos como un nuevo producto
        const nuevoProducto = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        };
        productos.push(nuevoProducto);
    }

    // Guardamos el array actualizado en el Local Storage
    localStorage.setItem(localStorageKey, JSON.stringify(productos));
    
    // Actualizamos el contador en el encabezado
    actualizarContadorCarrito();
}

// Función para cargar los productos del Local Storage y mostrarlos en la página del carrito
function cargarCarrito() {
    const productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
    if (!listaCarritoElemento) return;

    listaCarritoElemento.innerHTML = '';
    
    if (productos.length === 0) {
        listaCarritoElemento.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
        if (totalCarritoElemento) totalCarritoElemento.textContent = '$0';
        return;
    }

    let total = 0;

    productos.forEach(producto => {
        const itemElemento = document.createElement('div');
        itemElemento.classList.add('item-carrito');
        itemElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito-item">
            <div class="info-item-carrito">
                <h3>${producto.nombre}</h3>
                <p>${formatearPrecio(producto.precio)} x ${producto.cantidad} = ${formatearPrecio(producto.precio * producto.cantidad)}</p>
            </div>
            <div class="acciones-item-carrito">
                 <button class="btn-restar" data-id="${producto.id}">-</button>
                 <span class="cantidad-item">${producto.cantidad}</span>
                 <button class="btn-sumar" data-id="${producto.id}">+</button>
            </div>
        `;
        listaCarritoElemento.appendChild(itemElemento);
        total += producto.precio * producto.cantidad;
    });

    if (totalCarritoElemento) totalCarritoElemento.textContent = formatearPrecio(total);

    // Añadimos los eventos a los botones de restar y sumar
    document.querySelectorAll('.btn-restar').forEach(button => {
        button.addEventListener('click', disminuirCantidad);
    });
    document.querySelectorAll('.btn-sumar').forEach(button => {
        button.addEventListener('click', aumentarCantidad);
    });
}

// Función para disminuir la cantidad o eliminar un producto del carrito
function disminuirCantidad(event) {
    const idProducto = event.target.dataset.id;
    let productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    const productoExistente = productos.find(p => p.id === idProducto);

    if (productoExistente) {
        if (productoExistente.cantidad > 1) {
            // Si la cantidad es mayor que 1, solo la disminuimos
            productoExistente.cantidad--;
        } else {
            // Si la cantidad es 1, eliminamos el producto del array
            productos = productos.filter(producto => producto.id !== idProducto);
        }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(productos));
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para aumentar la cantidad de un producto existente
function aumentarCantidad(event) {
    const idProducto = event.target.dataset.id;
    let productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const productoExistente = productos.find(p => p.id === idProducto);

    if (productoExistente) {
        productoExistente.cantidad++;
    }

    localStorage.setItem(localStorageKey, JSON.stringify(productos));
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar el contador de ítems en el carrito
function actualizarContadorCarrito() {
    const productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    let totalItems = productos.reduce((sum, producto) => sum + producto.cantidad, 0);
    if (contadorCarritoElemento) {
        if (totalItems > 0) {
            contadorCarritoElemento.textContent = totalItems;
        } else {
            contadorCarritoElemento.textContent = ''; // Vacío para que el CSS lo oculte
        }
    }
}

// Función para formatear el precio
function formatearPrecio(precio) {
    return `$${precio.toLocaleString('es-CL')}`;
}

// Función para finalizar la compra
function finalizarCompra() {
    const productosEnCarrito = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    if (productosEnCarrito.length === 0) {
        alert("El carrito está vacío. Añade productos para poder comprar.");
        return;
    }

    // Vaciar el localStorage
    localStorage.removeItem(localStorageKey);

    // Mostrar mensaje de éxito
    alert("¡Compra finalizada con éxito!");

    // Actualizar la vista del carrito y el contador
    cargarCarrito();
    actualizarContadorCarrito();
}
