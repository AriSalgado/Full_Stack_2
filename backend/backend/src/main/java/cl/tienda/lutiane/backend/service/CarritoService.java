package cl.tienda.lutiane.backend.service;

import cl.tienda.lutiane.backend.model.Carrito;
import cl.tienda.lutiane.backend.model.ItemCarrito;
import cl.tienda.lutiane.backend.model.Producto;
import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.repository.CarritoRepository;
import cl.tienda.lutiane.backend.repository.ItemCarritoRepository;
import cl.tienda.lutiane.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ItemCarritoRepository itemCarritoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Carrito obtenerOCrearCarrito(Usuario usuario) {
        return carritoRepository.findByUsuario(usuario)
                .orElseGet(() -> {
                    Carrito nuevo = new Carrito(usuario);
                    return carritoRepository.save(nuevo);
                });
    }

    public Optional<ItemCarrito> buscarItemPorId(Long id) {
        return itemCarritoRepository.findById(id);
    }

    public Carrito guardar(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public ItemCarrito guardarItem(ItemCarrito item) {
        return itemCarritoRepository.save(item);
    }

    public void eliminarItem(ItemCarrito item) {
        itemCarritoRepository.delete(item);
    }

    public ItemCarrito agregarProducto(Carrito carrito, Producto producto, int cantidad) {
       
        if (cantidad < 1) throw new IllegalArgumentException("Cantidad inválida");
        if (cantidad > producto.getStock()) throw new IllegalArgumentException("Stock insuficiente");

        Optional<ItemCarrito> existente = carrito.getItems().stream()
                .filter(i -> i.getProducto().getId().equals(producto.getId()))
                .findFirst();

        if (existente.isPresent()) {
            ItemCarrito item = existente.get();
            item.setCantidad(item.getCantidad() + cantidad);
            return itemCarritoRepository.save(item);
        } else {
            ItemCarrito nuevo = new ItemCarrito(carrito, producto, cantidad);
            carrito.addItem(nuevo);
            carritoRepository.save(carrito);
            return nuevo;
        }
    }

    public void vaciarCarrito(Carrito carrito) {
        carrito.getItems().clear();
        carritoRepository.save(carrito);
    }
}