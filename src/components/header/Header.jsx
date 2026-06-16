import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header({ receitaCount, usuario, setUsuario }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    setUsuario(null);
    navigate("/");
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Farmácia Já - Saúde Pública Digital" className="logo-img" />
        </Link>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span className={`bar ${mobileMenuOpen ? "bar-open" : ""}`}></span>
          <span className={`bar ${mobileMenuOpen ? "bar-open" : ""}`}></span>
          <span className={`bar ${mobileMenuOpen ? "bar-open" : ""}`}></span>
        </button>

        <nav className={`nav ${mobileMenuOpen ? "nav-mobile-open" : ""}`}>
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Início
          </Link>
          <Link to="/medicamentos" className={`nav-link ${location.pathname === "/medicamentos" ? "active" : ""}`}>
            Medicamentos
          </Link>
          <Link to="/farmacias" className={`nav-link ${location.pathname === "/farmacias" ? "active" : ""}`}>
            Farmácias
          </Link>
          <Link to="/sobre" className={`nav-link ${location.pathname === "/sobre" ? "active" : ""}`}>
            Sobre
          </Link>
          <Link to="/contato" className={`nav-link ${location.pathname === "/contato" ? "active" : ""}`}>
            Contato
          </Link>

          <div className="mobile-only-buttons">
            {usuario ? (
              <>
                <Link to="/perfil" className="mobile-btn-profile">
                  👤 Meu Cadastro
                </Link>
                <button onClick={handleLogout} className="mobile-btn-logout">
                  🚪 Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-btn-login">
                  Entrar
                </Link>
                <Link to="/cadastro" className="mobile-btn-cadastro">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="header-actions">
          <Link to="/medicamentos?receita=abrir" className="btn-receita-indicator" title="Ver Receita Digital">
            <span className="indicator-icon">📋</span>
            <span className="indicator-label">Receita</span>
            {receitaCount > 0 && (
              <span className="badge-pulse">{receitaCount}</span>
            )}
          </Link>

          {usuario ? (
            <div className="user-profile-menu">
              <Link to="/perfil" className="btn-profile" title="Meu Cadastro">
                <span className="avatar">👤</span>
                <span className="user-name">Olá, {usuario.nome.split(" ")[0]}</span>
              </Link>
              <button onClick={handleLogout} className="btn-logout" title="Sair">
                🚪
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Entrar
              </Link>
              <Link to="/cadastro" className="btn-cadastro">
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}