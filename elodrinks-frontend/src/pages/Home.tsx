import React from "react"
import Header from "../components/Header"

export default function Home() {
  return (
    <div>
      <Header />

      {/* HERO SECTION */}
      <section className="hero-section" style={{ textAlign: "center", padding: "2rem" }}>
        <img
          src="src\images\banner.png"
          alt="Banner principal"
          style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
        />
        <div style={{ marginTop: "1rem" }}>
          <h1>
            Trabalhamos com os melhores produtos do mercado,
            <br />
            insumos frescos e ingredientes artesanais
          </h1>
        </div>
      </section>

      {/* SOBRE / TEXTO INSTITUCIONAL */}
      <section className="about-section" style={{ backgroundColor: "#fbe2c1", padding: "2rem" }}>
        <h2 style={{ textAlign: "center" }}>SEU DRINK EM NOSSAS MÃOS</h2>
        <p style={{ marginTop: "1rem", maxWidth: "800px", marginInline: "auto", textAlign: "justify" }}>
          Sabe aquela alegria que simples detalhes nos proporcionam, como um abraço,
          um beijo, um drink com quem tanto amamos… A companhia de quem é importante para nós?
        </p>
        <p style={{ marginTop: "1rem", maxWidth: "800px", marginInline: "auto", textAlign: "justify" }}>
          Foram esses sentimentos que nos motivaram a abrir a Elo Drinks. Queremos que vivenciem
          a alegria que é a celebração da vida e do amor.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
          <img src="src\images\equipe.png" alt="Equipe 1" style={{ width: "300px", borderRadius: "10px" }} />
          <img src="src\images\equipe2.png" alt="Equipe 2" style={{ width: "300px", borderRadius: "10px" }} />
        </div>
      </section>
    </div>
  )
}
