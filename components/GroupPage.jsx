"use client";
import { useState, useEffect } from "react";
import GroupCard from '@/components/GroupCard'
import GroupForm from "@/components/GroupForm"

export default function GroupPage({ userId }) {
  const [groups, setGroups] = useState([]);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-lines font-[family-name:var(--font-geist-sans)] py-12">
    <div className="w-full max-w-md px-4">
      <GroupForm />
    </div>
  
 
    <div className="mt-8 w-full flex flex-wrap gap-4 justify-center px-4">
      {groups.length > 0 ? (
        groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))
      ) : (
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-center text-gray-600">No groups found</p>
        </div>
      )}
    </div>
  </div>
  
  );
}
