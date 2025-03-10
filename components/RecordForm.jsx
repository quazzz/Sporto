"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function RecordForm({handleAdd}) {
  const { data: session } = useSession();
  const [recordName, setRecordName] = useState("");
  const [achievement, setAchievement] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!recordName || !achievement) {
        toast("All fields must be filled");
        return;
      }
      const res = await fetch(`/api/records?userId=${session?.user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordName, achievement }),
      });
      const json = await res.json()
      console.log(json)
      handleAdd(json)
      toast.success('Record created succesfuly!')
    } catch (error) {
      console.error(error);
      toast.error("An error occured submitting the achievement");
    }
  };
  return (
    <>

        <div className="w-full animate-fade-in flex rounded-xl justify-center items-start bg-gradient-to-b from-blue-950 to-black py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Submit your new achievement in sports
              </h1>
            </div>
            <form className="bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl rounded-xl px-8 sm:px-10 py-10 sm:py-12 transition-all transform duration-300 ease-in-out">
              <div className="mb-6">
            
                <input
                  type="text"
                  value={recordName}
                  onChange={(e) => setRecordName(e.target.value)}
                  className="transition w-full px-4 py-3 mt-2 rounded-lg font-medium bg-gray-700 bg-opacity-50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
                  placeholder="Enter sport"
                />
                <div className="mt-2">
                
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                    name=""
                    className="transition w-full px-4 py-3 mt-2 rounded-lg font-medium bg-gray-700 bg-opacity-50 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
                    placeholder="Enter achievement"
                    id=""
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  title="Create new group"
                  onClick={handleSubmit}
                  className="w-full py-3 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
  transition-all duration-300 hover:brightness-110"
                >
                  Submit achievement
                </button>
              </div>
            </form>
          </div>
        </div>
   
    </>
  );
}
