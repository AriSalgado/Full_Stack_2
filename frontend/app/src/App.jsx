import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Contactos from "./pages/Contactos";
import Detalle from "./pages/Detalle";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Registro from "./pages/Registro";
import PrivateRoute from "./components/PrivateRoute";
import Historial from "./pages/Historial";
import Boleta from "./pages/Boleta";
import AdminCompras from "./pages/AdminCompras";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="ADMIN">
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="/historial" element={<Historial />} />
        <Route path="/boleta/:id" element={<Boleta />} />
        <Route path="/admin/compras" element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminCompras />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}