import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Você pode adicionar outras rotas abaixo, ex: */}
        {/* <Route path="/sobre" element={<About />} /> */}
        {/* <Route path="/contato" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
