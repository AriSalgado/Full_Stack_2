package cl.tienda.lutiane.backend.controller;

import cl.tienda.lutiane.backend.model.Boleta;
import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.repository.BoletaRepository;
import cl.tienda.lutiane.backend.service.CheckoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final CheckoutService checkoutService;
    private final BoletaRepository boletaRepo;

    public PedidoController(CheckoutService checkoutService, BoletaRepository boletaRepo) {
        this.checkoutService = checkoutService;
        this.boletaRepo = boletaRepo;
    }

    @PostMapping("/finalizar")
    public ResponseEntity<Boleta> finalizar(@AuthenticationPrincipal Usuario usuario) {
        Boleta boleta = checkoutService.finalizarCompra(usuario);
        return ResponseEntity.ok(boleta);
    }

    @GetMapping("/mios")
    public ResponseEntity<List<Boleta>> historial(@AuthenticationPrincipal Usuario usuario) {
        List<Boleta> boletas = boletaRepo.findByUsuarioOrderByFechaEmisionDesc(usuario);
        return ResponseEntity.ok(boletas);
    }

    @GetMapping("/boleta/{id}")
    public ResponseEntity<Boleta> detalle(@PathVariable Long id, @AuthenticationPrincipal Usuario usuario) {
        return boletaRepo.findById(id)
                .filter(b -> b.getUsuario().equals(usuario))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // NUEVO: listado completo para el panel admin
    @GetMapping("/todas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Boleta>> todas() {
        List<Boleta> boletas = boletaRepo.findAllByOrderByFechaEmisionDesc();
        return ResponseEntity.ok(boletas);
    }
}