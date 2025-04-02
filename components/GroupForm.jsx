"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Star, Users } from 'lucide-react';
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
    <div className="w-full flex rounded-xl justify-center   items-start bg-gradient-to-b from-blue-950 to-black py-12 px-4 sm:px-6 lg:px-8 relative animate-fade-in">
    <div className="max-w-lg w-full space-y-8">
      
      <div className="text-center relative">
      
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 relative z-10 ">
          Create New Group
        </h1>
       
      </div>
      <form 
        onSubmit={handleSubmit}
        className="bg-gradient-to-br  via-blue-950 to-black shadow-2xl rounded-2xl px-10 py-12 space-y-6 relative overflow-hidden"
      >
      
        
        <div>
    
          <div className="relative">
            <input
              value={namer}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full px-4 py-3 rounded-xl font-medium 
                bg-gray-700/50 border border-gray-600 
                placeholder-gray-400 text-white 
                focus:outline-none focus:border-blue-500 
                focus:ring-2 focus:ring-blue-400/50 
                transition duration-300 ease-in-out"
              placeholder="Group name"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Users size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 
            bg-gradient-to-b from-indigo-500 to-indigo-600 
            text-white font-semibold rounded-xl 
            shadow-lg hover:shadow-xl 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-all duration-300 
            hover:brightness-110 
           
            active:scale-95"
        >
          Create Group
        </button>
      </form>
    </div>
  </div>
  );
}
