package cl.tienda.lutiane.backend.controller;

import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    // (no PasswordEncoder used in original plaintext login)

    // DTO interno para evitar que Spring valide toda la entidad
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credenciales) {
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(credenciales.email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getPassword().equals(credenciales.password) && usuario.isActivo()) {
                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.status(401).body("Credenciales inválidas o usuario inactivo");
            }
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }
}
