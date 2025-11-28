package cl.tienda.lutiane.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombre;

    @NotBlank
    private String descripcion;

    @Positive
    private double precio;

    @PositiveOrZero
    private int stock;

    @NotBlank
    private String categoria;

    private String imagen;

    private boolean activo = true;

    private LocalDateTime fechaCreacion = LocalDateTime.now();

    public double getPrecio() {
        return precio;
    }
}
