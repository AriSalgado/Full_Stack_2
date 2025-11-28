package cl.tienda.lutiane.backend.service;

import cl.tienda.lutiane.backend.model.*;
import cl.tienda.lutiane.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BoletaService {

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Boleta generarBoletaDesdeCarrito(Carrito carrito) {
        Boleta boleta = new Boleta();
        boleta.setUsuario(carrito.getUsuario());
        boleta.setFechaEmision(LocalDateTime.now());
        boleta.setNumero(generarNumeroBoleta());

        double subtotal = 0.0;

        for (ItemCarrito item : carrito.getItems()) {
            Producto producto = item.getProducto();

            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);

            BoletaDetalle detalle = new BoletaDetalle();
            detalle.setBoleta(boleta);
            detalle.setNombreProducto(producto.getNombre());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(producto.getPrecio() * item.getCantidad());

            subtotal += detalle.getSubtotal();
            boleta.addDetalle(detalle);
        }

        boleta.setSubtotal(subtotal);
        boleta.setIva(Math.round(subtotal * 0.19));
        boleta.setTotal(boleta.getSubtotal() + boleta.getIva());

        return boletaRepository.save(boleta);
    }

    private String generarNumeroBoleta() {
        long count = boletaRepository.count() + 1;
        return "B" + String.format("%06d", count);
    }
}