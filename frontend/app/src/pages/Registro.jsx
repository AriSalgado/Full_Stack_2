import { useState } from "react";
import { API_URL } from "../api";

export default function Registro() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    nombreCompleto: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        setMensaje("Registro exitoso. Ahora puedes iniciar sesión.");
      } else {
        setMensaje("Error al registrar usuario.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error en el servidor.");
    }
  };

  return (
    <div className="container py-5">
      <h2>Registro de Usuario</h2>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          name="nombreCompleto"
          placeholder="Nombre completo"
          className="form-control"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          className="form-control"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          className="form-control"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="form-control"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-dark">Registrar</button>
      </form>
    </div>
  );
}
