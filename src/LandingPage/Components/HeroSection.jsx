import icono from "../../assets/Icono.png";

export const HeroSection = () => {
    return (
        <section id="hero" className="bg-gray-100 py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 typing-effect">Bienvenido a Dental Clinic</h1>

                    <p className="text-gray-600 mb-8">Somos una empresa dedicada a brindar un sistema integral que optimiza la gestión de procesos odontológicos, asegurando una atención eficiente y de alta calidad para nuestros pacientes.</p>

                    <div className="flex space-x-4">
                        <a href="#contact" className=" animate-bounce px-6 py-3 bg-indigo-700 text-white rounded-md hover:bg-indigo-600 transition">
                            Agendar Cita
                        </a>
                        <a href="#about" className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
                            Conoce Más
                        </a>
                    </div>

                </div>
                <div>
                    <img
                        src={icono}
                        width="500"
                        height="400"
                        alt="Dental Clinic"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    )
}
