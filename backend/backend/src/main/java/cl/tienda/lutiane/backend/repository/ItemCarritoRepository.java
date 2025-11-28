package cl.tienda.lutiane.backend.repository;

import cl.tienda.lutiane.backend.model.ItemCarrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Long> {
}