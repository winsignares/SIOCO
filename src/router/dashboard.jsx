import { Dashboard, SolicitarCitas, Citas, HistorialMedico, Pagos, Facturas, Factura, RegiCitas, RevisarCitas, Odontograma, Spinner } from "../components"
import { Routes, Route, Navigate } from "react-router-dom"

export const DashboardRoutes = () => {
    return (
        <Dashboard>
            <Routes>

                {/* Rutas del paciente */}
                <Route path="/PSolicitarCitas" element={<SolicitarCitas />} />
                <Route path="/verCitas" element={<Citas />} />
                <Route path="/verHistorialMedico" element={<HistorialMedico />} />
                <Route path="/HacerPago" element={<Pagos />} />
                <Route path="/verFacturas" element={<Facturas />} />
                <Route path="/verFacturas/:id" element={<Factura />} />
                <Route path="/verOdontograma" element={<Odontograma />} />


                {/* Rutas de la Secretaria */}
                <Route path="/registrarCitas" element={<RegiCitas />} />
                <Route path="/revisarCitas" element={<RevisarCitas />} />

                <Route path="*" element={ <Spinner /> } />

            </Routes>
        </Dashboard>
    )
}