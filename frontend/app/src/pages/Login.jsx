import { useState } from "react";
import { login } from "../api";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = await login(email, password);

      localStorage.setItem("token", usuario.token);
      localStorage.setItem("email", usuario.email);
      localStorage.setItem("nombre", usuario.nombre);
      localStorage.setItem("rol", usuario.rol);

      if (usuario.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }

    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
          
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Entrar
          </button>
        </form>

        {mensaje && (
          <p className="text-center mt-3 text-danger">
            <strong>{mensaje}</strong>
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
