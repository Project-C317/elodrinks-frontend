import { useEffect, useState } from "react";
import UserControl from "../pages/UserControl";
import {
  serviceApi,
  optionalApi,
  Service,
  OptionalItem,
} from "../services/api";

export default function Config() {
  const [services, setServices] = useState<Service[]>([]);
  const [optionals, setOptionals] = useState<OptionalItem[]>([]);
  const [newService, setNewService] = useState<Omit<Service, "_id">>({
    Name: "",
    BasePrice: 0,
    CostPerClient: 0,
    ClientQuantity: 0,
    EventDuration: 0,
    EventDate: new Date(),
    optionalItems: [],
    FinalBudget: 0,
    DownPayment: 0,
    FinalPayment: 0,
  });
  const [newOptional, setNewOptional] = useState<Omit<OptionalItem, "_id">>({
    Name: "",
    PricePerUnit: 0,
    Quantity: 0,
    IndividualPrice: 0,
  });
  const [menu, setMenu] = useState("createService");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await serviceApi.getAllServices();
    const o = await optionalApi.getAllOptionalItems();
    setServices(s.data);
    setOptionals(o.data);
  };
  const handleAddService = async () => {
    try {
      console.log("Payload enviado:", newService);
      await serviceApi.createService(newService);
      setNewService({
        Name: "",
        BasePrice: 0,
        CostPerClient: 0,
        ClientQuantity: 0,
        EventDuration: 0,
        EventDate: new Date(),
        optionalItems: [],
        FinalBudget: 0,
        DownPayment: 0,
        FinalPayment: 0,
      });
      fetchData();
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
    }
  };

  const handleAddOptional = async () => {
    await optionalApi.createOptionalItem(newOptional);
    setNewOptional({
      Name: "",
      PricePerUnit: 0,
      Quantity: 0,
      IndividualPrice: 0,
    });
    fetchData();
  };

  const handleDeleteService = async (id: string) => {
    await serviceApi.deleteServiceById(id);
    fetchData();
  };

  const handleDeleteOptional = async (id: string) => {
    console.log("ID do opcional para deletar:", id);
    try {
      await optionalApi.deleteOptionalItemById(id);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar item opcional:", error);
    }
  };

  return (
    <div className="config-class">
      <UserControl />
      <aside>
        <h2>Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li className="li-menu" onClick={() => setMenu("createService")}>
            Criar Serviços
          </li>
          <li className="li-menu" onClick={() => setMenu("deleteService")}>
            Excluir Serviços
          </li>
          <li className="li-menu" onClick={() => setMenu("createOptional")}>
            Criar Opcionais
          </li>
          <li className="li-menu" onClick={() => setMenu("deleteOptional")}>
            Excluir Opcionais
          </li>
        </ul>
      </aside>

      <main className="mainConfig">
        {menu === "createService" && (
          <div className="boxPrincipal">
            <h2>Criar um Serviço</h2>

            <div className="lateral">
              <p>Nome:</p>
              <input
                placeholder="Nome"
                value={newService.Name}
                onChange={(e) =>
                  setNewService({ ...newService, Name: e.target.value })
                }
              />
            </div>

            <div className="lateral">
              <p>Preço base R$:</p>
              <input
                type="number"
                placeholder="BasePrice"
                value={newService.BasePrice}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    BasePrice: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Custo por cliente: R$</p>
              <input
                type="number"
                placeholder="CostPerClient"
                value={newService.CostPerClient}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    CostPerClient: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Quantidade de pessoas:</p>
              <input
                type="number"
                placeholder="ClientQuantity"
                value={newService.ClientQuantity}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    ClientQuantity: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Duração:</p>
              <input
                type="number"
                placeholder="EventDuration"
                value={newService.EventDuration}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    EventDuration: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Data:</p>
              <input
                type="date"
                placeholder="Event Date"
                value={newService.EventDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    EventDate: new Date(e.target.value),
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Orçamento Final:</p>
              <input
                type="number"
                placeholder="FinalBudget"
                value={newService.FinalBudget}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    FinalBudget: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Pagamento inicial:</p>
              <input
                type="number"
                placeholder="DownPayment"
                value={newService.DownPayment}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    DownPayment: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="lateral">
              <p>Pagamento final:</p>
              <input
                type="number"
                placeholder="FinalPayment"
                value={newService.FinalPayment}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    FinalPayment: e.target.valueAsNumber || 0,
                  })
                }
              />
            </div>

            <div className="btn-layout">
              <div className="button2" onClick={handleAddService}>
                CRIAR
              </div>
            </div>
          </div>
        )}

        {menu === "deleteService" && (
          <div>
            <h2>Excluir Serviços</h2>
            <div className="boxDelete">
              {services.map((s) => (
                <div key={s._id} className="boxConfig">
                  <div style={{ marginBottom: "10px", textAlign: "center" }}>
                    <b>{s.Name}</b>
                  </div>
                  <div>Preço base: R${s.BasePrice}</div>
                  <div>Custo por cliente: R${s.CostPerClient}</div>
                  <div>Quantidade: {s.ClientQuantity}</div>
                  <div>Duração do evento: {s.EventDuration}</div>
                  <div>Data: {new Date(s.EventDate).toLocaleDateString()}</div>
                  <div>Orçamento Final: {s.FinalBudget}</div>
                  <div>Pagamento inicial: {s.DownPayment}</div>
                  <div>Pagamento final: {s.FinalPayment}</div>
                  <div className="btn-layout" style={{ marginTop: "30px" }}>
                    <div
                      className="button2"
                      onClick={() => {
                        console.log("Tentando deletar opcional:", s);
                        handleDeleteService(s._id);
                      }}
                    >
                      APAGAR
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {menu === "createOptional" && (
          <div className="boxPrincipal">
            <h2>Criar Item Opcional</h2>
            <div className="lateral">
              <p>Nome:</p>
              <input
                placeholder="Nome"
                value={newOptional.Name}
                onChange={(e) =>
                  setNewOptional({ ...newOptional, Name: e.target.value })
                }
              />
            </div>
            <div className="lateral">
              <p>Preço por unidade R$:</p>
              <input
                type="number"
                placeholder="PricePerUnit"
                value={newOptional.PricePerUnit}
                onChange={(e) =>
                  setNewOptional({
                    ...newOptional,
                    PricePerUnit: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="lateral">
              <p>Quantidade:</p>
              <input
                type="number"
                placeholder="Quantity"
                value={newOptional.Quantity}
                onChange={(e) =>
                  setNewOptional({
                    ...newOptional,
                    Quantity: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="lateral">
              <p>Preço individual R$:</p>
              <input
                type="number"
                placeholder="IndividualPrice"
                value={newOptional.IndividualPrice}
                onChange={(e) =>
                  setNewOptional({
                    ...newOptional,
                    IndividualPrice: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="btn-layout">
              <div className="button2" onClick={handleAddOptional}>
                CRIAR
              </div>
            </div>
          </div>
        )}

        {menu === "deleteOptional" && (
          <div>
            <h2>Excluir Opcionais</h2>
            <div className="boxDelete">
              {optionals.map((o) => (
                <div key={o._id} className="boxConfig">
                  <div style={{ marginBottom: "10px", textAlign: "center" }}>
                    <b>{o.Name}</b>
                  </div>
                  <div>Quantidade: {o.Quantity}</div>
                  <div>Preço por unidade: R${o.PricePerUnit}</div>
                  <div>Preço individual: R${o.IndividualPrice}</div>
                  <div className="btn-layout" style={{ marginTop: "20px" }}>
                    <div
                      className="button2"
                      onClick={() => {
                        console.log("Tentando deletar opcional:", o);
                        handleDeleteOptional(o._id);
                      }}
                    >
                      APAGAR
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
