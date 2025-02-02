"use client";
import Loading from '@/components/Loading.jsx'
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
  <div className="flex flex-col items-center justify-center py-12 px-6 mx-auto text-center">
  <div className="animate-fade-in flex flex-wrap gap-4 justify-center mt-10 shadow-lg bg-gradient-to-r from-gray-950  to-blue-950 p-6 rounded-lg">
    {checkboxOptions.map((option) => (
      <div className="flex items-center" key={option.id}>
        <input
          className="mr-3 cursor-pointer text-white accent-blue-600"
          type="checkbox"
          id={option.id}
          value={option.id}
          name="options"
          onChange={handleCheckboxChange}
        />
        <label
          className="text-lg cursor-pointer hover:text-blue-600 transition-all duration-200 text-white"
          htmlFor={option.id}
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>



  <div className="w-full max-w-md mt-6">
    <input
      onChange={(e) => handleSearch(e.target.value)}
      type="text"
      placeholder="Search for workouts"
      className="animate-fade-in w-full border-gray-900 shadow-lg text-white bg-gradient-to-r from-gray-950  to-blue-950 px-4 py-2 text-sm border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 mb-8 w-full px-4">
    {filteredExercises.length > 0 ? (
      filteredExercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          workout={exercise}
          onPlusClick={() => openModal(exercise)}
          onViewDetailsClick={openDetails}
        />
      ))
    ) : (
      <div className="text-center col-span-full">
            <Loading/>
      </div>
      
    )}
  </div>

  {modalOpen && (
    <GroupModalCard
      exercise={selectedExercise}
      key={selectedExercise.id}
      onClose={closeModal}
      modalOpen={modalOpen}
    />
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
