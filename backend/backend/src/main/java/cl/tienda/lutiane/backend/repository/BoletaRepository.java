package cl.tienda.lutiane.backend.repository;

import cl.tienda.lutiane.backend.model.Boleta;
import cl.tienda.lutiane.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoletaRepository extends JpaRepository<Boleta, Long> {

    List<Boleta> findByUsuarioOrderByFechaEmisionDesc(Usuario usuario);

    Optional<Boleta> findTopByOrderByIdDesc();

    List<Boleta> findAllByOrderByFechaEmisionDesc();

    Optional<Boleta> findByNumero(String numero);
}