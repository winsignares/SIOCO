
import { useState, useEffect } from 'react';

import useAuthStore from './store/authStore';

import { DashboardRoutes, Landing } from './router';
import{ OdontologiaModal} from './components';

export const App = () => {
  const isAuthenticated  = useAuthStore((state) => state.isAuthenticated);
  const odontologies     = useAuthStore((state) => state.odontologies);
  const setUrlSecundaria = useAuthStore((state) => state.setUrlSecundaria);

  const [filteredOdontologies, setFilteredOdontologies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated && odontologies.length > 1) {
      const filtered = odontologies.filter((odont) => odont.name !== 'public');
      setFilteredOdontologies(filtered);

      // Verifica si el modal ya fue mostrado anteriormente
      const modalShown = localStorage.getItem('odontologiaModalShown');

      if (modalShown== "false" ) {
        setShowModal(true);
      } else if (filtered.length === 1) {
        setUrlSecundaria(filtered[0].domain_url);
      }
    }
  }, [isAuthenticated, odontologies, setUrlSecundaria]);

  const handleSelectOdontologia = (url) => {
    setUrlSecundaria(url);
    setShowModal(false);

    // Almacena en localStorage que el modal ya fue mostrado
    localStorage.setItem('odontologiaModalShown', 'true');
  };

  if (isAuthenticated) {
    return (
      <>
        {showModal && (
          <OdontologiaModal
            odontologies={filteredOdontologies}
            onSelect={handleSelectOdontologia}
          />
        )}
        <DashboardRoutes />
      </>
    );
  } else {
    return <Landing />;
  }
};
