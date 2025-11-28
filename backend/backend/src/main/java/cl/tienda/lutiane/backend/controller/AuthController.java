package cl.tienda.lutiane.backend.controller;

import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.service.UsuarioService;
import cl.tienda.lutiane.backend.security.PasswordUtils;
import cl.tienda.lutiane.backend.security.JwtUtils; // ✅ util de JWT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtils jwtUtils; // ✅ inyección correcta

    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credenciales) {
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(credenciales.email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            boolean passwordOk = PasswordUtils.verifyPassword(
                credenciales.password,
                usuario.getPassword()
            );

            if (passwordOk && usuario.isActivo()) {
                String token = jwtUtils.generateToken(usuario.getEmail(), usuario.getRol());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("email", usuario.getEmail());
                response.put("nombre", usuario.getNombre());
                response.put("rol", usuario.getRol());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body("Credenciales inválidas o usuario inactivo");
            }
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        Usuario nuevo = usuarioService.registrarUsuario(
            usuario.getNombre(),
            usuario.getEmail(),
            usuario.getPassword(),
            usuario.getRol()
        );
        return ResponseEntity.ok(nuevo);
    }
}