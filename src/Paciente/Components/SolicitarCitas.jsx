
import { useState, useEffect } from 'react';

import useAuthStore from '../../store/authStore';

import { GetDentists, GetAgenda } from '../Helpers';
import { Loading } from '../../components/Loading';
import { Modal, Calendar, DoctorInfo } from '../../components/Citas';


export const SolicitarCitas = () => {
  const { token, urlSecundaria,id  } = useAuthStore();
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!urlSecundaria || !urlSecundaria[0]) return;
  
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
  }, [token, urlSecundaria]);
  

  useEffect(() => {
    if (!selectedDentist || !urlSecundaria || !urlSecundaria[0]) return;
  
    const fetchSchedule = async () => {
      try {
        const agenda = await GetAgenda(urlSecundaria[0].domain, token, selectedDentist.id);
        setSchedule(agenda);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
  
    fetchSchedule();
  }, [selectedDentist, token, urlSecundaria]);
  

  const handleSelectDentist = (selectedDentist) => {
    setSelectedDentist(selectedDentist);
  };

  const handleSelectDentis = (e) => {
    const selectedName = e.target.value;
    const dentist = dentists.find((d) => d.username === selectedName);
    setSelectedDentist(dentist);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

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
        <Calendar schedule={schedule} handleOpenModal={handleOpenModal} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dentists={dentists}
        schedule={schedule}
        onSelectDentist={handleSelectDentist}
        selectedDentist={selectedDentist}
        id={id}
      />
    </div>
  );
};
