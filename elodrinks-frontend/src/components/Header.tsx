import React from "react"

export default function Header() {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <nav>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0 }}>
          <li><a href="#quem-somos">QUEM SOMOS</a></li>
          <li><a href="#equipe">EQUIPE</a></li>
          <li><a href="#galeria">GALERIA</a></li>
          <li><a href="#contato">CONTATO</a></li>
        </ul>
      </nav>
    </header>
  )
}
