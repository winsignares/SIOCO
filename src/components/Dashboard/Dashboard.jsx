
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faFileAlt, faReceipt, faWallet, faCreditCard, faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

import { MenuSuperior } from './MenuSuperior';
import useAuthStore from '../../store/authStore.js';

import {
    CalendarOutline,
    DocumentTextOutline,
    WalletOutline,
    ReceiptOutline,
    CardOutline,
    CheckmarkCircleOutline,
    EyeOutline,
} from 'react-ionicons';



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

    useEffect(() => {
        if (role === 'Paciente') {
            setActiveLink('PSolicitarCitas');
            navigate('/PSolicitarCitas');

        } else if (role === 'Secretaria') {
            setActiveLink('registrarCitas');
            navigate('/registrarCitas');

        } else if (role === 'Dentista') {
            setActiveLink('verCitas');
            navigate('/verCitas');
        }
    }, [role]);

    const handleLogout = () => {
        logout();
        localStorage.setItem('odontologiaModalShown', 'false');
        navigate('/');
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const menuItemsPaciente = [
        { path: "/PSolicitarCitas", label: "Solicitar Citas", Icon: faCalendarAlt },
        { path: "/verCitas", label: "Citas", Icon: faFileAlt },
        { path: "/verOdontograma", label: "Odontogramas", Icon: faReceipt },
        { path: "/verFacturas", label: "Facturas", Icon: faWallet },
        { path: "/HacerPago", label: "Pagos", Icon: faCreditCard },
        { path: "/verHistorialMedico", label: "Historial Médico", Icon: faEye },
    ];


    const menuItemsSecretaria = [
        { path: "/registrarCitas", label: "Registrar Citas", Icon: CalendarOutline },
        { path: "/revisarCitas", label: "Aceptar Cita", Icon: CheckmarkCircleOutline },
        { path: "/verDisponibilidad", label: "Disponibilidad", Icon: EyeOutline }
    ];

    const menuItemsDentista = [
        { path: "/verCitas", label: "Citas", Icon: DocumentTextOutline },
        { path: "/verOdontogramas", label: "Odontogramas", Icon: ReceiptOutline },
        { path: "/verDisponibilidad", label: "Disponibilidad", Icon: EyeOutline }
    ];


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <MenuSuperior toggleSidebar={toggleSidebar} username={username} />

            <div className="flex flex-1 overflow-hidden">
                <aside className={`bg-indigo-700 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-52'}`}>
                    <nav className="flex-grow px-2">

                        {
                            role === 'patient' && (
                                <>
                                    {menuItemsPaciente.map(({ path, label, Icon }) => (
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
                                            <FontAwesomeIcon icon={Icon} color={activeLink === path.slice(1) ? '#ffffff' : '#000'} size="lg" />
                                            <span className={`ml-2 transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
                                        </Link>
                                    ))}


                                </>
                            )
                        }

                        {
                            role === 'Secretaria' && (
                                <>
                                    {menuItemsSecretaria.map(({ path, label, Icon }) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            onClick={() => handleLinkClick(path.slice(1))}
                                            className={`group flex items-center px-3 text-sm rounded-md ${activeLink === path.slice(1) ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'} py-3`}
                                        >
                                            <Icon color={activeLink === path.slice(1) ? '#ffffff' : '#000'} height="24px" width="24px" />
                                            <span className={`ml-2 transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
                                        </Link>
                                    ))}
                                </>
                            )
                        }


                        {
                            role === 'Dentista' && (
                                <>
                                    {menuItemsDentista.map(({ path, label, Icon }) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            onClick={() => handleLinkClick(path.slice(1))}
                                            className={
                                                `group flex items-center px-3 text-sm rounded-md ${activeLink === path.slice(1) ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'} py-3`}
                                        >
                                            <Icon color={activeLink === path.slice(1) ? '#ffffff' : '#000'} height="20px" width="20px" />
                                            <span className={`ml-2 transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>{label}</span>
                                        </Link>
                                    ))}

                                </>
                            )
                        }

                    </nav>

                    <div className="p-4 mt-auto">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-indigo-700 bg-white rounded-md 
                                      hover:bg-indigo-100 ${sidebarCollapsed ? 'h-10 w-10' : ''}`}
                        >
                            <FontAwesomeIcon icon={faPersonWalkingArrowRight} className={sidebarCollapsed ? 'mr-0' : 'mr-2'} />
                            {!sidebarCollapsed && <span>Cerrar Sesión</span>}
                        </button>
                    </div>

                </aside>

                <main className="flex-1 overflow-auto ">
                    {children}
                </main>

            </div>
        </div>
    );
};