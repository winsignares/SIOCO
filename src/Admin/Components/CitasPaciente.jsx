import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Datos simulados de citas
const citas = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  date: `2024-12-${(i % 30) + 1}`,
  time: `${(i % 12) + 1}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
  doctor: `Dr./Dra. ${i % 2 === 0 ? 'Carlos López' : 'María Pérez'}`,
  status: i % 3 === 0 ? 'Completada' : i % 3 === 1 ? 'Pendiente' : 'Cancelada',
  treatments: [
    { name: 'Limpieza Dental', cost: 50 },
    { name: 'Blanqueamiento Dental', cost: 120 },
  ].slice(0, (i % 3) + 1),
}));

export const CitasPaciente = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCita, setSelectedCita] = useState(null);

  // Estados para filtros
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const rowsPerPage = 7;

  // Filtros
  const filteredCitas = citas.filter((cita) => {
    const matchesStatus = searchStatus ? cita.status === searchStatus : true;
    const matchesDoctor = searchDoctor
      ? cita.doctor.toLowerCase().includes(searchDoctor.toLowerCase())
      : true;
    const matchesDate =
      (!startDate || new Date(cita.date) >= new Date(startDate)) &&
      (!endDate || new Date(cita.date) <= new Date(endDate));

    return matchesStatus && matchesDoctor && matchesDate;
  });

  const totalPages = Math.ceil(filteredCitas.length / rowsPerPage);
  const displayedCitas = filteredCitas.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelectCita = (citaId) => {
    const cita = citas.find((c) => c.id === citaId);
    setSelectedCita(cita);
  };

  const handleCloseDetails = () => {
    setSelectedCita(null);
  };

  return (
    <div className="p-6 mt-10">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">
        Citas del Paciente ID: {id}
      </h1>

      {/* Filtros */}
      <div className=" bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">Todos los Estados</option>
          <option value="Completada">Completada</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelada">Cancelada</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por Doctor"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
          value={searchDoctor}
          onChange={(e) => setSearchDoctor(e.target.value)}
        />

        
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
          onClick={() => {
            setSearchStatus('');
            setSearchDoctor('');
            setCurrentPage(1);
          }}
        >
          Limpiar Filtros
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Hora</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {displayedCitas.map((cita) => (
              <tr
                key={cita.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleSelectCita(cita.id)}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{cita.date}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{cita.time}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{cita.doctor}</td>
                <td
                  className={`px-6 py-4 text-sm font-semibold ${
                    cita.status === 'Completada'
                      ? 'text-green-600'
                      : cita.status === 'Pendiente'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {cita.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </button>
        <p className="text-sm font-medium text-gray-600">
          Página {currentPage} de {totalPages}
        </p>
        <button
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </button>
      </div>

      {/* Modal para Detalles de la Cita */}
      {selectedCita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Detalles de la Cita
            </h2>
            <p className="text-md text-gray-600">
              <strong>Fecha:</strong> {selectedCita.date}
            </p>
            <p className="text-md text-gray-600">
              <strong>Hora:</strong> {selectedCita.time}
            </p>
            <p className="text-md text-gray-600">
              <strong>Doctor:</strong> {selectedCita.doctor}
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Tratamientos Realizados:
              </h3>
              {selectedCita.treatments.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedCita.treatments.map((treatment, index) => (
                    <li key={index}>
                      {treatment.name} - ${treatment.cost.toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No se realizaron tratamientos.</p>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Total: $
                {selectedCita.treatments
                  .reduce((total, treatment) => total + treatment.cost, 0)
                  .toFixed(2)}
              </h3>
            </div>
            <button
              className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
              onClick={handleCloseDetails}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
