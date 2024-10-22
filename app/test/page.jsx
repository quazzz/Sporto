"use client"
import React, { useState } from 'react'

export default function Page() {
  const [options, setOptions] = useState([])

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      // Add option to state if checked
      setOptions(prev => [...prev, value])
    } else {
      // Remove option from state if unchecked
      setOptions(prev => prev.filter(option => option !== value))
    }
  }

  return (
    <div>
      <h3>Select Muscles:</h3>

      {/* Checkboxes for each option */}
      <div>
        <input
          type="checkbox"
          id="biceps"
          value="biceps"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="biceps">Biceps</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="triceps"
          value="triceps"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="triceps">Triceps</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="quads"
          value="quads"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="quads">Quads</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="hamstrings"
          value="hamstrings"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="hamstrings">Hamstrings</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="calves"
          value="calves"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="calves">Calves</label>
      </div>

      {/* Display selected options */}
      <p>Selected muscles: {options.join('?')}</p>
    </div>
  )
}
