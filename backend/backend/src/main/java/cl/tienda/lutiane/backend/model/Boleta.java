package cl.tienda.lutiane.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numero;

    @Column(nullable = false)
    private LocalDateTime fechaEmision;

    @Column(nullable = false)
    private double subtotal;

    @Column(nullable = false)
    private double iva;

    @Column(nullable = false)
    private double total;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Usuario usuario;

    @OneToMany(mappedBy = "boleta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // evita recursión al serializar (lado "padre")
    private List<BoletaDetalle> detalles = new ArrayList<>();

    @OneToOne(optional = false)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    public Boleta() {
    }

    public void addDetalle(BoletaDetalle d) {
        if (d == null) return;
        d.setBoleta(this);
        detalles.add(d);
    }

    public void removeDetalle(BoletaDetalle d) {
        if (d == null) return;
        d.setBoleta(null);
        detalles.remove(d);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public LocalDateTime getFechaEmision() { return fechaEmision; }
    public void setFechaEmision(LocalDateTime fechaEmision) { this.fechaEmision = fechaEmision; }

    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public double getIva() { return iva; }
    public void setIva(double iva) { this.iva = iva; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public List<BoletaDetalle> getDetalles() { return detalles; }
    public void setDetalles(List<BoletaDetalle> detalles) {
        this.detalles.clear();
        if (detalles != null) {
            detalles.forEach(this::addDetalle);
        }
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
}