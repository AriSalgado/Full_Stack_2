import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Productos() {
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

  const agregarAlCarrito = (producto) => {

    const carritoActual = JSON.parse(localStorage.getItem("cart")) || [];

    const productoExistente = carritoActual.find((p) => p.id === producto.id);

    if (productoExistente) {

      productoExistente.cantidad += 1;
    } else {

      carritoActual.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(carritoActual));
    alert(`${producto.nombre} añadido al carrito 🛒`);
  };

  return (
    <>
      <main className="productos-page container py-5">
        <h1 className="text-center mb-5">Nuestros Productos</h1>

        <section className="row justify-content-center productos-galeria">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="col-md-4 col-sm-6 mb-4 text-center producto-item"
            >
              <div className="card p-3 shadow-sm h-100">
                <figure>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid mb-3 rounded"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </figure>
                <h3>{producto.nombre}</h3>
                <p className="precio fw-bold text-success">
                  ${producto.precio.toLocaleString()}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Link
                    to={`/detalle?id=${producto.id}`}
                    className="btn btn-outline-dark"
                  >
                    Ver detalle
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
        </section>
      </main>

      <Footer />
    </>
  );
}
