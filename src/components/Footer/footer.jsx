import './Footer.css';

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
              Plataforma digital de saúde pública para acesso a medicamentos do SUS.
            </p>
          </div>

          <div className="rodape-coluna">
            <h4 className="rodape-titulo-coluna">Plataforma</h4>
            <ul className="rodape-lista">
              <li><a href="#">Buscar Medicamentos</a></li>
              <li><a href="#">Localizar Farmácias</a></li>
              <li><a href="#">Meu Cadastro</a></li>
              <li><a href="#">Dashboard</a></li>
            </ul>
          </div>

          <div className="rodape-coluna">
            <h4 className="rodape-titulo-coluna">Institucional</h4>
            <ul className="rodape-lista">
              <li><a href="#">Sobre o Projeto</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Acessibilidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </div>

          <div className="rodape-coluna">
            <h4 className="rodape-titulo-coluna">Contato</h4>
            <ul className="rodape-lista">
              <li><a href="mailto:contato@farmaciaja.gov.br">✉️ contato@farmaciaja.gov.br</a></li>
              <li><a href="tel:08000001234">📞 0800 000 1234</a></li>
              <li><a href="#">🌐 gov.br/farmaciaja</a></li>
            </ul>
          </div>

        </div>

        <div className="rodape-inferior">
          <p className="rodape-copyright">
            © 2025 Farmácia Já — Projeto Acadêmico de Saúde Digital.
          </p>
          <p className="rodape-seguranca">
            🔒 Seguro · Acessível · Gratuito
          </p>
        </div>
      </div>
    </footer>
  );
}