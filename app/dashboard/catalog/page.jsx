"use client";

import React, { useEffect, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import GroupModalCard from "../../test/page";

export default function Page() {
  const [exercises, setExercises] = useState([]);
  const [options, setOptions] = useState([]);
  const [modal,setModal] = useState(false)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add option to state if checked
      setOptions((prev) => [...prev, value]);
    } else {
      // Remove option from state if unchecked
      setOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  useEffect(() => {
    const fetchworkouts = async () => {
      try {
        const res = await fetch("/api/catalog");
        const data = await res.json();
        console.log(data);
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchworkouts();
  }, []);
  const filteredExercises = exercises.filter((exericse) => {
    return options.length === 0 || options.some((option) => exericse.bodyPart.includes(option))
  })
  const checkboxOptions = [
    { id: 'back', label: 'Back' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'chest', label: 'Chest' },
    { id: 'lower arms', label: 'Lower arms' },
    { id: 'neck', label: 'Neck' },
    { id: 'shoulders', label: 'Shoulders' },
    { id: 'upper arms', label: 'Upper arms' },
    { id: 'upper legs', label: 'Upper legs' },
    { id: 'waist', label: 'Waist' },
  ];

  return (
    <>
      <div className="min-h-screen text-gray-900 flex flex-col items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-wrap gap-4 justify-center">
          {modal ? <GroupModalCard group={groups}/> : ''}
      {checkboxOptions.map((option) => (
      <div className="flex items-center" key={option.id}>
        <input
          className="mr-2 cursor-pointer"
          type="checkbox"
          id={option.id}
          value={option.id}
          onChange={handleCheckboxChange}
        />
        <label
          className="text-lg cursor-pointer hover:text-blue-600 transition"
          htmlFor={option.id}
        >
          {option.label}
        </label>
      </div>
    ))}

        </div>

        {/* Display selected options */}
        <p className="mt-6 text-lg font-medium">
          Selected muscles:{" "}
          <span className="font-semibold text-blue-600">
            {options.length > 0 ? options.join(", ") : "None"}
          </span>
        </p>
        {/* Exercise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} workout={exercise} />
            ))
          ) : (
            <p>No workouts found</p>
          )}
        </div>
      
      </div>
    </>
  );
}
