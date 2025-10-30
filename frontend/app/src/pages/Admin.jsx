import { useState } from "react";
import Footer from "../components/Footer";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const handleProductoSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.nombreProd.value;
    const precio = e.target.precioProd.value;
    const stock = e.target.stockProd.value;
    const nuevoProducto = { nombre, precio, stock };
    setProductos([...productos, nuevoProducto]);
    e.target.reset();
  };

  const handleUsuarioSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.nombreUsuario.value;
    const rol = e.target.rolUsuario.value;
    const nuevoUsuario = { nombre, rol };
    setUsuarios([...usuarios, nuevoUsuario]);
    e.target.reset();
  };

  return (
    <>
      <main className="admin-container container py-5">
        <h1 className="text-center mb-4">Panel de Administración</h1>

        <section className="mb-5">
          <h2 className="mb-3">Gestión de Productos</h2>
          <form
            onSubmit={handleProductoSubmit}
            className="d-flex flex-wrap gap-2 mb-3"
          >
            <input
              type="text"
              name="nombreProd"
              placeholder="Nombre producto"
              required
              className="form-control w-auto"
            />
            <input
              type="number"
              name="precioProd"
              placeholder="Precio"
              required
              className="form-control w-auto"
            />
            <input
              type="number"
              name="stockProd"
              placeholder="Stock"
              required
              className="form-control w-auto"
            />
            <button type="submit" className="btn btn-dark">
              Agregar Producto
            </button>
          </form>

          {productos.length === 0 ? (
            <p>No hay productos registrados.</p>
          ) : (
            <ul className="list-group">
              {productos.map((p, i) => (
                <li key={i} className="list-group-item">
                  <strong>{p.nombre}</strong> — ${p.precio} ({p.stock} unidades)
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-3">Gestión de Usuarios</h2>
          <form
            onSubmit={handleUsuarioSubmit}
            className="d-flex flex-wrap gap-2 mb-3"
          >
            <input
              type="text"
              name="nombreUsuario"
              placeholder="Nombre"
              required
              className="form-control w-auto"
            />
            <select name="rolUsuario" className="form-select w-auto">
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
              <option value="cliente">Cliente</option>
            </select>
            <button type="submit" className="btn btn-dark">
              Crear Usuario
            </button>
          </form>

          {usuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <ul className="list-group">
              {usuarios.map((u, i) => (
                <li key={i} className="list-group-item">
                  <strong>{u.nombre}</strong> — Rol: {u.rol}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
