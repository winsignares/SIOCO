import { SmileIcon } from '../Icons';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center">
                    <SmileIcon className="h-6 w-6 mr-2" />
                    <span className="text-lg font-bold">Dental Clinic</span>
                </div>
                <nav className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#services" className="text-gray-400 hover:text-gray-200">
                        Servicios
                    </a>
                    <a href="#about" className="text-gray-400 hover:text-gray-200">
                        Acerca de
                    </a>
                    <a href="#contact" className="text-gray-400 hover:text-gray-200">
                        Contacto
                    </a>
                </nav>
                <p className="text-gray-400 mt-4 md:mt-0">&copy; 2024 Dental Clinic. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
