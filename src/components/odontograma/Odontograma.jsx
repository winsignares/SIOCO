import { Teeth } from "./Teeth";
import { useState } from "react";

const TREATMENTS = {
  caries: {
    name: "Caries",
    color: "fill-red-500"
  },
  restoration: {
    name: "Restauración",
    color: "fill-green-500"
  },
  extraction: {
    name: "Extracción",
    color: "fill-purple-500"
  },
  crown: {
    name: "Corona",
    color: "fill-yellow-500"
  },
  implant: {
    name: "Implante",
    color: "fill-orange-500"
  }
};

export const Odontograma = () => {
  const [toothStates, setToothStates] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [note, setNote] = useState("");

  const handleToothUpdate = (toothNumber, zone, treatment) => {
    setToothStates(prev => ({
      ...prev,
      [toothNumber]: {
        ...prev[toothNumber],
        [zone]: treatment
      }
    }));
  };

  const handleZoneClick = (toothNumber, zone) => {
    setSelectedTooth(toothNumber);
    setSelectedZone(zone);
    setModalOpen(true);
  };

  const handleSave = () => {
    handleToothUpdate(selectedTooth, selectedZone, selectedTreatment);
    setModalOpen(false);
    setSelectedTreatment(null);
    setNote("");
  };

  return (
    <div className="flex flex-col items-center  mt-28 ml-24">
      
      {/* Dientes superiores */}
      <div className="w-full max-w-4xl">
        <svg width="800" height="200" viewBox="0 0 800 200">
          <Teeth 
            start={18} 
            end={11} 
            x={100} 
            y={50} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
          <Teeth 
            start={21} 
            end={28} 
            x={360} 
            y={50} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
        </svg>
      </div>

      {/* Línea divisoria */}
      {/* <div className="w-full max-w-4xl border-t-2 border-gray-300"></div> */}

      {/* Dientes inferiores */}
      <div className="w-full max-w-4xl">
        <svg width="800" height="200" viewBox="0 0 800 200">
          <Teeth 
            start={48} 
            end={41} 
            x={100} 
            y={-90} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
          <Teeth 
            start={31} 
            end={38} 
            x={360} 
            y={-90} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
        </svg>
      </div>

      {/* Detencion Temporal */}
      <div className="w-full max-w-4xl">
        <svg width="800" height="200" viewBox="0 0 800 200">
          <Teeth 
            start={55} 
            end={51} 
            x={190} 
            y={-230} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
          <Teeth 
            start={61} 
            end={65} 
            x={360} 
            y={-230} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
        </svg>
      </div>

      <div className="w-full max-w-4xl">
        <svg width="800" height="200" viewBox="0 0 800 200">
          <Teeth 
            start={85} 
            end={81} 
            x={190} 
            y={-370} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
          <Teeth 
            start={71} 
            end={75} 
            x={360} 
            y={-370} 
            handleChange={handleToothUpdate}
            onZoneClick={handleZoneClick}
            treatments={toothStates}
          />
        </svg>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setModalOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-96 max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Diente {selectedTooth} - Zona {selectedZone}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar tratamiento
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(TREATMENTS).map(([key, treatment]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTreatment(key)}
                    className={`p-2 rounded-md text-sm ${
                      selectedTreatment === key 
                        ? 'bg-blue-100 border-2 border-blue-500' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {treatment.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas adicionales
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Agregar notas..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!selectedTreatment}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};