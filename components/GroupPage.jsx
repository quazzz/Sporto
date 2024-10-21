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
    <div className="min-h-screen text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
      {groups.length > 0 ? (
        groups.map((group) => <GroupCard key={group.id} group={group} />)
      ) : (
        <p>No groups found</p>
      )}
      <GroupForm />
    </div>
  );
}
