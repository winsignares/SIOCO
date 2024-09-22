export const OdontologiaModal = ({ odontologies, onSelect }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Seleccione una Odontología</h2>
      <ul>
        {odontologies.map((odontologia) => (
          <li key={odontologia.id}>
            <button
              className="block w-full text-left px-4 py-2 border-b"
              onClick={() => onSelect(odontologia.domain_url)}
            >
              {odontologia.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);


