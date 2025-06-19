

import { useState, useMemo } from 'react';

import { Calendario } from '../../components';


export const Dentistas = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage] = useState(5);
    
    const [selectedDentist, setSelectedDentist] = useState(null);

    // Datos de ejemplo
    const [dentistas] = useState([
        {
            id: 1,
            nombre: "Dr. Juan Pérez",
            especialidad: "Ortodoncia",
            experiencia: "8 años",
            disponibilidad: "Lun-Vie",
            rating: 4.8
        },
        {
            id: 2,
            nombre: "Dra. María García",
            especialidad: "Endodoncia",
            experiencia: "12 años",
            disponibilidad: "Mar-Sab",
            rating: 4.9
        },
        {
            id: 3,
            nombre: "Dr. Carlos López",
            especialidad: "Cirugía Dental",
            experiencia: "15 años",
            disponibilidad: "Lun-Jue",
            rating: 4.7
        },
        // Agrega más datos para probar la paginación
        {
            id: 4,
            nombre: "Dra. Ana Martínez",
            especialidad: "Ortodoncia",
            experiencia: "10 años",
            disponibilidad: "Lun-Vie",
            rating: 4.6
        },
        {
            id: 5,
            nombre: "Dr. Roberto Sánchez",
            especialidad: "Periodoncia",
            experiencia: "9 años",
            disponibilidad: "Mar-Sab",
            rating: 4.8
        },
        {
            id: 6,
            nombre: "Dra. Laura Torres",
            especialidad: "Endodoncia",
            experiencia: "11 años",
            disponibilidad: "Lun-Jue",
            rating: 4.9
        }
    ]);

    // Filtrar dentistas
    const filteredDentistas = useMemo(() => {
        return dentistas.filter(dentista =>
            dentista.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dentista.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [dentistas, searchTerm]);

    // Calcular paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDentistas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDentistas.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleVerHorario = (dentista) => {
        setSelectedDentist(dentista);
    };

    if (selectedDentist) {
        return (
            <Calendario
                dentista={selectedDentist} 
                onClose={() => setSelectedDentist(null)}
            />
        );
    }
    
    
    

    return (
        <div className="p-6">
            <div className="flex flex-col space-y-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Lista de Dentistas</h1>

                {/* Barra de búsqueda */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o especialidad..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Especialidad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Experiencia
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Disponibilidad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rating
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((dentista) => (
                            <tr key={dentista.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{dentista.nombre}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{dentista.especialidad}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{dentista.experiencia}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{dentista.disponibilidad}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {dentista.rating} ★
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleVerHorario(dentista)}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            Ver Horario
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-4 px-4"> {/* Cambiamos justify-between por justify-center */}
                <div className="flex space-x-2 items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Anterior
                    </button>
                    
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>


        </div>
    );
};