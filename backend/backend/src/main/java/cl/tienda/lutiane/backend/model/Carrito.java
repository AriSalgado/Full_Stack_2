package cl.tienda.lutiane.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemCarrito> items = new ArrayList<>();

    public Carrito() {
    }

    public Carrito(Usuario usuario) {
        this.usuario = usuario;
    }

    public void addItem(ItemCarrito item) {
        item.setCarrito(this);
        items.add(item);
    }

    public void removeItem(ItemCarrito item) {
        item.setCarrito(null);
        items.remove(item);
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public List<ItemCarrito> getItems() { return items; }
    public void setItems(List<ItemCarrito> items) {
        this.items.clear();
        if (items != null) {
            items.forEach(this::addItem);
        }
    }
}