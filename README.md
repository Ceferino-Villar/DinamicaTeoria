# 🚀 DevLanguages - Monorepo Full-Stack

Aplicación web Full-Stack moderna para explorar, añadir, editar y gestionar información sobre lenguajes de programación. El proyecto está construido bajo una arquitectura de monorepo que separa claramente el **Frontend** (interfaz interactiva de usuario) del **Backend** (API REST y base de datos).

---

## 🛠️ Tecnologías Utilizadas (Tech Stack)

### **Frontend**
- **React.js** (v18+): Librería de JavaScript para construir la interfaz de usuario.
- **Vite**: Empaquetador y entorno de desarrollo ultra rápido.
- **React Router DOM**: Manejo de rutas del cliente para una SPA (Single Page Application).
- **CSS3 / Tailwind CSS**: Estilizado moderno y responsivo.

### **Backend**
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para la creación de la API RESTful.
- **SQLite3 / SQLite**: Base de datos relacional liviana basada en archivos, integrada con consultas `async/await`.
- **CORS**: Middleware para habilitar solicitudes de origen cruzado entre frontend y backend.

### **Despliegue (Production Setup)**
- **Frontend**: Alojado en **Vercel**.
- **Backend**: Alojado en **Railway** (permite persistencia de datos SQLite).

---

## ✨ Funcionalidades de la Aplicación

1. **Catálogo de Lenguajes**: Visualización dinámica de todos los lenguajes de programación almacenados en la base de datos.
2. **Creación (POST)**: Formulario interactivo para registrar nuevos lenguajes con su nombre y descripción.
3. **Edición (PUT)**: Capacidad para modificar la información de un lenguaje existente en tiempo real.
4. **Eliminación (DELETE)**: Opción para remover lenguajes de la base de datos con confirmación.
5. **Navegación Fluida (SPA)**: Cambio de vistas instantáneo sin recargar la página.

---

## 📁 Estructura del Proyecto

```text
DinamicaTeoria/
├── backend/
│   ├── database.sqlite       # Base de datos local SQLite
│   ├── index.js              # Servidor Express y endpoints API
│   └── package.json          # Dependencias del servidor
├── frontend/
│   ├── src/
│   │   ├── pages/            # Componentes de vistas (Home, Catalog, etc.)
│   │   ├── App.jsx           # Configuración de rutas principales
│   │   └── main.jsx         # Punto de entrada de React
│   ├── index.html            # Plantilla base HTML
│   ├── vercel.json           # Configuración de redirecciones SPA para Vercel
│   └── package.json          # Dependencias del cliente
└── README.md
```

---

## 💻 Instrucciones para Ejecutar Localmente

### **Requisitos Previos**
- Tener instalado **Node.js** (versión 16 o superior).
- Tener instalado **Git**.

---

### **1. Clonar el repositorio**
```bash
git clone https://github.com/Ceferino-Villar/DinamicaTeoria.git
cd DinamicaTeoria
```

---

### **2. Configurar y Ejecutar el Backend**
1. Abre una terminal y entra en la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   # O alternativamente: node index.js
   ```
   *El backend correrá en `http://localhost:3001` (o en el puerto asignado en la variable de entorno `PORT`).*

---

### **3. Configurar y Ejecutar el Frontend**
1. Abre **otra terminal diferente** y entra en la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el entorno de desarrollo con Vite:
   ```bash
   npm run dev
   ```
4. Abre tu navegador e ingresa a la URL mostrada en la terminal (usualmente `http://localhost:5173`).

---

## 🌐 Endpoints de la API (Backend)

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/datos` | Obtiene la lista completa de lenguajes. |
| `POST` | `/api/datos` | Añade un nuevo lenguaje (requiere `{ nombre, descripcion }`). |
| `PUT` | `/api/datos/:id` | Modifica un lenguaje existente por su ID. |
| `DELETE` | `/api/datos/:id` | Elimina un lenguaje por su ID. |

---

## 📝 Notas de Despliegue

- **Vercel (Frontend)**: Al desplegar en Vercel, asegúrate de configurar el `Root Directory` como `frontend` y verificar que las importaciones de componentes en `App.jsx` respeten exactamente las mayúsculas/minúsculas de los archivos (`Home.jsx`, `Catalog.jsx`).
- **Railway (Backend)**: El servidor requiere escuchar `process.env.PORT` para asignar dinámicamente el puerto de producción en Railway.