package cl.tienda.lutiane.backend.service;

import cl.tienda.lutiane.backend.model.*;
import cl.tienda.lutiane.backend.repository.BoletaRepository;
import cl.tienda.lutiane.backend.repository.CarritoRepository;
import cl.tienda.lutiane.backend.repository.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class CheckoutService {

    private final CarritoRepository carritoRepo;
    private final ProductoRepository productoRepo;
    private final BoletaRepository boletaRepo;

    public CheckoutService(CarritoRepository carritoRepo,
                           ProductoRepository productoRepo,
                           BoletaRepository boletaRepo) {
        this.carritoRepo = carritoRepo;
        this.productoRepo = productoRepo;
        this.boletaRepo = boletaRepo;
    }

    @Transactional
    public Boleta finalizarCompra(Usuario usuario) {
        Carrito carrito = carritoRepo.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        if (carrito.getItems() == null || carrito.getItems().isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        double subtotal = 0.0;
        Boleta boleta = new Boleta();
        boleta.setNumero(generarNumeroCorrelativo());
        boleta.setFechaEmision(LocalDateTime.now());
        boleta.setUsuario(usuario);

        for (ItemCarrito item : carrito.getItems()) {
            Producto producto = item.getProducto();
            int cantidad = item.getCantidad();

            if (cantidad <= 0) {
                throw new RuntimeException("Cantidad inválida para " + producto.getNombre());
            }
            if (cantidad > producto.getStock()) {
                throw new RuntimeException("Stock insuficiente para " + producto.getNombre());
            }

            // Descontar stock
            producto.setStock(producto.getStock() - cantidad);
            productoRepo.save(producto);

            double sub = producto.getPrecio() * cantidad;
            subtotal += sub;

            BoletaDetalle detalle = new BoletaDetalle();
            detalle.setNombreProducto(producto.getNombre());
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(sub);
            boleta.addDetalle(detalle);
        }

        double iva = subtotal * 0.19; // IVA Chile
        double total = subtotal + iva;

        boleta.setSubtotal(subtotal);
        boleta.setIva(iva);
        boleta.setTotal(total);

        Boleta saved = boletaRepo.save(boleta);

        // Vaciar carrito
        carrito.getItems().clear();
        carritoRepo.save(carrito);

        return saved;
    }

    // Correlativo simple; puedes usar secuencias/tabla específica si necesitas estricto
    private String generarNumeroCorrelativo() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}