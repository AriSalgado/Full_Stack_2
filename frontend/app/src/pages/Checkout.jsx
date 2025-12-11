import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getProductos } from "../api";

export default function Checkout() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    metodoEnvio: "estandar",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // prefill from usuario si existe
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      try {
        const u = JSON.parse(usuarioStr);
        setForm((f) => ({ ...f, nombre: u.nombre || "", email: u.email || "", telefono: u.telefono || "", direccion: u.direccion || "", ciudad: u.ciudad || "", provincia: u.provincia || "", codigoPostal: u.codigoPostal || "" }));
      } catch (err) {
        console.warn("usuario parse error", err);
      }
    }

    (async () => {
      try {
        const list = await getProductos();
        // mark possible discounts: apply same rule as Offers page (polera gets 15%)
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // compute totals considering discounts
  const computeTotals = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      const prod = productos.find((p) => p.id === item.id);
      if (prod) {
        const unitPrice = prod.descuentoPercent ? prod.precioOfertado : prod.precio;
        subtotal += unitPrice * item.cantidad;
      } else {
        subtotal += item.precio * item.cantidad;
      }
    });
    const shipping = form.metodoEnvio === "express" ? 4990 : 1990;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const { subtotal, shipping, total } = computeTotals();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validar = () => {
    if (!form.nombre || !form.email || !form.direccion || !form.ciudad) {
      setError("Por favor completa los campos requeridos: nombre, email, dirección y ciudad.");
      return false;
    }
    if (!cart || cart.length === 0) {
      setError("Tu carrito está vacío.");
      return false;
    }
    setError("");
    return true;
  };

  const enviarOrden = () => {
    if (!validar()) return;

    // Simular envío: 80% éxito
    const exito = Math.random() < 0.8;
    const orden = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      items: cart,
      totals: { subtotal, shipping, total },
      info: form,
    };

    if (exito) {
      // guardar orden localmente
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(orden);
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("lastOrder", JSON.stringify(orden));
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/compra-exitosa");
    } else {
      localStorage.setItem("lastFailedOrder", JSON.stringify(orden));
      navigate("/compra-fallida");
    }
  };

  if (loading) return <div className="container py-5">Cargando...</div>;

  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-4">Checkout</h1>
        <div className="row">
          <div className="col-md-7">
            <h5>Datos personales</h5>
            <div className="mb-3">
              <label className="form-label">Nombre completo *</label>
              <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input className="form-control" name="telefono" value={form.telefono} onChange={handleChange} />
            </div>

            <h5 className="mt-4">Dirección</h5>
            <div className="mb-3">
              <label className="form-label">Dirección *</label>
              <input className="form-control" name="direccion" value={form.direccion} onChange={handleChange} required />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Ciudad *</label>
                <input className="form-control" name="ciudad" value={form.ciudad} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Provincia</label>
                <input className="form-control" name="provincia" value={form.provincia} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Código postal</label>
              <input className="form-control" name="codigoPostal" value={form.codigoPostal} onChange={handleChange} />
            </div>

            <h5 className="mt-4">Método de envío</h5>
            <div className="mb-3">
              <select className="form-select" name="metodoEnvio" value={form.metodoEnvio} onChange={handleChange}>
                <option value="estandar">Envío estándar - $1.990</option>
                <option value="express">Envío express - $4.990</option>
              </select>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button className="btn btn-dark" onClick={enviarOrden}>Pagar y finalizar</button>
          </div>

          <aside className="col-md-5">
            <div className="card p-3 mb-3">
              <h5>Resumen de orden</h5>
              {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                cart.map((it) => {
                  const p = productos.find((x) => x.id === it.id) || it;
                  const unit = p.descuentoPercent ? p.precioOfertado : p.precio;
                  return (
                    <div key={it.id} className="d-flex justify-content-between border-bottom py-2">
                      <div>
                        <strong>{p.nombre}</strong>
                        <div className="text-muted">{it.cantidad} x ${unit.toLocaleString()}</div>
                      </div>
                      <div className="fw-bold">${(unit * it.cantidad).toLocaleString()}</div>
                    </div>
                  );
                })
              )}

              <div className="mt-3">
                <div className="d-flex justify-content-between"><span>Subtotal</span><strong>${subtotal.toLocaleString()}</strong></div>
                <div className="d-flex justify-content-between"><span>Envío</span><strong>${shipping.toLocaleString()}</strong></div>
                <hr />
                <div className="d-flex justify-content-between"><span>Total</span><strong>${total.toLocaleString()}</strong></div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
