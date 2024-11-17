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
      setCurExercise(curExercise + 1);
    } else {
      setWorkoutCompleted(true);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        {workoutCompleted ? (
          <>
            <p className="mt-6 text-xl font-semibold text-green-600">
              Congratulations, you've completed the workout!
            </p>
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-medium shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Submit Workout
            </button>
          </>
        ) : (
          exercises.length > 0 ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-gray-700">{groupName}</h1>
              <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {exercises[curExercise].name}
                </h2>
                <Image
                  src={exercises[curExercise].gifUrl}
                  width={150}
                  height={150}
                  unoptimized
                  alt="Gif of the workout"
                  className="mx-auto my-4"
                />
                <div className="text-lg text-gray-600 mb-4">
                  <p className="mb-1">{exercises[curExercise].instructions}</p>
                  <p>
                    <strong>Sets:</strong> {exercises[curExercise].sets}
                  </p>
                  <p>
                    <strong>Reps:</strong> {exercises[curExercise].reps}
                  </p>
                  <p>
                    <strong>Weight:</strong> {exercises[curExercise].kg} kg
                  </p>
                </div>
                <button
                  onClick={handleNextExercise}
                  className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg font-medium shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  Done
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-lg">Loading workout...</p>
          )
        )}
      </div>
    </div>
  );
}
