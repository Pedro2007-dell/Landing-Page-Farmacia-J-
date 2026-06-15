export default function Sobre() {
  return (
    <div className="container" style={{ padding: '8rem 1.5rem 6rem 1.5rem', minHeight: '60vh', textAlign: 'center' }}>
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-title)', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
          Sobre o Farmácia Já
        </h1>
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