"use client";
import { useState, useEffect } from "react";
import GroupCard from "@/components/GroupCard";
import GroupForm from "@/components/GroupForm";
import CalendarComponent from "./calendar";
import { useRouter } from "next/navigation";
export default function GroupPage({ userId }) {
  const [groups, setGroups] = useState([]);
  const router = useRouter();
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
    <div className="min-h-screen flex flex-col items-center justify-center  font-[var(--font-geist-sans)] py-12">
      <div className="w-full max-w-md px-6 md:px-8 py-6">
        <GroupForm />
      </div>

      <div className="mt-8 w-full flex flex-wrap gap-6 justify-center px-4 md:px-8">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onStartWorkout={handleStartWorkout}
            className="w-full sm:w-80 md:w-96 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        ))}
      </div>
      <div className="w-full sm:w-[350px] mt-8 sm:mt-0 mx-auto">
        <CalendarComponent />
      </div>
    </div>
  );
}
