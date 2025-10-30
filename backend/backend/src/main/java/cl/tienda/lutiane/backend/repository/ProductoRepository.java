package cl.tienda.lutiane.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cl.tienda.lutiane.backend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
