
import { useState } from 'react';

import { ChevronDown, ChevronUp, User } from 'lucide-react';
import DataTable from 'react-data-table-component';

import useAuthStore from '../../store/authStore.js';

const paciente = {
  nombre: "Juan Perez",
  edad: 30,
  genero: "Masculino",
  telefono: "123456789",
  email: "juan.perez@example.com",
  citas: [
    { id: 1, fecha: "2024-01-15", hora: "10:00 A.M.", motivo: "Revisión", tratamiento: "Limpieza dental", notas: "Todo bien" },
    { id: 2, fecha: "2024-02-20", hora: "14:30 P.M.", motivo: "Dolor de muela", tratamiento: "Endodoncia", notas: "Recuperación en progreso" },
    { id: 3, fecha: "2024-03-10", hora: "16:00 P.M.", motivo: "Caries", tratamiento: "Ortodoncia", notas: "Se le aplicó la profilaxis" }
  ],
  tratamientos: [
    { id: 1, fecha: "2024-02-20", hora: "14:30 P.M.", descripcion: "Endodoncia", resultado: "Éxito" },
    { id: 2, fecha: "2024-03-10", hora: "16:00 P.M.", descripcion: "Ortodoncia", resultado: "Fallido" },
    { id: 3, fecha: "2024-04-15", hora: "10:00 A.M.", descripcion: "Profilaxis", resultado: "En progreso" }
  ],
  examenes: [
    { id: 1, fecha: "2024-01-10", hora: "10:00 A.M.",  tipo: "Radiografía", resultados: "Sin anomalías" },
    { id: 2, fecha: "2024-02-15", hora: "14:30 P.M.",  tipo: "Ecografiía", resultados: "Anomalias" },
    { id: 3, fecha: "2024-03-20", hora: "16:00 P.M.", tipo: "Laboratorio", resultados: "En progreso" }
  ]
};

const columnsCitas = [
  { name: <p className="font-bold">Fecha</p>,        selector: row => row.fecha, sortable: true, },
  { name: <p className="font-bold">Hora</p> ,        selector: row => row.hora, sortable: true },
  { name: <p className="font-bold"> Motivo</p>,      selector: row => row.motivo, sortable: false },
  { name: <p className="font-bold">Tratamiento</p>,  selector: row => row.tratamiento, sortable: false },
  { name: <p className="font-bold">Notas</p>,        selector: row => row.notas, sortable: false }
];

const columnsTratamientos = [
  { name: <p className="font-bold">Fecha</p>,        selector: row => row.fecha, sortable: true, },
  { name: <p className="font-bold">Hora</p> ,        selector: row => row.hora, sortable: true },
  { name: <p className="font-bold"> Descripción</p>, selector: row => row.descripcion, sortable: false },
  { name: <p className="font-bold">Resultado</p>,    selector: row => row.resultado, sortable: true }
];

const columnsExamenes = [
  { name: <p className="font-bold">Fecha</p>,        selector: row => row.fecha, sortable: true, },
  { name: <p className="font-bold">Hora</p> ,        selector: row => row.hora, sortable: true },
  { name: <p className="font-bold">Tipo</p>,         selector: row => row.tipo, sortable: true },
  { name: <p className="font-bold">Resultados</p>,   selector: row => row.resultados, sortable: true }
];


export const HistorialMedico = () => {
  const [showCitas, setShowCitas] = useState(false);
  const [showTratamientos, setShowTratamientos] = useState(false);
  const [showExamenes, setShowExamenes] = useState(false);

  // const { username } = useAuthStore(state => ({
  //   username: state.username,
  // }));
  
  const username = 'Andrew Sosa';

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-5xl mx-auto">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">
        <User className="inline-block w-8 h-8 text-blue-500 mr-2" />
        Historial Médico de {username}
      </h2>

      {/* Datos Personales */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-600">Datos Personales</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold text-gray-700">Nombre:</span> {username}</p>
          <p><span className="font-semibold text-gray-700">Edad:</span> {paciente.edad}</p>
          <p><span className="font-semibold text-gray-700">Género:</span> {paciente.genero}</p>
          <p><span className="font-semibold text-gray-700">Teléfono:</span> {paciente.telefono}</p>
          <p><span className="font-semibold text-gray-700">Email:</span> {username}@gmail.com</p>
        </div>
      </div>

      {/* Sección Citas */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between bg-blue-100 p-3 rounded-lg cursor-pointer"
          onClick={() => setShowCitas(!showCitas)}
        >
          <h3 className="text-lg font-semibold text-blue-600">Citas Anteriores</h3>
          {showCitas ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-blue-600" />}
        </div>
        {showCitas && (
          <div className="bg-white p-4 mt-2 rounded-lg shadow-md">
            <DataTable
              columns={columnsCitas}
              data={paciente.citas}
              highlightOnHover
              striped
              responsive
              dense
              customStyles={{
                rows: { style: { fontSize: '14px' } },
                headCells: { style: { fontWeight: 'bold', fontSize: '16px' } },
              }}
              noDataComponent="No hay citas previas"
            />
          </div>
        )}
      </div>

      {/* Sección Tratamientos */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between bg-green-100 p-3 rounded-lg cursor-pointer"
          onClick={() => setShowTratamientos(!showTratamientos)}
        >
          <h3 className="text-lg font-semibold text-green-600">Tratamientos Realizados</h3>
          {showTratamientos ? <ChevronUp className="text-green-600" /> : <ChevronDown className="text-green-600" />}
        </div>
        {showTratamientos && (
          <div className="bg-white p-4 mt-2 rounded-lg shadow-md">
            <DataTable
              columns={columnsTratamientos}
              data={paciente.tratamientos}
              highlightOnHover
              striped
              responsive
              dense
              customStyles={{
                rows: { style: { fontSize: '14px' } },
                headCells: { style: { fontWeight: 'bold', fontSize: '16px' } },
              }}
              noDataComponent="No hay tratamientos realizados"
            />
          </div>
        )}
      </div>

      {/* Sección Exámenes */}
      <div>
        <div
          className="flex items-center justify-between bg-yellow-100 p-3 rounded-lg cursor-pointer"
          onClick={() => setShowExamenes(!showExamenes)}
        >
          <h3 className="text-lg font-semibold text-yellow-600">Exámenes</h3>
          {showExamenes ? <ChevronUp className="text-yellow-600" /> : <ChevronDown className="text-yellow-600" />}
        </div>
        {showExamenes && (
          <div className="bg-white p-4 mt-2 rounded-lg shadow-md">
            <DataTable
              columns={columnsExamenes}
              data={paciente.examenes}
              highlightOnHover
              striped
              responsive
              dense
              customStyles={{
                rows: { style: { fontSize: '14px' } },
                headCells: { style: { fontWeight: 'bold', fontSize: '16px' } },
              }}
              noDataComponent="No hay exámenes"
            />
          </div>
        )}
      </div>
    </div>
  );
};