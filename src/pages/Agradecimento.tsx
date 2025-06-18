
import { useNavigate } from "react-router-dom";

export default function Agradecimento() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: "#101820",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>AGRADECEMOS A SOLICITAÇÃO</h2>
      <img src="/logo.svg" alt="Logo Elo Drinks" style={{ width: "80px", marginBottom: "1rem" }} />
      <p style={{ marginBottom: "2rem" }}>Em breve entraremos em contato!</p>

      <button
        onClick={() => navigate("/Home")}
        style={{
          backgroundColor: "#6e5b45",
          color: "white",
          padding: "0.6rem 1.8rem",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Home
      </button>
    </div>
  );
}


