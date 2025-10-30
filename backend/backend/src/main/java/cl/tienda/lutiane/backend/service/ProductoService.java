package cl.tienda.lutiane.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cl.tienda.lutiane.backend.model.Producto;
import cl.tienda.lutiane.backend.repository.ProductoRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository repo;

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Optional<Producto> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public Producto crear(Producto p) {
        return repo.save(p);
    }

    public Producto actualizar(Long id, Producto p) {
        return repo.findById(id).map(existente -> {
            existente.setNombre(p.getNombre());
            existente.setDescripcion(p.getDescripcion());
            existente.setPrecio(p.getPrecio());
            existente.setStock(p.getStock());
            existente.setCategoria(p.getCategoria());
            existente.setImagen(p.getImagen());
            existente.setActivo(p.isActivo());
            return repo.save(existente);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
