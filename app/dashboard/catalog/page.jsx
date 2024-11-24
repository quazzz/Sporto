"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import GroupModalCard from "@/components/GroupCardModal";
import debounce from 'lodash/debounce'
import CatalogDetailsModal from '@/components/CatalogDetailsModal';
export default function Page() {
  const [exercises, setExercises] = useState([]);
  const [options, setOptions] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [search,setSearch] = useState('')
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const handleCheckboxChange = (e) => {
    const {value} = e.target
    setOptions(value)
  };
  

  const openModal = (exercise) => {
    if(isModalOpen) return;
    setSelectedExercise(exercise);
    setModalOpen(true);
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setSelectedExercise(null);
    setModalOpen(false);
    setIsModalOpen(false)
  };
  const openDetails = (exercise) => {
    setDetailModalOpen(true)
    setSelectedExercise(exercise)
  }
  const closeDetails = () => {
    setDetailModalOpen(false)
    setSelectedExercise(null)
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("/api/catalog");
        const data = await res.json();
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();
  }, []);
  const handleSearch = useCallback(
    debounce((value) => setSearch(value),300),[]
  )
  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesoptions = options === "" || exercise.bodyPart.includes(options)
      const matchessearch = exercise.name.toLowerCase().includes(search.toLowerCase())
      return matchesoptions && matchessearch
    })
  })

  const checkboxOptions = [
    { id: "back", label: "Back" },
    { id: "cardio", label: "Cardio" },
    { id: "chest", label: "Chest" },
    { id: "lower arms", label: "Lower arms" },
    { id: "neck", label: "Neck" },
    { id: "shoulders", label: "Shoulders" },
    { id: "upper arms", label: "Upper arms" },
    { id: "upper legs", label: "Upper legs" },
    { id: "waist", label: "Waist" },
  ];
 
  return (
    <>
      <div className=" flex flex-col items-center justify-center py-12 mx-auto text-center">
        <div className="flex flex-wrap gap-4 justify-center mt-20 shadow-lg bg-white p-4 rounded">
          {checkboxOptions.map((option) => (
            <div className="flex items-center" key={option.id}>
              <input
                className="mr-2 cursor-pointer"
                type="checkbox"
                id={option.id}
               
                value={option.id}
                name="options"
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

        <p className="mt-6 text-lg font-medium">
          Selected muscles:{" "}
          <span className="font-semibold text-blue-600">
            {options.length > 0 ? options : "None"}
          </span>
        </p> 
    
        <div className="mx-auto">
          <input onChange={(e) => handleSearch(e.target.value)}  type="text" placeholder='Search'className="transition w-full px-4 py-2 mt-1 rounded-lg font-medium  border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseCard  onViewDetailsClick={openDetails} key={exercise.id} workout={exercise} onPlusClick={() => openModal(exercise)} />
            ))
          ) : (
            <p>No workouts found</p>
          )}
        </div>

        {modalOpen && (
        
            <GroupModalCard exercise={selectedExercise} key={selectedExercise.id} onClose={closeModal} modalOpen={modalOpen} />
        )}
        {detailModalOpen && (
          <CatalogDetailsModal 
            name={selectedExercise.name}
            target={selectedExercise.target}
            bodyPart={selectedExercise.bodyPart}
            secondaryMuscles={selectedExercise.secondaryMuscles}
            gifUrl={selectedExercise.gifUrl}
            equipment={selectedExercise.equipment}
            instructions={selectedExercise.instructions}
            onClose={closeDetails} 
          />
        )}
      </div>
    </>
  );
}
