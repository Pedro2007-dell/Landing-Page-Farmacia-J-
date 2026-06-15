export default function Contato() {
  return (
    <div className="container" style={{ padding: '8rem 1.5rem 6rem 1.5rem', minHeight: '60vh', textAlign: 'center' }}>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
          Fale Conosco
        </h1>
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