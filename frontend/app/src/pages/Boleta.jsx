import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

export default function AdminCompras() {
  const [boletas, setBoletas] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBoletas() {
      try {
        const res = await fetch(`${API_URL}/pedidos/todas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("No se pudo obtener las boletas");
        const data = await res.json();
        setBoletas(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las compras.");
      }
    }
    fetchBoletas();
  }, [token]);

  if (error) return <div className="alert alert-danger mt-5 text-center">{error}</div>;
  if (!boletas.length) return <p className="mt-5 text-center">No hay compras registradas.</p>;

  return (
    <div className="container py-5">
      <h2>Compras Realizadas</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Boleta</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boletas.map((b) => (
            <tr key={b.id}>
              <td>{b.numero}</td>
              <td>{new Date(b.fechaEmision).toLocaleString("es-CL")}</td>
              <td>{b.usuario?.username}</td>
              <td>${b.total?.toLocaleString()}</td>
              <td>
                <Link to={`/boleta/${b.id}`} className="btn btn-sm btn-outline-primary">
                  Ver Boleta
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}