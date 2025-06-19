
import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export const Calendario = ({ dentista, onClose }) => {

    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [nuevaCita, setNuevaCita] = useState({
        paciente: '',
        hora: ''
    });

    const handleDateClick = (info) => {
        setSelectedDate(info.date);
        setIsModalOpen(true);
    };

    const handleSubmitCita = () => {
        if (nuevaCita.paciente && nuevaCita.hora) {
            const [hours, minutes] = nuevaCita.hora.split(':');
            const startDate = new Date(selectedDate);
            startDate.setHours(parseInt(hours), parseInt(minutes));

            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);

            if (startDate < new Date()) {
                alert('La cita debe ser en el futuro');
                return
            }

            const newEvent = {
                title: `Paciente: ${nuevaCita.paciente}`,
                start: startDate,
                end: endDate,
                backgroundColor: '#3B82F6',
                borderColor: '#2563EB'
            };

            setEvents([...events, newEvent]);
            setIsModalOpen(false);
            setNuevaCita({ paciente: '', hora: '' });
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Calendario de {dentista.nombre}</h2>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Volver a la lista
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale={esLocale}
                    slotMinTime="06:00:00"
                    slotMaxTime="18:00:00"
                    events={events}
                    dateClick={handleDateClick}
                    height="auto"
                    className="fc-event-custom"
                    allDaySlot={false}
                />
            </div>

            {/* Modal para agregar cita */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Agendar Nueva Cita</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre del Paciente
                                </label>
                                <input
                                    type="text"
                                    value={nuevaCita.paciente}
                                    onChange={(e) => setNuevaCita({ ...nuevaCita, paciente: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese el nombre del paciente"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de la Cita
                                </label>
                                <input
                                    type="time"
                                    value={nuevaCita.hora}
                                    onChange={(e) => setNuevaCita({ ...nuevaCita, hora: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSubmitCita}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Guardar Cita
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
