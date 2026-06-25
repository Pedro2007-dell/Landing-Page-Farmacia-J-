import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Medicamentos.css";

const API_BASE_URL = "https://farmacia-ja-api.onrender.com";

const GET_BULA_INFO = (nome) => {
	const nameLower = nome.toLowerCase();

	if (nameLower.includes("metformina")) {
		return {
			indicacao:
				"Tratamento do diabetes mellitus tipo 2 em adultos e crianças, auxiliando no controle da glicemia.",
			posologia:
				"Geralmente 1 a 2 comprimidos ao dia, ingeridos junto às refeições para evitar desconforto gástrico.",
			contraindicacao:
				"Pessoas com insuficiência renal grave, desidratação ou insuficiência hepática.",
			efeitos:
				"Náuseas, diarreia, dor abdominal e alteração temporária no paladar.",
		};
	}
	if (nameLower.includes("losartana")) {
		return {
			indicacao:
				"Tratamento da hipertensão arterial (pressão alta) e proteção renal em pacientes diabéticos tipo 2.",
			posologia:
				"Comumente 1 comprimido de 50mg uma vez ao dia, de preferência no mesmo horário.",
			contraindicacao:
				"Hipersensibilidade ao componente, insuficiência hepática grave ou gravidez.",
			efeitos: "Tonturas, cansaço, dor de cabeça e tosse seca ocasional.",
		};
	}
	if (nameLower.includes("omeprazol")) {
		return {
			indicacao:
				"Tratamento de gastrite, úlcera gástrica, refluxo gastroesofágico e queimação estomacal.",
			posologia:
				"1 cápsula de 20mg pela manhã, em jejum, pelo menos 30 minutos antes do café da manhã.",
			contraindicacao:
				"Hipersensibilidade ao omeprazol ou a outros benzimidazóis.",
			efeitos: "Dor de cabeça, diarreia, flatulência e náuseas ocasionais.",
		};
	}
	if (nameLower.includes("ibuprofeno")) {
		return {
			indicacao:
				"Alívio de dor de intensidade leve a moderada, redução de estados febris e atividade anti-inflamatória.",
			posologia:
				"1 comprimido a cada 6 ou 8 horas, preferencialmente após as refeições para proteger o estômago.",
			contraindicacao:
				"Úlcera estomacal ativa, insuficiência renal ou cardíaca grave, asma induzida por AAS.",
			efeitos:
				"Azia, náuseas, indigestão, dores abdominais de leve intensidade.",
		};
	}

	return {
		indicacao: `Medicamento utilizado sob indicação clínica para tratamento e controle dos sintomas associados a ${nome}.`,
		posologia:
			"Consumir conforme prescrição médica oficial. Evitar automedicação.",
		contraindicacao:
			"Hipersensibilidade aos componentes da fórmula, gravidez/lactação sem orientação médica.",
		efeitos:
			"Náuseas leves, sonolência ou desconforto abdominal são possíveis reações adversas comuns.",
	};
};

