
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../services/api";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(data);
  }, []);

  const removerItem = (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    window.dispatchEvent(new Event("carrinhoAtualizado")); // Atualiza o ícone no header
  };

  const finalizarOrcamento = () => {
    localStorage.removeItem("carrinho");
    window.dispatchEvent(new Event("carrinhoAtualizado")); // Atualiza o ícone no header
    navigate("/agradecimento");
  };

  const totalGeral = carrinho.reduce((acc, item) => acc + item.FinalBudget, 0);

  if (carrinho.length === 0) {
    return (
        <div
        style={{
            backgroundColor: "#101820",
            minHeight: "100vh",
            color: "white",
            textAlign: "center",
            paddingTop: "2rem",
        }}
        >
        <h2>CARRINHO</h2>
        <p>Nenhum serviço selecionado.</p>

        <button
            onClick={() => navigate("/home")}
            style={{
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            backgroundColor: "#c49b66",
            color: "#101820",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            }}
        >
            Voltar
        </button>
        </div>
    );
    }


  return (
    <div style={{ background: "#101820", minHeight: "100vh", color: "white", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>CARRINHO</h2>

      {carrinho.map((servico, index) => (
        <div key={index} style={{ marginBottom: "2rem", borderBottom: "1px solid #fff", paddingBottom: "1rem" }}>
          <p><strong>{servico.Name}</strong></p>
          <p>Preço base: R$ {servico.BasePrice.toFixed(2)}</p>
          <p>Custo por cliente: R$ {servico.CostPerClient.toFixed(2)}</p>
          <p>Quantidade de clientes: {servico.ClientQuantity}</p>
          <p>Pagamento inicial: R$ {servico.DownPayment.toFixed(2)}</p>
          <p>Data: {new Date(servico.EventDate).toLocaleDateString("pt-BR")}</p>
          <p>Duração: {servico.EventDuration} horas</p>
          <p><strong>Orçamento final: R$ {servico.FinalBudget.toFixed(2)}</strong></p>
          <p>Pagamento final: R$ {servico.FinalPayment.toFixed(2)}</p>

          <button
            onClick={() => removerItem(index)}
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Remover
          </button>
        </div>
      ))}

      <h3 style={{ textAlign: "center" }}>Total geral: R$ {totalGeral.toFixed(2)}</h3>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <button
          onClick={finalizarOrcamento}
          style={{
            backgroundColor: "#c49b66",
            color: "#101820",
            padding: "0.8rem 2rem",
            borderRadius: "6px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Finalizar orçamento
        </button>
      </div>
    </div>
  );
}
