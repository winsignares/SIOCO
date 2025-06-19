
import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { creacionCita } from '../../helpers/Citas';

import { toast } from "react-hot-toast";


export const Modal = ({ isOpen, onClose, dentists, schedule, onSelectDentist, selectedDentist, id }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const { urlSecundaria, token } = useAuthStore();


  if (!isOpen) return null;

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setSelectedTime('');
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedDentist && selectedDay && selectedTime) {

      const response = await creacionCita(urlSecundaria[0].domain, token, { dentist: selectedDentist.id, day: selectedDay, time: selectedTime, patient_id: id });

      if (response.status) {
        toast.success('Cita creada exitosamente!!');
      }else{
         toast.error(response.message);
      }     
       
      onClose();
    } else {
      alert('Por favor, selecciona un dentista, día y hora antes de agendar.');
    }
  };

  const availableDays = Object.keys(schedule).filter(day =>
    schedule[day] && schedule[day].some(slot => slot.availability)
  );

  const availableTimes = selectedDay
    ? schedule[selectedDay].filter(slot => slot.availability).map(slot => slot.time)
    : [];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Agenda tu cita</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            const selected = dentists.find(dentist => dentist.username === e.target.value);
            onSelectDentist(selected);
          }}
          value={selectedDentist ? selectedDentist.username : ''}
        >
          <option value="">Seleccionar dentista</option>
          {dentists.map((dentist) => (
            <option key={dentist.id} value={dentist.username}>
              {dentist.first_name} {dentist.last_name}
            </option>
          ))}
        </select>

        {selectedDentist && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona un día:</label>
            <select
              className="w-full p-2 border rounded"
              onChange={handleDayChange}
              value={selectedDay}
            >
              <option value="">Seleccionar día</option>
              {availableDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDay && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona una hora:</label>
            <select
              className="w-full p-2 border rounded"
              onChange={handleTimeChange}
              value={selectedTime}
            >
              <option value="">Seleccionar hora</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedDentist || !selectedDay || !selectedTime}
          className={`w-full py-2 px-4 rounded ${selectedDentist && selectedDay && selectedTime
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
            : 'bg-gray-600 text-gray-500 cursor-not-allowed'
            }`}
        >
          Agendar cita
        </button>
      </div>
    </div>
  );
};

