"use client";
import { useState, useEffect } from "react";
import GroupCard from "@/components/GroupCard";
import GroupForm from "@/components/GroupForm";
import CalendarComponent from "./calendar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        group.id === updatedGroup.id
          ? { ...group, name: updatedGroup.name }
          : group
      )
    );
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
    toast.success("Group deleted succesfuly!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] lg:flex-row items-start justify-start mx-auto font-[var(--font-geist-sans)] p-4 sm:p-8 lg:p-12 gap-10">
      <div className="w-full max-w-md p-8 rounded-lg  mt-10 lg:mr-10">
        <GroupForm onAddGroup={handleAddGroup} />
        <div className="w-full sm:w-[350px] lg:w-[400px] mx-auto mt-10">
          <CalendarComponent />
        </div>
      </div>
      <div className="w-full lg:w-3/5 overflow-y-auto max-h-[calc(100vh-200px)] mt-[75px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 justify-items-center">
          {groups.length > 0 ? (
            groups.map((group) => (
              <div className="">
                <GroupCard
                  key={group.id}
                  group={group}
                  onStartWorkout={handleStartWorkout}
                  handleDeleteGroup={handleDeleteGroup}
                  handleChange={handleRenameGroup}
                />
              </div>
            ))
          ) : (
            <h1 className="text-gray-400">
              No workouts found. Create new via form
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
