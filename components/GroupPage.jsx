"use client";
import { useState, useEffect } from "react";
import GroupCard from "@/components/GroupCard";
import GroupForm from "@/components/GroupForm";
import CalendarComponent from "./calendar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Activity} from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-gray-950 to-black lg:flex-row-reverse items-start justify-start mx-auto font-[var(--font-geist-sans)] p-4 sm:p-8 lg:p-12 gap-10">
    <div className="w-full lg:w-3/5 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 justify-items-center mt-[100px]">
        {groups.length > 0 ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onStartWorkout={handleStartWorkout}
              handleDeleteGroup={handleDeleteGroup}
              handleChange={handleRenameGroup}
            />
          ))
        ) : (
          <div className="col-span-full w-full flex items-center justify-center py-16">
            <div className="bg-gradient-to-b to-gray-950 from-blue-950/70  rounded-xl p-10 text-center max-w-md backdrop-blur-sm">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-blue-800/30 flex items-center justify-center">
                    <Activity size={42} className="text-blue-300" />
                  </div>
                </div>
              </div>
  
              <h2 className="text-2xl font-bold text-white mb-2">
                No workouts yet
              </h2>
              <p className="text-blue-300 mb-6">
                Start tracking your workouts by <a className="underline" href="#functionality">creating your first
                workout group.</a> 
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    <div id="functionality" className="w-full max-w-md p-8 rounded-lg  lg:mr-[200px]">
      <GroupForm  onAddGroup={handleAddGroup} />
      <div className="w-full sm:w-[350px] lg:w-[400px] mx-auto mt-10">
        <CalendarComponent />
      </div>
    </div>
  </div>
  
  );
}
