import { SmileIcon, BracesIcon, PillIcon } from '../Icons';
import { useState } from 'react';

const services = [
    {
        icon: SmileIcon,
        title: "Limpieza Dental",
        description: "Programa y gestiona tus citas de manera eficiente para optimizar el tiempo de tus pacientes y profesionales."
    },
    {
        icon: BracesIcon,
        title: "Ortodoncia",
        description: "Administra los datos de tus pacientes, historial médico y tratamientos de manera centralizada y segura."
    },
    {
        icon: PillIcon,
        title: "Implantes Dentales",
        description: "Lleva un registro digital detallado del estado dental de tus pacientes, mejorando la precisión y el seguimiento de tratamientos."
    }
]

export const ServicesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="services" className="py-20 md:py-32 animate__animated animate__fadeIn">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Nuestros Servicios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        services.map((service, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoveredIndex === index ? 'shadow-xl' : ''}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <service.icon className={`h-12 w-12 mb-4 text-primary transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`} />
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    )
}