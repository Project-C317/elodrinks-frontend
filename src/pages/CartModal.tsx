import { useEffect, useState } from "react";
import { Service } from "../services/api";

type GroupedItem = Service & {
  quantity: number;
  type: "service" | "optional";
};

const CartModal = () => {
  const [groupedItems, setGroupedItems] = useState<GroupedItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const groupCartItems = (items: any[]): GroupedItem[] => {
    const grouped: { [key: string]: GroupedItem } = {};
    for (const item of items) {
      const type = item.type || "service";
      const key = `${item._id}-${type}`;
      if (grouped[key]) {
        grouped[key].quantity += 1;
      } else {
        grouped[key] = {
          ...item,
          type,
          quantity: 1,
        };
      }
    }
    return Object.values(grouped);
  };

  const loadCart = () => {
    const storedCart: any[] = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );
    setGroupedItems(groupCartItems(storedCart));
  };

  const removeFromCart = (id: string, type: string = "service") => {
    const storedCart: any[] = JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );
    const index = storedCart.findIndex(
      (item) => item._id === id && (item.type || "service") === type
    );
    if (index !== -1) {
      storedCart.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(storedCart));
      setGroupedItems(groupCartItems(storedCart));
    }
  };

  useEffect(() => {
    loadCart();

    const handleStorageUpdate = () => loadCart();
    window.addEventListener("carrinhoAtualizado", handleStorageUpdate);
    return () => {
      window.removeEventListener("carrinhoAtualizado", handleStorageUpdate);
    };
  }, []);

  return (
    <>
      {/* Ícone de carrinho */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 1000,
        }}
        aria-label="Abrir carrinho"
      >
        <div className="botaoCarrinho" style={{ position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z" />
          </svg>

          {groupedItems.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {groupedItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </div>
      </button>

      {/* Modal do carrinho */}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1001,
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#1a1a1a",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "90%",
              color: "white",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.8rem",
                background: "transparent",
                color: "white",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <h2 style={{ marginBottom: "1rem" }}>Carrinho</h2>
            {groupedItems.length === 0 ? (
              <p>Carrinho vazio</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {groupedItems.map((item) => (
                  <li
                    key={`${item._id}-${item.type}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      backgroundColor: "#333",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                    }}
                  >
                    <span>
                      {item.Name} × {item.quantity}
                    </span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "1rem" }}>
                        R$ {(item.FinalBudget * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id, item.type)}
                        style={{
                          background: "transparent",
                          color: "#f55",
                          fontSize: "1.2rem",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
