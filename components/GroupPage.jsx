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

  const handleAddGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleStartWorkout = (groupId) => {
    router.push(`/dashboard/${groupId}`);
  };

  const handleRenameGroup = (updatedGroup) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === updatedGroup.id ? { ...group, name: updatedGroup.name } : group
      )
    );
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center font-[var(--font-geist-sans)] p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md p-8 rounded-lg mb-10 lg:mb-0 lg:mr-10">
        <GroupForm onAddGroup={handleAddGroup} />
        <div className="w-full sm:w-[350px] lg:w-[400px] mx-auto mt-10">
          <CalendarComponent />
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-3/5 space-y-10 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="flex flex-wrap gap-6 justify-center px-4 md:px-8 items-start">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onStartWorkout={handleStartWorkout}
              handleDeleteGroup={handleDeleteGroup} // Pass delete handler
              handleChange={handleRenameGroup} // Pass rename handler
            />
          ))}
        </div>
      </div>
    </div>
  );
}
