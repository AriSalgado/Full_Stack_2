package cl.tienda.lutiane.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repo;

    public List<Usuario> listar() {
        return repo.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public Usuario crear(Usuario u) {
        return repo.save(u);
    }

    public Usuario actualizar(Long id, Usuario u) {
        return repo.findById(id).map(existente -> {
            existente.setNombre(u.getNombre());
            existente.setEmail(u.getEmail());
            existente.setPassword(u.getPassword());
            existente.setRol(u.getRol());
            existente.setActivo(u.isActivo());
            return repo.save(existente);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
    return repo.findByEmail(email);
    }

}
