
import { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import { GetDentists, GetAgenda } from '../../helpers';
import { Loading } from '../';

// Componente de Modal
const Modal = ({ isOpen, onClose, dentists, schedule, onSelectDentist, selectedDentist }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setSelectedTime('');
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedDentist && selectedDay && selectedTime) {
      // Aquí puedes manejar la lógica para agendar la cita
      console.log('Cita agendada:', { dentist: selectedDentist.id, day: selectedDay, time: selectedTime });
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
            onSelectDentist(selected);  // Pasa el objeto completo del dentista
          }}
          value={selectedDentist ? selectedDentist.username : ''}  // Sincroniza con el username
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



export const SolicitarCitas = () => {
  const { token, urlSecundaria } = useAuthStore();
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const data = await GetDentists(urlSecundaria[0].domain, token);
        if (data.dentists.length > 1) {
          setDentists(data.dentists);
          setSelectedDentist(data.dentists[0]);
        }
      } catch (error) {
        console.error('Error fetching dentists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, [token]);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (selectedDentist) {
        try {
          const agenda = await GetAgenda(urlSecundaria[0].domain, token, selectedDentist.id);
          setSchedule(agenda);
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }
      }
    };

    fetchSchedule();
  }, [selectedDentist, token]);
  
  const handleSelectDentist = (selectedDentist) => {
    setSelectedDentist(selectedDentist);  // Aquí guardas el objeto completo del dentista
  };
  

  const handleSelectDentis = (e) => {
    const selectedName = e.target.value;
    const dentist = dentists.find((d) => d.username === selectedName);
    setSelectedDentist(dentist);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  if (loading) {
    return <Loading />;
  }

  const DoctorInfo = ({ dentist }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 w-72 flex flex-col items-center">
      <img
        className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300 shadow-lg object-cover"
        src="https://img.freepik.com/foto-gratis/foto-dentista-sonriente-pie-brazos-cruzados-su-colega-mostrando-signo-bien_496169-1043.jpg"
        alt={dentist.first_name}
      />
      <h2 className="text-xl font-semibold text-indigo-600">
        {dentist.first_name} {dentist.last_name}
      </h2>
      <p className="text-sm text-gray-500">{dentist.specialty || 'Especialidad'}</p>
      <p className="text-sm text-gray-500 mt-2">{dentist.clinic || 'Clínica Las Condes'}</p>
      <p className="text-sm text-gray-400 text-center mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonumy...
      </p>
      <p className="text-lg font-semibold text-gray-700 mt-4">$40.000</p>
    </div>
  );

  const Calendar = ({ schedule }) => {
    const daysInMonth = 30;
    const firstDayOfMonth = 4;

    return (
      <div className="flex flex-col">
        <h2 className="text-center text-2xl font-bold mb-6 text-indigo-600">
          Selecciona tu hora
        </h2>
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
            const day = `2024-09-${String(i + 1).padStart(2, '0')}`;
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

  return (
    <div className="flex justify-center items-start mt-10">
      <div>
        <select
          className="mb-4 p-2 border rounded"
          onChange={handleSelectDentis}
          defaultValue={selectedDentist ? selectedDentist.username : ''}
        >
          {dentists.map((dentist) => (
            <option key={dentist.id} value={dentist.username}>
              {dentist.first_name} {dentist.last_name}
            </option>
          ))}
        </select>

        {selectedDentist && <DoctorInfo dentist={selectedDentist} />}
      </div>

      <div className="ml-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <Calendar schedule={schedule} />
      </div>

      {/* Modal para agendar cita */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dentists={dentists}
        schedule={schedule}
        onSelectDentist={handleSelectDentist}
        selectedDentist={selectedDentist}
      />


    </div>
  );
};
