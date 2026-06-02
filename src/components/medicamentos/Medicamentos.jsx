import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import './Medicamentos.css';

const API_BASE_URL = 'https://farmacia-ja-api.onrender.com';

export default function Medicamentos() {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  
  const categoriaFiltro = searchParams.get('categoria') || '';

  useEffect(() => {
    fetchMedicamentos(search, categoriaFiltro);
  }, [categoriaFiltro]);

  const fetchMedicamentos = async (filtroNome = '', filtroCategoria = '') => {
    setLoading(true);
    setError('');
    
    try {
      let api = `${API_BASE_URL}/medicamentos`;
      
      if (filtroNome || filtroCategoria) {
        api += `/buscar?`;
        const params = [];
        if (filtroNome) {
          params.push(`nome=${encodeURIComponent(filtroNome)}`);
        }
        if (filtroCategoria) {
          params.push(`categoria=${encodeURIComponent(filtroCategoria)}`);
        }
        api += params.join('&');
      }

      const response = await fetch(api);
      const data = await response.json();

      if (response.ok) {
        setMedicamentos(data.data || data); 
      } else {
        setError('Erro ao carregar medicamentos');
      }
    } catch (err) {
      setError('Erro de conexão com a API');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedicamentos(search, categoriaFiltro);
  };

  const limparFiltroCategoria = () => {
    searchParams.delete('categoria');
    setSearchParams(searchParams);
  };

  return (
    <div className="medicamentos-page">
      <div className="container">
        <h1>Medicamentos</h1>
        <p className="subtitle">Consulte os medicamentos disponíveis no SUS</p>

        {categoriaFiltro && (
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: '#e3f2fd', 
            padding: '10px 15px', 
            borderRadius: '6px', 
            marginBottom: '15px',
            color: '#0d47a1',
            fontWeight: '500'
          }}>
            <span>Filtrando por categoria: <strong>{categoriaFiltro}</strong></span>
            <button 
              onClick={limparFiltroCategoria}
              style={{
                background: 'none',
                border: 'none',
                color: '#d32f2f',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Limpar Filtro ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nome (ex: Dipirona, Paracetamol...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {loading && <p>Carregando medicamentos...</p>}
        {error && <p className="error">{error}</p>}

        <div className="medicamentos-grid">
          {medicamentos.length > 0 ? (
            medicamentos.map((med) => (
              <div key={med.id} className="medicamento-card">
                <h3>{med.nome}</h3>
                <p><strong>Princípio Ativo:</strong> {med.principio_ativo}</p>
                <p><strong>Dosagem:</strong> {med.dosagem}</p>
                <p><strong>Categoria:</strong> {med.categoria}</p>
              </div>
            ))
          ) : (
            !loading && <p>Nenhum medicamento encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}