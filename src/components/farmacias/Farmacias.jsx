import { useState, useEffect } from 'react';
import './Farmacias.css';
import API_BASE_URL from '../../config/api.js';

export default function Farmacias() {
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bairro, setBairro] = useState('');

  useEffect(() => {
    fetchFarmacias();
  }, []);

  const fetchFarmacias = async (filtroBairro = '') => {
    setLoading(true);
    setError('');
    try {
      let url = `${API_BASE_URL}/farmacias`;
      
      if (filtroBairro) {
        url += `/bairro/${filtroBairro}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setFarmacias(Array.isArray(data) ? data : data.data || []);
      } else {
        setError('Erro ao carregar farmácias do servidor.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor da API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFarmacias(bairro);
  };

  const cleanSearch = () => {
    setBairro('');
    fetchFarmacias('');
  };

  return (
    <div className="farmacias-page">
      <div className="container">
        
        <div className="page-header">
          <h1>Farmácias Conveniadas</h1>
          <p className="subtitle">Encontre pontos de distribuição do SUS e Farmácia Popular próximos a você</p>
        </div>

        <form onSubmit={handleSearch} className="search-bar-form">
          <div className="search-input-wrapper">
            <span className="search-icon">📍</span>
            <input
              type="text"
              placeholder="Buscar por bairro (ex: Centro, Savassi, Copacabana...)"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            {bairro && (
              <button type="button" onClick={cleanSearch} className="btn-clean-input">✕</button>
            )}
          </div>
          <button type="submit" className="btn-search-submit">Buscar</button>
        </form>

        {error && <p className="error-banner">{error}</p>}

        {loading ? (
          <div className="farmacias-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="farmacia-card glass-card skeleton-card">
                <div className="skeleton title-skeleton"></div>
                <div className="skeleton line-skeleton"></div>
                <div className="skeleton line-skeleton"></div>
                <div className="skeleton btn-skeleton" style={{ width: '48%', display: 'inline-block', marginRight: '4%' }}></div>
                <div className="skeleton btn-skeleton" style={{ width: '48%', display: 'inline-block' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="farmacias-grid">
            {farmacias.length > 0 ? (
              farmacias.map((farm) => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(farm.nome + ", " + farm.endereco)}`;
                const cleanPhone = farm.telefone?.replace(/\D/g, '') || '';
                
                return (
                  <div key={farm.id} className="farmacia-card glass-card">
                    <div className="farmacia-header">
                      <h3>{farm.nome}</h3>
                      {farm.ativo ? (
                        <span className="status-badge open">🟢 Aberta</span>
                      ) : (
                        <span className="status-badge closed">🔴 Fechada</span>
                      )}
                    </div>

                    <div className="farmacia-details">
                      <p>
                        <strong>Endereço:</strong>
                        <span>{farm.endereco}</span>
                      </p>
                      <p>
                        <strong>Telefone:</strong>
                        <span>{farm.telefone || 'Não informado'}</span>
                      </p>
                    </div>

                    <div className="farmacia-actions">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-maps"
                      >
                        📍 Ver no Mapa
                      </a>

                      <div className="contact-actions">
                        {farm.telefone ? (
                          <>
                            <a
                              href={`tel:${cleanPhone}`}
                              className="btn-ligar"
                              title="Ligar para farmácia"
                            >
                              📞 Ligar
                            </a>
                            <a
                              href={`https://wa.me/55${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-whatsapp"
                              title="Conversar por WhatsApp"
                            >
                              💬 WhatsApp
                            </a>
                          </>
                        ) : (
                          <span className="no-phone-label">Telefone Indisponível</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="no-results">Nenhuma farmácia cadastrada encontrada para esta região.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}