package cl.tienda.lutiane.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cl.tienda.lutiane.backend.model.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
