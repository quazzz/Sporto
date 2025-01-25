export default function ExerciseCardDashboard({ name, record, id }) {
  const handleDelete = async () => {
    try {
      const req = await fetch(`/api/records?recordId=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!req.ok) {
        console.error("Error deleting the exercise");
        return 0;
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-sm rounded-lg shadow-md bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4 m-4 text-center text-white">
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold hover:bg-gray-950 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          ✕
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2 mt-2">
          {name}
        </h2>

        <p className="text-gray-200 text-sm sm:text-base mb-2">
          <span className="font-semibold">Achievement:</span> {record}
        </p>
      </div>
    </>
  );
}
