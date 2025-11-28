import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

export default function Historial() {
  const [boletas, setBoletas] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchHistorial() {
      try {
        const res = await fetch(`${API_URL}/pedidos/mios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("No se pudo obtener el historial");
        const data = await res.json();
        setBoletas(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchHistorial();
  }, [token]);

  return (
    <div className="container py-5">
      <h2>Historial de Compras</h2>

      {boletas.length === 0 ? (
        <p className="mt-4">No tienes compras registradas.</p>
      ) : (
        <ul className="list-group mt-4">
          {boletas.map((b) => (
            <li key={b.id} className="list-group-item">
              <strong>Boleta #{b.numero}</strong> —{" "}
              {new Date(b.fechaEmision).toLocaleString("es-CL")} — Total: $
              {b.total?.toLocaleString()}
              <br />
              <Link to={`/boleta/${b.id}`} className="btn btn-link p-0 mt-2">
                Ver Boleta
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}