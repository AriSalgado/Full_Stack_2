package cl.tienda.lutiane.backend.security;

import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.repository.UsuarioRepository;

import java.util.Optional;

public class AuthService {

    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public void register(String email, String plainPassword, String nombre, String rol) {
        String hashedPassword = PasswordUtils.hashPassword(plainPassword);

        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setPassword(hashedPassword);
        usuario.setNombre(nombre);
        usuario.setRol(rol);
        usuario.setActivo(true); 
        usuarioRepository.save(usuario);
    }

    public boolean login(String email, String plainPassword) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        if (optionalUsuario.isEmpty()) return false;

        Usuario usuario = optionalUsuario.get();
        return PasswordUtils.verifyPassword(plainPassword, usuario.getPassword());
    }
}