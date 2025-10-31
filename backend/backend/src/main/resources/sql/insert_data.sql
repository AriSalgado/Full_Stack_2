USE lutiane_db;

INSERT INTO usuario (nombre, email, password, rol, activo)
VALUES
('Administrador', 'admin@lutiane.cl', '1234', 'admin', TRUE),
('Vendedor 1', 'vendedor1@lutiane.cl', '1234', 'vendedor', TRUE),
('Cliente Demo', 'cliente@lutiane.cl', '1234', 'cliente', TRUE);

INSERT INTO producto (nombre, descripcion, precio, stock, categoria, imagen, activo)
VALUES
('Pantalón Cargo', 'Pantalón estilo cargo con bolsillos laterales.', 24990, 15, 'Pantalones', '/imagenes/Cargo_Jeans.jpg', TRUE),
('Polera Oversize', 'Polera oversize cómoda y moderna.', 15990, 20, 'Poleras', '/imagenes/polera.png', TRUE),
('Chaqueta Denim', 'Chaqueta clásica de mezclilla.', 34990, 10, 'Chaquetas', '/imagenes/denim.png', TRUE),
('Gorro Street', 'Gorro estilo urbano.', 9990, 25, 'Accesorios', '/imagenes/gorro.png', TRUE),
('Zapatillas Urban', 'Zapatillas de diseño urbano.', 49990, 12, 'Calzado', '/imagenes/zapatillas.png', TRUE);
