export const OdontologiaModal = ({ odontologies, onSelect }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-gray-100 p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Seleccione una Odontología</h2>
      <ul className="space-y-3">
        {odontologies.map((odontologia) => (
          <li key={odontologia.id}>
            <button
              className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition duration-300"
              onClick={() => onSelect(odontologia?.domain_url)}
            >
              {odontologia.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
  