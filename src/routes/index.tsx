import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Config from "../pages/Config"
import Login from "../pages/Login"
import ServiceList from "../pages/ServiceList"
import OptionalItemsList from "../pages/OptionalItemsList"
import Carrinho from "../pages/Carrinho";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/config" element={<Config />} />
        <Route path="/servicos" element={<ServiceList />} />
         <Route path="/optional-items" element={<OptionalItemsList />} /> 
       <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  )
}
