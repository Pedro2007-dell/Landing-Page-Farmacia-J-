import { Link } from "react-router-dom";
import "./hero.css";
export default function hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="badge">
            <span className="green-dot"></span>
            Sistema SUS Digital • Online
          </div>

          <h1 className="hero-title">
            Encontre medicamentos e farmácias do SUS com{" "}
            <span className="highlight">facilidade.</span>
          </h1>

          <p className="hero-subtitle">
            Acesse informações sobre medicamentos, categorias e farmácias
            conveniadas
            <br />
            de forma rápida, segura e acessível.
          </p>

          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Ex: Metformina, Losartana, Omeprazol..."
                className="search-input"
              />
              <Link to="/Medicamentos" className="btn-search" style={{ textDecoration: 'none' }}> Buscar
              </Link>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/Medicamentos" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>💊</span> Buscar Medicamento
            </Link>
            <Link to="/farmacias" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>📍</span> Localizar Farmácia
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-header">
            <div className="medicine-info">
              <span className="check-icon">✅</span>
              <div>
                <p className="medicine-name">Metformina 500mg</p>
                <p className="medicine-desc">Biguanida • Antidiabético</p>
              </div>
            </div>
            <span className="status-badge">Disponível</span>
          </div>

          <div className="card-stats">
            <div className="stat-item">
              <p className="stat-label">Farmácias próximas</p>
              <p className="stat-value">12</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Distância mín.</p>
              <p className="stat-value">0,4 km</p>
            </div>
          </div>

          <div className="general-stats">
            <div className="stat-box">
              <p className="big-number">15.482</p>
              <p className="stat-name">Medicamentos</p>
            </div>
            <div className="stat-box">
              <p className="big-number">8.930</p>
              <p className="stat-name">Farmácias</p>
            </div>
            <div className="stat-box">
              <p className="big-number">142</p>
              <p className="stat-name">Cidades</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
