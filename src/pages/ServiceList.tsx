import { useEffect, useState } from "react";
import { serviceApi, Service } from "../services/api";

// Função para mapear os dados da API para o formato esperado
export const mapServices = (services: any[]): Service[] => {
  return services.map((s) => ({
    _id: s._id,
    Name: s.Name,
    BasePrice: s.BasePrice,
    CostPerClient: s.CostPerClient,
    ClientQuantity: s.ClientQuantity,
    EventDuration: s.EventDuration,
    EventDate: new Date(s.EventDate),
    optionalItems: s.OptionalItems || [],
    FinalBudget: s.FinalBudget,
    DownPayment: s.DownPayment,
    FinalPayment: s.FinalPayment,
  }));
};

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    serviceApi
      .getAllServices()
      .then((response) => {
        setServices(mapServices(response.data));
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setSelectedService(null);
  };

  if (loading) return <p>Carregando serviços...</p>;

  return (
    <section
      className="servicos"
      style={{ backgroundColor: "#101820", padding: "2rem" }}
      id="nossos-servicos"
    >
      <h2 style={{ color: "white" }}>NOSSOS SERVIÇOS</h2>
      <div className="flexBoxGeral">
        {services.map((service, index) => {
          const imageNumber = (index % 4) + 1;
          const imagePath = `/images/servicos${imageNumber}.webp`;
          const tipoClass = index % 2 === 0 ? "tipo1" : "tipo2";

          return (
            <div
              key={service._id}
              className={`grid-3 ${tipoClass}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedService(service)}
            >
              <picture>
                <img
                  src={imagePath}
                  alt={`Imagem do serviço ${service.Name}`}
                />
              </picture>
              <p style={{ color: "white", textAlign: "center" }}>
                {service.Name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="modalServicos" onClick={closeModal}>
          <div
            className="div-modalServicos"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="fechar-modalServicos">
              &times;
            </button>
            <h2>{selectedService.Name}</h2>
            <p>
              <strong>Preço base:</strong> R${" "}
              {selectedService.BasePrice.toFixed(2)}
            </p>
            <p>
              <strong>Custo por cliente:</strong> R${" "}
              {selectedService.CostPerClient.toFixed(2)}
            </p>
            <p>
              <strong>Quantidade de clientes:</strong> R${" "}
              {selectedService.ClientQuantity.toFixed(2)}
            </p>
            <p>
              <strong>Pagamento inicial:</strong> R${" "}
              {selectedService.DownPayment.toFixed(2)}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {selectedService.EventDate.toLocaleDateString("pt-BR")}
            </p>
            <p>
              <strong>Duração: </strong>
              {selectedService.EventDuration} horas
            </p>
            <p>
              <strong>Orçamento final:</strong> R${" "}
              {selectedService.FinalBudget.toFixed(2)}
            </p>
            <p>
              <strong>Pagamento final:</strong> R${" "}
              {selectedService.FinalPayment.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceList;
