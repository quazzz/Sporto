"use client"

import React, { useEffect, useState } from 'react'
import ExerciseCard from '@/components/ExerciseCard'
export default function page() {
  const [exercises,setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchworkouts = async() => {
      const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=100&offset=0';
      const options = {
	      method: 'GET',
	      headers: {
		    'x-rapidapi-key': '35acc8b4e3mshe34e746a6e2b6a6p1c1acajsn1f4306ed6fd0',
		    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	    }
};
      try{
        const response = await fetch(url,options)
        console.log(response)
        const res = await response.json()
        setExercises(res)
      }
      catch(error){
        console.error(error)
      }
      finally{
        setLoading(false)
      }
    }
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
