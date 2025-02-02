import Image from "next/image";
import CatalogDetailsModal from "./CatalogDetailsModal";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ExerciseCardDashboard({
  name,
  gifUrl,
  bodypart,
  target,
  equipment,
  reps,
  sets,
  id,
  kg,
  instructions,
  handleDeleteEx,
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const req = await fetch(`/api/exercises?exerciseId=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!req.ok) {
        console.error("Error deleting the exercise");
        return 0;
      }

      handleDeleteEx(id);
      toast.success("Exercise deleted succesfuly!");
    } catch (error) {
      console.error(error);
    }
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  name = capitalizeFirstLetter(name);

  return (
    <>
    {open && (
          <CatalogDetailsModal
            name={name}
            bodyPart={bodypart}
            target={target}
            equipment={equipment}
            reps={reps}
            instructions={instructions}
            sets={sets}
            gifUrl={gifUrl}
            weight={kg}
            onClose={() => setOpen(false)}
          />
        )}
    <div className="">
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-gray-900 to-black p-6 m-4 text-center relative transform hover:scale-[1.02] animate-fade-in transition-transform duration-300 ease-in-out">
      
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 bg-gray-950 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110 shadow-md"
          aria-label="Delete"
        >
          ✕
        </button>

    
        <div
          onClick={() => setOpen(true)}
          className="absolute top-4 left-4 cursor-pointer hover:scale-110 transition-transform"
          title="Details"
          aria-label="Details"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="2"
              fill="transparent"
            />
            <line
              x1="12"
              y1="8"
              x2="12"
              y2="8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="11"
              x2="12"
              y2="16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

       
        <h2 className="text-xl font-extrabold text-gray-100 mt-8 mb-4">
          {name}
        </h2>

        <Image
          unoptimized={true}
          className="mx-auto rounded-xl"
          src={gifUrl}
          width={100}
          height={100}
          alt="Workout gif"
        />

        <div className="mt-4 space-y-2">
          <p className="text-gray-300 text-sm">
            <span className="font-semibold">Bodypart:</span> {bodypart}
          </p>
          <p className="text-gray-300 text-sm">
            <span className="font-semibold">Sets:</span> {sets}
          </p>
          <p className="text-gray-300 text-sm">
            <span className="font-semibold">Reps:</span> {reps}
          </p>
          <p className="text-gray-300 text-sm">
            <span className="font-semibold">Weight:</span> {kg} kg
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold">Target:</span> {target}
          </p>
          <p className="text-gray-500 text-xs">
            <span className="font-semibold">Equipment:</span> {equipment}
          </p>
        </div>
      </div>
     
    </div>
    
    </>
    
    
  );
}
