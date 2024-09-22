import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoSearchOutline } from 'react-icons/io5';

const initialCitas = [
    { id: 1, nombre: 'Juan Pérez', fecha: '2024-07-05', estado: 'Pendiente' },
    { id: 2, nombre: 'María García', fecha: '2024-07-06', estado: 'Pendiente' },
    { id: 3, nombre: 'Luis Hernández', fecha: '2024-07-07', estado: 'Pendiente' },
    { id: 4, nombre: 'Ana García', fecha: '2024-07-08', estado: 'Pendiente' },
];

export const RevisarCitas = () => {
    const [citas, setCitas] = useState(initialCitas);
    const [filtro, setFiltro] = useState('');

    const handleAceptar = (id) => {
        const nuevasCitas = citas.map((cita) =>
            cita.id === id ? { ...cita, estado: 'Aceptada' } : cita
        );
        setCitas(nuevasCitas);
    };

    const handleRechazar = (id) => {
        const nuevasCitas = citas.map((cita) =>
            cita.id === id ? { ...cita, estado: 'Rechazada' } : cita
        );
        setCitas(nuevasCitas);
    };

    const filtrarCitas = (cita) => {
        return cita.nombre.toLowerCase().includes(filtro.toLowerCase());
    };

    const columns = [
        { name: 'Nombre', selector: row => row.nombre, sortable: true },
        { name: 'Fecha', selector: row => row.fecha, sortable: true },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true,
            cell: row => (
                <span className={
                    row.estado === 'Aceptada' ? 'text-green-500' :
                        row.estado === 'Rechazada' ? 'text-red-500' : 'text-black'
                }>
                    {row.estado}
                </span>
            )
        },
        {
            name: '',
            cell: row => row.estado === 'Pendiente' && (
                <div className="flex justify-center items-center space-x-3">
                    <button
                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition mb-2"
                        onClick={() => handleAceptar(row.id)}
                    >
                        <IoCheckmarkCircleOutline className="h-5 w-5" />
                    </button>
                    <button
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition mb-2"
                        onClick={() => handleRechazar(row.id)}
                    >
                        <IoCloseCircleOutline className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">

            <div className="flex mb-3">
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
            </div>

            <DataTable
                title="Lista de Citas"
                columns={columns}
                data={citas.filter(filtrarCitas)}
                highlightOnHover
                responsive
                dense
                noDataComponent={ (citas.filter(filtrarCitas).length === 0 && initialCitas.length > 0)
                    ? <p className="text-center mb-5 font-bold">No hay citas, para ese paciente</p>
                    : <p className="text-center mb-5 font-bold">No hay citas para mostrar</p>
                }
            />

        </div>
    );
};
