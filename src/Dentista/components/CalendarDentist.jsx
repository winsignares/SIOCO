

import { Calendario } from '../../components';

export const CalendarDentist = () => {
    return (
        <Calendario
            dentista={{ id: 1, nombre: 'Dra. María García', especialidad: 'Endodoncia', experiencia: '12 años', disponibilidad: 'Mar-Sab', rating: 4.9 }}
            onClose={() => setSelectedDentist(null)}
        />
    )
}
