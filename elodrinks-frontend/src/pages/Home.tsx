import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../pages/Carousel";
import ServiceList from "../pages/ServiceList"
import Cardapio from "../pages/OptionalItemsList"
import UserControl from "../pages/UserControl"

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
      <UserControl/>

      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <img
          src={`/images/banner${currentIndex + 1}.jpg`}
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
            <div
              style={{
                position: "relative",
                marginTop: "20px",
              }}
            >
              <img
                src="/images/equipe.png"
                alt="Equipe 1"
                className="fotoAtras"
              />
              <img
                src="/images/equipe2.png"
                alt="Equipe 2"
                className="fotoFrente"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS SERVIÇOS */}
      <ServiceList />

      {/* CARDÁPIO E ESPECIALISTAS */}
      <Cardapio />

      {/* ELEGÂNCIA E EMPRESAS ATENDIDAS */}
      <section className="empresas" style={{ padding: "2rem" }} id="parceiros">
        <h2>O SABOR DA ELEGÂNCIA EM CADA GOLE</h2>
        <div className="flexBoxGeral">
          <div className="grid-3">
            <h3>25</h3>
            <p>CIDADES ATENDIDAS</p>
          </div>
          <div className="grid-3">
            <h3>1200</h3>
            <p>HORAS DE EVENTO</p>
          </div>
          <div className="grid-3">
            <h3>56</h3>
            <p>EMPRESAS ATENDIDAS</p>
          </div>
        </div>

        <div className="flexBoxGeral">
          <div className="grid-2">
            <p>
              A Elo Drinks é especializada em serviços de coquetelaria para
              eventos sociais e eventos corporativos. Hoje ela vem sendo
              reconhecida no mercado de eventos corporativos e de wedding por
              indicações dos melhores assessores, decoradores e espaço de
              eventos da Grande São Paulo por terem ótimos profissionais e um
              excelente atendimento.
            </p>
          </div>
          <div className="grid-2">
            <svg
              width="112"
              height="12"
              viewBox="0 0 112 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM111.774 6L106 0.226497L100.227 6L106 11.7735L111.774 6ZM6 7H106V5H6V7Z"
                fill="#E0CEAA"
              />
            </svg>
            <p>
              Quando o assunto é Open Bar, a Elo Drinks vem se destacando a cada
              ano com inovações e personalizações para cada tipo de festa.
            </p>
          </div>
        </div>

        <h2>ALGUMAS EMPRES AS ATENDIDAS</h2>
        <Carousel />
      </section>

      {/* FOTOS INSTAGRAM*/}
      <section
        className="fotos"
        style={{ backgroundColor: "#9D4815", padding: "2rem" }}
        id="galeria"
      >
        <h2>FOTOS</h2>
        <p>Confira nossa galeria de fotos!</p>
        <div className="fundoFotos">
          <div className="grid1">
            <img src="/images/equipe2.png" alt="Foto 4" />
            <img src="/images/equipe.png" alt="Foto 5" />
            <img src="/images/equipe2.png" alt="Foto 6" />
          </div>
          <div className="grid2">
            <img src="/images/equipe.png" alt="Foto 1" />
            <img src="/images/equipe2.png" alt="Foto 2" />
            <img src="/images/equipe.png" alt="Foto 3" />
          </div>
          <div className="grid3">
            <img src="/images/equipe2.png" alt="Foto 4" />
            <img src="/images/equipe.png" alt="Foto 5" />
            <img src="/images/equipe2.png" alt="Foto 6" />
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section
        className="contato"
        style={{ backgroundColor: "#101820", padding: "2rem" }}
        id="contato"
      >
        <h2>FALE CONOSCO</h2>
        <p>Para mais informações sobre nossos serviços, entre em contato</p>

        <form action="https://formsubmit.co/marcos1221marcos1221@gmail.com" method="POST">
          <div className="boxName">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="NOME"
              required
            />
          </div>

          <div className="boxEmail">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-MAIL"
              required
            />
          </div>

          <div className="boxTelefone">
            <input
              type="tel"
              id="telefone"
              name="telefone"
              placeholder="TELEFONE"
            />
          </div>

          <div className="boxInformacoes">
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="INFORMAÇÕES DO EVENTO"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-contato">
              <p>ENTRE EM CONTATO</p>
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
