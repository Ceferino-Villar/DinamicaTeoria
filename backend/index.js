const express = require('express');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS datos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT
    )
  `);

  // Asegurar que exista la columna descripcion si la tabla ya fue creada anteriormente
  try {
    await db.exec(`ALTER TABLE datos ADD COLUMN descripcion TEXT`);
  } catch (e) {
    // Se ignora si la columna ya existe
  }
})();

// OBTENER TODOS LOS LENGUAJES (GET)
app.get('/api/datos', async (req, res) => {
  try {
    const filas = await db.all('SELECT * FROM datos');
    res.json(filas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AÑADIR UN NUEVO LENGUAJE (POST)
app.post('/api/datos', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const resultado = await db.run(
      'INSERT INTO datos (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || '']
    );
    res.status(201).json({ id: resultado.lastID, nombre, descripcion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ELIMINAR UN LENGUAJE POR ID (DELETE)
app.delete('/api/datos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await db.run('DELETE FROM datos WHERE id = ?', [id]);
    
    if (resultado.changes === 0) {
      return res.status(404).json({ error: 'Lenguaje no encontrado' });
    }
    res.json({ mensaje: 'Eliminado correctamente', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MODIFICAR / ACTUALIZAR UN LENGUAJE POR ID (PUT)
app.put('/api/datos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    
    const resultado = await db.run(
      'UPDATE datos SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion || '', id]
    );

    if (resultado.changes === 0) {
      return res.status(404).json({ error: 'Lenguaje no encontrado' });
    }
    res.json({ mensaje: 'Actualizado correctamente', id, nombre, descripcion });
  } catch (err) {
    console.error('Error detallado en PUT:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// CAMBIO PARA PRODUCCIÓN: Lee la variable de entorno o usa 3001 por defecto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});