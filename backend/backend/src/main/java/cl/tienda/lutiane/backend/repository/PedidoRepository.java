package cl.tienda.lutiane.backend.repository;

import cl.tienda.lutiane.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByUsuarioId(Long usuarioId);

  
    List<Pedido> findByFechaBetween(java.time.LocalDateTime inicio, java.time.LocalDateTime fin);
}