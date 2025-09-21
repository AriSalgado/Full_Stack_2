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

    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const direccion = document.getElementById("direccion").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const mensaje = document.getElementById("mensaje");

    // Regex para Run (7 a 9 caracteres, solo números y K)
    const regexRun = /^[0-9]{7,8}[0-9Kk]$/;
    // Regex para correo permitido
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    // Validaciones
    if (run === "" || nombre === "" || apellido === "" || correo === "" || password === "" || confirmar === "") {
      mensaje.textContent = "Todos los campos obligatorios deben estar completos.";
      mensaje.style.color = "red";
      return;
    }

    if (!regexRun.test(run)) {
      mensaje.textContent = "El Run debe tener entre 7 y 9 caracteres (solo números y K, sin puntos ni guion).";
      mensaje.style.color = "red";
      return;
    }

    if (!regexCorreo.test(correo)) {
      mensaje.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
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

    if (direccion.length > 300) {
      mensaje.textContent = "La dirección no puede superar los 300 caracteres.";
      mensaje.style.color = "red";
      return;
    }

    // Si pasa todas las validaciones
    mensaje.textContent = "Registro exitoso.";
    mensaje.style.color = "green";
    formRegistro.reset();
  });
}
 
// =================================
// LÓGICA DEL CARRITO DE COMPRAS
// =================================

// La clave para guardar los productos en el Local Storage
const localStorageKey = 'productos-en-carrito';

document.addEventListener('DOMContentLoaded', () => {
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

    // Usamos delegación de eventos para que los botones añadidos dinámicamente también funcionen
    document.body.addEventListener('click', function(event) {
        // Verificamos si el elemento clickeado tiene la clase 'add-to-cart-btn'
        if (event.target.classList.contains('add-to-cart-btn')) {
            agregarAlCarrito(event);
        }
    });
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
// =========================
// VALIDACIÓN CONTACTO
// =========================
const formContacto = document.getElementById("formContacto");
if (formContacto) {
  formContacto.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensajeContacto = document.getElementById("mensajeContacto").value.trim();
    const alerta = document.getElementById("alerta");

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/;

    if (nombre === "" || correo === "" || mensajeContacto === "") {
      alerta.textContent = "Todos los campos son obligatorios.";
      alerta.style.color = "red";
      return;
    }

    if (!regexCorreo.test(correo)) {
      alerta.textContent = "Debe ingresar un correo válido (ej: nombre@gmail.com).";
      alerta.style.color = "red";
      return;
    }

    if (mensajeContacto.length < 10) {
      alerta.textContent = "El mensaje debe tener al menos 10 caracteres.";
      alerta.style.color = "red";
      return;
    }

    alerta.textContent = "¡Mensaje enviado exitosamente!";
    alerta.style.color = "green";
    formContacto.reset();
  });
}

// =========================
// BLOG: DETALLE DE ARTÍCULOS
// =========================
const detallesBlog = {
  1: { // Corresponde al artículo de Pantalones Cargo
    titulo: "Guía de Estilo: Cómo Combinar Pantalones Cargo",
    contenido: `
      <p>Los pantalones cargo han vuelto con fuerza, convirtiéndose en una pieza clave del estilo urbano. Su versatilidad los hace perfectos para cualquier ocasión, si sabes cómo combinarlos.</p>
      <h4>Look Casual y Cómodo</h4>
      <p>Para un look de día, combina tus pantalones cargo con una polera básica o una de nuestras <strong>poleras oversize</strong>. Este contraste de siluetas crea un balance perfecto. En los pies, unas zapatillas blancas o negras son una apuesta segura.</p>
      <h4>Estilo Urbano Atrevido</h4>
      <p>Si buscas algo más audaz, prueba con un crop top ajustado para resaltar la cintura y jugar con las proporciones. Añade una chaqueta de mezclilla o un cortavientos para completar el outfit. ¡No olvides los accesorios como cadenas o un gorro para darle el toque final!</p>
    `
  },
  2: { // Corresponde al artículo de Poleras Oversize
    titulo: "El Regreso del Oversize: Comodidad y Estilo",
    contenido: `
      <p>La moda oversize no es solo una tendencia, es una declaración de comodidad y estilo. Las poleras holgadas te permiten moverte con libertad sin sacrificar el look.</p>
      <h4>Cómo llevar la tendencia</h4>
      <p>El secreto está en el equilibrio. Si llevas una polera oversize, combínala con pantalones más ajustados como unos jeans pitillo o calzas. Si prefieres un look totalmente relajado, nuestros <strong>pantalones cargo</strong> son el complemento ideal.</p>
      <p>Un truco de estilo es meter una parte de la polera por dentro del pantalón para marcar sutilmente la figura y darle un toque más intencionado a tu look. ¡Experimenta y encuentra tu propia forma de llevarlo!</p>
    `
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const detalleBlog = document.getElementById("detalleBlog");
  if (detalleBlog) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (detallesBlog[id]) {
      detalleBlog.innerHTML = `
        <h1>${detallesBlog[id].titulo}</h1>
        ${detallesBlog[id].contenido}
        <a href="blog.html" class="btn">← Volver al Blog</a>
      `;
    } else {
      detalleBlog.innerHTML = "<p>Artículo no encontrado.</p>";
    }
  }
});

// =========================
// DETALLE DE PRODUCTOS
// =========================
const productosData = {
    1: {
        nombre: "Polera Oversize",
        descripcion: "Una polera cómoda y con estilo, perfecta para un look urbano y relajado. Hecha con algodón de alta calidad.",
        precio: 15000,
        imagen: "imagenes/polera.png"
    },
    2: {
        nombre: "Pantalón Cargo",
        descripcion: "Pantalón cargo resistente y funcional, con múltiples bolsillos para mayor comodidad. Ideal para el día a día.",
        precio: 25000,
        imagen: "imagenes/Cargo_Jeans.jpg"
    },
};

document.addEventListener("DOMContentLoaded", () => {
  const detalleProducto = document.getElementById("detalleProducto");
  if (detalleProducto) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (productosData[id]) {
      const p = productosData[id];
      detalleProducto.innerHTML = `
        <div class="detalle-card">
          <img src="${p.imagen}" alt="${p.nombre}">
          <div class="detalle-info">
            <h2>${p.nombre}</h2>
            <p>${p.descripcion}</p>
            <p><strong>Precio:</strong> ${formatearPrecio(p.precio)}</p>
            <button class="add-to-cart-btn"
                    data-id="${id}"
                    data-nombre="${p.nombre}"
                    data-precio="${p.precio}"
                    data-imagen="${p.imagen}">
              Añadir al carrito
            </button>
            <a href="productos.html" class="btn">← Volver a Productos</a>
          </div>
        </div>
      `;
    } else {
      detalleProducto.innerHTML = "<p>Producto no encontrado.</p>";
    }
  }
});
