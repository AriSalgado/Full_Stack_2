import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Nosotros() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero d-flex align-items-center justify-content-center text-white text-center"
        style={{
          background: "url('/imagenes/nosotros.jpg') no-repeat center center/cover",
          height: "80vh",
        }}
      >
        <div className="hero-text">
          <h1 className="display-4 fw-bold text-shadow">Conoce Lutiane</h1>
          <p className="lead">Moda urbana con estilo propio</p>
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="nosotros-container container py-5">
        {/* Nuestra Historia */}
        <section className="nosotros-intro mb-5 text-center">
          <h2 className="mb-3">Nuestra Historia</h2>
          <p className="mx-auto" style={{ maxWidth: "800px" }}>
            Lutiane nació en Padre Hurtado con el objetivo de traer moda urbana con estilo propio. 
            Creemos en la autenticidad, la comodidad y la personalidad que cada prenda transmite.
          </p>
        </section>

        {/* Misión y Valores */}
        <section className="nosotros-valores text-center mb-5 py-5">
  <h2 className="mb-4 fw-bold">Misión y Valores</h2>
  <div className="row justify-content-center">
    <div className="col-md-3 mb-4">
      <div className="valor-card shadow-sm p-4 h-100">
        <h3>Autenticidad</h3>
        <p>Prendas únicas que reflejan tu personalidad y confianza.</p>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="valor-card shadow-sm p-4 h-100">
        <h3>Calidad</h3>
        <p>Diseños hechos para durar y acompañarte día a día.</p>
      </div>
    </div>

    <div className="col-md-3 mb-4">
      <div className="valor-card shadow-sm p-4 h-100">
        <h3>Estilo Moderno</h3>
        <p>Inspirados en la moda urbana contemporánea y versátil.</p>
      </div>
    </div>
  </div>
</section>


        {/* Botón a Productos */}
        <div className="text-center">
          <Link to="/productos" className="btn btn-dark btn-lg">
            Descubre nuestra colección
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
