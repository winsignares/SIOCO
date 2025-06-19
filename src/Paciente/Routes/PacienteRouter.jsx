
import { Routes, Route } from 'react-router-dom'

import { SolicitarCitas, Citas, HistorialMedico, Pagos, Facturas, Factura } from '../Components'

export const PacienteRouter = () => {
    return (
        <Routes>

            <Route path="/PSolicitarCitas" element={<SolicitarCitas />} />
            <Route path="/verCitas" element={<Citas />} />
            <Route path="/verHistorialMedico" element={<HistorialMedico />} />
            <Route path="/HacerPago" element={<Pagos />} />
            <Route path="/verFacturas" element={<Facturas />} />
            <Route path="/verFacturas/:id" element={<Factura />} />
            {/* <Route path="/verOdontograma" element={<Odontograma />} /> */}

        </Routes>
    )
}


