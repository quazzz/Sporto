"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import GroupModalCard from '@/components/GroupModalCard'
export default function page() {
    const {data: session,status} = useSession()
    const [groups,setGroups] = useState([])
    useEffect(() => {
      if (session?.user.id) {
        fetch(`/api/group/?userId=${session.user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => {
            setGroups(data)
            console.log(data) 
          })
          .catch(error => console.error('Error fetching groups:', error))
      }
    },[session?.user.id])
  return (
    <div>
      {session?.user.id}
      {groups.length > 0 ? (
        groups.map((group) => <GroupModalCard key={group.id} group={group} />)
      ) : (
        <p>No groups found</p>
      )}
    </div>
  )
}
