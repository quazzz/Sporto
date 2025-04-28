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
      console.log(userId)
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
            kg
           
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
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50"
  onClick={handleClose}
>
  <div
    className="bg-gradient-to-br from-gray-950 to-blue-950 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-800"
    onClick={handleModalClick}
  >

    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">
        Select group for <span className="text-blue-400">{exercise?.name}</span>
      </h2>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
      >
        ✕
      </button>
    </div>


    <div className="mt-6">
      {groups?.length > 0 ? (
        <ul className="space-y-3">
          {groups.map((group) => (
            <li
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`p-4 border border-gray-800 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedGroup === group.id
                  ? "bg-gradient-to-br from-gray-950 to-blue-900 border-blue-500"
                  : "hover:bg-gray-750 hover:border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-100">
                  {group.name}
                </span>
                {selectedGroup === group.id && (
                  <span className="text-blue-400">✓</span>
                )}
              </div>

              {selectedGroup === group.id && (
                <div className="mt-4 space-y-4">
                  <div>
                
                    <input
                      className="transition w-full px-4 py-3 mt-2 rounded-lg font-medium bg-gray-900 bg-opacity-50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      type="text"
                      placeholder="Sets"
                    />
                  </div>
                  <div>
                
                    <input
                      className="transition w-full px-4 py-3 mt-2 rounded-lg font-medium bg-gray-900 bg-opacity-50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      type="text"
                      placeholder="Reps"
                    />
                  </div>
                  <div>
                    
                    <input
                      className="transition w-full px-4 py-3 mt-2 rounded-lg font-medium bg-gray-900 bg-opacity-50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
                      value={kg}
                      onChange={(e) => setKg(e.target.value)}
                      type="text"
                      placeholder="Weight (kg)"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="py-2 px-6 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                      onClick={() => handleClick(group.id)}
                    >
                      Add to Group
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center">
          No groups found.{" "}
          <Link
            href="/dashboard"
            className="text-blue-400 hover:underline transition-all"
          >
            Create a new group
          </Link>
        </p>
      )}
    </div>
    {groups?.length > 0 && (
      <div className="text-center mt-6">
        <p className="text-gray-400">Or</p>
        <Link
          href="/dashboard"
          className="text-blue-400 hover:underline transition-all"
        >
          Create a new group
        </Link>
      </div>
    )}
  </div>
</div>
  
  );
}
