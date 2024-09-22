import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const initialData = [
    { id: 1, dia: 'Lunes', fecha: '2024-06-30', numeroCuenta: '123456', monto: 200.50, Tratamiento: 'Ortodoncia' },
    { id: 2, dia: 'Viernes', fecha: '2024-07-05', numeroCuenta: '654321', monto: 150.75 , Tratamiento: 'Extracción de dientes' },
    { id: 3, dia: 'Miercoles', fecha: '2024-07-10', numeroCuenta: '987654', monto: 300.20, Tratamiento: 'Endodoncia' },
    { id: 4, dia: 'Jueves', fecha: '2024-07-15', numeroCuenta: '135791', monto: 175.90, Tratamiento: 'Ortodoncia' },
];

export const Facturas = () => {
    const [facturas, setFacturas] = useState(initialData);
    const navigate = useNavigate();

    const columns = [
        { name: 'Día', selector: row => row.dia, sortable: true },
        { name: 'Fecha', selector: row => row.fecha, sortable: true },
        { name: 'Número de Cuenta', selector: row => row.numeroCuenta, sortable: true },
        { name: 'Monto', selector: row => row.monto, sortable: true },
        { name: 'Tratamiento', selector: row => row.Tratamiento, sortable: true },

        {
            
            cell: row => (
                <button
                    onClick={() => navigate(`/verFacturas/${row.id}`)}
                    className="text-blue-500 hover:underline"
                >
                    Ver más
                </button>
            ),
            
        },
    ];

    return (
        <div>
            <DataTable
                title="Lista de Facturas"
                columns={columns}
                data={facturas}
                highlightOnHover
                responsive
                // striped
                dense
                noDataComponent="No hay facturas disponibles, agrega una nueva!"
            />
        </div>
    );
};
