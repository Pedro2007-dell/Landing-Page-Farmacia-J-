import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Medicamentos.css';
import API_BASE_URL from '../../config/api.js';

const INTERACTION_RULES = [
  {
    drugs: ['ibuprofeno', 'aspirina'],
    severity: 'danger',
    text: 'Risco aumentado de lesões gastrointestinais e sangramento.'
  },
  {
    drugs: ['ibuprofeno', 'losartana'],
    severity: 'warning',
    text: 'Anti-inflamatórios podem reduzir o efeito do anti-hipertensivo Losartana.'
  },
  {
    drugs: ['omeprazol', 'atenolol'],
    severity: 'warning',
    text: 'Omeprazol pode alterar a absorção e aumentar a concentração do Atenolol.'
  },
  {
    drugs: ['paracetamol', 'sinvastatina'],
    severity: 'warning',
    text: 'O uso prolongado ou em doses elevadas pode aumentar o risco de toxicidade hepática.'
  }
];

const GET_BULA_INFO = (nome) => {
  const nameLower = nome.toLowerCase();
  
  if (nameLower.includes('metformina')) {
    return {
      indicacao: 'Tratamento do diabetes mellitus tipo 2 em adultos e crianças, auxiliando no controle da glicemia.',
      posologia: 'Geralmente 1 a 2 comprimidos ao dia, ingeridos junto às refeições para evitar desconforto gástrico.',
      contraindicacao: 'Pessoas com insuficiência renal grave, desidratação ou insuficiência hepática.',
      efeitos: 'Náuseas, diarreia, dor abdominal e alteração temporária no paladar.'
    };
  }
  if (nameLower.includes('losartana')) {
    return {
      indicacao: 'Tratamento da hipertensão arterial (pressão alta) e proteção renal em pacientes diabéticos tipo 2.',
      posologia: 'Comumente 1 comprimido de 50mg uma vez ao dia, de preferência no mesmo horário.',
      contraindicacao: 'Hipersensibilidade ao componente, insuficiência hepática grave ou gravidez.',
      efeitos: 'Tonturas, cansaço, dor de cabeça e tosse seca ocasional.'
    };
  }
  if (nameLower.includes('omeprazol')) {
    return {
      indicacao: 'Tratamento de gastrite, úlcera gástrica, refluxo gastroesofágico e queimação estomacal.',
      posologia: '1 cápsula de 20mg pela manhã, em jejum, pelo menos 30 minutos antes do café da manhã.',
      contraindicacao: 'Hipersensibilidade ao omeprazol ou a outros benzimidazóis.',
      efeitos: 'Dor de cabeça, diarreia, flatulência e náuseas ocasionais.'
    };
  }
  if (nameLower.includes('ibuprofeno')) {
    return {
      indicacao: 'Alívio de dor de intensidade leve a moderada, redução de estados febris e atividade anti-inflamatória.',
      posologia: '1 comprimido a cada 6 ou 8 horas, preferencialmente após as refeições para proteger o estômago.',
      contraindicacao: 'Úlcera estomacal ativa, insuficiência renal ou cardíaca grave, asma induzida por AAS.',
      efeitos: 'Azia, náuseas, indigestão, dores abdominais de leve intensidade.'
    };
  }
  
  return {
    indicacao: `Medicamento utilizado sob indicação clínica para tratamento e controle dos sintomas associados a ${nome}.`,
    posologia: 'Consumir conforme prescrição médica oficial. Evitar automedicação.',
    contraindicacao: 'Hipersensibilidade aos componentes da fórmula, gravidez/lactação sem orientação médica.',
    efeitos: 'Náuseas leves, sonolência ou desconforto abdominal são possíveis reações adversas comuns.'
  };
};

