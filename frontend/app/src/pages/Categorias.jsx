import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { getProductos } from "../api";

export default function Categorias() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await getProductos();
        setProductos(list);
        const cats = Array.from(new Set(list.map((p) => p.categoria || "Sin categoría")));
        setCategorias(cats);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    })();
  }, []);

  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-4">Categorías</h1>
        <section className="row justify-content-center">
          {categorias.length === 0 ? (
            <p className="text-center">No hay categorías disponibles</p>
          ) : (
            categorias.map((cat) => (
              <div key={cat} className="col-md-4 mb-3">
                <div className="card p-3 text-center h-100">
                  <h4 className="fw-bold">{cat}</h4>
                  <p className="text-muted">Productos: {productos.filter((p) => (p.categoria || "Sin categoría") === cat).length}</p>
                  <Link to={`/productos?categoria=${encodeURIComponent(cat)}`} className="btn btn-dark">Ver productos</Link>
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