export default function Medicamentos({
	receita,
	adicionarAoReceituario,
	removerDoReceituario,
	atualizarPosologia,
	limparReceituario,
}) {
	const navigate = useNavigate();

	const [medicamentos, setMedicamentos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [activeBula, setActiveBula] = useState(null);

	useEffect(() => {
		fetchMedicamentos();
	}, []);

	const fetchMedicamentos = async (filtroNome = "") => {
		setLoading(true);
		setError("");

		try {
			let url = `${API_BASE_URL}/medicamentos`;

			if (filtroNome) {
				url += `/buscar?nome=${encodeURIComponent(filtroNome)}`;
			}

			const response = await axios.get(url);
			const data = response.data;
			setMedicamentos(data.data || data);
		} catch (err) {
			setError("Erro de conexão com o servidor da API.");
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		fetchMedicamentos(search);
	};

	const openBulaModal = (med) => {
		const info = GET_BULA_INFO(med.nome);
		setActiveBula({
			nome: med.nome,
			principio: med.principio_ativo,
			categoria: med.categoria,
			...info,
		});
	};

	const handleNavigateToPrescription = () => {
		setDrawerOpen(false);
		navigate("/perfil");
	};

	if (loading) return <p>Carregando medicamentos...</p>;
	if (error) return <p className="error-banner">{error}</p>;

	return (
		<div className="medicamentos-page">
			<div className="container">
				<div className="page-header">
					<h1>Medicamentos SUS</h1>
					<p className="subtitle">
						Consulte o catálogo de remédios fornecidos gratuitamente e crie sua
						receita digital
					</p>
				</div>

				<form onSubmit={handleSearch} className="search-bar-form">
					<div className="search-input-wrapper">
						<input
							type="text"
							placeholder="Buscar por nome ou princípio ativo (ex: Dipirona, Losartana...)"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn-search-submit">
						Buscar
					</button>
				</form>

				<div className="medicamentos-grid">
					{medicamentos.length > 0 ? (
						medicamentos.map((med) => {
							const inRecipe = receita.some((item) => item.id === med.id);
							return (
								<div key={med.id} className="medicamento-card glass-card">
									<div className="med-header">
										<h3>{med.nome}</h3>
										<span className="med-tag">{med.categoria}</span>
									</div>

									<div className="med-details">
										<p>
											<strong>Princípio Ativo:</strong>
											<span>{med.principio_ativo}</span>
										</p>
										<p>
											<strong>Dosagem:</strong>
											<span>{med.dosagem}</span>
										</p>
									</div>

									<div className="med-actions">
										<button
											onClick={() => openBulaModal(med)}
											className="btn-bula-trigger"
										>
											Bula Simplificada
										</button>

										{inRecipe ? (
											<button
												onClick={() => removerDoReceituario(med.id)}
												className="btn-add-recipe added"
											>
												Adicionado
											</button>
										) : (
											<button
												onClick={() => adicionarAoReceituario(med)}
												className="btn-add-recipe"
											>
												+ Adicionar
											</button>
										)}
									</div>
								</div>
							);
						})
					) : (
						<p className="no-results">
							Nenhum medicamento encontrado para esta busca.
						</p>
					)}
				</div>
			</div>

			<button
				className="floating-recipe-trigger"
				onClick={() => setDrawerOpen(true)}
			>
				<span>☰</span>
				{receita.length > 0 && (
					<span className="floating-badge">{receita.length}</span>
				)}
			</button>

			{drawerOpen && (
				<div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
					<div
						className="drawer-sidebar glass-card"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="drawer-header">
							<h3>Minha Receita Digital</h3>
							<button
								className="btn-close-drawer"
								onClick={() => setDrawerOpen(false)}
							>
								✕
							</button>
						</div>

						<div className="drawer-body">
							{receita.length > 0 ? (
								<>
									<div className="drawer-meds-list">
										{receita.map((item) => (
											<div key={item.id} className="drawer-med-item glass-card">
												<div className="drawer-med-info">
													<h4>{item.nome}</h4>
													<p>
														{item.principio_ativo} · {item.dosagem}
													</p>
												</div>

												<div className="drawer-med-posologia">
													<label>Frequência / Horário:</label>
													<input
														type="text"
														value={item.posologia || ""}
														onChange={(e) =>
															atualizarPosologia(item.id, e.target.value)
														}
														placeholder="ex: 1 comprimido de 12h em 12h"
													/>
												</div>

												<button
													className="btn-delete-item"
													onClick={() => removerDoReceituario(item.id)}
												>
													Remover
												</button>
											</div>
										))}
									</div>

									<div className="drawer-actions">
										<button
											onClick={handleNavigateToPrescription}
											className="btn-generate-qr"
										>
											Gerar Receita com QR Code
										</button>
										<button
											onClick={limparReceituario}
											className="btn-clear-recipe"
										>
											Limpar Receita
										</button>
									</div>
								</>
							) : (
								<div className="drawer-empty-state">
									<p>Sua receita digital está vazia.</p>
									<p className="subtext">
										Adicione medicamentos clicando no botão "+ Adicionar" nos
										cards da página.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{activeBula && (
				<div className="modal-overlay" onClick={() => setActiveBula(null)}>
					<div
						className="modal-content glass-card"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="modal-header">
							<div>
								<h2>Bula Simplificada</h2>
								<h3>{activeBula.nome}</h3>
							</div>
							<button
								className="btn-close-modal"
								onClick={() => setActiveBula(null)}
							>
								✕
							</button>
						</div>

						<div className="modal-body">
							<div className="bula-section">
								<h4>Para que serve (Indicação):</h4>
								<p>{activeBula.indicacao}</p>
							</div>
							<div className="bula-section">
								<h4>Como tomar (Posologia):</h4>
								<p>{activeBula.posologia}</p>
							</div>
							<div className="bula-section">
								<h4>Quem não deve tomar (Contraindicações):</h4>
								<p>{activeBula.contraindicacao}</p>
							</div>
							<div className="bula-section">
								<h4>Efeitos colaterais comuns:</h4>
								<p>{activeBula.efeitos}</p>
							</div>
						</div>

						<div className="modal-footer">
							<p className="disclaimer">
								* Este informativo não substitui a orientação do seu médico ou
								farmacêutico.
							</p>
							<button
								className="btn-close-modal-footer"
								onClick={() => setActiveBula(null)}
							>
								Entendi
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
