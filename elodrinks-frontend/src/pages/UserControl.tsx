import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserControl() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{ position: "fixed", top: "16px", right: "16px", zIndex: 1000 }}
    >
      {/* Botão principal (ícone) */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        title="Abrir opções"
      >
        {/* Ícone SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
        </svg>
      </button>

      {/* Menu suspenso */}
      {showMenu && (
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            position: "absolute",
            right: 0,
          }}
        >
          {" "}
          <button
            onClick={() => setShowMenu(false)}
            style={{
              padding: "8px 20px",
              background: "#101820",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 10px",
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Deslogar ✖
          </button>
        </div>
      )}
    </div>
  );
}
