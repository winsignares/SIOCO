import { useState } from 'react';
import DataTable from 'react-data-table-component';

const data = [
    { id: 1, fecha: '2024-06-30', dentista: 'Dr. Smith', hora: '10:00 A.M.', pagado: true },
    { id: 2, fecha: '2024-07-05', dentista: 'Dr. Johnson', hora: '14:30 P.M.', pagado: false },
];

export const Citas = () => {
    const [citas, setCitas] = useState(data);


    const columns = [
        { name: 'Fecha', selector: row => row.fecha, sortable: true },
        { name: 'Hora', selector: row => row.hora, sortable: true },
        { name: 'Dentista', selector: row => row.dentista, sortable: true },
        {
            name: 'Pagado',
            selector: row => row.pagado ? 'Pagado' : 'Sin pagar',
            sortable: true,
            cell: row => (
                <div className={row.pagado ? 'text-green-500' : 'text-red-600'}>
                    {row.pagado ? 'Pagado' : 'Sin pagar'}
                </div>
            )
        }    ];

    
    return (
        <div>
            <DataTable
                title="Lista de Citas "
                columns={columns}
                data={citas}
                // pagination
                highlightOnHover
                responsive
                // striped
                 dense
                noDataComponent="No hay citas previas, agrega una nueva!"
            />
        </div>
    );
};

