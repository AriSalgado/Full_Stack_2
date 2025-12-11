import Footer from "../components/Footer";

export default function CompraExitosa() {
  const ordenStr = localStorage.getItem("lastOrder");
  const orden = ordenStr ? JSON.parse(ordenStr) : null;

  return (
    <>
      <main className="container py-5 text-center">
        <h1 className="mb-4">Compra exitosa</h1>
        {orden ? (
          <div className="card p-4 mx-auto" style={{maxWidth: 650}}>
            <p>Tu orden #{orden.id} fue procesada con éxito.</p>
            <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
            <p><strong>Total:</strong> ${orden.totals.total.toLocaleString()}</p>
            <h5 className="mt-3">Resumen</h5>
            {orden.items.map((it) => (
              <div key={it.id} className="d-flex justify-content-between border-bottom py-2">
                <div>{it.cantidad} x {it.nombre}</div>
                <div>${(it.precio * it.cantidad).toLocaleString()}</div>
              </div>
            ))}
            <p className="mt-3">Recibirás un correo con el detalle y el estado del envío.</p>
          </div>
        ) : (
          <p>No se encontró información de la orden.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
