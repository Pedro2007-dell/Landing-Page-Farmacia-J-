import { useState } from "react";
import { Link } from "react-router-dom";
import "./hero.css";

const MEDICAMENTOS_PRECOS = [
  { id: 1, nome: "Metformina 500mg (Diabetes)", precoComercial: 18.50 },
  { id: 2, nome: "Losartana Potássica 50mg (Hipertensão)", precoComercial: 22.90 },
  { id: 3, nome: "Omeprazol 20mg (Estômago)", precoComercial: 28.00 },
  { id: 4, nome: "Atenolol 50mg (Cardíaco)", precoComercial: 19.50 },
  { id: 5, nome: "Hidroclorotiazida 25mg (Pressão)", precoComercial: 12.00 },
  { id: 6, nome: "Salbutamol 100mcg (Asma/Inalador)", precoComercial: 48.90 },
  { id: 7, nome: "Sinvastatina 20mg (Colesterol)", precoComercial: 26.50 },
  { id: 8, nome: "Ibuprofeno 600mg (Anti-inflamatório)", precoComercial: 15.00 }
];

export default function Hero() {
  const [selectedMeds, setSelectedMeds] = useState([]);
  
  const handleToggleMed = (med) => {
    if (selectedMeds.some(item => item.id === med.id)) {
      setSelectedMeds(selectedMeds.filter(item => item.id !== med.id));
    } else {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

  const economiaMensal = selectedMeds.reduce((sum, med) => sum + med.precoComercial, 0);
  const economiaAnual = economiaMensal * 12;

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        <div className="hero-flex-wrapper">
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
              conveniadas de forma rápida, segura e acessível.
            </p>

            <div className="action-buttons">
              <Link to="/medicamentos" className="btn-primary-hero">
                <span>💊</span> Buscar Medicamentos
              </Link>
              <Link to="/farmacias" className="btn-secondary-hero">
                <span>📍</span> Localizar Farmácias
              </Link>
            </div>
          </div>

          <div className="hero-card glass-card">
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
                <p className="big-number">150+</p>
                <p className="stat-name">Medicamentos</p>
              </div>
              <div className="stat-box">
                <p className="big-number">45</p>
                <p className="stat-name">Farmácias</p>
              </div>
              <div className="stat-box">
                <p className="big-number">100%</p>
                <p className="stat-name">Gratuito</p>
              </div>
            </div>
          </div>
        </div>

        <div className="simulator-wrapper glass-card">
          <div className="simulator-header">
            <span className="simulator-icon">💰</span>
            <div>
              <h2 className="simulator-title">Simulador de Economia SUS</h2>
              <p className="simulator-desc">
                Selecione os medicamentos que você toma e veja quanto economiza por mês ao retirá-los gratuitamente no SUS!
              </p>
            </div>
          </div>

          <div className="simulator-grid">
            <div className="simulator-checklist">
              <p className="section-subtitle">Medicamentos Comuns Disponíveis:</p>
              <div className="meds-checklist-grid">
                {MEDICAMENTOS_PRECOS.map((med) => {
                  const isChecked = selectedMeds.some(item => item.id === med.id);
                  return (
                    <label 
                      key={med.id} 
                      className={`checklist-item glass-card ${isChecked ? "item-checked" : ""}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleToggleMed(med)}
                        className="med-checkbox"
                      />
                      <div className="med-checkbox-info">
                        <span className="med-checkbox-name">{med.nome}</span>
                        <span className="med-checkbox-price">Preço Médio: R$ {med.precoComercial.toFixed(2)}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="simulator-results glass-card">
              <h3 className="results-title">Sua Economia Estimada</h3>
              
              <div className="results-gauges">
                <div className="gauge-item">
                  <span className="gauge-label">Por Mês</span>
                  <div className="gauge-value-wrapper">
                    <span className="currency">R$</span>
                    <span className="gauge-value glow-green">{economiaMensal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="gauge-item highlight-blue">
                  <span className="gauge-label">Por Ano</span>
                  <div className="gauge-value-wrapper">
                    <span className="currency">R$</span>
                    <span className="gauge-value glow-blue">{economiaAnual.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {selectedMeds.length > 0 ? (
                <div className="results-feedback success-pulse">
                  🎉 Com o **Farmácia Já**, você economiza **R$ {economiaMensal.toFixed(2)}** todos os meses! O SUS garante o seu direito à saúde.
                </div>
              ) : (
                <div className="results-feedback">
                  💡 Selecione um ou mais medicamentos ao lado para calcular a economia.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
