import { useState, useEffect } from "react";
import axios from "axios";
import "./Farmacias.css";

const API_BASE_URL = "https://farmacia-ja-api.onrender.com";

export default function Farmacias() {
	const [farmacias, setFarmacias] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [nome, setNome] = useState("");

	useEffect(() => {
		fetchFarmacias();
	}, []);

	const fetchFarmacias = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await axios.get(`${API_BASE_URL}/farmacias`);
			const data = response.data;
			setFarmacias(data.data);
		} catch (err) {
			setError("Erro de conexão com o servidor da API.");
		} finally {
			setLoading(false);
		}
	};

	const farmaciasFiltradas = farmacias.filter((farm) =>
		farm.nome.toLowerCase().includes(nome.toLowerCase()),
	);

	const cleanSearch = () => {
		setNome("");
	};

	if (loading) return <p>Carregando farmácias...</p>;
	if (error) return <p className="error-banner">{error}</p>;

	return (
		<div className="farmacias-page">
			<div className="container">
				<div className="page-header">
					<h1>Farmácias Conveniadas</h1>
					<p className="subtitle">
						Encontre pontos de distribuição do SUS e Farmácia Popular próximos a
						você
					</p>
				</div>

				<div className="search-bar-form">
					<div className="search-input-wrapper">
						<span className="search-icon">📍</span>
						<input
							type="text"
							placeholder="Buscar por nome (ex: Drogasil, Imperial...)"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
						/>
						{nome && (
							<button
								type="button"
								onClick={cleanSearch}
								className="btn-clean-input"
							>
								✕
							</button>
						)}
					</div>
				</div>

				<div className="farmacias-grid">
					{farmaciasFiltradas.length > 0 ? (
						farmaciasFiltradas.map((farm) => {
							const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(farm.nome + ", " + farm.endereco)}`;
							const cleanPhone = farm.telefone
								? farm.telefone.replace(/\D/g, "")
								: "";
							return (
								<div key={farm.id} className="farmacia-card glass-card">
									<div className="farmacia-header">
										<h3>{farm.nome}</h3>
										{farm.ativo ? (
											<span className="status-badge open">🟢 Aberta</span>
										) : (
											<span className="status-badge closed">🔴 Fechada</span>
										)}
									</div>

									<div className="farmacia-details">
										<p>
											<strong>Endereço:</strong>
											<span>{farm.endereco}</span>
										</p>
										<p>
											<strong>Telefone:</strong>
											<span>{farm.telefone || "Não informado"}</span>
										</p>
									</div>

									<div className="farmacia-actions">
										<a
											href={mapsUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="btn-maps"
										>
											📍 Ver no Mapa
										</a>
										<div className="contact-actions">
											{farm.telefone ? (
												<>
													<a href={`tel:${cleanPhone}`} className="btn-ligar">
														📞 Ligar
													</a>
													<a
														href={`https://wa.me/55${cleanPhone}`}
														target="_blank"
														rel="noopener noreferrer"
														className="btn-whatsapp"
													>
														💬 WhatsApp
													</a>
												</>
											) : (
												<span className="no-phone-label">
													Telefone Indisponível
												</span>
											)}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p className="no-results">
							Nenhuma farmácia encontrada com esse nome.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
