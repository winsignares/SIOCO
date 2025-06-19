
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

export const Nota = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para guardar la nota
    console.log('Nota guardada:', { titulo, descripcion });
    
    // Limpiar formulario después de guardar
    setTitulo('');
    setDescripcion('');
  };

  return (
    <div className=" mt-7 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#4338ca] p-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            Crear Nueva Nota
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titulo">
              Título
            </label>
            <input 
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ingresa el título de tu nota"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4338ca]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea 
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Escribe los detalles de tu nota"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4338ca]"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex items-center justify-center bg-[#4338ca] text-white py-2 rounded-md hover:bg-[#3730a3] transition duration-300"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Guardar Nota
          </button>
        </form>
      </div>
    </div>
  );
}