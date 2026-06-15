import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-container">
        <div className="rodape-grid">
          
          <div className="rodape-marca">
            <div className="rodape-logo">
              <span className="rodape-logo-icone">💊</span>
              <span className="rodape-logo-nome">Farmácia Já</span>
            </div>
            <p className="rodape-descricao">
              Plataforma digital de saúde pública para acesso rápido e moderno a medicamentos do SUS.
            </p>
          </div>

          <div className="rodape-coluna">
            <h4 className="rodape-titulo-coluna">Plataforma</h4>
            <ul className="rodape-lista">
              <li>
                <Link to="/medicamentos">Buscar Medicamentos</Link>
              </li>
              <li>
                <Link to="/farmacias">Localizar Farmácias</Link>
              </li>
              <li>
                <Link to="/perfil">Meu Cadastro</Link>
              </li>
            </ul>
          </div>

          <div className="rodape-coluna">
            <h4 className="rodape-titulo-coluna">Institucional</h4>
            <ul className="rodape-lista">
              <li>
                <Link to="/sobre">Sobre o Projeto</Link>
              </li>
              <li>
                <a href="#privacidade">Política de Privacidade</a>
              </li>
              <li>
                <a href="#acessibilidade">Acessibilidade</a>
              </li>
              <li>
                <a href="#termos">Termos de Uso</a>
              </li>
            </ul>
          </div>

          <div className="rodape-coluna">
            <h4 className="rodape-titulo-coluna">Contato</h4>
            <ul className="rodape-lista">
              <li>
                <a href="mailto:contato@farmaciaja.gov.br" className="contato-link">
                  ✉️ contato@farmaciaja.gov.br
                </a>
              </li>
              <li>
                <a href="tel:08000001234" className="contato-link">
                  📞 0800 000 1234
                </a>
              </li>
              <li>
                <Link to="/contato" className="contato-link">
                  🌐 gov.br/farmaciaja
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="rodape-inferior">
          <p className="rodape-copyright">
            © {new Date().getFullYear()} Farmácia Já — Projeto Acadêmico de Saúde Digital.
          </p>
          <p className="rodape-seguranca">
            <span>🔒 Seguro</span> · <span>♿ Acessível</span> · <span>💚 Gratuito</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
