import { useState } from "react";

export default function Contactos() {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState("");

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!nombre || !correo || !mensaje) {
      setAlerta("Por favor completa todos los campos.");
      return;
    }

    // Simulación de envío (más adelante puede ir fetch/axios)
    setAlerta("¡Gracias por contactarte! Te responderemos pronto.");
    setNombre("");
    setCorreo("");
    setMensaje("");
  };

  return (
    <main className="contacto-page container py-5">
      <h1 className="text-center mb-3">Contáctanos</h1>
      <p className="text-center mb-4">
        Completa el formulario y nos pondremos en contacto contigo lo antes
        posible.
      </p>

      <section className="form-container mx-auto" style={{ maxWidth: "600px" }}>
        <form id="formContacto" onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div>
            <label htmlFor="correo" className="form-label">
              Correo:
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div>
            <label htmlFor="mensajeContacto" className="form-label">
              Mensaje:
            </label>
            <textarea
              id="mensajeContacto"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="form-control"
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-dark">
            Enviar
          </button>
        </form>

        {alerta && (
          <p id="alerta" className="text-center mt-3">
            {alerta}
          </p>
        )}
      </section>
    </main>
  );
}
