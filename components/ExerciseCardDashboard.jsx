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
  // initial states
  const [open, setOpen] = useState(false);
  const [sets1, setSets] = useState(sets);
  const [weight1, setWeight] = useState(kg);
  const [reps1, setReps] = useState(reps);
  const [sets2, setSets2] = useState(sets);
  const [reps2, setReps2] = useState(reps);
  const [weight2, setWeight2] = useState(kg);

  const [isOpenSets, setOpenSets] = useState(true);
  const [isOpenWeight, setOpenWeight] = useState(true);
  const [isOpenReps, setOpenReps] = useState(true);

  // handling deleting
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
  const handleUpdate = async (state) => {
    try {
      if (isNaN(reps1) || reps1 < 0 || reps1 > 1000) {
        return toast.error("Invalid reps value");
      }

      let payload = {};
      switch (state) {
        case "sets":
          payload = { state: state, value: sets1 };
          break;
        case "reps":
          payload = { state, value: reps1 };
          break;
        case "weight":
          payload = { state, value: weight1 };
          break;
        default:
          throw new Error("Invalid state");
      }
      const res = await fetch(`/api/exercises?exerciseId=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        switch (state) {
          case "sets":
            setSets2(sets1);
            break;
          case "reps":
            setReps2(reps1);
            break;
          case "weight":
            setWeight2(weight1);
            break;
          default:
            throw new Error("Invalid state");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // capitalizing 1st letter
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
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-gray-950 to-blue-950 p-6 m-4 text-center relative transform hover:scale-[1.02] animate-fade-in transition-transform duration-300 ease-in-out">
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
              {isOpenSets ? (
                <span className="font-semibold">Sets: {sets2}</span>
              ) : (
                <input
                  value={sets1}
                  className="bg-gray-800 text-white rounded-lg px-2 py-1 w-20 text-center border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setSets(e.target.value)}
                />
              )}
              <button
                className="ml-2 text-xs bg-gray-700 text-white px-1 py-1 rounded-full hover:bg-gray-600 transition"
                onClick={() => setOpenSets(!isOpenSets)}
              >
                {isOpenSets ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.99 3 21l1.01-4L16.5 3.5z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check"
                    onClick={() => handleUpdate("sets")}
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                )}
              </button>
            </p>
            <p className="text-gray-300 text-sm">
              {isOpenReps ? (
                <span className="font-semibold">Reps: {reps2}</span>
              ) : (
                <input
                  value={reps1}
                  className="bg-gray-800 text-white rounded-lg px-2 py-1 w-20 text-center border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setReps(e.target.value)}
                />
              )}
              <button
                className="ml-2 text-xs bg-gray-700 text-white px-1 py-1 rounded-full hover:bg-gray-600 transition"
                onClick={() => setOpenReps(!isOpenReps)}
              >
                {isOpenReps ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.99 3 21l1.01-4L16.5 3.5z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check"
                    onClick={() => handleUpdate("reps")}
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                )}
              </button>
            </p>
            <p className="text-gray-300 text-sm">
              {isOpenWeight ? (
                <span className="font-semibold">Weight: {weight2}</span>
              ) : (
                <input
                  value={weight1}
                  className="bg-gray-800 text-white rounded-lg px-2 py-1 w-20 text-center border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setWeight(e.target.value)}
                />
              )}
              <button
                className="ml-2 text-xs bg-gray-700 text-white px-1 py-1 rounded-full hover:bg-gray-600 transition"
                onClick={() => setOpenWeight(!isOpenWeight)}
              >
                {isOpenWeight ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.99 3 21l1.01-4L16.5 3.5z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check"
                    onClick={() => handleUpdate("weight")}
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                )}
              </button>
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
