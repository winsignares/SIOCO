import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { login } from '../helpers';
import '../index.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    login(email, password, setDisable);
  };

  const handleMoreInfo = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
        <div className="bg-black opacity-20 inset-0 z-0"></div>

        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans typing-effect">Dental Clinic</h1>
          <p className="text-white mt-1">Somos una empresa dedicada a brindar un sistema integral que optimiza la gestión de procesos odontológicos, asegurando una atención eficiente y de alta calidad para nuestros pacientes.</p>

          <div className="flex justify-center lg:justify-start mt-6">
            <button
              onClick={handleMoreInfo}
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
              Saber mas
            </button>
          </div>

        </div>

      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">

          <form className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl mb-4">Hola de nuevo!</h1>

            <div className="flex items-center border-2 mb-4 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                id="email"
                className="pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={disable}
              className={` text-white block w-full py-2 rounded-2xl transition-all duration-500 font-semibold mb-2 bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 ${disable
                ? 'cursor-not-allowed'
                : ''
                }`}
            >
              {disable
                ? <span className="loader inline-block w-5 h-5 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></span>
                : 'Iniciar sesión'
              }

            </button>

          </form>
        </div>
      </div>
    </div>
  );
};
