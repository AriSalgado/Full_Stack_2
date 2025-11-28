import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const res = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUsuario(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsuario();
  }, [token]);

  if (!usuario) return <p className="mt-5 text-center">Cargando perfil...</p>;

  return (
    <div className="container py-5">
      <h2>Mi Perfil</h2>

      <div className="card p-3 mt-3">
        <p><strong>Usuario:</strong> {usuario.username}</p>
        <p><strong>Nombre:</strong> {usuario.nombreCompleto}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
      </div>

      <a href="/historial" className="btn btn-dark mt-4">
        Ver historial de compras
      </a>
    </div>
  );
}
