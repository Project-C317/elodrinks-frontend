import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserControl() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      ref={menuRef}
      style={{ position: "fixed", top: "16px", right: "16px", zIndex: 1000 }}
    >
      <button
        className="botaoDeslogar"
        onClick={() => setShowMenu(!showMenu)}
        title="Abrir opções"
      >
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

      {showMenu && (
        <div className="botaoDeslogar1">
          <button className="botaoDeslogar2" onClick={() => setShowMenu(false)}>
            Cancelar
          </button>
          <button className="botaoDeslogar4" onClick={handleGoHome}>
             Home
          </button>
          <button className="botaoDeslogar3" onClick={handleLogout}>
            Deslogar
          </button>
        </div>
      )}
    </div>
  );
}
