
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFileAlt, faReceipt, faWallet, faCreditCard,
         faEye, faPersonWalkingArrowRight, faUser, faPiggyBank, 
         faCheckCircle, faCalendarCheck, faCalendarPlus, faCalendarDays, 
         faNoteSticky} from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';
import { MenuSuperior } from './MenuSuperior';
import useAuthStore from '../../store/authStore.js';

export const Dashboard = ({ children }) => {
    const [activeLink, setActiveLink] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const { isAuthenticated, role, logout, token, username } = useAuthStore(state => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        logout: state.logout,
        token: state.token,
        username: state.username
    }));

    // Definición de menús usando un solo tipo de ícono
    const MENU_CONFIG = {
        patient: [
            { path: "Paciente/PSolicitarCitas", label: "Solicitar Citas", icon: faCalendarAlt },
            { path: "Paciente/verCitas", label: "Citas", icon: faFileAlt },
            { path: "Paciente/verOdontograma", label: "Odontogramas", icon: faReceipt },
            { path: "Paciente/verFacturas", label: "Facturas", icon: faWallet },
            { path: "Paciente/HacerPago", label: "Pagos", icon: faCreditCard },
            { path: "Paciente/verHistorialMedico", label: "Historial Médico", icon: faEye }
        ],
        Secretaria: [
            { path: "Secretaria/HorarioDentista", label: "Revisar Agenda", icon: faEye },
            { path: "Secretaria/Pagos", label: "Gestionar Pagos", icon: faWallet },
            // { path: "Secretaria/verDisponibilidad", label: "Disponibilidad", icon: faEye }
        ],
        dentist: [
            { path: "dentista/verAgenda", label: "Citas", icon: faCalendarDays },
            { path: "dentista/Calendario", label: "Calendario", icon: faCalendarPlus },
            { path: "dentista/Nota", label: "Calendario", icon: faNoteSticky },
        ],
        admin: [
            { path: "/admin/InfoUser", label: "Ver Usuarios", icon: faUser },
            { path: "/admin/Ingresos", label: "Ver Ingresos", icon: faPiggyBank },
            { path: "/admin/Dentistas", label: "Ver Dentistas", icon: faUser }
        ]
    };

    useEffect(() => {
        const defaultRoutes = {
            // Paciente: '/PSolicitarCitas',
            // Secretaria: '/registrarCitas',
            // Dentista: '/verCitas'
        };

        const defaultRoute = defaultRoutes[role];
        if (defaultRoute) {
            setActiveLink(defaultRoute.slice(1));
            navigate(defaultRoute);
        }
    }, [role, navigate]);

    const handleLogout = () => {
        logout();
        localStorage.setItem('odontologiaModalShown', 'false');
        navigate('/');
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const renderMenuItem = ({ path, label, icon }) => (
        <Link
            key={path}
            to={path}
            onClick={() => handleLinkClick(path.slice(1))}
            className={clsx(
                'group flex items-center text-sm rounded-md py-4',
                {
                    'bg-indigo-800 text-white': activeLink === path.slice(1),
                    'text-indigo-200 hover:bg-indigo-600 hover:text-white': activeLink !== path.slice(1),
                    'px-4': sidebarCollapsed,
                    'px-2': !sidebarCollapsed
                }
            )}
        >
            <FontAwesomeIcon
                icon={icon}
                className={activeLink === path.slice(1) ? 'text-white' : 'text-gray-300'}
                size="lg"
            />
            <span className={`ml-2 transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'
                }`}>
                {label}
            </span>
        </Link>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <MenuSuperior
                toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                username={username}
            />

            <div className="flex flex-1 h-[calc(100vh-64px)]">
                <aside className={clsx(
                    'bg-indigo-700 h-full transition-all duration-300 flex flex-col',
                    sidebarCollapsed ? 'w-16' : 'w-52'
                )}>
                    <nav className="flex-grow px-2">
                        {MENU_CONFIG[role]?.map(renderMenuItem)}
                    </nav>

                    <div className="p-4">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={clsx(
                                'flex items-center justify-center font-medium text-indigo-700 bg-white rounded-md hover:bg-indigo-100',
                                sidebarCollapsed ? 'w-10 h-10' : 'w-full px-4 py-2'
                            )}
                        >
                            <FontAwesomeIcon
                                icon={faPersonWalkingArrowRight}
                                className={sidebarCollapsed ? '' : 'mr-2'}
                            />
                            {!sidebarCollapsed && <span>Salir</span>}
                        </button>
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};