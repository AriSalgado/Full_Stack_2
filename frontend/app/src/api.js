const API_URL = "http://localhost:8081";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
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

export async function getProductos() {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}

export async function getProductoById(id) {
  const response = await fetch(`${API_URL}/productos/${id}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al obtener producto");
  }
  return response.json();
}

export async function createProducto(producto) {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al crear producto");
  }

  return response.json();
}

export async function deleteProducto(id) {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al eliminar producto");
  }

  return;
}

// --- Usuarios API ---
export async function getUsuarios() {
  const response = await fetch(`${API_URL}/usuarios`);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
}

export async function createUsuario(usuario) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al crear usuario");
  }
  return response.json();
}

export async function updateUsuario(id, usuario) {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al actualizar usuario");
  }
  return response.json();
}

export async function deleteUsuario(id) {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al eliminar usuario");
  }
  return;
}
