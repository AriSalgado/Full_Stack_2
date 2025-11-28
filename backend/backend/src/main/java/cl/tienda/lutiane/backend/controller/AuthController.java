package cl.tienda.lutiane.backend.controller;

import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.service.UsuarioService;
import cl.tienda.lutiane.backend.security.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;   // <-- AHORA SÍ

    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credenciales) {

        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(credenciales.email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        // ✔ VERIFICACIÓN CORRECTA CON BCRYPT
        boolean passwordOk = passwordEncoder.matches(
                credenciales.password,
                usuario.getPassword()
        );

        if (!passwordOk) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        if (!usuario.isActivo()) {
            return ResponseEntity.status(401).body("Usuario inactivo");
        }

        // ✔ GENERAR TOKEN
        String token = jwtUtils.generateToken(usuario.getEmail(), usuario.getRol());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", usuario.getEmail());
        response.put("nombre", usuario.getNombre());
        response.put("rol", usuario.getRol());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario nuevo = usuarioService.registrarUsuario(
                    usuario.getNombre(),
                    usuario.getEmail(),
                    usuario.getPassword(),  // Aquí adentro el service debe encriptar.
                    usuario.getRol()
            );
            return ResponseEntity.ok(nuevo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
