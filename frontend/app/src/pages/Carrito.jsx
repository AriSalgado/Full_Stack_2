import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Carrito() {
  // --- Cargar productos desde localStorage (si existen) ---
  const [productos, setProductos] = useState(() => {
    const carritoGuardado = localStorage.getItem("cart");
    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [
          { id: 1, nombre: "Pantalón Cargo", precio: 24990, cantidad: 1 },
          { id: 2, nombre: "Polera Oversize", precio: 15990, cantidad: 2 },
        ];
  });

  // --- Guardar el carrito cada vez que cambia ---
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productos));
  }, [productos]);

  // --- Calcular total dinámicamente ---
  const total = productos.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  // --- Manejar eliminación de un producto ---
  // --- Manejar eliminación de un producto (de a uno) ---
  const eliminarProducto = (id) => {
    const nuevosProductos = productos.map((p) => ({ ...p }));
    const idx = nuevosProductos.findIndex((p) => p.id === id);
    if (idx === -1) return;
    if (nuevosProductos[idx].cantidad > 1) {
      nuevosProductos[idx].cantidad -= 1;
    } else {
      nuevosProductos.splice(idx, 1);
    }
    setProductos(nuevosProductos);
    localStorage.setItem("cart", JSON.stringify(nuevosProductos)); // también actualiza storage
  };

  // --- Manejar aumento de cantidad de un producto ---
  const aumentarCantidad = (id) => {
    const nuevosProductos = productos.map((p) => ({ ...p }));
    const idx = nuevosProductos.findIndex((p) => p.id === id);
    if (idx === -1) return;
    nuevosProductos[idx].cantidad += 1;
    setProductos(nuevosProductos);
    localStorage.setItem("cart", JSON.stringify(nuevosProductos));
  };

  // --- Finalizar compra ---
  const finalizarCompra = () => {
    // redirigir a checkout para completar datos y pago
    navigate("/checkout");
  };
  const navigate = useNavigate();

  return (
    <>
      <main className="carrito-page container py-5">
        <h1 className="text-center mb-4">Carrito de Compras</h1>
        <p className="text-center">Total prendas: {productos.reduce((s, p) => s + p.cantidad, 0)}</p>

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
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => eliminarProducto(prod.id)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => aumentarCantidad(prod.id)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        // eliminar completamente
                        const restantes = productos.filter((p) => p.id !== prod.id);
                        setProductos(restantes);
                        localStorage.setItem("cart", JSON.stringify(restantes));
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
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

      {/* Footer */}
      <Footer />
    </>
  );
}
