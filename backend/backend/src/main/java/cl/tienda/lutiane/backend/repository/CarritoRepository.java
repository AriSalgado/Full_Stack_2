package cl.tienda.lutiane.backend.repository;

import cl.tienda.lutiane.backend.model.Carrito;
import cl.tienda.lutiane.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    // Busca el carrito asociado a un usuario específico
    Optional<Carrito> findByUsuario(Usuario usuario);
}