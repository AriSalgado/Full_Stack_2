import { Link } from "react-router-dom";

export default function Navbar() {
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
            <Link className="nav-link text-light" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/carrito">Carrito 🛒</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

