"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const { id: groupId } = useParams();  // Extract groupId from the route params
  const [exercises, setExercises] = useState([]);
  const [curExercise, setCurExercise] = useState(0);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  useEffect(() => {
    if (groupId) {
      const fetchExercises = async () => {
        try {
          const res = await fetch(`/api/exercises?groupId=${groupId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          setExercises(data);
        } catch (error) {
          console.error("Failed to fetch exercises", error);
        }
      };
      
      fetchExercises();
    }
  }, [groupId]);  // Only re-run effect if groupId changes

  const handleNextExercise = () => {
    if (curExercise < exercises.length - 1) {
      setCurExercise(curExercise + 1);
    } else {
      setWorkoutCompleted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12">
      {exercises.length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Workout for Group ID: {groupId}</h1>
          <h2 className="text-xl">{exercises[curExercise].name}</h2>
          <p>{exercises[curExercise].description}</p>

          <button
            onClick={handleNextExercise}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Done
          </button>
        </>
      ) : (
        <p>Loading workout...</p>
      )}

      {workoutCompleted && <p>Congratulations, you've completed the workout!</p>}
    </div>
  );
}
