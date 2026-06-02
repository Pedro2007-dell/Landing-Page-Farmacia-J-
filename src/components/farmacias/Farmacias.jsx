import { useState, useEffect } from 'react';
import './Farmacias.css';

const API_BASE_URL = 'https://farmacia-ja-api.onrender.com';

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
        setError('Erro ao carregar farmácias');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFarmacias(bairro);
  };

  return (
    <div className="farmacias-page">
      <div className="container">
        <h1>Farmácias</h1>
        <p className="subtitle">Encontre farmácias conveniadas próximas a você</p>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Buscar por bairro (ex: Centro, Savassi...)"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {loading && <p className="loading">Carregando farmácias...</p>}
        {error && <p className="error">{error}</p>}

        <div className="farmacias-grid">
          {farmacias.length > 0 ? (
            farmacias.map((farm) => (
              <div key={farm.id} className="farmacia-card">
                <h3>{farm.nome}</h3>
                <p><strong>Telefone:</strong> {farm.telefone ?? 'Não informado'}</p>
                <p><strong>Endereço:</strong> {farm.endereco}</p>
                {farm.ativo && <span className="status">✅ Aberta / Ativa</span>}

                <div className="farmacia-actions">
                  <a
                    href={`tel:${farm.telefone}`}
                    className="btn-ligar"
                  >
                    📞 Ligar
                  </a>
                  <a
                    href={`https://wa.me/55${farm.telefone?.replace(/\D/g, '') ?? ''}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            ))
          ) : (
            !loading && <p>Nenhuma farmácia encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}