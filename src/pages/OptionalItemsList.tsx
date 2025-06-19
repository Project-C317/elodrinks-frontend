import { useState } from "react";
import { optionalApi, OptionalItem } from "../services/api";

export function Cardapio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [optionalItems, setOptionalItems] = useState<OptionalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleOpenModal = async (category: string) => {
    setSelectedCategory(category); // guarda a categoria clicada
    setModalOpen(true);
    setLoading(true);
    try {
      const response = await optionalApi.getAllOptionalItems();
      // Filtra os itens pela categoria selecionada
      const normalizedItems = response.data
        .filter((item: any) => item.Category === category)
        .map((item: any) => ({
          _id: item._id,
          Name: item.Name,
          PricePerUnit: item.PricePerUnit,
          Quantity: item.Quantity,
          IndividualPrice: item.IndividualPrice,
          Category: item.Category,
        }));
      setOptionalItems(normalizedItems);
    } catch (error) {
      console.error("Erro ao buscar itens opcionais", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setOptionalItems([]);
    setSelectedCategory("");
  };

  const addToCart = (item: OptionalItem) => {
    const storedCart = JSON.parse(localStorage.getItem("carrinho") || "[]");

    const cartItem = {
      ...item,
      FinalBudget: item.IndividualPrice,
      type: "optional",
    };

    storedCart.push(cartItem);
    localStorage.setItem("carrinho", JSON.stringify(storedCart));

    window.dispatchEvent(new Event("carrinhoAtualizado"));

    alert("Serviço adicionado ao carrinho!");
  };

  return (
    <section
      className="cardapio"
      style={{ backgroundColor: "#5D4A38", padding: "2rem" }}
      id="cardapio"
    >
      <h2>CARDÁPIO</h2>
      <p className="p-texto">
        Selecione o tipo de cardápio que pretende servir para visualizar nossas
        melhores opções
      </p>
      <div className="flexBoxGeral pt1">
        <div
          className="grid-3"
          onClick={() => handleOpenModal("drink especial")}
          style={{ cursor: "pointer" }}
        >
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M88.9126 7C84.6669 7.00908 80.5978 8.69968 77.5956 11.7018C74.5935 14.7039 72.9029 18.7731 72.8938 23.0187H57.9407C57.0928 23.0187 56.2797 23.3556 55.6802 23.9551C55.0806 24.5546 54.7438 25.3678 54.7438 26.2156C54.7438 27.0635 55.0806 27.8766 55.6802 28.4762C56.2797 29.0757 57.0928 29.4125 57.9407 29.4125H85.7157V35.8062H55.3626L37.0751 8.30625C36.5736 7.71307 35.8734 7.32275 35.1051 7.2082C34.3369 7.09365 33.5532 7.26271 32.9005 7.68379C32.2479 8.10488 31.7708 8.74918 31.5585 9.49634C31.3462 10.2435 31.4132 11.0424 31.7469 11.7438L38.9657 23.0875H31.1969C30.3491 23.0875 29.5359 23.4243 28.9364 24.0238C28.3369 24.6234 28.0001 25.4365 28.0001 26.2844V42.2687C27.9955 43.534 28.2414 44.7876 28.7235 45.9574C29.2056 47.1273 29.9144 48.1901 30.809 49.0848C31.7037 49.9795 32.7666 50.6883 33.9364 51.1703C35.1062 51.6524 36.3598 51.8983 37.6251 51.8938C38.0512 51.8966 38.4722 51.9865 38.8624 52.1579C39.2525 52.3294 39.6035 52.5787 39.8938 52.8906C40.1907 53.1816 40.4259 53.5294 40.5854 53.9133C40.7448 54.2972 40.8253 54.7093 40.8219 55.125C40.8219 57.6777 41.836 60.1259 43.641 61.9309C45.4461 63.7359 47.8942 64.75 50.4469 64.75H56.8407V87.1969H53.6438C51.0911 87.1969 48.6429 88.2109 46.8379 90.016C45.0329 91.821 44.0188 94.2692 44.0188 96.8219V100.019C44.0188 100.867 44.3556 101.68 44.9552 102.279C45.5547 102.879 46.3678 103.216 47.2157 103.216H72.8594C73.7073 103.216 74.5204 102.879 75.12 102.279C75.7195 101.68 76.0563 100.867 76.0563 100.019V96.8219C76.0563 94.2692 75.0422 91.821 73.2372 90.016C71.4322 88.2109 68.984 87.1969 66.4313 87.1969H63.2344V64.75H69.6626C70.9278 64.7545 72.1814 64.5087 73.3513 64.0266C74.5211 63.5445 75.5839 62.8357 76.4786 61.941C77.3733 61.0464 78.0821 59.9835 78.5642 58.8137C79.0462 57.6439 79.2921 56.3902 79.2876 55.125C79.2966 54.274 79.641 53.4609 80.246 52.8624C80.851 52.2638 81.6678 51.9281 82.5188 51.9281C85.0715 51.9281 87.5197 50.9141 89.3247 49.109C91.1297 47.304 92.1438 44.8558 92.1438 42.3031V26.3188C92.1438 25.4709 91.807 24.6577 91.2075 24.0582C90.6079 23.4587 89.7948 23.1219 88.9469 23.1219H79.2876C79.2092 21.8118 79.3995 20.4996 79.8469 19.2658C80.2943 18.032 80.9893 16.9027 81.8891 15.9474C82.789 14.9921 83.8747 14.2309 85.0796 13.7106C86.2844 13.1903 87.583 12.9219 88.8954 12.9219C90.2078 12.9219 91.5063 13.1903 92.7112 13.7106C93.916 14.2309 95.0017 14.9921 95.9016 15.9474C96.8015 16.9027 97.4965 18.032 97.9438 19.2658C98.3912 20.4996 98.5816 21.8118 98.5032 23.1219C98.5069 25.438 97.6633 27.6754 96.1313 29.4125C95.7799 29.7065 95.4958 30.0726 95.2982 30.486C95.1006 30.8994 94.9943 31.3505 94.9863 31.8086C94.9782 32.2667 95.0688 32.7212 95.2518 33.1413C95.4348 33.5613 95.706 33.9372 96.0469 34.2433C96.3879 34.5494 96.7906 34.7786 97.2279 34.9154C97.6652 35.0523 98.1268 35.0935 98.5814 35.0364C99.036 34.9792 99.473 34.825 99.8628 34.5842C100.253 34.3434 100.586 34.0216 100.841 33.6406C102.883 31.3348 104.218 28.4889 104.684 25.4439C105.151 22.399 104.729 19.2841 103.47 16.4726C102.211 13.661 100.169 11.2721 97.5867 9.59204C95.0047 7.91197 91.993 7.01201 88.9126 7ZM69.6626 96.7875H50.4469C50.4469 95.9396 50.7837 95.1265 51.3833 94.527C51.9828 93.9274 52.7959 93.5906 53.6438 93.5906H66.4657C67.3135 93.5906 68.1267 93.9274 68.7262 94.527C69.3258 95.1265 69.6626 95.9396 69.6626 96.7875ZM82.4844 45.5C81.2205 45.5 79.9689 45.749 78.8011 46.2327C77.6333 46.7164 76.5723 47.4253 75.6785 48.3191C74.7848 49.2129 74.0758 50.2739 73.5921 51.4417C73.1084 52.6094 72.8594 53.861 72.8594 55.125C72.8571 55.548 72.7708 55.9664 72.6056 56.3559C72.4404 56.7453 72.1995 57.0981 71.8969 57.3937C71.6032 57.6965 71.25 57.9352 70.8596 58.095C70.4691 58.2547 70.0499 58.3319 69.6282 58.3219H50.4469C49.5991 58.3219 48.7859 57.9851 48.1864 57.3855C47.5869 56.786 47.2501 55.9729 47.2501 55.125C47.241 52.5751 46.224 50.1322 44.421 48.3291C42.6179 46.526 40.175 45.5091 37.6251 45.5C37.2017 45.4996 36.7828 45.4142 36.3931 45.2488C36.0034 45.0835 35.6508 44.8416 35.3563 44.5375C35.0578 44.2477 34.8216 43.9001 34.662 43.516C34.5024 43.1318 34.4229 42.7191 34.4282 42.3031H40.8563C41.7042 42.3031 42.5173 41.9663 43.1168 41.3668C43.7164 40.7673 44.0532 39.9541 44.0532 39.1063C44.0532 38.2584 43.7164 37.4452 43.1168 36.8457C42.5173 36.2462 41.7042 35.9094 40.8563 35.9094H34.4282V29.5156H43.4001L57.3907 50.4844C57.586 50.8948 57.8665 51.2588 58.2136 51.5522C58.5607 51.8456 58.9664 52.0617 59.4036 52.1859C59.8408 52.3101 60.2995 52.3397 60.749 52.2726C61.1985 52.2056 61.6286 52.0435 62.0105 51.7971C62.3924 51.5507 62.7174 51.2257 62.9638 50.8437C63.2102 50.4618 63.3723 50.0317 63.4393 49.5822C63.5064 49.1327 63.4768 48.674 63.3525 48.2368C63.2283 47.7996 63.0122 47.394 62.7188 47.0469L59.5907 42.3375H85.7157C85.7112 42.7573 85.6241 43.1722 85.4592 43.5583C85.2944 43.9445 85.0551 44.2943 84.7551 44.588C84.455 44.8817 84.1001 45.1134 83.7105 45.2699C83.3209 45.4263 82.9043 45.5045 82.4844 45.5Z"
              fill="currentColor"
            />
          </svg>

          <h3>
            DRINK <br /> ESPECIAL
          </h3>
        </div>

        <div
          className="grid-3"
          onClick={() => handleOpenModal("bar de caipirinhas")}
          style={{ cursor: "pointer" }}
        >
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75.625 96.25C62.2187 100.719 47.7813 100.719 34.375 96.25L30.9375 34.375H79.0625L75.625 96.25Z"
              stroke="currentColor"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M58.4375 34.375C58.4375 23.0313 67.7188 13.75 79.0625 13.75C90.4062 13.75 99.6875 23.0313 99.6875 34.375C99.6875 45.7187 90.4062 55 79.0625 55"
              stroke="currentColor"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M34.375 65.3125H44C49.1563 65.3125 53.9688 64.2812 58.4375 61.875C62.9062 59.4688 68.0625 58.4375 72.875 58.4375H77.6875"
              stroke="currentColor"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="79.0625" cy="24.0625" r="3.4375" fill="currentColor" />
            <circle cx="89.375" cy="34.375" r="3.4375" fill="currentColor" />
            <path
              d="M24.0625 13.75H37.8125C41.5938 13.75 44.6875 16.8437 44.6875 20.625V34.375"
              stroke="currentColor"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44.6875 48.125V65.3125"
              stroke="currentColor"
              strokeWidth="7"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3>
            BAR DE <br />
            CAIPIRINHAS
          </h3>
        </div>

        <div
          className="grid-3"
          onClick={() => handleOpenModal("soft drinks")}
          style={{ cursor: "pointer" }}
        >
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_21_57)">
              <path
                d="M75.625 106.562H34.375L27.5 48.125H82.5L75.625 106.562Z"
                stroke="currentColor"
                strokeWidth="7"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.625 48.125H89.375"
                stroke="currentColor"
                strokeWidth="7"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27.5 48.125C27.5 33 39.875 20.625 55 20.625C70.125 20.625 82.5 33 82.5 48.125"
                stroke="currentColor"
                strokeWidth="7"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M44.6875 3.4375H49.5C52.5937 3.4375 55 5.84375 55 8.9375V27.5"
                stroke="currentColor"
                strokeWidth="7"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M55 82.5C62.5939 82.5 68.75 77.8829 68.75 72.1875C68.75 66.4921 62.5939 61.875 55 61.875C47.4061 61.875 41.25 66.4921 41.25 72.1875C41.25 77.8829 47.4061 82.5 55 82.5Z"
                stroke="currentColor"
                strokeWidth="7"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_57">
                <rect width="110" height="110" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h3>
            SOFT <br /> DRINKS
          </h3>
        </div>
      </div>

      <div className="flexBoxGeral pt2">
        <div className="grid-2">
          <h3>ESPECIALISTAS PARA O SEU EVENTO</h3>
          <p>
            Oferecemos serviços profissionais para eventos e estabelecimentos.
            Contamos com uma equipe especializada, incluindo bartender,
            barbacks, cheffes, copeiras e coordenadores, prontos para garantir o
            sucesso do seu evento ou operação. Entre em contato e saiba como
            podemos atender às suas necessidades!
          </p>
          <a href="#contato" className="btn1">
            {" "}
            SOLICITE UM ORÇAMENTO
          </a>
        </div>
        <div className="grid-2 fundo-lateral">
          <p className="text-lateral">BARTENDER</p>
          <img
            src="/images/imagem-cardapio1.png"
            alt="Equipe Bartender"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </div>
      </div>

      {modalOpen && (
        <div
          className="modalOpcional"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label="Modal de Drinks"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="div-modalOpcional"
          >
            <button
              onClick={handleCloseModal}
              className="fechar-modalOpcional"
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 style={{ marginBottom: "2rem" }}>{selectedCategory}</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <ul style={{ paddingLeft: "1.2rem" }}>
                {optionalItems.map((item) => (
                  <div key={item._id} className="optional-list">
                    <p style={{ textTransform: "uppercase" }}>
                      <b>{item.Name}</b>
                    </p>
                    <p>
                      <b>Quantidade: </b> {item.Quantity}
                    </p>
                    <p>
                      <b>Preço por unidade:</b> R${" "}
                      {item.PricePerUnit.toFixed(2)}
                    </p>
                    <button
                      className="botaoSelecionarServico"
                      onClick={() => addToCart(item)}
                    >
                      Adicionar
                    </button>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Cardapio;
