import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { getProductos } from "../api.js";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await getProductos();
        // Si viene ?categoria= en la URL, filtrar
        const params = new URLSearchParams(window.location.search);
        const cat = params.get("categoria");
        if (cat) {
          setProductos(list.filter((p) => (p.categoria || "Sin categoría") === cat));
        } else {
          setProductos(list);
        }
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    })();
  }, []);

  // --- Función para agregar productos al carrito ---
  const agregarAlCarrito = (producto) => {
    // Leer carrito actual o crear uno nuevo
    const carritoActual = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar si el producto ya existe
    const productoExistente = carritoActual.find((p) => p.id === producto.id);

    if (productoExistente) {
      // Si existe, aumentar la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si no existe, agregar con cantidad = 1
      carritoActual.push({ ...producto, cantidad: 1 });
    }

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(carritoActual));
    alert(`${producto.nombre} añadido al carrito 🛒`);
  };

  return (
    <>
      <main className="productos-page container py-5">
        <h1 className="text-center mb-5">Nuestros Productos</h1>
        {/* Si la URL contiene categoria, mostramos un encabezado pequeño */}
        {new URLSearchParams(window.location.search).get("categoria") && (
          <p className="text-center">Mostrando categoría: <strong>{new URLSearchParams(window.location.search).get("categoria")}</strong></p>
        )}
        <section className="row justify-content-center productos-galeria">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="col-md-4 col-sm-6 mb-4 text-center producto-item"
            >
              <div className="card p-3 shadow-sm h-100">
                <figure>
                  <img
                    src={producto.imagen && (producto.imagen.startsWith("http") ? producto.imagen : window.location.origin + producto.imagen)}
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
