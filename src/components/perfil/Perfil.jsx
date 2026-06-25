import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import "./perfil.css";

export default function Perfil({
	usuario,
	setUsuario,
	receita,
	removerDoReceituario,
}) {
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
	}, [usuario]);

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

		try {
			const cpfLimpo = usuario.cpf.replace(/\D/g, "");

			const { error } = await supabase
				.from("usuarios")
				.update({
					nome: editForm.nome.trim(),
					email: editForm.email.trim(),
					telefone: editForm.telefone.trim(),
				})
				.eq("cpf", cpfLimpo);

			if (error) throw error;

			setUsuario({
				...usuario,
				nome: editForm.nome.trim(),
				email: editForm.email.trim(),
				telefone: editForm.telefone.trim(),
			});

			setSuccess("✅ Perfil atualizado com sucesso!");
			setEditing(false);
		} catch (err) {
			setError("Erro ao salvar. Tente novamente.");
		} finally {
			setLoading(false);
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
										onChange={(e) =>
											setEditForm({ ...editForm, nome: e.target.value })
										}
										required
									/>
								</div>

								<div className="input-group">
									<label>E-mail</label>
									<input
										type="email"
										value={editForm.email}
										onChange={(e) =>
											setEditForm({ ...editForm, email: e.target.value })
										}
										required
									/>
								</div>

								<div className="input-group">
									<label>Telefone</label>
									<input
										type="text"
										value={editForm.telefone}
										onChange={(e) =>
											setEditForm({ ...editForm, telefone: e.target.value })
										}
									/>
								</div>

								{error && <p className="error-message">{error}</p>}

								<div className="profile-form-buttons">
									<button
										type="button"
										className="btn-cancel"
										onClick={handleEditToggle}
									>
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
									<span className="detail-value">
										{usuario.telefone || "Não informado"}
									</span>
								</div>

								{success && <p className="success-message">{success}</p>}

								<div className="profile-actions">
									<button onClick={handleEditToggle} className="btn-edit">
										✏️ Editar Cadastro
									</button>
								</div>
							</div>
						)}
					</div>

					<div className="receita-digital-section">
						<h2 className="section-title">Minha Receita Digital</h2>

						<div
							className="receita-card-printable glass-card"
							id="printable-area"
						>
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
								<p>
									<strong>Paciente:</strong> {usuario.nome}
								</p>
								<p>
									<strong>CPF:</strong> {usuario.cpf}
								</p>
								<p>
									<strong>Emissão:</strong>{" "}
									{new Date().toLocaleDateString("pt-BR")}
								</p>
							</div>

							<div className="receita-medicamentos-list">
								<h4>Medicamentos Selecionados:</h4>
								{receita.length > 0 ? (
									<ul>
										{receita.map((med) => (
											<li key={med.id} className="receita-med-item">
												<div className="receita-med-details">
													<span className="med-name">{med.nome}</span>
													<span className="med-sub">
														{med.principio_ativo} · {med.dosagem}
													</span>
													<span className="med-posologia">
														⏱️ {med.posologia || "1 comprimido ao dia"}
													</span>
												</div>
												<button
													className="btn-remove-med no-print"
													onClick={() => removerDoReceituario(med.id)}
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
						</div>

						{receita.length > 0 && (
							<div className="receita-actions-bar">
								<button onClick={handlePrint} className="btn-print">
									🖨️ Imprimir / Salvar PDF
								</button>
								<p className="print-hint">
									* Você pode salvar como PDF escolhendo a impressora "Salvar
									como PDF" do sistema.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
