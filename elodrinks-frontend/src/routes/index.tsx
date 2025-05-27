import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Você pode adicionar outras rotas abaixo, ex: */}
        {/* <Route path="/sobre" element={<About />} /> */}
        {/* <Route path="/contato" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
