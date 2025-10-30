import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; 

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!correo || !password) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    // Simulación de login (más adelante se conectará al backend)
    if (correo === "admin@lutiane.cl" && password === "1234") {
      setMensaje("Bienvenida/o al panel de administración.");
      setTimeout(() => navigate("/admin"), 1500);
    } else {
      setMensaje("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <>
      <main
        className="form-container container py-5"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="text-center mb-4">Iniciar Sesión</h1>

        <form
          id="formLogin"
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div>
            <label htmlFor="correo" className="form-label">
              Correo:
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="form-control"
              required
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
              minLength={4}
              maxLength={10}
            />
          </div>

          <button type="submit" className="btn btn-dark mt-3">
            Entrar
          </button>
        </form>

        {mensaje && (
          <p id="mensaje" className="text-center mt-3">
            {mensaje}
          </p>
        )}
      </main>

      {/*  Footer */}
      <Footer />
    </>
  );
}
