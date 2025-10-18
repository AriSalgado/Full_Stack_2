import { useEffect, useState } from "react";

export default function BlogDetail() {
  // Estado para guardar el contenido del blog
  const [blog, setBlog] = useState(null);

  // Simulamos la carga del contenido (más adelante se conectará al backend)
  useEffect(() => {
    // Aquí podrías usar fetch() o axios() para traer datos reales del backend
    const ejemploBlog = {
      titulo: "Tendencias de Moda 2025",
      autor: "Equipo Lutiane",
      fecha: "18 de Octubre de 2025",
      contenido: `
        Este año, las tendencias de moda vienen cargadas de color, texturas naturales 
        y un enfoque sostenible. En Lutiane, buscamos promover un estilo que combine 
        elegancia, conciencia ambiental y comodidad.
      `,
    };
    setBlog(ejemploBlog);
  }, []);

  return (
    <main className="container py-5" id="detalleBlog">
      {blog ? (
        <article className="blog-detail">
          <h1 className="mb-3">{blog.titulo}</h1>
          <p className="text-muted">
            <strong>{blog.autor}</strong> | {blog.fecha}
          </p>
          <p className="mt-4">{blog.contenido}</p>
        </article>
      ) : (
        <p>Cargando contenido...</p>
      )}
    </main>
  );
}
