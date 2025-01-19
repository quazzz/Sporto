import Image from "next/image";
import CatalogDetailsModal from "./CatalogDetailsModal";
import { useState } from "react";

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
  instructions
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

      window.location.reload();
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
   <div className="max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4 m-4 text-center relative">
  <button
    onClick={handleDelete}
    className="absolute top-2 right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
  >
    ✕
  </button>

  <div
    onClick={() => setOpen(true)} 
    className="hover:scale-105 transition-transform cursor-pointer absolute top-2 left-2"
    title="Details"
  >
    <svg
      title="Details"
      width="29"
      height="29"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        fill="black"
        strokeWidth="2"
      />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="8"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="11"
        x2="12"
        y2="16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>

  <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-100 mt-6">
    {name}
  </h2>
  <Image
    unoptimized={true}
    className="mx-auto rounded-xl"
    src={gifUrl}
    width={80}
    height={80}
    alt="Gif of workout"
  />
  <p className="text-gray-200 text-base mb-1">Bodypart: {bodypart}</p>
  <p className="text-gray-200 text-base mb-1">Sets: {sets}</p>
  <p className="text-gray-200 text-base mb-1">Reps: {reps}</p>
  <p className="text-gray-200 text-base mb-1">Weight: {kg} kg</p>
  <p className="text-gray-400 text-sm mb-3">Target: {target}</p>
  <p className="text-xs text-gray-500">Equipment: {equipment}</p>
</div>

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

    </>
  );
}
