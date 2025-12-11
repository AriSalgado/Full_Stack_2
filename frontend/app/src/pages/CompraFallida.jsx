import Footer from "../components/Footer";

export default function CompraFallida() {
  const ordenStr = localStorage.getItem("lastFailedOrder");
  const orden = ordenStr ? JSON.parse(ordenStr) : null;

  return (
    <>
      <main className="container py-5 text-center">
        <h1 className="mb-4">Compra no exitosa</h1>
        {orden ? (
          <div className="card p-4 mx-auto" style={{maxWidth: 650}}>
            <p>Hubo un problema procesando tu orden. Por favor intenta nuevamente.</p>
            <p><strong>Id intento:</strong> {orden.id}</p>
            <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
            <p className="mt-3">Tu carrito se mantiene en el sitio para volver a intentar.</p>
          </div>
        ) : (
          <p>No se encontró información del intento de orden.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
