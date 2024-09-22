import { useState } from 'react';
import { SmileIcon, UserIcon, MenuIcon } from '../Icons';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                <a href="#" className="flex items-center">
                    <SmileIcon className="h-6 w-6 mr-2" />
                    <span className="text-lg font-bold">Dental Clinic</span>
                </a>

                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#services" className="text-gray-600 hover:text-gray-900">
                        Servicios
                    </a>
                    <a href="#about" className="text-gray-600 hover:text-gray-900">
                        Sobre nosotros
                    </a>
                    <a href="#contact" className="text-gray-600 hover:text-gray-900">
                        Contacto
                    </a>
                    <div className="relative">
                        <Link to="/login" className="flex items-center space-x-2 border px-3 py-2 rounded-md hover:bg-gray-100">
                            <UserIcon className="h-5 w-5" />
                            <span>Iniciar sesión</span>
                        </Link>
                    </div>
                </nav>

                <button className="md:hidden flex items-center" onClick={toggleMenu}>
                    <MenuIcon className="h-6 w-6" />
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden bg-white shadow-lg">
                    <a href="#services" className="block px-4 py-2 text-gray-600 hover:text-gray-900" onClick={closeMenu}>
                        Servicios
                    </a>

                    <a href="#about" className="block px-4 py-2 text-gray-600 hover:text-gray-900" onClick={closeMenu}>
                        Sobre nosotros
                    </a>

                    <a href="#contact" className="block px-4 py-2 text-gray-600 hover:text-gray-900" onClick={closeMenu}>
                        Contacto
                    </a>

                    <Link to="/login" className="block px-4 py-2 text-gray-600 hover:text-gray-900" onClick={closeMenu}>
                        Iniciar sesión
                    </Link>

                </nav>
            )}
        </header>
    );
}
