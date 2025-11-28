package cl.tienda.lutiane.backend.service;

import cl.tienda.lutiane.backend.model.*;
import cl.tienda.lutiane.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Pedido generarPedidoDesdeCarrito(Carrito carrito) {
        Pedido pedido = new Pedido();
        pedido.setUsuario(carrito.getUsuario());
        pedido.setFecha(LocalDateTime.now());

        List<DetallePedido> detalles = carrito.getItems().stream().map(item -> {
            Producto producto = item.getProducto();
            int cantidad = item.getCantidad();
            int precio = (int) producto.getPrecio();

            // Actualizar stock
            producto.setStock(producto.getStock() - cantidad);
            productoRepository.save(producto);

            DetallePedido detalle = new DetallePedido();
            detalle.setProducto(producto);
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(precio);
            detalle.setSubtotal(precio * cantidad);
            detalle.setPedido(pedido);
            return detalle;
        }).collect(Collectors.toList());

        pedido.setDetalles(detalles);
        pedido.setTotal(detalles.stream().mapToInt(DetallePedido::getSubtotal).sum());

        pedidoRepository.save(pedido);

        Boleta boleta = new Boleta();
        boleta.setPedido(pedido);
        boleta.setNumero(generarNumeroBoleta());
        boleta.setFechaEmision(LocalDateTime.now());
        boleta.setSubtotal(pedido.getTotal());
        boleta.setIva((int) Math.round(pedido.getTotal() * 0.19));
        boleta.setTotal(boleta.getSubtotal() + boleta.getIva());

        boletaRepository.save(boleta);
        pedido.setBoleta(boleta);
        pedidoRepository.save(pedido);

        return pedido;
    }

    private String generarNumeroBoleta() {
        long count = boletaRepository.count() + 1;
        return "B" + String.format("%06d", count);
    }
}