import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./perfil.css";

const API_BASE_URL = "https://farmacia-ja-api.onrender.com";

export default function Perfil({ usuario, setUsuario, receita, removerDoReceituario }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editForm, setEditForm] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    } else {
      setEditForm({
        nome: usuario.nome || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
      });
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  const handleEditToggle = () => {
    setEditing(!editing);
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!editForm.nome.trim()) {
      setError("O nome completo não pode estar em branco.");
      setLoading(false);
      return;
    }

    const updatedData = {
      ...usuario,
      nome: editForm.nome.trim(),
      email: editForm.email.trim(),
      telefone: editForm.telefone.trim(),
    };

    try {
      const token = localStorage.getItem("token");
      if (token && token !== "mock-jwt-token-12345" && token !== "registered-jwt-token") {
        const rawCpf = usuario.cpf.replace(/\D/g, "");
        await axios.patch(`${API_BASE_URL}/usuarios/${rawCpf}`, {
          nome: editForm.nome.trim(),
          email: editForm.email.trim(),
          telefone: editForm.telefone.trim()
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setUsuario(updatedData);
      
      const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
      const cleanCpf = usuario.cpf.replace(/\D/g, "");
      const updatedMockList = mockUsers.map(u => 
        u.cpf.replace(/\D/g, "") === cleanCpf ? { ...u, ...updatedData } : u
      );
      localStorage.setItem("mockUsers", JSON.stringify(updatedMockList));

      setSuccess("✅ Perfil atualizado com sucesso!");
      setEditing(false);
    } catch (err) {
      console.warn("API Profile update failed. Saving locally...", err);
      setUsuario(updatedData);
      
      const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
      const cleanCpf = usuario.cpf.replace(/\D/g, "");
      const updatedMockList = mockUsers.map(u => 
        u.cpf.replace(/\D/g, "") === cleanCpf ? { ...u, ...updatedData } : u
      );
      localStorage.setItem("mockUsers", JSON.stringify(updatedMockList));

      setSuccess("✅ Dados salvos com sucesso (modo simulado).");
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "⚠️ Tem certeza que deseja EXCLUIR sua conta?\nEsta ação é irreversível."
    );

    if (confirmation) {
      try {
        const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
        const cleanCpf = usuario.cpf.replace(/\D/g, "");
        const filtered = mockUsers.filter(u => u.cpf.replace(/\D/g, "") !== cleanCpf);
        localStorage.setItem("mockUsers", JSON.stringify(filtered));
      } catch (err) {
        console.error(err);
      }
      
      setUsuario(null);
      alert("Conta excluída com sucesso.");
      navigate("/");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="perfil-page">
      <div className="container">
        
        <div className="perfil-layout">
          <div className="perfil-card glass-card">
            <div className="profile-header">
              <span className="profile-avatar">👤</span>
              <h2>{usuario.nome}</h2>
              <span className="user-role-badge">CIDADÃO SUS</span>
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="profile-form">
                <div className="input-group">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    value={editForm.nome}
                    onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={editForm.telefone}
                    onChange={(e) => setEditForm({ ...editForm, telefone: e.target.value })}
                  />
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="profile-form-buttons">
                  <button type="button" className="btn-cancel" onClick={handleEditToggle}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">CPF</span>
                  <span className="detail-value">{usuario.cpf}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">E-mail</span>
                  <span className="detail-value">{usuario.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telefone</span>
                  <span className="detail-value">{usuario.telefone || "Não informado"}</span>
                </div>

                {success && <p className="success-message">{success}</p>}

                <div className="profile-actions">
                  <button onClick={handleEditToggle} className="btn-edit">
                    ✏️ Editar Cadastro
                  </button>
                  <button onClick={handleDeleteAccount} className="btn-delete">
                    🗑️ Excluir Conta
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="receita-digital-section">
            <h2 className="section-title">Minha Receita Digital</h2>
            
            <div className="receita-card-printable glass-card" id="printable-area">
              <div className="receita-top">
                <div className="receita-brand">
                  <span className="receita-icon">💊</span>
                  <div>
                    <h3>Farmácia Já</h3>
                    <p>SAÚDE PÚBLICA DIGITAL</p>
                  </div>
                </div>
                <div className="receita-sus-seal">
                  <span>SUS</span>
                </div>
              </div>

              <div className="receita-patient-info">
                <p><strong>Paciente:</strong> {usuario.nome}</p>
                <p><strong>CPF:</strong> {usuario.cpf}</p>
                <p><strong>Emissão:</strong> {new Date().toLocaleDateString("pt-BR")}</p>
              </div>

              <div className="receita-medicamentos-list">
                <h4>Medicamentos Selecionados:</h4>
                {receita.length > 0 ? (
                  <ul>
                    {receita.map((med) => (
                      <li key={med.id} className="receita-med-item">
                        <div className="receita-med-details">
                          <span className="med-name">{med.nome}</span>
                          <span className="med-sub">{med.principio_ativo} · {med.dosagem}</span>
                          <span className="med-posologia">⏱️ {med.posologia || "1 comprimido ao dia"}</span>
                        </div>
                        <button 
                          className="btn-remove-med no-print" 
                          onClick={() => removerDoReceituario(med.id)}
                          title="Remover medicamento"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-receita-text">
                    Nenhum medicamento adicionado à sua receita digital ainda.
                  </p>
                )}
              </div>

              {receita.length > 0 && (
                <div className="receita-footer-printable">
                  <div className="receita-instructions">
                    <h5>Documentos obrigatórios para retirada gratuita no SUS:</h5>
                    <ul>
                      <li>✔ Receita Médica Oficial válida (dentro do prazo)</li>
                      <li>✔ Documento com foto (RG) do titular</li>
                      <li>✔ Cartão do SUS ou CPF</li>
                    </ul>
                  </div>

                  <div className="receita-qrcode-wrapper">
                    <svg className="qrcode-svg" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="none"/>
                      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
                      <rect x="15" y="15" width="10" height="10" fill="white"/>
                      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
                      <rect x="75" y="15" width="10" height="10" fill="white"/>
                      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
                      <rect x="15" y="75" width="10" height="10" fill="white"/>
                      <rect x="35" y="20" width="10" height="40" fill="currentColor"/>
                      <rect x="50" y="30" width="15" height="10" fill="currentColor"/>
                      <rect x="35" y="70" width="40" height="10" fill="currentColor"/>
                      <rect x="45" y="55" width="20" height="10" fill="currentColor"/>
                      <rect x="80" y="45" width="10" height="25" fill="currentColor"/>
                      <rect x="80" y="80" width="10" height="10" fill="currentColor"/>
                    </svg>
                    <span className="qrcode-label">Código: FJ-{usuario.cpf.replace(/\D/g, "").slice(0, 6)}</span>
                  </div>
                </div>
              )}
            </div>

            {receita.length > 0 && (
              <div className="receita-actions-bar">
                <button onClick={handlePrint} className="btn-print">
                  🖨️ Imprimir / Salvar PDF
                </button>
                <p className="print-hint">
                  * Você pode salvar como PDF escolhendo a impressora "Salvar como PDF" do sistema.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
