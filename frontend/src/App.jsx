import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AddLanguage from './pages/AddLanguage';

export default function App() {
  return (
    <Router>
      {/* Barra de Navegación común para todas las páginas */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">DevLanguages</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Inicio</Link>
            <Link className="nav-link" to="/catalog">Catálogo</Link>
            <Link className="nav-link" to="/add">Añadir</Link>
          </div>
        </div>
      </nav>

      {/* Enrutador principal que carga cada página independientemente */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/add" element={<AddLanguage />} />
      </Routes>
    </Router>
  );
}