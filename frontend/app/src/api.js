export const API_URL = "http://localhost:8080/api";

export function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// 🔐 Autenticación
export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en el inicio de sesión");
  }

  return response.json();
}

export async function register(nombre, email, password, rol = "CLIENTE") {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password, rol }),
  });

  if (!response.ok) throw new Error("Error al registrar usuario");
  return response.json();
}

// 📦 Productos
export async function getProductos() {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}

export async function crearProducto(producto) {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(producto),
  });

  if (!response.ok) throw new Error("Error al crear producto");
  return response.json();
}

export async function editarProducto(id, producto) {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(producto),
  });

  if (!response.ok) throw new Error("Error al actualizar producto");
  return response.json();
}

export async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar producto");
}

// 👤 Perfil
export async function getPerfil() {
  const response = await fetch(`${API_URL}/usuarios/perfil`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener perfil");
  return response.json();
}

// 🛒 Carrito
export async function getCarrito() {
  const response = await fetch(`${API_URL}/carrito`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener carrito");
  return response.json();
}

export async function addToCarrito(productoId, cantidad = 1) {
  const response = await fetch(`${API_URL}/carrito/agregar`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ productoId, cantidad }),
  });

  if (!response.ok) throw new Error("Error al agregar producto al carrito");
  return response.json();
}

// ✅ Nuevo: actualizar cantidad de un ítem
export async function updateItemCantidad(itemId, cantidad) {
  const response = await fetch(`${API_URL}/carrito/item/${itemId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ cantidad }),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || "Error al actualizar la cantidad del item");
  }
}

export async function removeItemCarrito(itemId) {
  const response = await fetch(`${API_URL}/carrito/item/${itemId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar item del carrito");
}

export async function vaciarCarrito() {
  const response = await fetch(`${API_URL}/carrito/vaciar`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al vaciar carrito");
}

export async function finalizarCompra() {
  const response = await fetch(`${API_URL}/pedidos/finalizar`, {
    method: "POST",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al finalizar compra");
  return response.json();
}

// 📜 Historial y boletas
export async function getHistorial() {
  const response = await fetch(`${API_URL}/pedidos/mios`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener historial");
  return response.json();
}

export async function getBoleta(id) {
  const response = await fetch(`${API_URL}/boleta/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener boleta");
  return response.json();
}

// 👥 Usuarios (Admin)
export async function getUsuarios() {
  const response = await fetch(`${API_URL}/admin/usuarios`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
}

export async function eliminarUsuario(id) {
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar usuario");
}

// 🛍 Compras (Admin)
export async function getCompras() {
  const response = await fetch(`${API_URL}/admin/compras`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener compras");
  return response.json();
}