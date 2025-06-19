import React, { useState, useMemo } from "react";

const TreatmentButton = ({ item, onAdd, type }) => (
  <button
    onClick={() => onAdd(item)}
    className={`
      w-full px-4 py-3 rounded-lg transition-all 
      ${type === 'treatment' 
        ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300' 
        : 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300'
      } 
      shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none
    `}
  >
    {item.nombre} - ${item.precio.toLocaleString()}
  </button>
);

export const Factura = () => {
  const tratamientosDisponibles = [
    { id: 1, nombre: "Extracción de muela", precio: 50000 },
    { id: 2, nombre: "Limpieza dental", precio: 80000 },
    { id: 3, nombre: "Blanqueamiento dental", precio: 150000 },
    { id: 4, nombre: "Carilla dental", precio: 250000 },
  ];

  const paquetesDisponibles = [
    { id: 1, nombre: "Paquete Básico (Limpieza + Extracción)", precio: 120000 },
    { id: 2, nombre: "Paquete Completo (Limpieza + Blanqueamiento + Carilla)", precio: 350000 },
  ];

  const [tratamientosSeleccionados, setTratamientosSeleccionados] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTratamientos = useMemo(() => 
    tratamientosDisponibles.filter(t => 
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [searchTerm, tratamientosDisponibles]
  );

  const filteredPaquetes = useMemo(() => 
    paquetesDisponibles.filter(p => 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [searchTerm, paquetesDisponibles]
  );

  const agregarAlCarrito = (tratamiento) => {
    if (!tratamientosSeleccionados.some(t => t.id === tratamiento.id)) {
      setTratamientosSeleccionados(prev => [...prev, tratamiento]);
      setPrecioTotal(prev => prev + tratamiento.precio);
    }
  };

  const eliminarTratamiento = (id) => {
    const tratamientoEliminado = tratamientosSeleccionados.find(
      (tratamiento) => tratamiento.id === id
    );
    setTratamientosSeleccionados(prev =>
      prev.filter((tratamiento) => tratamiento.id !== id)
    );
    setPrecioTotal(prev => prev - tratamientoEliminado.precio);
  };

  const cerrarFactura = () => {
    if (tratamientosSeleccionados.length === 0) {
      alert("No hay tratamientos seleccionados");
      return;
    }
    alert(`Factura cerrada. Total: $${precioTotal.toLocaleString()}`);
    setTratamientosSeleccionados([]);
    setPrecioTotal(0);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Factura Odontológica</h1>
        </div>
        
        <div className="p-6 space-y-6">
          <input 
            type="text" 
            placeholder="Buscar tratamientos o paquetes" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Tratamientos</h3>
              {filteredTratamientos.map((tratamiento) => (
                <TreatmentButton 
                  key={tratamiento.id} 
                  item={tratamiento} 
                  onAdd={agregarAlCarrito} 
                  type="treatment"
                />
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Paquetes</h3>
              {filteredPaquetes.map((paquete) => (
                <TreatmentButton 
                  key={paquete.id} 
                  item={paquete} 
                  onAdd={agregarAlCarrito} 
                  type="package"
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tratamientos Seleccionados</h2>
            {tratamientosSeleccionados.length === 0 ? (
              <p className="text-gray-600 text-center">No hay tratamientos seleccionados.</p>
            ) : (
              <ul className="space-y-3">
                {tratamientosSeleccionados.map((tratamiento) => (
                  <li
                    key={tratamiento.id}
                    className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span className="text-gray-700">
                      {tratamiento.nombre} - ${tratamiento.precio.toLocaleString()}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => eliminarTratamiento(tratamiento.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="text-right mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-blue-600">${precioTotal.toLocaleString()}</span>
            </h2>
          </div>

          <button
            onClick={cerrarFactura}
            disabled={tratamientosSeleccionados.length === 0}
            className={`
              w-full py-4 rounded-lg text-lg font-bold transition-all 
              ${tratamientosSeleccionados.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }
            `}
          >
            Cerrar Factura
          </button>
        </div>
      </div>
    </div>
  );
};