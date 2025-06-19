

import { Routes, Route } from "react-router-dom"

import { AgendaDentista, Factura, CalendarDentist, Nota } from "../components"


export const DentRoutes = () => {
  return (
    <Routes>
      <Route path="/verAgenda" element={<AgendaDentista />} />
      <Route path="/factura/:id" element={<Factura />} />
      <Route path="/Calendario" element={<CalendarDentist />} />
      <Route path="/Nota" element={ <Nota /> } />

    </Routes>
  )
}
