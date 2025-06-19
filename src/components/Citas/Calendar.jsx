import { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export const Calendar = ({ schedule, handleOpenModal }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    if (currentMonth === 0) setCurrentYear(currentYear - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) setCurrentYear(currentYear + 1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousMonth} className='text-indigo-600'>
          <FaArrowLeft />
        </button>

        <h2 className="text-center text-2xl font-bold mb-6 text-indigo-600">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>

        <button onClick={handleNextMonth} className='text-indigo-600'>
          <FaArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
          <div key={index} className="font-semibold text-gray-600 text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
          const availability = schedule[day];

          return (
            <div key={i} className="p-2 rounded-lg border text-center cursor-pointer hover:bg-indigo-100">
              <span>{i + 1}</span>
              {availability && availability.some((slot) => slot.availability) && (
                <p className="text-indigo-600 font-semibold mt-1 flex justify-center items-center">
                  <span className="bg-indigo-100 text-indigo-600 py-1 px-2 rounded-full text-xs shadow-sm">
                    Disponible
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end items-end mt-6">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg" onClick={handleOpenModal}>
          Agendar cita
        </button>
      </div>
    </div>
  );
};


