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
import Categorias from "./pages/Categorias";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraFallida from "./pages/CompraFallida";
import Ofertas from "./pages/Ofertas";

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
        <Route path="/admin" element={<Admin />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:categoria" element={<Productos />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
        <Route path="/ofertas" element={<Ofertas />} />
      </Routes>
    </Router>
  );
}