export default function Medicamentos({ receita, adicionarAoReceituario, removerDoReceituario, atualizarPosologia, limparReceituario }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeBula, setActiveBula] = useState(null);
  const [interactions, setInteractions] = useState([]);

  const categoriaFiltro = searchParams.get('categoria') || '';
  const triggerReceitaOpen = searchParams.get('receita') === 'abrir';

  useEffect(() => {
    if (triggerReceitaOpen) {
      setDrawerOpen(true);
      searchParams.delete('receita');
      setSearchParams(searchParams);
    }
  }, [triggerReceitaOpen]);

  useEffect(() => {
    fetchMedicamentos(search, categoriaFiltro);
  }, [categoriaFiltro]);

  useEffect(() => {
    checkInteractions();
  }, [receita]);

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
        setError('Erro ao carregar medicamentos do servidor.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor da API.');
    } finally {
      setLoading(false);
    }
  };

  const checkInteractions = () => {
    const list = [];
    if (receita.length < 2) {
      setInteractions([]);
      return;
    }

    const recipeNames = receita.map(item => item.nome.toLowerCase());
    
    INTERACTION_RULES.forEach((rule) => {
      const matchesAll = rule.drugs.every(drugName => 
        recipeNames.some(name => name.includes(drugName))
      );
      if (matchesAll) {
        list.push(rule);
      }
    });

    setInteractions(list);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedicamentos(search, categoriaFiltro);
  };

  const limparFiltroCategoria = () => {
    searchParams.delete('categoria');
    setSearchParams(searchParams);
  };

  const openBulaModal = (med) => {
    const info = GET_BULA_INFO(med.nome);
    setActiveBula({
      nome: med.nome,
      principio: med.principio_ativo,
      categoria: med.categoria,
      ...info
    });
  };

  const handleNavigateToPrescription = () => {
    setDrawerOpen(false);
    navigate('/perfil');
  };

  return (
    <div className="medicamentos-page">
      <div className="container">
        
        <div className="page-header">
          <h1>Medicamentos SUS</h1>
          <p className="subtitle">Consulte o catálogo de remédios fornecidos gratuitamente e crie sua receita digital</p>
        </div>

        {categoriaFiltro && (
          <div className="active-filter-badge glass-card">
            <span>Filtrando por categoria: <strong>{categoriaFiltro}</strong></span>
            <button onClick={limparFiltroCategoria} className="btn-clear-filter">
              Limpar Filtro ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSearch} className="search-bar-form">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Buscar por nome ou princípio ativo (ex: Dipirona, Losartana...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-search-submit">Buscar</button>
        </form>

        {error && <p className="error-banner">{error}</p>}

        {loading ? (
          <div className="medicamentos-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="medicamento-card glass-card skeleton-card">
                <div className="skeleton title-skeleton"></div>
                <div className="skeleton line-skeleton"></div>
                <div className="skeleton line-skeleton"></div>
                <div className="skeleton btn-skeleton"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="medicamentos-grid">
            {medicamentos.length > 0 ? (
              medicamentos.map((med) => {
                const inRecipe = receita.some(item => item.id === med.id);
                return (
                  <div key={med.id} className="medicamento-card glass-card">
                    <div className="med-header">
                      <h3>{med.nome}</h3>
                      <span className="med-tag">{med.categoria}</span>
                    </div>

                    <div className="med-details">
                      <p>
                        <strong>Princípio Ativo:</strong> 
                        <span>{med.principio_ativo}</span>
                      </p>
                      <p>
                        <strong>Dosagem:</strong> 
                        <span>{med.dosagem}</span>
                      </p>
                    </div>

                    <div className="med-actions">
                      <button 
                        onClick={() => openBulaModal(med)} 
                        className="btn-bula-trigger"
                      >
                        Bula Simplificada
                      </button>

                      {inRecipe ? (
                        <button 
                          onClick={() => removerDoReceituario(med.id)} 
                          className="btn-add-recipe added"
                        >
                          Adicionado
                        </button>
                      ) : (
                        <button 
                          onClick={() => adicionarAoReceituario(med)} 
                          className="btn-add-recipe"
                        >
                          + Adicionar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="no-results">Nenhum medicamento encontrado para esta busca.</p>
            )}
          </div>
        )}
      </div>

      <button 
        className="floating-recipe-trigger" 
        onClick={() => setDrawerOpen(true)}
        title="Ver Receita Digital"
      >
        <span>☰</span>
        {receita.length > 0 && <span className="floating-badge">{receita.length}</span>}
      </button>

      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="drawer-sidebar glass-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="drawer-header">
              <h3>Minha Receita Digital</h3>
              <button className="btn-close-drawer" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <div className="drawer-body">
              {receita.length > 0 ? (
                <>
                  <div className="drawer-meds-list">
                    {receita.map((item) => (
                      <div key={item.id} className="drawer-med-item glass-card">
                        <div className="drawer-med-info">
                          <h4>{item.nome}</h4>
                          <p>{item.principio_ativo} · {item.dosagem}</p>
                        </div>
                        
                        <div className="drawer-med-posologia">
                          <label>Frequência / Horário:</label>
                          <input 
                            type="text" 
                            value={item.posologia || ''} 
                            onChange={(e) => atualizarPosologia(item.id, e.target.value)}
                            placeholder="ex: 1 comprimido de 12h em 12h"
                          />
                        </div>

                        <button 
                          className="btn-delete-item" 
                          onClick={() => removerDoReceituario(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>

                  {interactions.length > 0 && (
                    <div className="interaction-checker-box">
                      <h4>Interações Detectadas!</h4>
                      <div className="interaction-warnings">
                        {interactions.map((inter, i) => (
                          <div key={i} className={`warning-item ${inter.severity}`}>
                            <p>{inter.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="drawer-actions">
                    <button 
                      onClick={handleNavigateToPrescription} 
                      className="btn-generate-qr"
                    >
                      Gerar Receita com QR Code
                    </button>
                    <button 
                      onClick={limparReceituario} 
                      className="btn-clear-recipe"
                    >
                      Limpar Receita
                    </button>
                  </div>
                </>
              ) : (
                <div className="drawer-empty-state">
                  <p>Sua receita digital está vazia.</p>
                  <p className="subtext">Adicione medicamentos clicando no botão "+ Adicionar" nos cards da página.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {activeBula && (
        <div className="modal-overlay" onClick={() => setActiveBula(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Bula Simplificada</h2>
                <h3>{activeBula.nome}</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setActiveBula(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="bula-section">
                <h4>Para que serve (Indicação):</h4>
                <p>{activeBula.indicacao}</p>
              </div>

              <div className="bula-section">
                <h4>Como tomar (Posologia):</h4>
                <p>{activeBula.posologia}</p>
              </div>

              <div className="bula-section">
                <h4>Quem não deve tomar (Contraindicações):</h4>
                <p>{activeBula.contraindicacao}</p>
              </div>

              <div className="bula-section">
                <h4>Efeitos colaterais comuns:</h4>
                <p>{activeBula.efeitos}</p>
              </div>
            </div>

            <div className="modal-footer">
              <p className="disclaimer">
                * Este informativo não substitui a orientação do seu médico ou farmacêutico.
              </p>
              <button className="btn-close-modal-footer" onClick={() => setActiveBula(null)}>
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}