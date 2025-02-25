"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function GroupForm({ onAddGroup }) {
  const { data: session } = useSession();
  const [namer, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = session?.user?.id;
    if (!id) {
      toast("User not logged in");
      return;
    }

    try {
      const response = await fetch("/api/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namer, id }),
      });

      if (!response.ok) {
        const json = await response.json();
        toast(json.message);
        return;
      }

      const newGroup = await response.json();

      onAddGroup(newGroup);

      setName("");
      toast.success("Group created!");
    } catch (error) {
      console.error("Error creating group:", error);
      toast("An error occurred while creating the group.");
    }
  };

  return (
    <div className="w-full flex rounded-xl justify-center items-start bg-gradient-to-b from-blue-950 to-black py-12 px-4 sm:px-6 lg:px-8 relative animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Create New Group
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-200">
            Organize your workouts and goals
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl rounded-xl px-8 sm:px-10 py-10 sm:py-12 transition-all transform duration-300 ease-in-out"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">
              Group Name
            </label>
            <input
              value={namer}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="transition w-full px-4 py-3 mt-2 rounded-lg font-medium bg-gray-700 bg-opacity-50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
              placeholder="Enter name for new group"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              title="Create new group"
              className="w-full py-3 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
  transition-all duration-300 hover:brightness-110"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
