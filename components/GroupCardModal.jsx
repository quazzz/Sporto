"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GroupModalCard({ exercise, onClose }) {
  const { data: session, status } = useSession();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [kg, setKg] = useState();
  useEffect(() => {
    const fetchGroups = async () => {
      if (status === "authenticated") {
        try {
          console.log("trying");
          const res = await fetch(`/api/group?userId=${session?.user.id}`);
          const json = await res.json();
          setGroups(json);
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      }
    };

    fetchGroups();
  }, []);

  const handleClose = () => {
    onClose();
    
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  const handleClick = async (groupId) => {
    console.log(exercise);
    if (status === "authenticated" && sets && reps) {
      try {
        let name = exercise?.name;
        let equipment = exercise?.equipment;
        let gifUrl = exercise?.gifUrl;
        let target = exercise?.target;
        let bodyPart = exercise?.bodyPart;
        let instructions = exercise?.instructions;
        let secondaryMuscles = exercise?.secondaryMuscles;
        let id = exercise?.id;
        const req = await fetch(`/api/catalog`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            name,
            equipment,
            gifUrl,
            target,
            bodyPart,
            instructions,
            secondaryMuscles,
            id,
            groupId,
            sets,
            reps,
            kg,
          }),
        });
        console.log(req);

        setSelectedGroup(null);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-50"
    onClick={handleClose}
  >
    <div
      className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-lg shadow-2xl max-w-md w-full m-4"
      onClick={handleModalClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          Select group for {exercise?.name}
        </h2>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          ✕
        </button>
      </div>
  
      <div className="mt-4">
        {groups?.length > 0 ? (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedGroup === group.id
                    ? "bg-gradient-to-b from-gray-800 to-black text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {group.name}
  
                {selectedGroup === group.id && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-1">Number of sets</p>
                    <input
                      className="border bg-gray-900 text-gray-100 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-600"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      type="text"
                      placeholder="Sets"
                    />
                    <p className="text-sm text-gray-400 mb-1">Number of reps</p>
                    <input
                      className="border bg-gray-900 text-gray-100 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-600"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      type="text"
                      placeholder="Reps"
                    />
                    <p className="text-sm text-gray-400 mb-1">Weight</p>
                    <input
                      className="border bg-gray-900 text-gray-100 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring focus:ring-blue-600"
                      value={kg}
                      onChange={(e) => setKg(e.target.value)}
                      type="text"
                      placeholder="Weight"
                    />
                    <div className="text-center">
                      <button
                        className="py-2 px-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all"
                        onClick={() => handleClick(group.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <div className="text-center mt-4">
              <p className="text-gray-400">Or</p>
              <Link href="/dashboard" className="underline text-blue-400">
                Create new group
              </Link>
            </div>
          </ul>
        ) : (
          <p className="text-gray-400 text-center">
            No groups found?{" "}
            <Link href="/dashboard" className="underline text-blue-400">
              Create new group
            </Link>
          </p>
        )}
      </div>
    </div>
  </div>
  
  );
}
