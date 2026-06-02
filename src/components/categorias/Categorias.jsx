import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importa o hook para navegar
import axios from 'axios';
import './Categorias.css';

const API_BASE_URL = 'https://farmacia-ja-api.onrender.com';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicamentos`);
      const medicamentos = response.data.data || response.data;

      const grouped = medicamentos.reduce((acc, med) => {
        const cat = med.categoria || 'Outros';
        if (!acc[cat]) {
          acc[cat] = {
            nome: cat,
            quantidade: 0,
            medicamentos: []
          };
        }
        acc[cat].quantidade += 1;
        acc[cat].medicamentos.push(med);
        return acc;
      }, {});

      const categoriasArray = Object.values(grouped).sort((a, b) => b.quantidade - a.quantidade);

      setCategorias(categoriasArray);
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="categorias-page">
      <div className="container">
        <div className="header-section">
          <h1>Medicamentos por Categoria</h1>
          <h1>Encontre medicamentos organizados por tipo de tratamento.</h1>
        </div>

        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div key={categoria.nome} className="categoria-card">
              <div className="card-header">
                <div className="icon-wrapper">
                  {categoria.nome.toLowerCase().includes('diab') && <span>🩸</span>}
                  {categoria.nome.toLowerCase().includes('hipert') && <span>❤️</span>}
                  {categoria.nome.toLowerCase().includes('asma') && <span>🌬️</span>}
                  {categoria.nome.toLowerCase().includes('mental') && <span>🧠</span>}
                  {categoria.nome.toLowerCase().includes('antib') && <span>💊</span>}
                  {!['diab','hipert','asma','mental','antib'].some(k => categoria.nome.toLowerCase().includes(k)) && <span>💊</span>}
                </div>
                <span className="quantidade">{categoria.quantidade} medicamentos</span>
              </div>

              <h3>{categoria.nome}</h3>
              <p className="descricao"> 
                Medicamentos para tratamento de {categoria.nome.toLowerCase()}
              </p>
              <button 
                className="btn-ver"
                onClick={() => navigate(`/medicamentos?categoria=${encodeURIComponent(categoria.nome)}`)}
              >
                Ver Medicamentos →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}