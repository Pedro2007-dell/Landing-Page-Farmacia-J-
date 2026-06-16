import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Header from "./components/header/Header.jsx";
import Hero from "./components/hero/hero.jsx";
import Register from "./components/register/Register.jsx";
import Medicamentos from "./components/medicamentos/Medicamentos.jsx";
import Farmacias from "./components/farmacias/Farmacias.jsx";
import Categorias from './components/categorias/Categorias.jsx';
import Footer from "./components/Footer/footer.jsx";
import Login from "./components/Login/login.jsx";
import Perfil from "./components/perfil/Perfil.jsx";


function SobrePage() {
  return (
    <div className="container" style={{ padding: '8rem 1.5rem 6rem 1.5rem', minHeight: '60vh', textAlign: 'center' }}>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Sobre o Farmácia Já</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          O <strong>Farmácia Já</strong> é um projeto acadêmico de saúde digital voltado para facilitar o acesso da população aos medicamentos fornecidos gratuitamente ou com desconto pelo Sistema Único de Saúde (SUS).
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Nosso objetivo é integrar informações de estoque, medicamentos disponíveis e farmácias conveniadas ao programa Farmácia Popular, ajudando o cidadão a encontrar o que precisa perto de sua residência de forma rápida, transparente e moderna.
        </p>
      </div>
    </div>
  );
}

function ContatoPage() {
  return (
    <div className="container" style={{ padding: '8rem 1.5rem 6rem 1.5rem', minHeight: '60vh', textAlign: 'center' }}>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Fale Conosco</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Se tiver alguma dúvida sobre o funcionamento da plataforma ou sugestão de melhoria, entre em contato conosco.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '1rem 2rem', width: '100%', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>✉️</span> 
            <strong>E-mail:</strong> <a href="mailto:contato@farmaciaja.gov.br" style={{ color: 'var(--primary-hover)' }}>contato@farmaciaja.gov.br</a>
          </div>
          <div className="glass-card" style={{ padding: '1rem 2rem', width: '100%', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>📞</span> 
            <strong>Telefone:</strong> <a href="tel:08000001234" style={{ color: 'var(--primary-hover)' }}>0800 000 1234</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [receita, setReceita] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('receita') || '[]');
    } catch {
      return [];
    }
  });

  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('usuario') || 'null');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('receita', JSON.stringify(receita));
  }, [receita]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
    }
  }, [usuario]);

  const adicionarAoReceituario = (medicamento) => {
    if (!receita.some(item => item.id === medicamento.id)) {
      setReceita([...receita, { ...medicamento, posologia: '1 comprimido ao dia' }]);
    }
  };

  const removerDoReceituario = (id) => {
    setReceita(receita.filter(item => item.id !== id));
  };

  const atualizarPosologia = (id, posologia) => {
    setReceita(receita.map(item => item.id === id ? { ...item, posologia } : item));
  };

  const limparReceituario = () => {
    setReceita([]);
  };

  return (
    <Router>
      <Header receitaCount={receita.length} usuario={usuario} setUsuario={setUsuario} />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categorias />
          </>
        } />
        <Route path="/cadastro" element={<Register setUsuario={setUsuario} />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/medicamentos" element={
          <Medicamentos 
            receita={receita} 
            adicionarAoReceituario={adicionarAoReceituario} 
            removerDoReceituario={removerDoReceituario}
            atualizarPosologia={atualizarPosologia}
            limparReceituario={limparReceituario}
          />
        } />
        <Route path="/farmacias" element={<Farmacias />} />
        <Route path="/perfil" element={<Perfil usuario={usuario} setUsuario={setUsuario} receita={receita} removerDoReceituario={removerDoReceituario} />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;