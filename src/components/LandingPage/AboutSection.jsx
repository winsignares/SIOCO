import icono from "../../assets/Icono.png";

export const AboutSection = () => {
    return (
        <section id="about" className="bg-gray-100 py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <img
                        src={icono}
                        width="500"
                        height="400"
                        alt="About Dental Clinic"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Acerca de Nosotros</h2>
                    <p className="text-gray-600 mb-8">
                    Somos una empresa dedicada a proporcionar soluciones integrales para odontologías. Nuestro equipo de expertos está comprometido en ofrecer servicios innovadores y tecnológicos que facilitan la gestión de citas, el seguimiento de tratamientos y la administración de pacientes. Nos enorgullecemos de utilizar las técnicas más avanzadas para asegurar la satisfacción y el bienestar de nuestros clientes.
                    </p>

                    <a href="#" className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
                        Conoce Más
                    </a>

                </div>
            </div>
        </section>
    )
}
