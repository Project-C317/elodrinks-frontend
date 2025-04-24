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
    </div>
  );
}
