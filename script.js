// =========================
// VALIDACIÓN LOGIN
// =========================
// Para correos válidos
const regexCorreo = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.cl|duoc\.cl|profesor\.duoc\.cl)$/;

const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    if (correo === "" || password === "") {
      mensaje.textContent = "Todos los campos son obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    if (!regexCorreo.test(correo)) {
    mensaje.textContent = "El correo debe ser @gmail.cl, @gmail.com, @duoc.cl o @profesor.duoc.cl.";
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

    if (nombre === "" || correo === "" || password === "" || confirmar === "") {
      mensaje.textContent = "Todos los campos son obligatorios.";
      mensaje.style.color = "red";
      return;
    }

    if (!regexCorreo.test(correo)) {
    mensaje.textContent = "El correo debe ser @gmail.cl, @gmail.com, @duoc.cl o @profesor.duoc.cl.";
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

// =========================
// AGREGAR AL CARRITO
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.add-to-cart-btn');
  if (botones.length > 0) {
    botones.forEach(button => {
      button.addEventListener('click', agregarAlCarrito);
    });
  }
});

const localStorageKey = 'productos-en-carrito';

function agregarAlCarrito(event) {
  const id = event.target.dataset.id;
  const nombre = event.target.dataset.nombre;
  const precio = parseInt(event.target.dataset.precio);
  const imagen = event.target.dataset.imagen;

  const producto = { id, nombre, precio, imagen };

  let productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  productos.push(producto);

  localStorage.setItem(localStorageKey, JSON.stringify(productos));

  alert(`"${nombre}" ha sido añadido al carrito.`);
}

// =========================
// DETALLE DE PRODUCTOS
// =========================
const productosData = {
  1: {
    nombre: "Polera Oversize",
    descripcion: "Una polera cómoda y con estilo, perfecta para un look urbano y relajado. Hecha con algodón de alta calidad.",
    precio: 15000,
    imagen: "imagenes/polera.png",
    stock: 5,
    stockCritico: 2
  },
  2: {
    nombre: "Pantalón Cargo",
    descripcion: "Pantalón cargo resistente y funcional, con múltiples bolsillos para mayor comodidad. Ideal para el día a día.",
    precio: 25000,
    imagen: "imagenes/Cargo_Jeans.jpg",
    stock: 10,
    stockCritico: 3
  }
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
            <p><strong>Precio:</strong> $${p.precio.toLocaleString("es-CL")}</p>
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

      // Mostrar alerta si stock crítico
      if (p.stock <= p.stockCritico) {
        detalleProducto.innerHTML += `<p style="color:red">⚠ Stock crítico: quedan ${p.stock} unidades</p>`;
      }
    } else {
      detalleProducto.innerHTML = "<p>Producto no encontrado.</p>";
    }
  }
});


// =========================
// ADMIN: GESTIÓN DE PRODUCTOS
// =========================
const formProducto = document.getElementById("formProducto");
const listaProductosAdmin = document.getElementById("listaProductosAdmin");

if (formProducto && listaProductosAdmin) {
  formProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreProd").value.trim();
    const precio = parseFloat(document.getElementById("precioProd").value);
    const stock = parseInt(document.getElementById("stockProd").value);

    let productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    productos.push({ id: Date.now(), nombre, precio, stock });
    localStorage.setItem("adminProductos", JSON.stringify(productos));

    mostrarProductosAdmin();
    formProducto.reset();
  });

  function mostrarProductosAdmin() {
    let productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    listaProductosAdmin.innerHTML = productos.map(p => `
      <div>
        <strong>${p.nombre}</strong> - $${p.precio} (Stock: ${p.stock})
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </div>
    `).join("");
  }

  window.eliminarProducto = function(id) {
    let productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem("adminProductos", JSON.stringify(productos));
    mostrarProductosAdmin();
  };

  mostrarProductosAdmin();
}


// =========================
// ADMIN: GESTIÓN DE USUARIOS
// =========================
const formUsuario = document.getElementById("formUsuario");
const listaUsuariosAdmin = document.getElementById("listaUsuariosAdmin");

if (formUsuario && listaUsuariosAdmin) {
  formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreUsuario").value.trim();
    const rol = document.getElementById("rolUsuario").value;

    let usuarios = JSON.parse(localStorage.getItem("adminUsuarios")) || [];
    usuarios.push({ id: Date.now(), nombre, rol });
    localStorage.setItem("adminUsuarios", JSON.stringify(usuarios));

    mostrarUsuariosAdmin();
    formUsuario.reset();
  });

  function mostrarUsuariosAdmin() {
    let usuarios = JSON.parse(localStorage.getItem("adminUsuarios")) || [];
    listaUsuariosAdmin.innerHTML = usuarios.map(u => `
      <div>
        ${u.nombre} (${u.rol})
        <button onclick="eliminarUsuario(${u.id})">Eliminar</button>
      </div>
    `).join("");
  }

  window.eliminarUsuario = function(id) {
    let usuarios = JSON.parse(localStorage.getItem("adminUsuarios")) || [];
    usuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem("adminUsuarios", JSON.stringify(usuarios));
    mostrarUsuariosAdmin();
  };

  mostrarUsuariosAdmin();
}


// =========================
// VENDEDOR: LISTAR PRODUCTOS Y ÓRDENES
// =========================
const listaProductosVendedor = document.getElementById("listaProductosVendedor");
if (listaProductosVendedor) {
  let productos = JSON.parse(localStorage.getItem("adminProductos")) || [];
  listaProductosVendedor.innerHTML = productos.map(p => `
    <div>
      <strong>${p.nombre}</strong> - $${p.precio} (Stock: ${p.stock})
    </div>
  `).join("");
}

const listaOrdenesVendedor = document.getElementById("listaOrdenesVendedor");
if (listaOrdenesVendedor) {
  let ordenes = JSON.parse(localStorage.getItem("ordenesClientes")) || [];
  listaOrdenesVendedor.innerHTML = ordenes.length > 0 ? ordenes.map(o => `
    <div>Orden #${o.id} - Cliente: ${o.cliente}, Total: $${o.total}</div>
  `).join("") : "<p>No hay órdenes registradas.</p>";
}

// =========================================
// VENDEDOR: Mostrar segun boton apretado
// =========================================
function mostrarSeccion(id) {
  // Oculta todas las secciones dentro del main
  const secciones = document.querySelectorAll("main section");
  secciones.forEach(sec => sec.classList.add("oculto"));

  // Muestra solo la sección seleccionada
  document.getElementById(id).classList.remove("oculto");
}
function mostrarSeccion(id) {
  // Oculta todas las secciones dentro del main
  const secciones = document.querySelectorAll("main section");
  secciones.forEach(sec => sec.classList.add("oculto"));

  // Muestra solo la sección seleccionada
  document.getElementById(id).classList.remove("oculto");
}
