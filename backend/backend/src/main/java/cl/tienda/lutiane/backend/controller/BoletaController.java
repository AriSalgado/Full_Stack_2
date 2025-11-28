package cl.tienda.lutiane.backend.controller;

import cl.tienda.lutiane.backend.model.Boleta;
import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.repository.BoletaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boleta")
public class BoletaController {

    private final BoletaRepository boletaRepo;

    public BoletaController(BoletaRepository boletaRepo) {
        this.boletaRepo = boletaRepo;
    }

    // GET /boleta/{id} → detalle de boleta
    @GetMapping("/{id}")
    public ResponseEntity<Boleta> obtener(@PathVariable Long id,
                                          @AuthenticationPrincipal Usuario usuario) {
        Boleta boleta = boletaRepo.findById(id)
                .orElse(null);

        if (boleta == null) return ResponseEntity.notFound().build();
        if (!boleta.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(boleta);
    }
}