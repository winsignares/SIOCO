

import { useState } from "react";
import { Link } from "react-router-dom";


const userData = [
  { id: 1, name: "Juan", lastName: "Pérez", status: "Activo", email: "juan.perez@example.com", photo: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" },
  { id: 2, name: "María", lastName: "Gómez", status: "Inactivo", email: "maria.gomez@example.com", photo: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" },
  { id: 3, name: "Carlos", lastName: "López", status: "Activo", email: "carlos.lopez@example.com", photo: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" },
  { id: 4, name: "Ana", lastName: "Martínez", status: "Inactivo", email: "ana.martinez@example.com", photo: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" },
  { id: 5, name: "Luis", lastName: "García", status: "Activo", email: "luis.garcia@example.com", photo: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" },
  { id: 6, name: "Sofía", lastName: "Ramírez", status: "Activo", email: "sofia.ramirez@example.com", photo: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg" },
];

export const InfoUser = () => {
  const [filter, setFilter] = useState(""); // Filtro de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Elementos por página

  // Filtrar usuarios por nombre o apellido
  const filteredData = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  // Dividir datos en páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

      {/* Filtro de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Tabla de usuarios */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Foto</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${user.status === "Activo" ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2">{user.email}</td>

                <td className="px-4 py-2 text-center">                  
                  <Link to={`/admin/odontograma/${user.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"> 
                    Odontograma
                  </Link>
                  
                  <Link to={`/admin/pagos/${user.id}`} className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded mr-2">
                   Pagos
                  </Link>
                  
                  <Link to={`/admin/tratamientos/${user.id}`} className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded mr-2">
                   Tratamientos
                  </Link>
                  
                  <Link to={`/admin/citas/${user.id}`} className="bg-green-500 hover:bg-green-600 text-white  px-3 py-1 rounded mr-2" title="Ver Citas" >
                    Citas
                  </Link>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            Siguiente
          </button>
        </div>
      </div>


    </div>
  );
};
