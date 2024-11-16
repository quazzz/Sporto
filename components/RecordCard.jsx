

export default function ExerciseCardDashboard({name,record,id}) {
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
      <div className="max-w-xs sm:max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center relative">
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          ✕
        </button>
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 mt-6 ">
          {name}
        </h2>
        <p className="text-gray-800 text-base mb-1">Achievement: {record}</p>
      </div>
    </>
  );
}
