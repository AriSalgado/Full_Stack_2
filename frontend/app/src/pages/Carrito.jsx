import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import {
  getCarrito,
  updateItemCantidad,
  removeItemCarrito,
  vaciarCarrito,
  finalizarCompra,
} from "../api";

export default function Carrito() {
  const [carrito, setCarrito] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false); 
  const [loadingPage, setLoadingPage] = useState(true); 

  useEffect(() => {
    async function cargar() {
      setMensaje("");
      setLoadingPage(true);
      try {
        const data = await getCarrito();
        setCarrito({ items: data?.items ?? [], total: data?.total ?? undefined });
      } catch (error) {
        console.error(error);
        setMensaje("Error al cargar el carrito.");
        setCarrito({ items: [] });
      } finally {
        setLoadingPage(false);
      }
    }
    cargar();
  }, []);

  const total =
    carrito?.items?.reduce(
      (acc, item) => acc + (item.producto?.precio ?? 0) * item.cantidad,
      0
    ) ?? 0;

  const refrescarCarrito = async () => {
    try {
      const actualizado = await getCarrito();
      setCarrito({ items: actualizado?.items ?? [], total: actualizado?.total ?? undefined });
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar el carrito.");
    }
  };

  const handleActualizarCantidad = async (item, nuevaCantidad) => {
    if (loading) return;
    setMensaje("");
    const stock = item.producto?.stock ?? Infinity;

    if (nuevaCantidad < 1) {
      setMensaje("La cantidad mínima es 1.");
      return;
    }
    if (nuevaCantidad > stock) {
      setMensaje(`No hay suficiente stock. Disponible: ${stock}.`);
      return;
    }

    try {
      setLoading(true);
      await updateItemCantidad(item.id, nuevaCantidad);
      await refrescarCarrito();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo actualizar la cantidad.");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (itemId) => {
    if (loading) return;
    setMensaje("");
    try {
      setLoading(true);
      await removeItemCarrito(itemId);
      await refrescarCarrito();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo eliminar el producto.");
    } finally {
      setLoading(false);
    }
  };

  const handleVaciar = async () => {
    if (loading) return;
    setMensaje("");
    try {
      setLoading(true);
      await vaciarCarrito();
      setCarrito({ items: [] });
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo vaciar el carrito.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizar = async () => {
    if (loading) return;
    setMensaje("");
    try {
      setLoading(true);
      const pedido = await finalizarCompra();
      alert(`Compra realizada con éxito. Boleta N° ${pedido.boleta.numero}`);
      setCarrito({ items: [] });
    } catch (error) {
      console.error(error);
      alert("Error al finalizar la compra.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="container py-5">
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-dark" role="status"></div>
          <p className="m-0">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="carrito-page container py-5">
        <h1 className="text-center mb-4">Carrito de Compras</h1>

        {mensaje && <div className="alert alert-danger">{mensaje}</div>}

        {}
        <section className="contenedor-carrito mb-5">
          {carrito.items.length === 0 ? (
            <p className="text-center">Tu carrito está vacío 🛒</p>
          ) : (
            <div className="row">
              {carrito.items.map((item) => {
                const precio = item.producto?.precio ?? 0;
                const nombre = item.producto?.nombre ?? "Producto";
                const imagenUrl = item.producto?.imagenUrl;
                const stock = item.producto?.stock ?? undefined;
                const subtotal = precio * item.cantidad;

                return (
                  <div
                    key={item.id}
                    className="col-md-6 mb-3 d-flex align-items-center justify-content-between border p-3 rounded"
                  >
                    <div className="d-flex align-items-center gap-3">
                      {imagenUrl ? (
                        <img
                          src={imagenUrl}
                          alt={nombre}
                          style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 8,
                            background: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            color: "#555",
                          }}
                          aria-label="Sin imagen"
                        >
                          Sin imagen
                        </div>
                      )}

                      <div>
                        <h5 className="mb-1">{nombre}</h5>
                        <p className="mb-1">
                          ${precio.toLocaleString()} x {item.cantidad} ={" "}
                          <strong>${subtotal.toLocaleString()}</strong>
                        </p>
                        {typeof stock === "number" && (
                          <small className="text-muted">Stock disponible: {stock}</small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <div className="btn-group" role="group" aria-label="Cambiar cantidad">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleActualizarCantidad(item, item.cantidad - 1)}
                          disabled={loading || item.cantidad <= 1}
                          title="Disminuir cantidad"
                        >
                          −
                        </button>
                        <span className="px-3 d-flex align-items-center">{item.cantidad}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleActualizarCantidad(item, item.cantidad + 1)}
                          disabled={
                            loading ||
                            (typeof stock === "number" && item.cantidad >= stock)
                          }
                          title="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleEliminar(item.id)}
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {}
        <section className="resumen-compra text-center">
          <p className="fs-5">
            Total: <strong>${(carrito.total ?? total).toLocaleString()}</strong>
          </p>

          {carrito.items.length > 0 && (
            <>
              <button
                className="btn btn-dark mt-3 me-3"
                onClick={handleFinalizar}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Finalizar Compra"}
              </button>

              <button
                className="btn btn-outline-danger mt-3"
                onClick={handleVaciar}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Vaciar Carrito"}
              </button>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}