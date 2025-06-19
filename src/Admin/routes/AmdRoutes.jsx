
import { Routes, Route } from "react-router-dom"

import { InfoUser, Ingresos, CitasPaciente, Dentistas } from "../Components"
import { TratamientosPaciente } from "../../Tratamientos"

import { Odontograma } from "../../components"

export const AmdRoutes = () => {
    return (     
        <Routes>
            <Route path="/InfoUser" element={ <InfoUser /> } />
            <Route path="/Ingresos" element={ <Ingresos /> } />
            
            <Route path="/tratamientos/:id" element={ <TratamientosPaciente /> } />
            <Route path="/citas/:id" element={ <CitasPaciente /> } />
            <Route path="/odontograma/:id" element={ <Odontograma />  } />

            <Route path="/Dentistas" element={ <Dentistas /> } />

        </Routes>
    )
}
