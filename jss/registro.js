document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault(); // evita que se envíe el formulario directo

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmar").value;
  const mensaje = document.getElementById("mensaje");

  // Validación de correo
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

  // Si todo está ok
  mensaje.textContent = "Registro exitoso.";
  mensaje.style.color = "green";
});
