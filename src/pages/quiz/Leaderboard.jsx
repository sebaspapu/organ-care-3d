import { useEffect, useState } from "react";
import "./Quiz.css";

const Leaderboard = ({ onVolver }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/quiz-leaderboard");
        if (!res.ok) throw new Error("Respuesta no OK del backend");
        const data = await res.json();
        console.log("[Leaderboard] Respuesta del backend:", data);
        if (!data.leaderboard || !Array.isArray(data.leaderboard)) {
          setError("Ranking vacío o malformado");
          console.error("[Leaderboard] Ranking vacío o malformado", data);
        } else if (data.leaderboard.length === 0) {
          setError("No hay datos de ranking disponibles");
          console.warn("[Leaderboard] No hay datos de ranking", data);
        } else {
          setRanking(data.leaderboard);
        }
      } catch (err) {
        setError("Error al cargar el ranking");
        console.error("[Leaderboard] Error al cargar el ranking", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Estilos modernos y coloridos
  const tablaEstilos = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    fontSize: "1.1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  };
  const thEstilos = {
    background: "linear-gradient(90deg, #4f8cff 0%, #38e7b0 100%)",
    color: "#fff",
    padding: "12px",
    border: "none",
    fontWeight: "bold",
    fontSize: "1.1rem",
    letterSpacing: "1px",
    textShadow: "0 1px 2px #0002",
  };
  const tdEstilos = {
    padding: "10px",
    borderBottom: "1px solid #e0e0e0",
    textAlign: "center",
    background: "#fff",
  };
  const trPar = { background: "#f6faff" };
  const trImpar = { background: "#e9f5ff" };
  const cabecera = {
    textAlign: "center",
    color: "#1a237e",
    margin: "20px 0 10px 0",
    letterSpacing: "2px",
    fontWeight: 900,
    background: "linear-gradient(90deg, #4f8cff 0%, #38e7b0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
  const btnEstilos = {
    marginTop: 20,
    background: "#4f8cff", // azul principal
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 24px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px #38e7b033",
    transition: "background 0.2s",
  };

  // SVG de copa colorida
  const CopaSVG = (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        verticalAlign: "middle",
        marginRight: 10,
      }}
    >
      <ellipse cx="19" cy="34" rx="13" ry="3" fill="#b3e5fc" />
      <path
        d="M10 4h18v7c0 6.075-4.925 11-11 11S6 17.075 6 11V4h4z"
        fill="url(#grad1)"
      />
      <path
        d="M28 4h4v7c0 6.075-4.925 11-11 11v-4c6.075 0 11-4.925 11-11V4z"
        fill="#ffd600"
      />
      <rect x="15" y="22" width="8" height="6" rx="3" fill="#90caf9" />
      <rect x="16" y="28" width="6" height="4" rx="2" fill="#1976d2" />
      <defs>
        <linearGradient
          id="grad1"
          x1="6"
          y1="4"
          x2="28"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffd600" />
          <stop offset="1" stopColor="#ff9800" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (loading) return <div>Cargando ranking...</div>;
  if (error)
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>
    );

  return (
    <div
      className="leaderboard-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <h2 style={cabecera}>
        {CopaSVG}
        Ranking General
      </h2>
      <table className="leaderboard-table" style={tablaEstilos}>
        <thead>
          <tr>
            <th style={thEstilos}>Puesto</th>
            <th style={thEstilos}>Nombre</th>
            <th style={thEstilos}>Correo</th>
            <th style={thEstilos}>Puntaje</th>
            <th style={thEstilos}>Progreso (%)</th>
          </tr>
        </thead>
        <tbody>
          {ranking.length > 0 ? (
            ranking.map((user, idx) => (
              <tr
                key={user.userId}
                style={idx % 2 === 0 ? trPar : trImpar}
              >
                <td style={tdEstilos}>{user.rank || idx + 1}</td>
                <td style={tdEstilos}>{user.displayName || "-"}</td>
                <td style={tdEstilos}>{user.email || "-"}</td>
                <td style={tdEstilos}>{user.totalScore}</td>
                <td style={tdEstilos}>{user.percentageCompleted}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay datos de ranking</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="btn-volver"
        onClick={onVolver}
        style={btnEstilos}
      >
        Ir a Enfermedades
      </button>
    </div>
  );
};

export default Leaderboard;
