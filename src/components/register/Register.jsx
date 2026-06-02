import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

const API_BASE_URL = "https://farmacia-ja-api.onrender.com";

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");

    if (name === "cpf") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setFormData({ ...formData, cpf: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem!");
      setLoading(false);
      return;
    }
    if (formData.senha.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/usuarios`, {
        nome: formData.nome.trim(),
        cpf: formData.cpf.replace(/\D/g, ""),
        email: formData.email.trim().toLowerCase(),
        senha: formData.senha,
        telefone: formData.telefone,
        tipo: "cliente",
      });

      alert("✅ Conta criada com sucesso!");
      setFormData({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
      });
      setStep(1);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Erro ao criar conta",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register">
      <div className="register-container">
        <div className="register-header">
          <div className="logo-container">
            <div className="logo-icon">💊</div>
            <div>
              <h2>Farmácia Já</h2>
              <p className="subtitle">SAÚDE PÚBLICA DIGITAL</p>
            </div>
          </div>
          <p className="title">Crie sua conta gratuita no Farmácia Já</p>
        </div>

        <div className="progress-bar">
          <div
            className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
          >
            1
          </div>
          <div
            className={`step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}
          >
            2
          </div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content">
              <h3>Dados pessoais</h3>
              <p className="passo-info">Passo 1 de 3</p>

              <label>Nome completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />

              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                maxLength="14"
                required
              />

              <button type="button" className="btn-primary" onClick={nextStep}>
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Contato</h3>
              <p className="passo-info">Passo 2 de 3</p>

              <label>E-mail</label>
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Telefone (opcional)</label>
              <input
                type="tel"
                name="telefone"
                placeholder="(32) 99999-0000"
                value={formData.telefone}
                onChange={handleChange}
              />

              <div className="buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={prevStep}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={nextStep}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3>Senha</h3>
              <p className="passo-info">Passo 3 de 3</p>

              <label>Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Mínimo 8 caracteres"
                value={formData.senha}
                onChange={handleChange}
                required
              />

              <label>Confirmar senha</label>
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Repita a senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
              />

              {error && <p className="error-message">{error}</p>}

              <div className="lgpd-info">
                Seus dados são protegidos pela LGPD e não serão compartilhados
                com terceiros.
              </div>

              <div className="buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={prevStep}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Criando conta..." : "Criar minha conta"}
                </button>
              </div>
            </div>
          )}
        </form>
          <p> Não tem Conta?
        <Link to="/login" className="login-link">
          Entrar
        </Link>
        </p>
      </div>
    </section>
  );
}
