import React, { use } from 'react'
import { useState } from 'react'
export default function GroupCard({group}) {
  const [nameVisible,setNameVisible] = useState(true)
  const [newName,setNewName] = useState('')
  const [error,setError] = useState('')
  const [clicked,setClicked] = useState(false)
  const handleDelete = async() => {
    try {
      const groupid = group.id
      const res = await fetch(`/api/group?id=${groupid}`,
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        }
      )
      if(!res.ok){
        console.log('An error occured trying to delete')
        return 0
      }
      window.location.reload()
      return 
    } catch (error) {
      console.error(error)
    }
  }
  const handleChangeName = async() => {
    try {
      const groupid = group.id
      console.log(groupid)
      const res = await fetch(`/api/group?id=${groupid}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: newName})
        }
      )
      if(!res.ok){
        console.error('An error occured when fetching')
        return 0
      }
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center">
    {nameVisible ? (
      <h2 className="text-xl font-bold mb-2 text-gray-800">{group.name}</h2>
    ) : (
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border p-2 rounded"
      />
    )}

    <button
      className="transition-all bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-3"
      onClick={() => (nameVisible ? setNameVisible(false) : handleChangeName())}
    >
      {nameVisible ? 'Change' : 'Save'}
    </button>

    <div className="mt-4">
      <button
        type="button"
        onClick={handleDelete}
        className="transition-all bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-3"
      >
        Delete
      </button>
    </div>

    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
  )
}
