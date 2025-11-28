package cl.tienda.lutiane.backend.controller;

import cl.tienda.lutiane.backend.model.*;
import cl.tienda.lutiane.backend.service.CarritoService;
import cl.tienda.lutiane.backend.service.UsuarioService;
import cl.tienda.lutiane.backend.service.ProductoService;
import cl.tienda.lutiane.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<Carrito> obtenerCarrito(@AuthenticationPrincipal Usuario usuario) {
        Carrito carrito = carritoService.obtenerOCrearCarrito(usuario);
        return ResponseEntity.ok(carrito);
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<?> actualizarCantidad(
            @PathVariable Long itemId,
            @RequestParam int cantidad,
            @AuthenticationPrincipal Usuario usuario) {

        if (cantidad < 1) return ResponseEntity.badRequest().body("Cantidad inválida");

        Optional<ItemCarrito> itemOpt = carritoService.buscarItemPorId(itemId);
        if (itemOpt.isEmpty()) return ResponseEntity.notFound().build();

        ItemCarrito item = itemOpt.get();
        if (!item.getCarrito().getUsuario().getId().equals(usuario.getId()))
            return ResponseEntity.status(403).body("No autorizado");

        Producto producto = item.getProducto();
        if (cantidad > producto.getStock())
            return ResponseEntity.badRequest().body("Stock insuficiente");

        item.setCantidad(cantidad);
        carritoService.guardarItem(item);
        return ResponseEntity.ok("Cantidad actualizada");
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> eliminarItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal Usuario usuario) {

        Optional<ItemCarrito> itemOpt = carritoService.buscarItemPorId(itemId);
        if (itemOpt.isEmpty()) return ResponseEntity.notFound().build();

        ItemCarrito item = itemOpt.get();
        if (!item.getCarrito().getUsuario().getId().equals(usuario.getId()))
            return ResponseEntity.status(403).body("No autorizado");

        carritoService.eliminarItem(item);
        return ResponseEntity.ok("Item eliminado");
    }

    @DeleteMapping("/vaciar")
    public ResponseEntity<?> vaciarCarrito(@AuthenticationPrincipal Usuario usuario) {
        Carrito carrito = carritoService.obtenerOCrearCarrito(usuario);
        carrito.getItems().clear();
        carritoService.guardar(carrito);
        return ResponseEntity.ok("Carrito vaciado");
    }

    @PostMapping("/finalizar")
    public ResponseEntity<Pedido> finalizarCompra(@AuthenticationPrincipal Usuario usuario) {
        Carrito carrito = carritoService.obtenerOCrearCarrito(usuario);
        if (carrito.getItems().isEmpty())
            return ResponseEntity.badRequest().build();

        Pedido pedido = pedidoService.generarPedidoDesdeCarrito(carrito);
        carrito.getItems().clear();
        carritoService.guardar(carrito);
        return ResponseEntity.ok(pedido);
    }
}