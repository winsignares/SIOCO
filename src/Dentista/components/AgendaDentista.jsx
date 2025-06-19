

import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AgendaDentista = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // Datos de ejemplo - En un caso real vendrían de una API
  const pacientes = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      telefono: '555-0123',
      email: 'juan@email.com',
      ultimaCita: '2024-01-15',
      estado: 'activo'
    },
    {
      id: 2,
      nombre: 'María García',
      telefono: '555-0124',
      email: 'maria@email.com',
      ultimaCita: '2024-01-10',
      estado: 'pendiente'
    },
    {
      id: 3,
      nombre: 'Luis Hernández',
      telefono: '555-0125',
      email: 'luis@email.com',
      ultimaCita: '2024-01-05',
      estado: 'pendiente'
    },
    {
      id: 4,
      nombre: 'Ana García',
      telefono: '555-0126',
      email: 'ana@email.com',
      ultimaCita: '2024-01-01',
      estado: 'pendiente'
    }
  ];

  const itemsPerPage = 7;
  const totalPages = Math.ceil(pacientes.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const filteredPacientes = pacientes.filter(paciente => {
    const matchSearch = paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       paciente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'todos' || paciente.estado === filterStatus;
    return matchSearch && matchStatus;
  });

  const paginatedPacientes = filteredPacientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-6 bg-white">
      {/* Header y Filtros */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-64">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Buscar paciente..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <select
          value={filterStatus}
          onChange={handleStatusFilter}
          className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="todos">Todos</option>
          <option value="activo">Activo</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </div>

      {/* Tabla de Pacientes */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Cita</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPacientes.map((paciente) => (
              <tr key={paciente.id} className="hover:bg-gray-50">
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  
                  <Link to={`/dentista/HistoriaClinica/${paciente.id}`}>
                    {paciente.nombre}
                  </Link>
                
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.telefono}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paciente.ultimaCita}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    paciente.estado === 'activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {paciente.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                      title="Ver Odontograma"
                    >
                      🦷
                    </button>


                    <Link
                      to={`/dentista/factura/${paciente.id}`} 
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                      title="Generar Factura"
                    >
                      📄
                    </Link>

                    <button 
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                      title="Ver Citas"
                    >
                      📅
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-lg ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};