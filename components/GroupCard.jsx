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
    <div className="max-w-sm rounded-lg flex flex-col items-center overflow-hidden shadow-lg bg-white p-14 m-4 text-center">
      {nameVisible ? (
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{group.name}</h2>
      ) : (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded text-l font-semibold text-gray-900 mb-4 "
        />
      )}
      <button
        className="transition-all duration-300 ease-in-out py-3 px-10 bg-black text-white text-lg  rounded shadow-lg hover:bg-gray-800 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2"
        onClick={() =>
          nameVisible ? setNameVisible(false) : handleChangeName()
        }
      >
        {nameVisible ? "Change" : "Save"}
      </button>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleDelete}
          className="transition-all duration-300 ease-in-out py-3 px-10 bg-black text-white text-lg  rounded shadow-lg hover:bg-gray-800 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
      <div className="mt-4">
         {exercises && exercises.map((exercise) => (
         <ExerciseCardDashboard key={exercise.id} 
         name={exercise.name}
         gifUrl={exercise.gifUrl}
         bodypart={exercise.bodypart}
         target={exercise.target}
         equipment={exercise.equipment}/>
      ))}
      </div>
    </div>
  );
}
