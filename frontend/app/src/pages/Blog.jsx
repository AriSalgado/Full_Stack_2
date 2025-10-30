import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Blog() {
  const blogs = [
    {
      id: 1,
      titulo: "Guía de Estilo: Cómo Combinar Pantalones Cargo",
      descripcion:
        "Descubre los secretos para lucir tus pantalones cargo con un estilo único y moderno.",
      imagen: "/imagenes/Cargo_Jeans.jpg",
    },
    {
      id: 2,
      titulo: "El Regreso del Oversize: Comodidad y Estilo",
      descripcion:
        "Las poleras oversize están de vuelta. Te mostramos cómo llevar esta tendencia con actitud.",
      imagen: "/imagenes/polera.png",
    },
  ];

  return (
    <>
      <main className="container py-5">
        <h1 className="text-center mb-4">Últimas Noticias</h1>

        <div className="row justify-content-center">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-md-4 mb-4">
              <div className="card blog-card shadow-sm">
                <img
                  src={blog.imagen}
                  alt={blog.titulo}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h4 className="card-title">{blog.titulo}</h4>
                  <p className="card-text">{blog.descripcion}</p>
                  <Link
                    to={`/blog-detail?id=${blog.id}`}
                    className="btn btn-dark"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
