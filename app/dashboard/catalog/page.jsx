"use client"

import React, { useEffect, useState } from 'react'
import ExerciseCard from '@/components/ExerciseCard'
export default function page() {
  const [exercises,setExercises] = useState([])
  useEffect(() => {
    const fetchworkouts = async() => {
      try {
        const res = await fetch('/api/catalog')
        const data = await res.json()
        console.log(data)
        setExercises(data)
      } catch (error) {
        console.error(error)
      }
    };
      fetchworkouts()
  
  },[])
 
    return (
        <div className="min-h-screen text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
        
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} workout={exercise} />
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>
  
        </div>
      )
}
