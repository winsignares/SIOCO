import DataTable from 'react-data-table-component';
import useAuthStore from '../../store/authStore.js';
import { useState } from 'react';

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

    const {username } = useAuthStore(state => ({
        username: state.username
    }));
  
    return (
      <div className="p-6 bg-whie rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Historial Médico de {username}</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Datos Personales</h3>
          <p><span className="font-semibold">Nombre:</span> {username}</p>
          <p><span className="font-semibold">Edad:</span> {paciente.edad}</p>
          <p><span className="font-semibold">Género:</span> {paciente.genero}</p>
          <p><span className="font-semibold">Teléfono:</span> {paciente.telefono}</p>
          <p><span className="font-semibold">Email:</span> {username}@gmail.com </p>
        </div>
        
        <div className="mb-6">
          <h3 
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => setShowCitas(!showCitas)}
          >
            Citas Anteriores {showCitas ? '-' : '+'}
          </h3>
          {showCitas && (
            <DataTable
              columns={columnsCitas}
              data={paciente.citas}
              highlightOnHover
              responsive
              // striped
              dense
              noDataComponent="No hay citas previas"
            />
          )}
        </div>
        
        <div className="mb-6">
          <h3 
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => setShowTratamientos(!showTratamientos)}
          >
            Tratamientos Realizados {showTratamientos ? '-' : '+'}
          </h3>
          {showTratamientos && (
            <DataTable
              columns={columnsTratamientos}
              data={paciente.tratamientos}
              highlightOnHover
              responsive
              // striped
              dense
              noDataComponent="No hay tratamientos realizados"
            />
          )}
        </div>
        
        <div>
          <h3 
            className="text-xl font-semibold mb-2 cursor-pointer"
            onClick={() => setShowExamenes(!showExamenes)}
          >
            Exámenes {showExamenes ? '-' : '+'}
          </h3>
          {showExamenes && (
            <DataTable
              columns={columnsExamenes}
              data={paciente.examenes}
              highlightOnHover
              responsive
              // striped
              dense
              noDataComponent="No hay exámenes"
            />
          )}
        </div>
      </div>
  );
};

