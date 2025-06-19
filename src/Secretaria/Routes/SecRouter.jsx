


import { Routes, Route } from "react-router-dom"
import { RegiCitas, RevisarCitas } from "../Components"
import { Dentistas } from "../../Admin/Components"


export const SecRouter = () => {
  return (
    <Routes>
      <Route path="/HorarioDentista" element={<Dentistas />} />
      {/* <Route path="/revisarCitas" element={<RevisarCitas />} /> */}
    </Routes>
  )
}
