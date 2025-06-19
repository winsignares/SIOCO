
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTooth, FaBrush, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';


// Tratamientos individuales
const individualTreatments = [
    { id: 1, name: 'Limpieza Dental', date: '2024-12-20', status: 'Completado', icon: FaBrush },
    { id: 2, name: 'Blanqueamiento Dental', date: '2024-12-18', status: 'En Progreso', icon: FaTooth },
    { id: 3, name: 'Ortodoncia', date: '2024-12-10', status: 'Pendiente', icon: FaTooth },
];

// Paquetes con tratamientos
const dentalPackages = [
    {
        id: 1,
        name: 'Paquete Básico',
        treatments: [
            { name: 'Chequeo General', date: '2024-12-18', status: 'Completado', icon: FaTooth },
            { name: 'Sellantes', date: '2024-12-15', status: 'Completado', icon: FaBrush },
        ],
    },
    {
        id: 2,
        name: 'Paquete Avanzado',
        treatments: [
            { name: 'Blanqueamiento Avanzado', date: '2024-12-12', status: 'Pendiente', icon: FaTooth },
            { name: 'Carillas', date: '2024-12-10', status: 'Pendiente', icon: FaTooth },
        ],
    },
];

export const TratamientosPaciente = () => {
    const { id } = useParams();
    const [openPackage, setOpenPackage] = useState(null);

    const togglePackage = (packageId) => {
        setOpenPackage((prev) => (prev === packageId ? null : packageId));
    };

    return (
        <div className="p-6">
            {/* <h1 className="text-3xl font-bold   text-center">
        Historial Odontológico del Paciente ID: {id}
      </h1> */}

            {/* Tratamientos individuales */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
                    Tratamientos Individuales
                </h2>
                <ul className="space-y-4">
                    {individualTreatments.map((treatment) => (
                        <li
                            key={treatment.id}
                            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
                        >
                            <div className="flex items-center space-x-4">
                                <treatment.icon className="text-indigo-600 text-3xl" />
                                <div>
                                    <p className="text-lg font-medium text-gray-800">{treatment.name}</p>
                                    <p className="text-sm text-gray-600">Fecha: {treatment.date}</p>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 text-sm font-semibold rounded-full ${treatment.status === 'Completado'
                                        ? 'bg-green-100 text-green-700'
                                        : treatment.status === 'En Progreso'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {treatment.status === 'Completado' && <FaCheckCircle className="float-left mr-2" />}
                                {treatment.status === 'En Progreso' && <FaHourglassHalf className="float-left mr-2" />}
                                {treatment.status === 'Pendiente' && <FaTimesCircle className="float-left mr-2" />}
                                {treatment.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Paquetes */}
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
                    Paquetes Odontológicos
                </h2>
                <ul className="space-y-4">
                    {dentalPackages.map((pkg) => (
                        <li
                            key={pkg.id}
                            className="bg-gray-100 rounded-lg shadow-md p-4 cursor-pointer"
                            onClick={() => togglePackage(pkg.id)}
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-medium text-gray-800">{pkg.name}</p>
                                <span
                                    className={`text-sm font-semibold px-3 py-1 rounded-full ${openPackage === pkg.id ? 'bg-teal-500 text-white' : 'bg-gray-300 text-gray-700'
                                        }`}
                                >
                                    {openPackage === pkg.id ? 'Cerrar' : 'Ver más'}
                                </span>
                            </div>

                            {openPackage === pkg.id && (
                                <ul className="mt-4 space-y-2">
                                    {pkg.treatments.map((treatment, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <treatment.icon className="text-indigo-600 text-2xl" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{treatment.name}</p>
                                                    <p className="text-xs text-gray-600">Fecha: {treatment.date}</p>
                                                </div>
                                            </div>
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${treatment.status === 'Completado'
                                                        ? 'bg-green-100 text-green-700'
                                                        : treatment.status === 'Pendiente'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {treatment.status === 'Completado' && <FaCheckCircle className="float-left mr-2" />}
                                                {treatment.status === 'Pendiente' && <FaTimesCircle className="float-left mr-2" />}
                                                {treatment.status === 'En Progreso' && <FaHourglassHalf className="float-left mr-2" />}
                                                {treatment.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
