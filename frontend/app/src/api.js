const API_URL = "http://localhost:8080/api";

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

export async function getProductos() {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}
