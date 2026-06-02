import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importado o Link para ir ao cadastro
import axios from "axios";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    cpf: "", 
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "https://farmacia-ja-api.onrender.com";
  const api = axios.create({
    baseURL: API_BASE_URL,
  });
  const navigate = useNavigate();

  const fazerLogin = async () => {
    setLoading(true);
    setError("");

    if (formData.senha.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/usuarios/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/"); 
    } catch (erro) {
      setError("Verifique seus dados de login");
    } finally {
      setLoading(false);
    }
  };

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
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
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