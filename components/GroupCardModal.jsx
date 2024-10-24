export default function GroupCard({ group }) {
    return (
      <div className="max-w-sm rounded-lg flex flex-col items-center overflow-hidden shadow-lg bg-white p-6 m-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{group.name}</h2>
        <button
          className="transition-all duration-300 ease-in-out py-3 px-10 bg-black text-white text-lg font-bold rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2"
          onClick={() => alert('Added to Group!')}
        >
          Add
        </button>
      </div>
    );
  }
  