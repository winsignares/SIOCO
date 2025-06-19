import { useState } from 'react';

export const RegiCitas = () => {
    const [patientSearch, setPatientSearch] = useState('');
    const [dentistSearch, setDentistSearch] = useState('');
    const [showPatientOptions, setShowPatientOptions] = useState(false);
    const [showDentistOptions, setShowDentistOptions] = useState(false);

    const patients = ['Juan Pérez', 'María García', 'Carlos López'];
    const dentists = ['Dr. Smith', 'Dra. Johnson', 'Dr. Williams'];

    const handleSelect = (setValue, setShowOptions, value) => {
        setValue(value);
        setShowOptions(false);
    };

    const handleInputChange = (setValue, setShowOptions, value) => {
        setValue(value);
        setShowOptions(true);
    };

    const renderInputWithOptions = (value, setValue, showOptions, setShowOptions, options, placeholder, id) => (
        <div className="relative">
            <div className="flex">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
                    type="text"
                    id={id}
                    value={value}
                    onChange={(e) => handleInputChange(setValue, setShowOptions, e.target.value)}
                    onFocus={() => setShowOptions(true)}
                    placeholder={placeholder}
                />
                {value && (
                    <button
                        type="button"
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                            setValue('');
                            setShowOptions(false);
                        }}
                    >
                        ✕
                    </button>
                )}
            </div>
            {showOptions && value && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                    {options.filter(option => option.toLowerCase().includes(value.toLowerCase())).map((option, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                            onClick={() => handleSelect(setValue, setShowOptions, option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="flex justify-center items-center mt-16">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                
                <h2 className=" text-2xl font-bold mb-6 text-center text-indigo-700">Reservar Cita</h2>


                <div className="mb-4">
                    <label className="block  text-indigo-700 text-sm font-bold mb-2" htmlFor="patient">
                        Paciente
                    </label>
                    {renderInputWithOptions(patientSearch, setPatientSearch, showPatientOptions, setShowPatientOptions, patients, "Buscar paciente...", "patient")}
                </div>

                <div className="mb-4">
                    <label className="block  text-indigo-700 text-sm font-bold mb-2" htmlFor="dentist">
                        Dentista
                    </label>
                    {renderInputWithOptions(dentistSearch, setDentistSearch, showDentistOptions, setShowDentistOptions, dentists, "Buscar dentista...", "dentist")}
                </div>

                <div className="mb-4">
                    <label className="block text-indigo-700 text-sm font-bold mb-2" htmlFor="fechaHora">
                        Fecha y Hora
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
                        id="fechaHora"
                        type="datetime-local"
                        required
                    />
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Reservar
                    </button>
                </div>
                
                

            </form>
        </div>
    )
}
