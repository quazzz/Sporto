"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
export default function GroupCard() {
  const {data: session,status} = useSession()
  const [namer,setName] = useState('')
  const handleSubmit = async(e) => {
    e.preventDefault()
    const id  = await session.user.id
    console.log(id)
    const response = await fetch('/api/group', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({namer,id})
    })
    if(!response.ok){
      const json = await response.json()
      toast(json.message)
      return
    }
    window.location.reload()
  }
  return (
    
    <div className="min-h-screen w-full flex justify-center items-start">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create new group</h1>
        </div>
        <form className="bg-white shadow sm:rounded-lg px-8 py-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Name for group</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="transition w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
