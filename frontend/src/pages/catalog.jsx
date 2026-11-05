import { useEffect, useState } from 'react';
import VueWrapper from '../components/VueWrapper'; // Importa el wrapper de Vue
import '../css/catalog.css';

export default function Catalog() {
  const [lenguajes, setLenguajes] = useState([]);

  // Estados para manejar la edición inline de una tarjeta
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEdit, setNombreEdit] = useState('');
  const [descEdit, setDescEdit] = useState('');

  // Función para cargar los datos del backend
  const cargarDatos = () => {
    fetch('http://localhost:3001/api/datos')
      .then((res) => res.json())
      .then((data) => setLenguajes(data))
      .catch((err) => console.error('Error al cargar los datos:', err));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Función para Eliminar un lenguaje
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este lenguaje?')) {
      fetch(`http://localhost:3001/api/datos/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setLenguajes(lenguajes.filter((lang) => lang.id !== id));
          } else {
            alert('No se pudo eliminar el registro.');
          }
        })
        .catch((err) => console.error('Error al eliminar:', err));
    }
  };

  // Función para activar el modo de edición en una tarjeta
  const handleStartEdit = (lang) => {
    setEditandoId(lang.id);
    setNombreEdit(lang.nombre);
    setDescEdit(lang.descripcion || '');
  };

  // Función para guardar los cambios (PUT)
  const handleSaveEdit = (id) => {
    fetch(`http://localhost:3001/api/datos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreEdit, descripcion: descEdit }),
    })
      .then((res) => {
        if (res.ok) {
          setEditandoId(null);
          cargarDatos();
        } else {
          alert('Error al actualizar el registro.');
        }
      })
      .catch((err) => console.error('Error al actualizar:', err));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Catálogo de Lenguajes</h2>

      {/* Módulo híbrido de Vue arriba del catálogo */}
      <div className="mb-5">
        <VueWrapper />
      </div>

      <div className="row g-4">
        {lenguajes.length > 0 ? (
          lenguajes.map((lang) => (
            <div key={lang.id} className="col-md-4">
              <div className="card lang-card shadow-sm h-100 d-flex flex-column justify-content-between">
                <div className="card-body">
                  {editandoId === lang.id ? (
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={nombreEdit}
                        onChange={(e) => setNombreEdit(e.target.value)}
                        placeholder="Nombre del lenguaje"
                      />
                      <textarea
                        className="form-control mb-2"
                        rows="2"
                        value={descEdit}
                        onChange={(e) => setDescEdit(e.target.value)}
                        placeholder="Descripción"
                      ></textarea>
                      <button
                        className="btn btn-sm btn-success me-2 px-3"
                        onClick={() => handleSaveEdit(lang.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-sm btn-secondary px-3"
                        onClick={() => setEditandoId(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <h5 className="card-title mb-3">{lang.nombre}</h5>
                      <p className="card-text">
                        {lang.descripcion || 'Sin descripción disponible.'}
                      </p>
                    </>
                  )}
                </div>

                {editandoId !== lang.id && (
                  <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between pb-3 px-3">
                    <button
                      className="btn btn-outline-warning btn-sm px-3"
                      onClick={() => handleStartEdit(lang)}
                    >
                      Modificar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm px-3"
                      onClick={() => handleDelete(lang.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted py-5">
            <p className="fs-5">No hay lenguajes registrados en la base de datos o el servidor backend no responde.</p>
          </div>
        )}
      </div>
    </div>
  );
}