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
