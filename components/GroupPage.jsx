"use client";
import { useState, useEffect } from "react";
import GroupCard from '@/components/GroupCard'
import GroupForm from "@/components/GroupForm"

import { useRouter } from "next/navigation";
export default function GroupPage({ userId }) {
  const [groups, setGroups] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`/api/group?userId=${userId}`);
        const data = await res.json();
        console.log(data);
        
        setGroups(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) {
      fetchGroups();
    }
  }, [userId]);
  const handleStartWorkout = (groupId) => {
    router.push(`/dashboard/${groupId}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-lines font-[var(--font-geist-sans)] py-12">
    <div className="w-full max-w-md px-6 md:px-8 py-6 ">
      <GroupForm />
    </div>
  
    <div className="mt-8 w-full flex flex-wrap gap-6 justify-center px-4 md:px-8">
      {groups.length > 0 ? (
        groups.map((group) => (
          <GroupCard 
            key={group.id} 
            group={group} 
            onStartWorkout={handleStartWorkout} 
            className="w-full sm:w-80 md:w-96 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          />
        ))
      ) : (
        <div className="flex items-center justify-center min-h-[200px] w-full">
          <p className="text-center text-gray-600 text-lg">No groups found</p>
        </div>
      )}
  
     
      {groups.length === 0 && (
        <div className="w-full sm:w-80 md:w-96 bg-white p-6 rounded-lg shadow-md flex items-center justify-center min-h-[200px]">
          <p className="text-center text-gray-600">This group has no exercises</p>
        </div>
      )}
    </div>
  </div>
  
  
  
  );
}
