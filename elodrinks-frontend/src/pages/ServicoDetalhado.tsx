import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

interface OptionalItem {
  _id: string;
  Name: string;
  PricePerUnit: number;
  Quantity: number;
  IndividualPrice: number;
}

interface Servico {
  _id: string;
  Name: string;
  BasePrice: number;
  CostPerClient: number;
  ClientQuantity: number;
  EventDuration: number;
  EventDate: string;
  optionalItems: OptionalItem[];
  FinalBudget: number;
  DownPayment: number;
  FinalPayment: number;
}

export default function ServicoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servico, setServico] = useState<Servico | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/services/${id}`)
      .then((res) => setServico(res.data))
      .catch((err) => console.error("Erro ao buscar serviço:", err));
  }, [id]);

  if (!servico) return <p style={{ textAlign: "center" }}>Carregando...</p>;

  const handleAdicionarCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(servico);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    toast.success("Serviço adicionado ao carrinho!", {
      autoClose: 2000,
      onClose: () => navigate("/carrinho"),
    });
  };

  return (
    <div style={estilos.container}>
      <h2 style={estilos.titulo}>{servico.Name}</h2>

      <div style={estilos.infoContainer}>
        <p><strong>Data:</strong> {new Date(servico.EventDate).toLocaleDateString()}</p>
        <p><strong>Duração:</strong> {servico.EventDuration}h</p>
        <p><strong>Nº de Clientes:</strong> {servico.ClientQuantity}</p>
        <p><strong>Preço Base:</strong> R$ {servico.BasePrice.toLocaleString()}</p>
        <p><strong>Custo por Cliente:</strong> R$ {servico.CostPerClient.toLocaleString()}</p>
        <p><strong>Valor Total:</strong> R$ {servico.FinalBudget.toLocaleString()}</p>
      </div>

      <h3>Itens Opcionais:</h3>
      <ul>
        {servico.optionalItems?.map((item) => (
          <li key={item._id}>
            {item.Name} — R$ {item.IndividualPrice.toLocaleString()} (x{item.Quantity})
          </li>
        ))}
      </ul>

      <button onClick={handleAdicionarCarrinho} style={estilos.botao}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

const estilos = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  titulo: {
    fontSize: "28px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: "1rem",
    lineHeight: "1.6",
  },
  botao: {
    marginTop: "2rem",
    padding: "12px 24px",
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
