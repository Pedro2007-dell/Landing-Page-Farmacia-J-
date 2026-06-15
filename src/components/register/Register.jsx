import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import supabase from "../../supabaseClient"


export default function Register({ setUsuario }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nome.trim() || formData.cpf.replace(/\D/g, "").length !== 11) {
        setError("Preencha seu nome completo e um CPF válido.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setError("Insira um e-mail válido.");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

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

    const userData = {
      nome: formData.nome.trim(),
      cpf: formData.cpf.replace(/\D/g, ""),
      email: formData.email.trim().toLowerCase(),
      senha: formData.senha,
      telefone: formData.telefone || "",
    };

    const { error } = await supabase
      .from('usuarios')
      .insert(userData);

    if (error) {
      setError("Erro ao criar conta. Tente novamente.");
      setLoading(false);
      return;
    }

    setUsuario(userData);
    setLoading(false);
    navigate("/");
  };
  return (
    <section className="register">
      <div className="register-container glass-card">
        <div className="register-header">
          <div className="logo-container">
            <div className="logo-icon">💊</div>
            <div>
              <h2>Farmácia Já</h2>
              <p className="subtitle">SAÚDE PÚBLICA DIGITAL</p>
            </div>
          </div>
          <p className="title">Crie sua conta no Farmácia Já</p>
        </div>

        <div className="progress-bar">
          <div className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
            1
          </div>
          <div className={`step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
            2
          </div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            3
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {step === 1 && (
            <div className="step-content">
              <h3>Dados pessoais</h3>
              <p className="passo-info">Passo 1 de 3</p>

              <div className="input-group">
                <label>Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
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
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="button" className="btn-primary" onClick={nextStep}>
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Contato</h3>
              <p className="passo-info">Passo 2 de 3</p>

              <div className="input-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Telefone (opcional)</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(32) 99999-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                  maxLength="15"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="buttons-group">
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
              <h3>Senha de Acesso</h3>
              <p className="passo-info">Passo 3 de 3</p>

              <div className="input-group">
                <label>Senha</label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Confirmar senha</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  placeholder="Repita a senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="lgpd-info">
                🔒 Seus dados são protegidos pela LGPD e não serão compartilhados com terceiros.
              </div>

              <div className="buttons-group">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={prevStep}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-submit"
                  disabled={loading}
                >
                  {loading ? "Criando conta..." : "Criar minha conta"}
                </button>
              </div>
            </div>
          )}
        </form>
        
        <p className="register-footer">
          Já tem conta? <Link to="/login" className="login-link">Entrar</Link>
        </p>
      </div>
    </section>
  )
}
