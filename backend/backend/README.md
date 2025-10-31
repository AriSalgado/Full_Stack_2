# 🛍️ LUTIANE STORE - Proyecto Full Stack

Proyecto desarrollado como parte del curso **Desarrollo Full Stack (DUOC UC)**.  
Incluye **frontend en React** y **backend en Spring Boot con MySQL**, completamente funcional y documentado.

---

## 🚀 Descripción del Proyecto

**Lutiane Store** es una tienda online enfocada en moda urbana.  
Permite a los usuarios:
- Ver productos disponibles.
- Iniciar sesión como cliente o administrador.
- Administrar productos (CRUD completo).
- Simular compras desde el carrito.
- Gestionar usuarios y stock desde el panel de administración.

---

## 🧰 Tecnologías Utilizadas

### 🔹 Frontend
- React + Vite  
- React Router DOM  
- Bootstrap 5  

### 🔹 Backend
- Spring Boot 3.5.7  
- Spring Data JPA  
- Spring Validation  
- Swagger (OpenAPI 3)  
- Lombok  
- MySQL Workbench  
- Maven  

---

## ⚙️ Instalación y Ejecución

### 1️ Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd Full_Stack_2-2

--------------------------------------------------------------------------

### 2️ Configurar la base de datos (MySQL Workbench)

Ejecuta en MySQL:

CREATE DATABASE lutiane_db;
CREATE USER 'lutiane_user'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON lutiane_db.* TO 'lutiane_user'@'localhost';
FLUSH PRIVILEGES;

--------------------------------------------------------------------------

3️⃣ Configurar el backend

Archivo: backend/backend/src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/lutiane_db
spring.datasource.username=lutiane_user
spring.datasource.password=123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

--------------------------------------------------------------------------

4️⃣ Ejecutar el backend (Spring Boot)

Abre una terminal en:

C:\Users\arica\OneDrive\Escritorio\Full_Stack_2-2\backend\backend


Ejecuta:

.\mvnw spring-boot:run


El backend correrá en:
👉 http://localhost:8080

Y la documentación Swagger estará disponible en:
👉 http://localhost:8080/swagger-ui/index.html

--------------------------------------------------------------------------

5️⃣ Ejecutar el frontend (React)

Abre una nueva terminal en:

C:\Users\arica\OneDrive\Escritorio\Full_Stack_2-2\frontend\app


Ejecuta:

npm install
npm run dev


El frontend estará disponible en:
👉 http://localhost:5173

--------------------------------------------------------------------------

👤 Credenciales de Prueba
Rol	Email	Contraseña
🧑‍💼 Administrador	admin@lutiane.cl
	1234
🛒 Cliente	cliente@lutiane.cl
	1234
🧩 Endpoints principales de la API
Tipo	Endpoint	Descripción
GET	/api/productos	Lista de productos
POST	/api/productos	Crea un nuevo producto
PUT	/api/productos/{id}	Actualiza un producto
DELETE	/api/productos/{id}	Elimina un producto
GET	/api/usuarios	Lista de usuarios
POST	/api/auth/login	Inicio de sesión

--------------------------------------------------------------------------

🧪 Documentación de API

Swagger UI (documentación automática de la API):
👉 http://localhost:8080/swagger-ui/index.html

🗄️ Scripts SQL

📁 backend/backend/src/main/resources/sql/

create_tables.sql → Crea las tablas usuario y producto.

insert_data.sql → Inserta los datos iniciales (usuarios y productos de prueba).

--------------------------------------------------------------------------

🧾 Documentación y Presentación

📘 Informe Final:
👉 [Agrega aquí el enlace de tu informe en Google Docs o PDF]

📊 Presentación PPT:
👉 [Agrega aquí el enlace de tu presentación en PowerPoint o Google Slides]

🧱 Estructura del Proyecto
Full_Stack_2-2/
│
├── backend/
│   ├── src/main/java/cl/tienda/lutiane/backend/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   ├── config/
│   │   └── BackendApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── sql/
│   └── pom.xml
│
├── frontend/
│   ├── app/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│
└── README.md

--------------------------------------------------------------------------

👥 Integrantes del Proyecto

Araceli Salgado

David Albornoz

--------------------------------------------------------------------------

🧱 Licencia

Proyecto académico - DUOC UC 2025.

--------------------------------------------------------------------------
