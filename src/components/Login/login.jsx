import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import supabase from "../../supabaseClient";

export default function Login({ setUsuario }) {
  const [formData, setFormData] = useState({
    cpf: "", 
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fazerLogin = async () => {
    setLoading(true);
    setError("");

    if (formData.senha.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      setLoading(false);
      return;
    }

    const cpfLimpo = formData.cpf.replace(/\D/g, "");

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('cpf', cpfLimpo)
      .eq('senha', formData.senha)
      .single();

    if (error || !data) {
      setError("CPF ou senha incorretos.");
      setLoading(false);
      return;
    }

    setUsuario(data);
    setLoading(false);
    navigate("/");
  };

    const formatarCPF = (valor) =>
    valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">💊</div>
          <h2>Acesse sua conta</h2>
          <p>Insira seu CPF e senha para entrar no sistema.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="login-form">
          <div className="input-group">
            <label htmlFor="cpf">CPF</label>
            <input
              onChange={(e) => setFormData({ ...formData, cpf: formatarCPF( e.target.value )})}
              type="text" 
              name="cpf"
              id="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf} 
              maxLength="14"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              type="password"
              name="Senha"
              id="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="button" 
            className="btn-login" 
            onClick={fazerLogin}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Fazer Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
}