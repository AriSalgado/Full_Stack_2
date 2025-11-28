import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombre");
  const rol = localStorage.getItem("rol"); // guardado en login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark custom-navbar"
      style={{
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand fw-bold text-uppercase text-light"
          to="/"
        >
          Lutiane
        </Link>

        <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/productos">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/nosotros">Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/blog">Blog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/contactos">Contactos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/carrito">Carrito 🛒</Link>
          </li>

          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/registro">Registro</Link>
              </li>
            </>
          ) : (
            <>
              {/* Mostrar enlace al panel solo si el rol es ADMIN */}
              {rol === "ADMIN" && (
                <li className="nav-item">
                  <Link className="nav-link text-warning fw-bold" to="/admin">
                    Panel Admin
                  </Link>
                </li>
              )}

              {/* Enlace al historial de compras para usuarios autenticados */}
              {rol === "USER" || rol === "ADMIN" ? (
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/historial">
                    Historial 🧾
                  </Link>
                </li>
              ) : null}

              <li className="nav-item">
                <span className="nav-link text-light">
                  Hola, {nombre} ({rol})
                </span>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}