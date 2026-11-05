import { Link } from 'react-router-dom';
import '../css/home.css'; // Importa el CSS independiente para el Inicio
import VueWrapper from '../components/VueWrapper'; // Módulo interactivo de Vue.js

export default function Home() {
  return (
    <div className="home-container container py-5">
      {/* Sección principal o Hero con diseño moderno */}
      <div className="hero-card p-5 mb-5 text-center position-relative overflow-hidden shadow-lg">
        <div className="hero-content position-relative z-1">
          <span className="badge-pill mb-3 d-inline-block px-3 py-1 rounded-pill fw-semibold">
            🚀 Plataforma de Desarrollo
          </span>
          <h1 className="display-4 fw-bold text-dark mb-3">
            Explora el Mundo del <span className="text-gradient">Código</span>
          </h1>
          <p className="col-lg-8 fs-5 mx-auto text-secondary mb-4">
            Descubre información detallada sobre los lenguajes de programación más populares de la industria tecnológica actual.
          </p>
          <Link to="/catalog" className="btn btn-custom-primary btn-lg px-4 py-2 shadow-sm">
            Ver Catálogo
          </Link>
        </div>
      </div>

      {/* Módulo integrado de Vue.js */}
      <div className="vue-wrapper-container mt-4">
        <VueWrapper />
      </div>
    </div>
  );
}