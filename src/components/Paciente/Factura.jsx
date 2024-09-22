import React from 'react';
import { useParams } from 'react-router-dom';

import image from '../../assets/Icono.png';

const facturasData = [
  { id: 1, dia: 'Lunes', fecha: '2024-06-30', numeroCuenta: '123456', monto: 200.50 },
  { id: 2, dia: 'Viernes', fecha: '2024-07-05', numeroCuenta: '654321', monto: 150.75 },
  // Puedes agregar más datos aquí
];

export const Factura = () => {
  const { id } = useParams();
  const factura = facturasData.find(factura => factura.id === parseInt(id));

  if (!factura || isNaN(id)) {
    return <div className="text-center text-red-500 mt-10">Factura no encontrada</div>;
  }

  return (
    <div className="max-w-max mx-auto mt-8 p-8 bg-white shadow-md rounded-xl">

      <div className="text-center mb-8">
        <div className="mx-auto h-16 w-16 rounded-full overflow-hidden">
          <img src={image} alt="Logo" className="h-full w-full object-cover" />
        </div>
        <h1 className="text-3xl font-extrabold text-indigo-600 mt-1">Detalles de la Factura</h1>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Día:</span>
          <span className="text-lg font-semibold text-gray-900">{factura.dia}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Fecha:</span>
          <span className="text-lg font-semibold text-gray-900">{factura.fecha}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Número de Cuenta:</span>
          <span className="text-lg font-semibold text-gray-900">{factura.numeroCuenta}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Monto:</span>
          <span className="text-lg font-semibold text-gray-900">${factura.monto.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mt-8 w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
      >
        Volver
      </button>
    </div>
  );
};
