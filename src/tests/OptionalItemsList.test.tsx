import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { Cardapio } from "../pages/OptionalItemsList";
import { optionalApi } from "../services/api";

jest.mock("../services/api");

describe("Cardapio Component", () => {
  const mockItems = [
    {
      _id: "1",
      Name: "Item 1",
      PricePerUnit: 10,
      Quantity: 5,
      IndividualPrice: 50,
    },
    {
      _id: "2",
      Name: "Item 2",
      PricePerUnit: 20,
      Quantity: 2,
      IndividualPrice: 40,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("abre modal e carrega itens ao clicar", async () => {
    (optionalApi.getAllOptionalItems as jest.Mock).mockResolvedValue({
      data: mockItems,
    });

    render(<Cardapio />);

    const clickArea = screen.getAllByRole("heading", { level: 3 })[0]
      .parentElement!;
    fireEvent.click(clickArea);

    // Escopa especificamente o título do modal
    const modal = await screen.findByRole("dialog", {
      name: /modal de drinks/i,
    });
    expect(within(modal).getByText("CARDÁPIO")).toBeInTheDocument();

    await waitFor(() => {
      mockItems.forEach((item) => {
        expect(screen.getByText(item.Name)).toBeInTheDocument();
      });
    });

    expect(optionalApi.getAllOptionalItems).toHaveBeenCalledTimes(1);
  });

  test("fecha modal e limpa itens ao fechar", async () => {
    (optionalApi.getAllOptionalItems as jest.Mock).mockResolvedValue({
      data: mockItems,
    });

    render(<Cardapio />);

    const clickArea = screen.getAllByRole("heading", { level: 3 })[0]
      .parentElement!;
    fireEvent.click(clickArea);

    await waitFor(() => {
      expect(screen.getByText(mockItems[0].Name)).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /fechar/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      mockItems.forEach((item) => {
        expect(screen.queryByText(item.Name)).not.toBeInTheDocument();
      });
    });
  });

  test("mostra erro no console caso API falhe", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (optionalApi.getAllOptionalItems as jest.Mock).mockRejectedValue(
      new Error("Falha na API")
    );

    render(<Cardapio />);

    const clickArea = screen.getAllByRole("heading", { level: 3 })[0]
      .parentElement!;
    fireEvent.click(clickArea);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao buscar itens opcionais",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
