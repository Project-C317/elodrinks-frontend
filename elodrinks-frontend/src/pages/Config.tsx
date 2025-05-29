import { useEffect, useState } from "react";
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
    ClientQuantity: 0,
    EventDuration: 0,
    EventDate: new Date(),
    OptionalItems: [],
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
    await serviceApi.createService(newService);
    setNewService({
      Name: "",
      BasePrice: 0,
      ClientQuantity: 0,
      EventDuration: 0,
      EventDate: new Date(),
      OptionalItems: [],
      FinalBudget: 0,
      DownPayment: 0,
      FinalPayment: 0,
    });
    fetchData();
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
    <div style={{ display: "flex", color: "#fff" }}>
      <aside
        style={{
          width: "200px",
          borderRight: "1px solid #555",
          padding: "1rem",
        }}
      >
        <h3>Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <button onClick={() => setMenu("createService")}>
              Criar Serviços
            </button>
          </li>
          <li>
            <button onClick={() => setMenu("deleteService")}>
              Excluir Serviços
            </button>
          </li>
          <li>
            <button onClick={() => setMenu("createOptional")}>
              Criar Opcionais
            </button>
          </li>
          <li>
            <button onClick={() => setMenu("deleteOptional")}>
              Excluir Opcionais
            </button>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        {menu === "createService" && (
          <div className="boxPrincipal">
            <h2>Criar Serviço</h2>
            <input
              placeholder="Nome"
              value={newService.Name}
              onChange={(e) =>
                setNewService({ ...newService, Name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="BasePrice"
              value={newService.BasePrice}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  BasePrice: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="number"
              placeholder="ClientQuantity"
              value={newService.ClientQuantity}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  ClientQuantity: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="number"
              placeholder="EventDuration"
              value={newService.EventDuration}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  EventDuration: parseFloat(e.target.value),
                })
              }
            />
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
            <input
              type="number"
              placeholder="FinalBudget"
              value={newService.FinalBudget}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  FinalBudget: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="number"
              placeholder="DownPayment"
              value={newService.DownPayment}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  DownPayment: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="number"
              placeholder="FinalPayment"
              value={newService.FinalPayment}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  FinalPayment: parseFloat(e.target.value),
                })
              }
            />
            <button onClick={handleAddService}>Adicionar Serviço</button>
          </div>
        )}

        {menu === "deleteService" && (
          <div>
            <h2>Excluir Serviços</h2>
            {services.map((s) => (
              <div key={s._id} className="boxConfig">
                <div>{s.Name}</div>
                <div>R${s.BasePrice}</div>
                <div>{s.ClientQuantity}</div>
                <div>{s.EventDuration}</div>
                <div>{new Date(s.EventDate).toLocaleDateString()}</div>
                <div>{s.FinalBudget}</div>
                <div>{s.DownPayment}</div>
                <div>{s.FinalPayment}</div>
                <button
                  onClick={() => {
                    console.log("Tentando deletar opcional:", s);
                    handleDeleteService(s._id);
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}

        {menu === "createOptional" && (
          <div className="boxPrincipal">
            <h2>Criar Item Opcional</h2>
            <input
              placeholder="Nome"
              value={newOptional.Name}
              onChange={(e) =>
                setNewOptional({ ...newOptional, Name: e.target.value })
              }
            />
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
            <button onClick={handleAddOptional}>Adicionar Opcional</button>
          </div>
        )}

        {menu === "deleteOptional" && (
          <div>
            <h2>Excluir Opcionais</h2>
            {optionals.map((o) => (
              <div key={o._id} className="boxConfig">
                <div>{o.Name}</div>
                <div>{o.PricePerUnit}</div>
                <div>{o.Quantity}</div>
                <div>{o.IndividualPrice}</div>
                <button
                  onClick={() => {
                    console.log("Tentando deletar opcional:", o);
                    handleDeleteOptional(o._id);
                  }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
