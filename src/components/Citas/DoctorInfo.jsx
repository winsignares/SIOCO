
export const DoctorInfo = ({ dentist }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 w-72 flex flex-col items-center">
    <img
      className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300 shadow-lg object-cover"
      src="https://img.freepik.com/foto-gratis/foto-dentista-sonriente-pie-brazos-cruzados-su-colega-mostrando-signo-bien_496169-1043.jpg"
      alt={dentist.first_name}
    />
    <h2 className="text-xl font-semibold text-indigo-600">
      {dentist.first_name} {dentist.last_name}
    </h2>
    <p className="text-sm text-gray-500">{dentist.specialty || 'Especialidad'}</p>
    <p className="text-sm text-gray-500 mt-2">{dentist.clinic || 'Clínica Las Condes'}</p>
    <p className="text-sm text-gray-400 text-center mt-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonumy...
    </p>
    <p className="text-lg font-semibold text-gray-700 mt-4">$40.000</p>
  </div>
);


