import { mapServices } from "../pages/ServiceList";

describe("mapServices", () => {
  it("deve mapear corretamente os dados da API para o formato esperado", () => {
    const apiData = [
      {
        _id: "123",
        Name: "Serviço A",
        BasePrice: 100,
        CostPerClient: 10,
        ClientQuantity: 5,
        EventDuration: 3,
        EventDate: "2025-06-01T00:00:00Z",
        OptionalItems: ["item1"],
        FinalBudget: 150,
        DownPayment: 50,
        FinalPayment: 100,
      },
      {
        _id: "456",
        Name: "Serviço B",
        BasePrice: 200,
        CostPerClient: 20,
        ClientQuantity: 10,
        EventDuration: 4,
        EventDate: "2025-07-01T00:00:00Z",
        FinalBudget: 300,
        DownPayment: 100,
        FinalPayment: 200,
      },
    ];

    const mapped = mapServices(apiData);

    expect(mapped).toHaveLength(2);

    expect(mapped[0]).toEqual({
      _id: "123",
      Name: "Serviço A",
      BasePrice: 100,
      CostPerClient: 10,
      ClientQuantity: 5,
      EventDuration: 3,
      EventDate: new Date("2025-06-01T00:00:00Z"),
      optionalItems: ["item1"],
      FinalBudget: 150,
      DownPayment: 50,
      FinalPayment: 100,
    });

    expect(mapped[1].optionalItems).toEqual([]);
  });
});
