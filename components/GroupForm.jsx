"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

import toast from "react-hot-toast";
export default function GroupCard() {
  const { data: session } = useSession();
  const [namer, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await session.user.id;
    console.log(id);
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
    if (response.ok) {
      toast("Group created, you can visit catalog now");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <div className="w-full flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Create New Group
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Organize your workouts and goals
          </p>
        </div>
        <form className="bg-white shadow-lg rounded-lg px-6 sm:px-8 py-8 sm:py-10 transition-all transform duration-200 ease-in-out">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-gray-600 focus:bg-white"
              placeholder="Enter name for new group"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              title="Create new group"
              onClick={handleSubmit}
              className="transition w-full py-3 bg-black text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
