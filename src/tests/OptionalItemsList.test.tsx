import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Cardapio from "../pages/OptionalItemsList";
import { optionalApi } from "../services/api";

// Mock do optionalApi.getAllOptionalItems
jest.mock("../services/api", () => ({
  optionalApi: {
    getAllOptionalItems: jest.fn(),
  },
}));

// Mock para alert do browser
window.alert = jest.fn();

describe("Cardapio component", () => {
  const mockItems = [
    {
      _id: "1",
      Name: "Caipirinha Tradicional",
      PricePerUnit: 10,
      Quantity: 1,
      IndividualPrice: 10,
      Category: "bar de caipirinhas",
    },
    {
      _id: "2",
      Name: "Caipirinha Morango",
      PricePerUnit: 12,
      Quantity: 1,
      IndividualPrice: 12,
      Category: "bar de caipirinhas",
    },
    {
      _id: "3",
      Name: "Drink Especial 1",
      PricePerUnit: 15,
      Quantity: 1,
      IndividualPrice: 15,
      Category: "drink especial",
    },
  ];

  beforeEach(() => {
    (optionalApi.getAllOptionalItems as jest.Mock).mockResolvedValue({
      data: mockItems,
    });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("deve abrir modal e exibir itens filtrados ao clicar na categoria", async () => {
    render(<Cardapio />);

    // Clica na categoria 'bar de caipirinhas'
    const categoryDiv = screen.getByText(/bar de caipirinhas/i);
    fireEvent.click(categoryDiv);

    // Aguarda os itens serem carregados (loading false)
    await waitFor(() =>
      expect(optionalApi.getAllOptionalItems).toHaveBeenCalled()
    );

    // Verifica se modal abriu com itens filtrados pela categoria
    expect(screen.getByText(/Caipirinha Tradicional/i)).toBeInTheDocument();
    expect(screen.getByText(/Caipirinha Morango/i)).toBeInTheDocument();
    // Deve não conter itens de outra categoria
    expect(screen.queryByText(/Drink Especial 1/i)).not.toBeInTheDocument();
  });

  it("deve adicionar item ao carrinho no localStorage e mostrar alerta", async () => {
    render(<Cardapio />);

    // Abrir modal na categoria "drink especial"
    fireEvent.click(screen.getByText(/drink especial/i));

    // Espera a chamada da API para carregar os itens do modal
    await waitFor(() =>
      expect(optionalApi.getAllOptionalItems).toHaveBeenCalled()
    );

    // Espera o botão "Selecionar serviço" aparecer no modal
    const addButton = await screen.findByRole("button", {
      name: /Adicionar/i,
    });

    fireEvent.click(addButton);

    // Verifica se alert foi chamado
    expect(window.alert).toHaveBeenCalledWith(
      "Serviço adicionado ao carrinho!"
    );

    // Verifica se localStorage foi atualizado com o item correto
    const storedCart = JSON.parse(localStorage.getItem("carrinho") || "[]");
    expect(storedCart.length).toBe(1);
    expect(storedCart[0]).toMatchObject({
      Name: "Drink Especial 1",
      type: "optional",
      FinalBudget: 15,
    });
  });

  it("deve fechar o modal e limpar estados", async () => {
    render(<Cardapio />);
    fireEvent.click(screen.getByText(/drink especial/i));
    await waitFor(() =>
      expect(optionalApi.getAllOptionalItems).toHaveBeenCalled()
    );

    // Supondo que tenha um botão de fechar modal com texto ou aria-label
    const closeButton = screen.getByRole("button", { name: /fechar/i });
    fireEvent.click(closeButton);

    // Modal fechado: os itens e categoria devem estar limpos
    expect(screen.queryByText(/Drink Especial 1/i)).not.toBeInTheDocument();
  });
});
