import toast from "react-hot-toast";
export default function RecordCardDashboard({ name, record, id, handleDeleteProp }) {
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

      handleDeleteProp(id)
      toast.success('Record deleted succesfully!')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <div className="relative max-w-md w-full rounded-3xl bg-gradient-to-b from-blue-800/50 to-black/60 backdrop-blur-md p-8 m-6 text-white shadow-2xl hover:scale-[1.02] transition-transform duration-300">
  <button
    onClick={handleDelete}
    className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition-colors duration-200 text-2xl"
  >
    ✕
  </button>

  <h2 className="text-3xl font-bold text-gray-100 mb-4">
    {name}
  </h2>

  <p className="text-gray-200 text-lg leading-relaxed">
    <span className="font-semibold">Achievement:</span> {record}
  </p>
</div>


    </>
  );
}
