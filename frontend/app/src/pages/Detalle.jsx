import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Detalle() {
  const [producto, setProducto] = useState(null);

  // Para obtener el ID del producto desde la URL (ej: /detalle?id=2)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  // Simulamos datos (luego se reemplaza por datos del backend)
  const productosEjemplo = [
    {
      id: 1,
      nombre: "Pantalón Cargo",
      precio: 24990,
      descripcion:
        "Pantalón estilo cargo con bolsillos laterales y ajuste en el tobillo. Ideal para un look urbano y cómodo.",
      imagen: "/imagenes/Cargo_Jeans.jpg",
    },
    {
      id: 2,
      nombre: "Polera Oversize",
      precio: 15990,
      descripcion:
        "Polera oversize de algodón suave, perfecta para un estilo relajado y moderno.",
      imagen: "/imagenes/polera.png",
    },
  ];

  useEffect(() => {
    // Buscar el producto según el ID de la URL
    const encontrado = productosEjemplo.find(
      (item) => item.id === parseInt(id)
    );
    setProducto(encontrado);
  }, [id]);

  if (!producto) {
    return (
      <main className="container py-5">
        <p className="text-center">Cargando producto...</p>
      </main>
    );
  }

  return (
    <main className="container py-5" id="detalleProducto">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{producto.nombre}</h2>
          <p className="fs-4 text-success mb-3">
            ${producto.precio.toLocaleString()}
          </p>
          <p className="mb-4">{producto.descripcion}</p>
          <button className="btn btn-dark">Agregar al carrito 🛒</button>
        </div>
      </div>
    </main>
  );
}
