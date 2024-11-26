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
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center  font-[var(--font-geist-sans)] p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md p-8  rounded-lg  mb-10 lg:mb-0 lg:mr-10">
        <GroupForm />
      </div>

      <div className="flex flex-col w-full lg:w-3/5 space-y-10">
        <div className="flex flex-wrap gap-6 justify-center px-4 md:px-8 items-start">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onStartWorkout={handleStartWorkout}
              className="w-full sm:w-72 md:w-80 lg:w-72 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ alignSelf: "flex-start" }}
            />
          ))}
        </div>

        <div className="w-full sm:w-[350px] lg:w-[400px] mx-auto mt-10">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
}
