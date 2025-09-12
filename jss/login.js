document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  // Validación de correo permitido
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

  // Si todo está ok
  mensaje.textContent = "Inicio de sesión exitoso.";
  mensaje.style.color = "green";
});
