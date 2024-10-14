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
    <div>
      <form action="">
        <label htmlFor="">Name</label>
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Name for group' />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
