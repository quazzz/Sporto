"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function RecordForm() {
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
      console.log(res)
      window.location.reload()
    } catch (error) {
      console.error(error);
      toast("An error occured submitting the achievement");
    }
  };
  return (
    <>

        <div className="w-full flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Submit your new achievement in sports
              </h1>
            </div>
            <form className="bg-white shadow-lg rounded-lg px-6 sm:px-8 py-8 sm:py-10 transition-all transform duration-200 ease-in-out">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Type of sport
                </label>
                <input
                  type="text"
                  value={recordName}
                  onChange={(e) => setRecordName(e.target.value)}
                  className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-gray-600 focus:bg-white"
                  placeholder="Enter your type of sport"
                />
                <div className="mt-2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter Your Achievement
                  </label>
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                    name=""
                    className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-gray-600 focus:bg-white"
                    placeholder="Enter the achievement in your type of sport"
                    id=""
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  title="Create new group"
                  onClick={handleSubmit}
                  className="transition w-full py-3 bg-black text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
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
