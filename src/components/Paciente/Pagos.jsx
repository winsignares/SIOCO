import { useState } from 'react';

const tratamientos = [
    { id: 1, nombre: 'Limpieza Dental', precio: 50 },
    { id: 2, nombre: 'Endodoncia', precio: 150 },
    { id: 3, nombre: 'Blanqueamiento Dental', precio: 200 },
];

export const Pagos = () => {
    const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState('');
    const [numeroCuenta, setNumeroCuenta] = useState('');

    return (
        <div className="flex justify-center items-center mt-20">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Realizar Pago</h2>

                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2 text-indigo-700" htmlFor="tratamiento">Tratamiento:</label>
                    <select
                        id="tratamiento"
                        value={tratamientoSeleccionado}
                        onChange={(e) => setTratamientoSeleccionado(e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                    >
                        <option value="">Seleccione un tratamiento...</option>
                        {tratamientos.map(tratamiento => (
                            <option key={tratamiento.id} value={tratamiento.id}>
                                {tratamiento.nombre} - ${tratamiento.precio}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2 text-indigo-700" htmlFor="numeroCuenta">Número de Cuenta:</label>
                    <input
                        placeholder="Numero de Cuenta"
                        type="number"
                        id="numeroCuenta"
                        value={numeroCuenta}
                        onChange={(e) => setNumeroCuenta(e.target.value)}
                        className="w-full p-2 text-gray-800 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-700"
                    />
                </div>


                <div className="flex justify-center items-center">

                    <button
                        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Pagar
                    </button>
                </div>

            </form>
        </div>
    )
}


