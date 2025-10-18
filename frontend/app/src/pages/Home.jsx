import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Productos destacados
  const [productos] = useState([
    {
      id: 1,
      nombre: "Polera Oversize",
      precio: 15000,
      imagen: "/imagenes/polera.png",
    },
    {
      id: 2,
      nombre: "Pantalón Cargo",
      precio: 25000,
      imagen: "/imagenes/Cargo_Jeans.jpg",
    },
  ]);

  // Manejo del carrito (simulado)
  const [carrito, setCarrito] = useState([]);
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    alert(`${producto.nombre} añadido al carrito `);
  };

  return (
    <div>
      {/* Hero section */}
      <section
  className="hero d-flex align-items-center justify-content-center text-center text-white"
  style={{
    width: "100vw",                // ← hace que ocupe todo el ancho
    minHeight: "90vh",             // ← un poco más alto, más elegante
    marginLeft: "calc(50% - 50vw)",// ← truco para quitar el margen lateral de Bootstrap
    background: "url('/imagenes/Fondo_Home.jpg') no-repeat center center/cover",
  }}
>
        <div className="hero-text">
          <h1 className="display-4">Nueva Colección 2025</h1>
          <p className="lead">Moda urbana y elegante para todos los estilos</p>
          <Link to="/productos" className="btn btn-light mt-3">
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="productos container py-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="row justify-content-center">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="col-md-4 col-sm-6 mb-4 text-center producto"
            >
              <div className="card p-3 shadow-sm">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid mb-3"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <h3>{producto.nombre}</h3>
                <p className="text-success fw-bold">
                  ${producto.precio.toLocaleString()}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to={`/detalle?id=${producto.id}`}
                    className="btn btn-outline-dark"
                  >
                    Ver Detalle
                  </Link>
                  <button
                    className="btn btn-dark"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
