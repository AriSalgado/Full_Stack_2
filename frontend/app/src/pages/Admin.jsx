import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import {
  getProductos,
  createProducto,
  deleteProducto,
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../api.js";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // cargar productos desde backend al montar
    (async () => {
      try {
        const list = await getProductos();
        setProductos(list);
      } catch (err) {
        console.error("No se pudieron cargar productos:", err);
      }
    })();
    // cargar usuarios también
    (async () => {
      try {
        const ulist = await getUsuarios();
        setUsuarios(ulist);
      } catch (err) {
        console.error("No se pudieron cargar usuarios:", err);
      }
    })();
  }, []);

  const handleProductoSubmit = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombreProd.value;
    const descripcion = e.target.descripcionProd?.value || "";
    const precio = parseFloat(e.target.precioProd.value) || 0;
    const stock = parseInt(e.target.stockProd.value) || 0;
    const categoria = e.target.categoriaProd?.value || "varios";
    const imagen = e.target.imagenProd?.value || "";
    const activo = e.target.activoProd?.checked ?? true;

    const nuevoProducto = { nombre, descripcion, precio, stock, categoria, imagen, activo };

    try {
      const creado = await createProducto(nuevoProducto);
      setProductos((prev) => [creado, ...prev]);
      e.target.reset();
    } catch (err) {
      console.error("Error creando producto:", err);
      alert("No se pudo crear el producto: " + (err.message || err));
    }
  };

  // Usuario form state for create / edit
  const [userForm, setUserForm] = useState({ nombre: "", email: "", password: "", rol: "cliente", activo: true });
  const [editingUsuario, setEditingUsuario] = useState(null);

  const handleUsuarioChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUsuarioSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuario) {
        // update - avoid overwriting password with empty string
        const payload = { ...userForm };
        if (!payload.password) {
          // keep existing password from editingUsuario if present
          payload.password = editingUsuario.password || "";
        }
        const updated = await updateUsuario(editingUsuario.id, payload);
        setUsuarios((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        setEditingUsuario(null);
      } else {
        // create
        const created = await createUsuario(userForm);
        setUsuarios((prev) => [created, ...prev]);
      }
      setUserForm({ nombre: "", email: "", password: "", rol: "cliente", activo: true });
    } catch (err) {
      console.error("Error guardando usuario:", err);
      alert("No se pudo guardar el usuario: " + (err.message || err));
    }
  };

  const handleEditUsuario = (u) => {
    setEditingUsuario(u);
    setUserForm({ nombre: u.nombre || "", email: u.email || "", password: "", rol: u.rol || "cliente", activo: u.activo ?? true });
  };

  const handleCancelEdit = () => {
    setEditingUsuario(null);
    setUserForm({ nombre: "", email: "", password: "", rol: "cliente", activo: true });
  };

  const handleDeleteProducto = async (id) => {
    if (!window.confirm("¿Confirma eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("No se pudo eliminar el producto: " + (err.message || err));
    }
  };

  return (
    <>
      <main className="admin-container container py-5">
  <h1 className="text-center mb-4">Panel de Administración</h1>
  <section className="mb-5">
          <form onSubmit={handleProductoSubmit} className="d-flex flex-wrap gap-2 mb-3">
            <input type="text" name="nombreProd" placeholder="Nombre producto" required className="form-control w-auto" />
            <input type="text" name="descripcionProd" placeholder="Descripción" className="form-control w-25" />
            <input type="number" step="0.01" name="precioProd" placeholder="Precio" required className="form-control w-auto" />
            <input type="number" name="stockProd" placeholder="Stock" required className="form-control w-auto" />
            <input type="text" name="categoriaProd" placeholder="Categoría" className="form-control w-auto" />
            <input type="text" name="imagenProd" placeholder="URL imagen" className="form-control w-auto" />
            <label className="d-flex align-items-center gap-2">
              <input type="checkbox" name="activoProd" defaultChecked /> Activo
            </label>
            <button type="submit" className="btn btn-dark">Agregar Producto</button>
          </form>

          {productos.length === 0 ? (
            <p>No hay productos registrados.</p>
          ) : (
            <ul className="list-group">
              {productos.map((p) => (
                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{p.nombre}</strong> — ${p.precio} ({p.stock} unidades)
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => window.location.href = `/detalle?id=${p.id}`}>
                      Ver
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProducto(p.id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-3">Gestión de Usuarios</h2>
          <form onSubmit={handleUsuarioSubmit} className="d-flex flex-wrap gap-2 mb-3">
            <input type="text" name="nombre" placeholder="Nombre" required className="form-control w-auto" value={userForm.nombre} onChange={handleUsuarioChange} />
            <input type="email" name="email" placeholder="Email" required className="form-control w-auto" value={userForm.email} onChange={handleUsuarioChange} />
            <input type="password" name="password" placeholder={editingUsuario ? "Dejar vacío para no cambiar" : "Password"} className="form-control w-auto" value={userForm.password} onChange={handleUsuarioChange} />
            <select name="rol" className="form-select w-auto" value={userForm.rol} onChange={handleUsuarioChange}>
              <option value="admin">Administrador</option>
              <option value="vendedor">Vendedor</option>
              <option value="cliente">Cliente</option>
            </select>
            <label className="d-flex align-items-center gap-2">
              <input type="checkbox" name="activo" checked={userForm.activo} onChange={handleUsuarioChange} /> Activo
            </label>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editingUsuario ? "Actualizar Usuario" : "Crear Usuario"}</button>
              {editingUsuario && <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>}
            </div>
          </form>

          {usuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <ul className="list-group">
              {usuarios.map((u) => (
                <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{u.nombre}</strong> — {u.email} — Rol: {u.rol} {u.activo ? "(activo)" : "(inactivo)"}
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditUsuario(u)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={async () => {
                      if (!window.confirm('¿Confirma eliminar este usuario?')) return;
                      try {
                        await deleteUsuario(u.id);
                        setUsuarios((prev) => prev.filter(x => x.id !== u.id));
                      } catch (err) {
                        console.error('Error eliminando usuario:', err);
                        alert('No se pudo eliminar el usuario: ' + (err.message || err));
                      }
                    }}>Eliminar</button>
                  </div>
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
