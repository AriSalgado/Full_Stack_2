import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getProductos } from "../api";

export default function Ofertas() {
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await getProductos();
        // Marcar productos con oferta: aplicar 15% específicamente a la "polera"
        const marked = list.map((p) => {
          const isPolera = (p.nombre || "").toString().toLowerCase().includes("polera");
          const descuentoPercent = isPolera ? 15 : 0;
          return {
            ...p,
            descuentoPercent,
            precioOfertado: descuentoPercent ? Math.round(p.precio * (1 - descuentoPercent / 100)) : p.precio,
          };
        });
        setProductos(marked);
        setOfertas(marked.filter((p) => p.descuentoPercent > 0));
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    })();
  }, []);

  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-4">Ofertas</h1>
        <section className="row">
          {ofertas.length === 0 ? (
            <p className="text-center">No hay ofertas en este momento.</p>
          ) : (
            ofertas.map((p) => (
              <div key={p.id} className="col-md-4 mb-4">
                <div className="card p-3 h-100 text-center">
                  <img src={p.imagen && (p.imagen.startsWith("http") ? p.imagen : window.location.origin + p.imagen)} alt={p.nombre} className="img-fluid mb-3" style={{height: 220, objectFit: 'cover'}} />
                  <h5>{p.nombre}</h5>
                  <p className="mb-1"><span className="text-muted text-decoration-line-through">${p.precio.toLocaleString()}</span> <span className="fw-bold text-danger"> ${p.precioOfertado.toLocaleString()}</span></p>
                  <p className="text-success">-{p.descuentoPercent}%</p>
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/detalle?id=${p.id}`} className="btn btn-outline-dark">Ver</Link>
                    <button className="btn btn-dark" onClick={() => {
                      const carritoActual = JSON.parse(localStorage.getItem('cart')) || [];
                      const productoExistente = carritoActual.find((x) => x.id === p.id);
                      if (productoExistente) productoExistente.cantidad += 1;
                      else carritoActual.push({...p, cantidad: 1});
                      localStorage.setItem('cart', JSON.stringify(carritoActual));
                      alert(`${p.nombre} añadido al carrito`);
                    }}>Añadir</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
