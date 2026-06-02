import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">💊</div>
          <div>
            <h1 className="logo-title">Farmácia Já</h1>
            <p className="logo-subtitle">SAÚDE PÚBLICA DIGITAL</p>
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Início
          </Link>
          <Link to="/medicamentos" className="nav-link">
            Medicamentos
          </Link>
          <Link to="/farmacias" className="nav-link">
            Farmácias
          </Link>
          <Link to="/sobre" className="nav-link">
            Sobre
          </Link>
          <Link to="/contato" className="nav-link">
            Contato
          </Link>
        </nav>

        <div className="buttons">
          {/* As classes de botão agora são aplicadas diretamente nas tags Link */}
          <Link to="/login" className="btn-outline">
            Entrar
          </Link>
          <Link to="/cadastro" className="btn-primary">
            Cadastrar
          </Link>
        </div>
      </div>
    </header>
  );
}