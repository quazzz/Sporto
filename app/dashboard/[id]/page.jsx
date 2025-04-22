"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter()
  const { data: session } = useSession();
  const { id: groupId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [curExercise, setCurExercise] = useState(0);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  useEffect(() => {
    if (groupId) {
      const fetchExercises = async () => {
        try {
          const res = await fetch(`/api/exercises?groupId=${groupId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            throw new Error(`Error fetching exercises: ${res.statusText}`);
          }

          const data = await res.json();
          console.log(data);
          setExercises(data.exercises);
          setGroupName(data.groupName);
        } catch (error) {
          console.error("Error fetching exercises", error);
        }
      };

      fetchExercises();
    }
  }, [groupId]);

  const handleSubmit = async () => {
    console.log(session)
    if (!session) {
      console.error("No session found. User is not logged in.");
      return;
    }

    try {
      const date = new Date();
      const thedate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      console.log(thedate)
      const req = await fetch("/api/submitWorkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupName,
          workoutDate: thedate,
          userId: session?.user?.id,
        }),
      });

      if (!req.ok) {
        throw new Error("Failed to submit workout");
      }
      router.push('/dashboard')
    } catch (error) {
      console.error("Error submitting workout", error);
    }
  };

  const handleNextExercise = () => {
    if (curExercise < exercises.length - 1) {
      setCurExercise((prev) => prev + 1)
    } else {
      setWorkoutCompleted(true);
    }
  };
 
  const before = () => {
    if(curExercise != 0){
      setCurExercise((prev) => prev - 1)
    }
    
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-gray-950 to-black">
      {workoutCompleted ? (
        <div className="text-center">
          <p className="mt-6 text-2xl font-semibold text-gray-200">
             Congratulations! Youve completed the workout! 
          </p>
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 bg-gradient-to-b from-green-500 to-green-600 text-white text-lg font-medium rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Submit Workout
          </button>
        </div>
      ) : exercises.length > 0 ? (
        <div className="flex flex-col items-center mt-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-100">{groupName}</h1>
          <div className="bg-gradient-to-b from-blue-900/30 to-black shadow-lg rounded-2xl p-8 max-w-lg w-full border border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4 text-center">
              {exercises[curExercise].name}
            </h2>
            <div>
              <Image
                src={exercises[curExercise].gifUrl}
                width={180}
                height={180}
                unoptimized
                alt="Workout gif"
                className="mx-auto my-4 rounded border-2 border-gray-700 shadow-lg text-white text-center "
              />
            </div>
            <div className="text-lg text-gray-300 mb-6 space-y-2 text-center">
              <p>{exercises[curExercise].instructions}</p>
              <p><strong>Sets:</strong> {exercises[curExercise].sets}</p>
              <p><strong>Reps:</strong> {exercises[curExercise].reps}</p>
              <p><strong>Weight:</strong> {exercises[curExercise].kg} kg</p>
            </div>
            
            <button
              onClick={handleNextExercise}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-green-600 hover:scale-105 transition duration-300"
            >
              Done ✅
            </button>
            <button onClick={before} className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-green-600 hover:scale-105 transition duration-300">Go back</button>
          </div>
        </div>
      ) : (
        <p className="text-white text-lg animate-pulse">Loading workout...</p>
      )}
    </div>
  );
}
