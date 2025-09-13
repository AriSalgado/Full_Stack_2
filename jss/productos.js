document.addEventListener('DOMContentLoaded', () => {
    // Escucha clics en cualquier botón con la clase "add-to-cart-btn"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
});

// La clave para guardar los productos en el Local Storage
const localStorageKey = 'productos-en-carrito';

function agregarAlCarrito(event) {
    // Obtiene la información del producto de los atributos de datos del botón
    const id = event.target.dataset.id;
    const nombre = event.target.dataset.nombre;
    const precio = parseInt(event.target.dataset.precio);
    const imagen = event.target.dataset.imagen;

    // Crea un objeto con los datos del producto
    const producto = {
        id,
        nombre,
        precio,
        imagen
    };

    // Obtiene los productos del Local Storage. Si no hay, usa un array vacío.
    let productos = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    // Añade el nuevo producto al array
    productos.push(producto);

    // Guarda el array actualizado en el Local Storage
    localStorage.setItem(localStorageKey, JSON.stringify(productos));

    // Opcional: Notifica al usuario que el producto fue añadido
    alert(`"${nombre}" ha sido añadido al carrito.`);
}