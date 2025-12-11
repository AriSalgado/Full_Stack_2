import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { getProductoById } from "../api.js";

export default function Detalle() {
  const [producto, setProducto] = useState(null);

  // Obtener el ID desde la URL (ejemplo: /detalle?id=2)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  // Datos simulados (se reemplazarán con backend más adelante)
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

  // Buscar el producto correspondiente al ID
  useEffect(() => {
    if (!id) {
      setProducto(null);
      return;
    }

    (async () => {
      try {
        const prod = await getProductoById(id);
        setProducto(prod);
      } catch (err) {
        console.warn("No se pudo cargar producto desde backend, usando ejemplo:", err);
        const encontrado = productosEjemplo.find((item) => item.id === parseInt(id));
        setProducto(encontrado);
      }
    })();
  }, [id]);

  if (!producto) {
    return (
      <>
        <main className="container py-5">
          <p className="text-center">Cargando producto...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="container py-5" id="detalleProducto">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={producto.imagen && (producto.imagen.startsWith("http") ? producto.imagen : window.location.origin + producto.imagen)}
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
            <button className="btn btn-dark" onClick={() => {
              // Agregar al carrito en localStorage
              const carritoActual = JSON.parse(localStorage.getItem("cart")) || [];
              const productoEnCarrito = carritoActual.find((p) => p.id === producto.id);
              if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1;
              } else {
                carritoActual.push({ ...producto, cantidad: 1 });
              }
              localStorage.setItem("cart", JSON.stringify(carritoActual));
              // Actualizar indicador visual (opcional): emitir evento personalizado
              window.dispatchEvent(new CustomEvent('cart-updated', { detail: carritoActual }));
              alert(`${producto.nombre} añadido al carrito 🛒`);
            }}>
              Agregar al carrito 🛒
            </button>
          </div>
        </div>
      </main>

      {/* Footer*/}
      <Footer />
    </>
  );
}
