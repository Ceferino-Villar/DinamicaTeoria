import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/add.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://dinamicateoria-production.up.railway.app';

export default function AddLanguage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!descripcion.trim()) {
      setError('La descripción es obligatoria.');
      return;
    }

    try {
      const resGet = await fetch(`${API_URL}/api/datos`);
      const lenguajesExistentes = await resGet.json();

      const yaExiste = lenguajesExistentes.some(
        (lang) => lang.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()
      );

      if (yaExiste) {
        setError(`El lenguaje "${nombre}" ya se encuentra registrado en el catálogo.`);
        return;
      }

      const resPost = await fetch(`${API_URL}/api/datos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), descripcion: descripcion.trim() })
      });

      if (resPost.ok) {
        navigate('/catalog');
      } else {
        setError('Hubo un error al guardar en la base de datos.');
      }
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card form-container shadow-sm p-4">
            <h3 className="mb-4 text-center">Registrar Nuevo Lenguaje</h3>

            {error && <div className="alert alert-danger mb-4" role="alert">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreLang" className="form-label">Nombre del Lenguaje</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nombreLang" 
                  placeholder="Ej. TypeScript" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="descLang" className="form-label">Descripción</label>
                <textarea 
                  className="form-control" 
                  id="descLang" 
                  rows="3" 
                  placeholder="Breve descripción..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">Guardar Lenguaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}