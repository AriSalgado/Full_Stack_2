import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [mensajeProd, setMensajeProd] = useState("");
  const [mensajeUser, setMensajeUser] = useState("");

  const [loadingProd, setLoadingProd] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  // Estados para modales
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Buscador y paginación
  const [searchProd, setSearchProd] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [pageProd, setPageProd] = useState(1);
  const [pageUser, setPageUser] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token");

  // Helpers: carga desde backend
  const cargarProductos = async () => {
    setLoadingProd(true);
    try {
      const res = await fetch("http://localhost:8080/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      } else {
        const error = await res.text();
        setMensajeProd("Error: " + error);
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setMensajeProd("Error de conexión con el servidor.");
    } finally {
      setLoadingProd(false);
    }
  };

  const cargarUsuarios = async () => {
    setLoadingUser(true);
    try {
      const res = await fetch("http://localhost:8080/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      } else {
        const error = await res.text();
        setMensajeUser("Error: " + error);
      }
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setMensajeUser("Error de conexión con el servidor.");
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarUsuarios();
  }, [token]);

  // Crear producto
  const handleProductoSubmit = async (e) => {
    e.preventDefault();
    setMensajeProd("");
    setLoadingProd(true);

    const nombre = e.target.nombreProd.value.trim();
    const precio = parseFloat(e.target.precioProd.value);
    const stock = parseInt(e.target.stockProd.value);

    try {
      const res = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, precio, stock }),
      });
      if (res.ok) {
        setMensajeProd("Producto agregado correctamente.");
        await cargarProductos();
        e.target.reset();
      } else {
        const error = await res.text();
        setMensajeProd("Error: " + error);
      }
    } catch (err) {
      setMensajeProd("Error de conexión con el servidor.");
    } finally {
      setLoadingProd(false);
    }
  };

  // Crear usuario
  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    setMensajeUser("");
    setLoadingUser(true);

    const nombre = e.target.nombreUsuario.value.trim();
    const rol = e.target.rolUsuario.value.toUpperCase();

    const nuevoUsuario = {
      nombre,
      email: `${nombre.toLowerCase()}@correo.com`,
      password: "123456",
      rol,
    };

    try {
      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoUsuario),
      });
      if (res.ok) {
        setMensajeUser("Usuario creado correctamente.");
        await cargarUsuarios();
        e.target.reset();
      } else {
        const error = await res.text();
        setMensajeUser("Error: " + error);
      }
    } catch (err) {
      setMensajeUser("Error de conexión con el servidor.");
    } finally {
      setLoadingUser(false);
    }
  };

  // Confirmar edición producto
  const confirmarEditarProducto = async (e) => {
    e.preventDefault();
    if (!productoAEditar) return;
    setMensajeProd("");
    setLoadingProd(true);

    const nombre = e.target.nombreProd.value.trim();
    const precio = parseFloat(e.target.precioProd.value);
    const stock = parseInt(e.target.stockProd.value);

    try {
      const res = await fetch(`http://localhost:8080/api/productos/${productoAEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, precio, stock }),
      });
      if (res.ok) {
        setMensajeProd("Producto actualizado correctamente.");
        await cargarProductos();
      } else {
        const error = await res.text();
        setMensajeProd("Error: " + error);
      }
    } catch (err) {
      setMensajeProd("Error de conexión con el servidor.");
    } finally {
      setProductoAEditar(null);
      setLoadingProd(false);
    }
  };

  // Confirmar edición usuario
  const confirmarEditarUsuario = async (e) => {
    e.preventDefault();
    if (!usuarioAEditar) return;
    setMensajeUser("");
    setLoadingUser(true);

    const nombre = e.target.nombreUsuario.value.trim();
    const rol = e.target.rolUsuario.value.toUpperCase();

    try {
      const res = await fetch(`http://localhost:8080/api/usuarios/${usuarioAEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...usuarioAEditar, nombre, rol }),
      });
      if (res.ok) {
        setMensajeUser("Usuario actualizado correctamente.");
        await cargarUsuarios();
      } else {
        const error = await res.text();
        setMensajeUser("Error: " + error);
      }
    } catch (err) {
      setMensajeUser("Error de conexión con el servidor.");
    } finally {
      setUsuarioAEditar(null);
      setLoadingUser(false);
    }
  };

  // Confirmar eliminación producto
  const confirmarEliminarProducto = async () => {
    if (!productoAEliminar) return;
    setMensajeProd("");
    setLoadingProd(true);
    try {
      const res = await fetch(`http://localhost:8080/api/productos/${productoAEliminar.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMensajeProd("Producto eliminado correctamente.");
        await cargarProductos();
      } else {
        const error = await res.text();
        setMensajeProd("Error: " + error);
      }
    } catch (err) {
      setMensajeProd("Error de conexión con el servidor.");
    } finally {
      setProductoAEliminar(null);
      setLoadingProd(false);
    }
  };

  // Confirmar eliminación usuario
  const confirmarEliminarUsuario = async () => {
    if (!usuarioAEliminar) return;
    setMensajeUser("");
    setLoadingUser(true);
    try {
      const res = await fetch(`http://localhost:8080/api/usuarios/${usuarioAEliminar.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMensajeUser("Usuario eliminado correctamente.");
        await cargarUsuarios();
      } else {
        const error = await res.text();
        setMensajeUser("Error: " + error);
      }
    } catch (err) {
      setMensajeUser("Error de conexión con el servidor.");
    } finally {
      setUsuarioAEliminar(null);
      setLoadingUser(false);
    }
  };

  // Filtrado y paginación
  const productosFiltrados = productos.filter((p) =>
    p.nombre?.toLowerCase().includes(searchProd.toLowerCase())
  );
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre?.toLowerCase().includes(searchUser.toLowerCase())
  );

  const totalPagesProd = Math.max(1, Math.ceil(productosFiltrados.length / itemsPerPage));
  const totalPagesUser = Math.max(1, Math.ceil(usuariosFiltrados.length / itemsPerPage));

  // Ajustar página si el filtro reduce resultados
  useEffect(() => {
    setPageProd((prev) => Math.min(prev, totalPagesProd));
  }, [searchProd, productosFiltrados.length, totalPagesProd]);

  useEffect(() => {
    setPageUser((prev) => Math.min(prev, totalPagesUser));
  }, [searchUser, usuariosFiltrados.length, totalPagesUser]);

  const productosPaginados = productosFiltrados.slice(
    (pageProd - 1) * itemsPerPage,
    pageProd * itemsPerPage
  );
  const usuariosPaginados = usuariosFiltrados.slice(
    (pageUser - 1) * itemsPerPage,
    pageUser * itemsPerPage
  );

  return (
    <>
      <main className="admin-container container py-5">
        <h1 className="text-center mb-4">Panel de Administración</h1>

        {/* Reportes del sistema */}
        <section className="mb-5">
          <h2 className="mb-3">Reportes del sistema</h2>
          <Link to="/admin/compras" className="btn btn-outline-warning">
            Ver Compras Realizadas
          </Link>
        </section>

        {/* Gestión de Productos */}
        <section className="mb-5">
          <h2 className="mb-3">Gestión de Productos</h2>

          {/* Form crear producto */}
          <form onSubmit={handleProductoSubmit} className="d-flex flex-wrap gap-2 mb-3">
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
              min="1"
              className="form-control w-auto"
            />
            <input
              type="number"
              name="stockProd"
              placeholder="Stock"
              required
              min="0"
              className="form-control w-auto"
            />
            <button type="submit" className="btn btn-dark" disabled={loadingProd}>
              {loadingProd ? "Guardando..." : "Agregar Producto"}
            </button>
          </form>

          {/* Buscador productos */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Buscar producto por nombre..."
              value={searchProd}
              onChange={(e) => setSearchProd(e.target.value)}
            />
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPageProd((p) => Math.max(1, p - 1))}
                disabled={pageProd === 1}
              >
                ◀
              </button>
              <span>Página {pageProd} / {totalPagesProd}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPageProd((p) => Math.min(totalPagesProd, p + 1))}
                disabled={pageProd === totalPagesProd}
              >
                ▶
              </button>
            </div>
          </div>

          {mensajeProd && (
            <div className={`alert ${mensajeProd.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
              {mensajeProd}
            </div>
          )}

          {loadingProd ? (
            <div className="spinner-border text-dark" role="status"></div>
          ) : productosPaginados.length === 0 ? (
            <p>No hay productos registrados.</p>
          ) : (
            <ul className="list-group">
              {productosPaginados.map((p) => (
                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><strong>{p.nombre}</strong> — ${p.precio} ({p.stock} unidades)</span>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => setProductoAEditar(p)}
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEditarProducto"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setProductoAEliminar(p)}
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEliminarProducto"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Gestión de Usuarios */}
        <section>
          <h2 className="mb-3">Gestión de Usuarios</h2>

          {/* Form crear usuario */}
          <form onSubmit={handleUsuarioSubmit} className="d-flex flex-wrap gap-2 mb-3">
            <input
              type="text"
              name="nombreUsuario"
              placeholder="Nombre"
              required
              className="form-control w-auto"
            />
            <select name="rolUsuario" className="form-select w-auto">
              <option value="ADMIN">Administrador</option>
              <option value="VENDEDOR">Vendedor</option>
              <option value="CLIENTE">Cliente</option>
            </select>
            <button type="submit" className="btn btn-dark" disabled={loadingUser}>
              {loadingUser ? "Guardando..." : "Crear Usuario"}
            </button>
          </form>

          {/* Buscador usuarios */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Buscar usuario por nombre..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPageUser((p) => Math.max(1, p - 1))}
                disabled={pageUser === 1}
              >
                ◀
              </button>
              <span>Página {pageUser} / {totalPagesUser}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPageUser((p) => Math.min(totalPagesUser, p + 1))}
                disabled={pageUser === totalPagesUser}
              >
                ▶
              </button>
            </div>
          </div>

          {mensajeUser && (
            <div className={`alert ${mensajeUser.startsWith("Error") ? "alert-danger" : "alert-success"}`}>
              {mensajeUser}
            </div>
          )}

          {loadingUser ? (
            <div className="spinner-border text-dark" role="status"></div>
          ) : usuariosPaginados.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <ul className="list-group">
              {usuariosPaginados.map((u) => (
                <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><strong>{u.nombre}</strong> — Rol: {u.rol}</span>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => setUsuarioAEditar(u)}
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEditarUsuario"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setUsuarioAEliminar(u)}
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEliminarUsuario"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Modal Editar Producto */}
      <div className="modal fade" id="modalEditarProducto" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={confirmarEditarProducto}>
            <div className="modal-header">
              <h5 className="modal-title">Editar Producto</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setProductoAEditar(null)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="nombreProd"
                defaultValue={productoAEditar?.nombre}
                required
                className="form-control mb-2"
              />
              <input
                type="number"
                name="precioProd"
                defaultValue={productoAEditar?.precio}
                required
                min="1"
                className="form-control mb-2"
              />
              <input
                type="number"
                name="stockProd"
                defaultValue={productoAEditar?.stock}
                required
                min="0"
                className="form-control mb-2"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setProductoAEditar(null)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={loadingProd}
                data-bs-dismiss="modal"
              >
                {loadingProd ? "Actualizando..." : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Eliminar Producto */}
      <div className="modal fade" id="modalEliminarProducto" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar eliminación</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setProductoAEliminar(null)}
              ></button>
            </div>
            <div className="modal-body">
              ¿Seguro que deseas eliminar el producto <strong>{productoAEliminar?.nombre}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setProductoAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={loadingProd}
                data-bs-dismiss="modal"
                onClick={confirmarEliminarProducto}
              >
                {loadingProd ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Editar Usuario */}
      <div className="modal fade" id="modalEditarUsuario" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={confirmarEditarUsuario}>
            <div className="modal-header">
              <h5 className="modal-title">Editar Usuario</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setUsuarioAEditar(null)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="nombreUsuario"
                defaultValue={usuarioAEditar?.nombre}
                required
                className="form-control mb-2"
              />
              <select
                name="rolUsuario"
                defaultValue={usuarioAEditar?.rol}
                className="form-select mb-2"
              >
                <option value="ADMIN">Administrador</option>
                <option value="VENDEDOR">Vendedor</option>
                <option value="CLIENTE">Cliente</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setUsuarioAEditar(null)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={loadingUser}
                data-bs-dismiss="modal"
              >
                {loadingUser ? "Actualizando..." : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Eliminar Usuario */}
      <div className="modal fade" id="modalEliminarUsuario" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar eliminación</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setUsuarioAEliminar(null)}
              ></button>
            </div>
            <div className="modal-body">
              ¿Seguro que deseas eliminar al usuario <strong>{usuarioAEliminar?.nombre}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setUsuarioAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={loadingUser}
                data-bs-dismiss="modal"
                onClick={confirmarEliminarUsuario}
              >
                {loadingUser ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}