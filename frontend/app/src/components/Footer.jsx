export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="logo">LUTIANE</h2>
          <p>Av. Independencia #1234, Santiago</p>
          <p>
            <a href="mailto:tiendaatuestilo@lutiane.cl">contacto@lutiane.cl</a>
          </p>
          <div className="social">
            <a target="_blank" href="https://www.instagram.com/lutiane.cl">Instagram</a> |{" "}
            <a target="_blank" href="https://www.mercadolibre.cl/pagina/lutianespa?fbclid=PAZXh0bgNhZW0CMTEAAae3DlcSOW_6KA7sTU2ApElbRgIqYiFfoLD_Rkp2iSeCbNUJpvEmTlxg1LIVfw_aem_59HsN7U2STVkGkw-Eo_uoQ">Mercado Libre</a> |{" "}
            <a href="#">WhatsApp</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>PRODUCTOS</h3>
          <ul>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Los más vendidos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>NUESTRA TIENDA</h3>
          <ul>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>RECIBE NUESTRAS OFERTAS</h3>
          <p>
            Ingresa tu correo para recibir nuestras novedades y descuentos directos.
          </p>
          <form id="suscripcionForm">
            <input type="email" placeholder="Tu dirección de correo electrónico" required />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </div>

      <div className="copy">
        <p>
          &copy; 2025 <strong>Lutiane</strong> - Diseñado con estilo para ti
        </p>
      </div>
    </footer>
  );
}
