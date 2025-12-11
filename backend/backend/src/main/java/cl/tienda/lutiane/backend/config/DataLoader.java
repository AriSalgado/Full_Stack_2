package cl.tienda.lutiane.backend.config;

import cl.tienda.lutiane.backend.model.Producto;
import cl.tienda.lutiane.backend.model.Usuario;
import cl.tienda.lutiane.backend.repository.ProductoRepository;
import cl.tienda.lutiane.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDateTime;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepo, ProductoRepository productoRepo) {
        return args -> {

            // Crear usuario administrador si no existe
            if (usuarioRepo.findByEmail("admin@lutiane.cl").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNombre("Administrador");
                admin.setEmail("admin@lutiane.cl");
                admin.setPassword("1234");
                admin.setRol("admin");
                admin.setActivo(true);
                admin.setFechaCreacion(LocalDateTime.now());
                usuarioRepo.save(admin);
                System.out.println("Usuario administrador creado: admin@lutiane.cl / 1234");
            } else {
                System.out.println("ℹUsuario administrador ya existe");
            }

            // Crear productos si la tabla está vacía
            if (productoRepo.count() == 0) {
                Producto p1 = new Producto();
                p1.setNombre("Pantalón Cargo");
                p1.setDescripcion("Pantalón estilo cargo urbano con bolsillos laterales.");
                p1.setPrecio(24990.0);
                p1.setStock(10);
                p1.setCategoria("Pantalones");
                p1.setImagen("/imagenes/Cargo_Jeans.jpg");
                p1.setActivo(true);
                p1.setFechaCreacion(LocalDateTime.now());

                Producto p2 = new Producto();
                p2.setNombre("Polera Oversize");
                p2.setDescripcion("Polera de algodón oversize, ideal para un look relajado.");
                p2.setPrecio(15990.0);
                p2.setStock(20);
                p2.setCategoria("Poleras");
                p2.setImagen("/imagenes/polera.png");
                p2.setActivo(true);
                p2.setFechaCreacion(LocalDateTime.now());

             

                productoRepo.save(p1);
                productoRepo.save(p2);
                

                System.out.println("Productos iniciales cargados en la base de datos");
            } else {
                System.out.println("ℹProductos ya existentes, no se insertan duplicados");
            }
        };
    }
}
