
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { getPatientAppointments } from '../Helpers';
import { Loading } from '../../components/Loading';  

import useAuthStore from '../../store/authStore';

export const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [loading, setLoading] = useState(true);  
    const { urlSecundaria, token, id } = useAuthStore();

    // Estados para los filtros
    const [doctorFilter, setDoctorFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [fechaFilter, setFechaFilter] = useState('');

    const columns = [
        {
            name: 'Fecha',
            selector: row => new Date(row.date).toLocaleDateString('es-ES'), // Formato DD/MM/YYYY
            sortable: true,
        },
        {
            name: 'Hora',
            selector: row => new Date(row.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sortable: true
        },
        {
            name: 'Dentista',
            selector: row => row.dentist_name, 
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => {
                switch (row.status) {
                    case 1:
                        return 'Pendiente';
                    case 2:
                        return 'Confirmado';
                    case 3:
                        return 'Cancelado';
                    default:
                        return 'Desconocido';
                }
            },
            sortable: true,
        },
    ];

    const handleSubmit = async () => {
        setLoading(true);  
        try {
            const response = await getPatientAppointments(urlSecundaria[0].domain, token, id);

            if (response && response.data) {
                const formattedAppointments = response.data.map(appointment => ({
                    id: appointment.id,
                    date: appointment.date,  
                    dentist_name: appointment.dentist_name, 
                    status: appointment.status,
                }));

                setCitas(formattedAppointments);  
            } else {
                setCitas([]);  
            }
        } catch (error) {
            console.error('Error al obtener las citas:', error);  
            setCitas([]);  
        }
        setLoading(false);  
    };

    useEffect(() => {
        handleSubmit();
    }, [urlSecundaria, token, id]);

    // Función para filtrar las citas
    const filterData = () => {
        let filtered = citas;

        if (doctorFilter) {
            filtered = filtered.filter(cita => cita.dentist_name.toLowerCase().includes(doctorFilter.toLowerCase()));
        }

        if (estadoFilter) {
            const statusMap = { 'Pendiente': 1, 'Confirmado': 2, 'Cancelado': 3 };
            filtered = filtered.filter(cita => cita.status === statusMap[estadoFilter]);
        }

        if (fechaFilter) {
            filtered = filtered.filter(cita => new Date(cita.date).toLocaleDateString('es-ES') === fechaFilter);
        }

        setFilteredCitas(filtered);  
    };

    useEffect(() => {
        filterData();  
    }, [doctorFilter, estadoFilter, fechaFilter, citas]);
     

    return (
        <div>
            {/* Filtros */}
            <div className="mt-6 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Filtrar Citas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Filtrar por Doctor</label>
                        <input
                            type="text"
                            id="doctor"
                            placeholder="Buscar por nombre"
                            value={doctorFilter}
                            onChange={(e) => setDoctorFilter(e.target.value)}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Filtrar por Estado</label>
                        <select
                            id="estado"
                            value={estadoFilter}
                            onChange={(e) => setEstadoFilter(e.target.value)}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-purple-500"
                        >
                            <option value="">Filtrar por estado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Confirmado">Confirmado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Filtrar por Fecha</label>
                        <input
                            type="date"
                            id="fecha"
                            value={fechaFilter}
                            onChange={(e) => setFechaFilter(e.target.value)}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Mostrar loading o DataTable */}
            {loading ? (  
                <Loading />
            ) : (
                <div className="rounded-lg p-4 overflow-x-auto">
                    <DataTable
                        title="Lista de Citas"
                        columns={columns}
                        data={filteredCitas}  // Usa las citas filtradas
                        highlightOnHover
                        responsive
                        dense
                        noDataComponent="No hay citas previas !!!"
                        pagination  
                        paginationPerPage={5}  // Registros por página
                        paginationRowsPerPageOptions={[5]}  // Solo mostrar 5 como opción
                        paginationTotalRows={filteredCitas.length}  // Total de registros
                        paginationComponentOptions={{
                            rowsPerPageText: 'Registros por página',
                            rangeSeparatorText: 'de',
                            noRowsPerPage: false,
                        }}  
                    />
                </div>
            )}
        </div>
    );
};
