import { useState } from "react";
import Footer from "../components/Footer";

export default function Carrito() {
  // --- Estado: lista de productos y total ---
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Pantalón Cargo", precio: 24990, cantidad: 1 },
    { id: 2, nombre: "Polera Oversize", precio: 15990, cantidad: 2 },
  ]);

  // --- Calcular total dinámicamente ---
  const total = productos.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  // --- Manejar eliminación de un producto ---
  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  // --- Finalizar compra (solo ejemplo) ---
  const finalizarCompra = () => {
    alert("¡Gracias por tu compra!");
    setProductos([]);
  };

  return (
    <>
      <main className="carrito-page container py-5">
        <h1 className="text-center mb-4">Carrito de Compras</h1>

        {/* Lista de productos */}
        <section className="contenedor-carrito mb-5">
          {productos.length === 0 ? (
            <p className="text-center">Tu carrito está vacío 🛒</p>
          ) : (
            <div className="row">
              {productos.map((prod) => (
                <div
                  key={prod.id}
                  className="col-md-6 mb-3 d-flex align-items-center justify-content-between border p-3 rounded"
                >
                  <div>
                    <h5>{prod.nombre}</h5>
                    <p>
                      ${prod.precio.toLocaleString()} x {prod.cantidad}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Resumen de compra */}
        <section className="resumen-compra text-center">
          <p className="fs-5">
            Total: <strong>${total.toLocaleString()}</strong>
          </p>
          {productos.length > 0 && (
            <button
              id="btn-comprar"
              className="btn btn-dark mt-3"
              onClick={finalizarCompra}
            >
              Finalizar Compra
            </button>
          )}
        </section>
      </main>

      {/* Footer  */}
      <Footer />
    </>
  );
}
