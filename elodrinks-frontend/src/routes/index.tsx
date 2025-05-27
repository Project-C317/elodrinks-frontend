import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ServicoDetalhado from "../pages/ServicoDetalhado"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/servico/:id" element={<Home />} />
        <Route path="/servico/:id" element={<ServicoDetalhado />} />
        {/* Você pode adicionar outras rotas abaixo, ex: */}
        {/* <Route path="/sobre" element={<About />} /> */}
        {/* <Route path="/contato" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
