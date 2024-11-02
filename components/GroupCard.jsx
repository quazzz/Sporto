"use client"
import { useEffect, useState } from "react";
import ExerciseCardDashboard from '@/components/ExerciseCardDashboard'
export default function GroupCard({ group }) {
  const [nameVisible, setNameVisible] = useState(true);
  const [newName, setNewName] = useState("");
  const [exercises,setExercises] = useState([])
  const handleDelete = async () => {
    try {
      const groupid = group.id;
      const res = await fetch(`/api/group?id=${groupid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.log("An error occured trying to delete");
        return 0;
      }
      window.location.reload();
      return;
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeName = async () => {
    try {
      const groupid = group.id;
      console.log(groupid);
      const res = await fetch(`/api/group?id=${groupid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) {
        console.error("An error occured when fetching");
        return 0;
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`/api/exercises?groupId=${group.id}`);
        const data = await res.json();
        console.log(data);
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    };
    
      fetchGroups();
    
  }, []);
  return (
    <div className="w-64 max-w-xs sm:max-w-sm md:max-w-md rounded-lg overflow-hidden shadow-md bg-white p-4 m-5 text-center">
  {nameVisible ? (
    <h2 className="text-lg font-semibold text-gray-900 mb-3">{group.name}</h2>
  ) : (
    <input
      type="text"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      className="border p-2 rounded text-sm font-semibold text-gray-900 mb-3 w-full"
    />
  )}
  <button
    className="transition-all duration-300 ease-in-out py-2 px-4 bg-black text-white text-sm rounded shadow-md hover:bg-gray-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
    onClick={() => (nameVisible ? setNameVisible(false) : handleChangeName())}
  >
    {nameVisible ? "Change" : "Save"}
  </button>
  <div className="mt-3">
    <button
      type="button"
      onClick={handleDelete}
      className="transition-all duration-300 ease-in-out py-2 px-4 bg-black text-white text-sm rounded shadow-md hover:bg-gray-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
    >
      Delete
    </button>
  </div>
  <div className="mt-3 space-y-2">
    {exercises &&
      exercises.map((exercise) => (
        <ExerciseCardDashboard
          key={exercise.id}
          name={exercise.name}
          gifUrl={exercise.gifUrl}
          bodypart={exercise.bodypart}
          target={exercise.target}
          equipment={exercise.equipment}
          sets={exercise.sets}
          reps={exercise.reps}
          id={exercise.id}
        />
      ))}
  </div>
</div>

  );
}
