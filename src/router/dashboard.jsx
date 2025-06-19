
import { Routes, Route } from "react-router-dom"

import { Dashboard,Spinner } from "../components"

import { AmdRoutes } from "../Admin/routes/AmdRoutes";
import { DentRoutes } from "../Dentista";
import { SecRouter } from "../Secretaria";
import { PacienteRouter } from "../Paciente";

export const DashboardRoutes = () => {
    return (
        <Dashboard>
            <Routes>
                
                { /* Rutas del Paciente */}
                <Route path="/Paciente/*" element={<PacienteRouter />} />

                {/* Rutas de la Secretaria */}
                <Route path="/Secretaria/*" element={<SecRouter />} />
                
                {/* Rutas del Dentista */}
                <Route path="/dentista/*" element={<DentRoutes />} />

                {/* Rutas del Administrador */}
                <Route path="/admin/*" element={<AmdRoutes />} />

                <Route path="*" element={<Spinner />} />


            </Routes>
        </Dashboard>
    )
}