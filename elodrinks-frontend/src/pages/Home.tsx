import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />

      {/* HERO SECTION */}
      <section className="hero-section">
        <img
          src={`src/images/banner${currentIndex + 1}.png`}
          alt={`Banner ${currentIndex + 1}`}
        />
        <div className="divTexto">
          <h1>
            Trabalhamos com os melhores produtos do mercado,
            <br />
            insumos frescos e ingredientes artesanais.
          </h1>
        </div>
      </section>

      {/* SOBRE / TEXTO INSTITUCIONAL */}
      <section style={{ backgroundColor: "#9D4815", padding: "2rem" }}>
        <div className="sectionInfo">
          <div className="sectionInfo2">
            <div className="line1">
              <svg
                width="12"
                height="217"
                viewBox="0 0 12 217"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 216.774L11.7735 211L6 205.226L0.226497 211L6 216.774ZM5 6L5 211H7L7 6H5Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-sectionInfo">
              <h2>SEU DRINK EM NOSSAS MÃOS</h2>
              <p>
                Sabe aquela alegria que simples detalhes nos proporcionam, como
                um abraço, um beijo, um drink com quem tanto amamos… A companhia
                de quem é importante para nós?
              </p>
              <p>
                Foram esses sentimentos que nos motivaram a abrir a Elo Drinks.
                Queremos que vivenciem a alegria que é a celebração da vida e do
                amor.
              </p>
            </div>
            <div style={{ position: "relative", marginTop: "20px" }}>
              <img
                src="src\images\equipe.png"
                alt="Equipe 1"
                className="fotoAtras"
              />
              <img
                src="src\images\equipe2.png"
                alt="Equipe 2"
                className="fotoFrente"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS SERVIÇOS */}
      <section
        className="servicos"
        style={{ backgroundColor: "#101820", padding: "2rem" }}
      >
        <h2>NOSSOS SERVIÇOS</h2>
        <div className="flexBoxGeral">
          <div className="grid-3 tipo1">
            <picture>
              <img src="src\images\equipe.png" alt="imagem 1" />
            </picture>
            <p>Drinks <br /> Personalizados</p>
          </div>
          <div className="grid-3 tipo2">
            <picture>
              <img src="src\images\equipe2.png" alt="imagem 1" />
            </picture>
            <p>Eventos <br /> Corporativos</p>
          </div>
          <div className="grid-3 tipo1">
            <picture>
              <img src="src\images\equipe.png" alt="imagem 1" />
            </picture>
            <p>Coffee <br /> Break</p>
          </div>
          <div className="grid-3 tipo2">
            <picture>
              <img src="src\images\equipe2.png" alt="imagem 1" />
            </picture>
            <p>Eventos <br /> Corporativos</p>
          </div>
          <div className="grid-3 tipo1">
            <picture>
              <img src="src\images\equipe.png" alt="imagem 1" />
            </picture>
            <p>Eventos <br /> Corporativos</p>
          </div>
          <div className="grid-3 tipo2">
            <picture>
              <img src="src\images\equipe2.png" alt="imagem 1" />
            </picture>
            <p>Eventos <br /> Corporativos</p>
          </div>
        </div>
      </section>

      {/* CARDÁPIO E ESPECIALISTAS */}
      <section style={{ backgroundColor: "#5D4A38", padding: "2rem", color: "#fff" }}>
        <h2 style={{ textAlign: "center" }}>CARDÁPIO</h2>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Selecione o tipo de cardápio que pretende servir para visualizar nossas melhores opções
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div style={{ border: "2px solid white", padding: "1.5rem", width: "200px", textAlign: "center" }}>
            <img src="src\images\drink-icon.png" alt="Drink Especial" style={{ height: "40px" }} />
            <p>DRINK ESPECIAL</p>
          </div>
          <div style={{ border: "2px solid white", padding: "1.5rem", width: "200px", textAlign: "center" }}>
            <img src="src\images\caipirinha-icon.png" alt="Bar de Caipirinhas" style={{ height: "40px" }} />
            <p>BAR DE CAIPIRINHAS</p>
          </div>
          <div style={{ border: "2px solid white", padding: "1.5rem", width: "200px", textAlign: "center" }}>
            <img src="src\images\softdrinks-icon.png" alt="Soft Drinks" style={{ height: "40px" }} />
            <p>SOFT DRINKS</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3>ESPECIALISTAS PARA O SEU EVENTO</h3>
            <p>
              Oferecemos serviços profissionais para eventos e estabelecimentos. Contamos com uma equipe especializada,
              incluindo bartender, barbacks, cheffes, copeiras e coordenadores, prontos para garantir o sucesso do seu
              evento ou operação. Entre em contato e saiba como podemos atender às suas necessidades!
            </p>
            <button style={{ backgroundColor: "white", color: "#5D4A38", border: "none", padding: "0.5rem 1rem", marginTop: "1rem" }}>
              SAIBA MAIS
            </button>
          </div>
          <div style={{ flex: 1, minWidth: "300px", position: "relative", textAlign: "right" }}>
            <img src="src\images\equipe.png" alt="Equipe Bartender" style={{ width: "100%", maxWidth: "500px" }} />
          </div>
        </div>
      </section>
  
      {/* ELEGÂNCIA E EMPRESAS ATENDIDAS */}
      <section style={{ backgroundColor: "#101820", color: "white", padding: "3rem 2rem" }}>
      <h2 style={{ textAlign: "center" }}>O SABOR DA ELEGÂNCIA EM CADA GOLE</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "5rem", margin: "2rem 0", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <h3>25</h3>
          <p>CIDADES ATENDIDAS</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>1200</h3>
          <p>HORAS DE EVENTO</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>56</h3>
          <p>EMPRESAS ATENDIDAS</p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <p>
          A Elo Drinks é especializada em serviços de coquetelaria para eventos sociais e eventos corporativos. Hoje ela vem sendo
          reconhecida no mercado de eventos corporativos e de wedding por indicações dos melhores assessores, decoradores e espaço de
          eventos da Grande São Paulo por terem ótimos profissionais e um excelente atendimento.
        </p>
        <p style={{ marginTop: "1rem" }}>
          Quando o assunto é Open Bar, a Elo Drinks vem se destacando a cada ano com inovações e personalizações para cada tipo de festa.
        </p>
      </div>

      <h3 style={{ textAlign: "center", marginTop: "3rem" }}>ALGUMAS EMPRESAS ATENDIDAS</h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <img src="src\images\globo.png" alt="Globo" style={{ height: "30px" }} />
        <img src="src\images\huawei.png" alt="Huawei" style={{ height: "30px" }} />
        <img src="src\images\coca.png" alt="Coca-Cola" style={{ height: "30px" }} />
        <img src="src\images\boticario.png" alt="O Boticário" style={{ height: "30px" }} />
      </div>
    </section>
    </div>
  );
}
