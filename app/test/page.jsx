"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import GroupCard from "@/components/GroupCardModal"
export default function GroupModalCard(exercise) {
  const {data: session,status} = useSession()
  const [groups,setGroups] = useState([])
    useEffect(() => { 
      const fetchgroups = async() =>{
        console.log(status)
        if(status === 'authenticated'){
           try {
          const res = await fetch(`/api/group?userId=${session?.user.id}`,{
          method: 'GET',
          headers: {'Content-Type' : 'application/json'}
        })
        
        const json = await res.json()
        setGroups(json)
        console.log(json)
       
        } catch (error) {
          console.error(error)
        }
        }
       
      
      }
      fetchgroups()
    },[session,status])
    const handleClick = () => {
        return
    }
  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Select group</h2>
        <ul>
        {groups.length > 0 ? (
        groups.map((group) => <GroupCard key={group.id} group={group}/>)
      ) : (
        <p>No groups found</p>
      )}
        </ul>
       
      </div>
  )
}
