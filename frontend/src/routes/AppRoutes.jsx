import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Produtos from "../pages/Produtos";
import Clientes from "../pages/Clientes";
import Usuarios from "../pages/Usuarios";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
        </BrowserRouter>
    );
}